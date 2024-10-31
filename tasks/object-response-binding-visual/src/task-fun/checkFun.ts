// import
import { varOnline } from "../settings";
import { jsPsych } from "../jsp";
import { random } from "@coglabuzh/webpsy.js";

/**
 * Check if the participant agree with all the items in the consent and input their participant ID.
 * @returns true or false; if false, the participant cannot continue
 */
export const checkConsent = function () {

    if (varOnline.RUN_JATOS) {
        //@ts-ignore
        var resultID = jatos.studyResultId
        //@ts-ignore
        var comResultID = jatos.componentResultId
    } else {
        var resultID = 9999
        var comResultID = 9999
    }

    // @ts-ignore get the value of the prolific ID
    var prolificID = document.getElementById('prolific_id').value;

    if (prolificID === "") {
        alert("Please input your prolific ID");
        return false;
    } else if ( 
        //@ts-ignore
        document.getElementById('checkbox1').checked & 
        //@ts-ignore
        document.getElementById('checkbox2').checked & 
        //@ts-ignore
        document.getElementById('checkbox3').checked & 
        //@ts-ignore
        document.getElementById('checkbox4').checked &
        //@ts-ignore
        document.getElementById('checkbox5').checked &
        //@ts-ignore
        document.getElementById('checkbox6').checked &
        //@ts-ignore
        document.getElementById('checkbox7').checked
    ) {
        jsPsych.data.addProperties({
            participant: prolificID,
            resultID: resultID,
            comResultID: comResultID,
        })
        return true;
    } else {
        alert("If you wish to participate, you must check all the boxes above");
        return false;
    };
};


/**
 * Check if the participant agree with all the items in the notice.
 * @returns true or false; if false, the participant cannot continue
 */
export const checkNotice = function () {

    if (
        //@ts-ignore
        document.getElementById('checkbox8').checked
    ) {
        return true;
    } else {
        alert("If you wish to participate, you have to agree with the item.");
        return false;
    };
};

/**
 * Check if the participant agree with all the items in the notice.
 * @returns true or false; if false, the participant cannot continue
 */
export const checkRandomID = function () {

    if (
        //@ts-ignore
        document.getElementById('checkbox9').checked
    ) {
        //@ts-ignore
        var random_code = String(document.getElementById("randomID").textContent);
        
        jsPsych.data.addProperties({
            subjectID: random_code
        })
        
        return true;
    } else {
        alert("If you wish to continue, please check the box.");
        return false;
    };
};