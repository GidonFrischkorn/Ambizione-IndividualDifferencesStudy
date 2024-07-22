// import
import { trackInteractions } from "@coglabuzh/webpsy.js";
import { varOnline, varSystem } from "./settings";
import { initJsPsych } from "jspsych";

// initialize jsPsych
export let jsPsych = initJsPsych({
    
    // check whether participants leave the window or not during the experiment
    on_interaction_data_update: function () {
        const instance = jsPsych;
        trackInteractions(varSystem, true, instance); // For some weird reason, this function does not work if you write out the name of each variable.
    },

    /*
    // append results to JATOS after each trial if the experiment is running on JATOS.
    on_trial_finish: function () {
        if (varOnline.RUN_JATOS) {

            // add a unique participant id to the data
            jsPsych.data.addProperties({ subjectID: varOnline.SUBJECT_ID }); 

            var resultJson = jsPsych.data.getLastTrialData().json();
            //@ts-ignore
            jatos.appendResultData(resultJson);
        }
    },*/

    // get data when finished and submit it to jatos and redirect to Prolific
    on_finish: function () {

        // allow to leave browser
        varSystem.TRACK = false;

        // get json data
        var resultJson = jsPsych.data.get().json();

        if (varOnline.RUN_JATOS) {

            //@ts-ignore
            jatos.submitResultData(resultJson);

            // if you run the experiment on Prolific
            if (varOnline.RUN_PROLIFIC) {

                if (!varSystem.FAILED_ATTENTION_CHECK) { // if you pass the attention check
                    
                    if(!navigator.onLine) { // no internet connection
                        
                        const subjectID = jsPsych.data
                        .getLastTrialData()
                        .values()[0].subjectID;
            
                        // download data locally
                        document.body.innerHTML = `<div class="main">
                        <p class='body-center-middle'>
                            Unfortunately, there is a problem with the internet connection to our data server. <br>
                            But you have successfully completed this experiment. <br>
                            Please press the "OK" button that will appear in a second above, to download your data <br>
                            (a json-file with the name "ProcDecBindingExp2_Session2_[some number].json") <br>
                            and send the data to the experimenter via a Filesharer from the University of Zurich (SwitchDrive) with the following link: <br>
                            ${varOnline.DRIVE_LINK} <br>
                            The Filesharer is anonymous and only the researcher can access it. <br> 
                            Even if you are unable to upload the file you will receive your compensation. <br>
                            Please submit the following code on Prolific: ${varOnline.INTERNET_CODE} <br>
                            If you have any questions please contact the researcher. <br>
                        </p>
                        </div>`;                              
            
                        // confirmation for download
                        setTimeout(function () {alert('\nDownload\nPlease press "OK" to confirm the download')}, 1000)    

                        // download and contact information
                        setTimeout(function () {
                        var file_name = "ProcDecBindingExp2_Session2_" + subjectID + ".json";
                        jsPsych.data.get().localSave("json", file_name); 

                        // end screen
                        setTimeout(function () {document.body.innerHTML =   `<div class="main">
                                        <p class='body-center-middle'>
                                        The experiment is over! <br>
                                        Please contact the researcher and send the data to the experimenter via the Filesharer with the following link: <br> 
                                        ${varOnline.DRIVE_LINK} <br>
                                        If you have any questions please contact the researcher. <br>
                                        </p>
                                        </div>`;}, 100)
                        }, 5000) 

                    } else { // if you have internet connection

                        // completion code for prolific
                        const code = varOnline.COMPLETION_CODE;

                        // prolific integration
                        document.body.innerHTML = `<div class="main">
                                                <p class='body-center'>
                                                Please wait and don't refresh or close the browser window.<br>
                                                You are being redirected to Prolific to complete the study.<br>
                                                If you experience any problems, please contact the researcher.<br>
                                                </p>
                                                </div>`;
                        
                        //@ts-ignore
                        jatos.endStudyAndRedirect(`https://app.prolific.com/submissions/complete?cc=${code}`, true, "completed");
                    };

                } else { // if you fail the attention check

                    // fail code for prolific
                    const code = varOnline.FAIL_CODE;
                    
                    // prolific integration
                    setTimeout(function () {document.body.innerHTML = `<div class="main">
                                            <p class='body-center'>
                                            Unfortunately, you didn't pass the attention check and left the browser. We ask you to return your participation.<br>
                                            You are being redirected to Prolific.
                                            </p>
                                            </div>`;}, 10000)

                    //@ts-ignore
                    jatos.endStudyAndRedirect(`https://app.prolific.com/submissions/complete?cc=${code}`, false, "failed attention check");
                
                }
                
            } else { // if you do not run the experiment on Prolific

                //when not running on JATOS, download the data as a csv or json file
                const subjectID = jsPsych.data
                    .getLastTrialData()
                    .values()[0].subjectID;
            
                // download data locally
                document.body.innerHTML = `<div class="main">
                <p class='body-center-middle'>
                    You have successfully completed this experiment. <br>
                    Please press the "OK" button that will appear in a second above, to download your data <br>
                    (a json-file with the name "ProcDecBindingExp2_Session2_[some number].json") <br>
                    and send the data to the experimenter via a Filesharer from the University of Zurich with the following link: <br>
                    ${varOnline.DRIVE_LINK} <br>
                    The Filesharer is anonymous and only the researcher can access it. <br> 
                    Even if you are unable to upload the file you will receive your compensation. <br>
                    If you have any questions please contact the researcher. <br>
                </p>
                </div>`;                              
            
                // confirmation for download
                setTimeout(function () {alert('\nDownload\nPlease press "OK" to confirm the download')}, 1000)    

                // download and contact information
                setTimeout(function () {
                var file_name = "ProcDecBindingExp2_Session2_" + subjectID + ".json";
                jsPsych.data.get().localSave("json", file_name); 

                // end screen
                setTimeout(function () {document.body.innerHTML =   `<div class="main">
                                <p class='body-center-middle'>
                                The experiment is over! <br>
                                Please contact the researcher and send the data to the experimenter via the Filesharer with the following link: <br> 
                                ${varOnline.DRIVE_LINK} <br>
                                If you have any questions please contact the researcher. <br>
                                </p>
                                </div>`;}, 100)
                }, 5000) 
            };

        } else { // if you do not run the experiment on Jatos or Prolific

            //when not running on Jatos or Prolific, download the data as a csv or json file
            const subjectID = jsPsych.data
                .getLastTrialData()
                .values()[0].subjectID;
        
            // download data locally
            document.body.innerHTML = `<div class="main">
            <p class='body-center-middle'>
                Something went wrong, please contact the researcher. <br>
                Please press the "OK" button that will appear in a second above, to download your data <br>
                (a json-file with the name "ProcDecBindingExp2_Session2_[some number].json") <br>
                and send the data to the experimenter via a Filesharer from the University of Zurich with the following link: <br>
                ${varOnline.DRIVE_LINK} <br>
                The Filesharer is anonymous and only the researcher can access it. <br> 
                Even if you are unable to upload the file you will receive your compensation. <br>
                If you have any questions please contact the researcher. <br>
            </p>
            </div>`;                              
        
            // confirmation for download
            setTimeout(function () {alert('\nDownload\nPlease press "OK" to confirm the download')}, 1000)    

            // download and contact information
            setTimeout(function () {
            var file_name = "ProcDecBindingExp2_Session2_" + subjectID + ".json";
            jsPsych.data.get().localSave("json", file_name); 

            // end screen
            setTimeout(function () {document.body.innerHTML =   `<div class="main">
                            <p class='body-center-middle'>
                            Please contact the researcher and send the data to the experimenter via the Filesharer with the following link: <br> 
                            ${varOnline.DRIVE_LINK} <br>
                            </p>
                            </div>`;}, 100)
            }, 5000) 
        
        };        
    }
});
