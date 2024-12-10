// import
import { jsPsych } from "../jsp";
import { varOnline } from "../settings";

// function to end the practice session when participant fails the trials with setsize 2
export const endExpPractice = function (code: string) {

  var code_online = code;

  // get json data
  var resultJson = jsPsych.data.get().json();

  if (varOnline.RUN_JATOS && varOnline.RUN_PROLIFIC) {

      //@ts-ignore
      jatos.submitResultData(resultJson);

      // fail code for prolific
      const code = code_online;
        
      // prolific integration
      document.body.innerHTML = `<div class="main">
                              <p class='body-center'>
                              Unfortunately, you didn't pass the practice round 2 times and failed the attention check. <br>
                              We ask you to return your participation. You are being redirected to Prolific.
                              </p>
                              </div>`;

      //@ts-ignore
      jatos.endStudyAndRedirect(`https://app.prolific.com/submissions/complete?cc=${code}`, false, "failed practice check");
    
    } else { 

      jsPsych.endExperiment();

    }
}

// function to end the practice session when participant fails the trials with setsize 2
export const endExpProcSpeed = function (code: string) {

  var code_online = code;

  // get json data
  var resultJson = jsPsych.data.get().json();

  if (varOnline.RUN_JATOS && varOnline.RUN_PROLIFIC) {

      //@ts-ignore
      jatos.submitResultData(resultJson);

      // fail code for prolific
      const code = code_online;
        
      // prolific integration
      document.body.innerHTML = `<div class="main">
                              <p class='body-center'>
                              Unfortunately, you didn't pass the attention check of the reaction time task and had an accuracy below 75%. <br>
                              We ask you to return your participation. You are being redirected to Prolific.
                              </p>
                              </div>`;

      //@ts-ignore
      jatos.endStudyAndRedirect(`https://app.prolific.com/submissions/complete?cc=${code}`, false, "failed processing speed check");
    
    } else { 

      jsPsych.endExperiment();

    }
}