// import
import { jsPsych } from "../jsp";

/**
 * Check if the participant agree with all the items in the notice.
 * @returns true or false; if false, the participant cannot continue
 */
export const checkNotice = function () {

    if (
        //@ts-ignore
        document.getElementById('checkbox1').checked
    ) {
        return true;
    } else {
        alert("If you wish to participate, you have to agree with the item.");
        return false;
    };
};

/**
 * Check if the participant agree with all the item in the input ID screen.
 * @returns true or false; if false, the participant cannot continue
 */
export const checkInputID = function () {

    // @ts-ignore get the value of the prolific ID
    var prolificID = document.getElementById('prolific_id').value;

    // @ts-ignore get the value of the random ID
    var randomID = document.getElementById('random_id').value;

    if (
        prolificID === "" || randomID === ""
    ) {
        alert("If you wish to participate, please fill in your Prolific ID and Identification Code.");
        return false;
    } else {
        
        jsPsych.data.addProperties({
            participant: prolificID,
            subjectID: randomID
        })
        return true;
    };
};