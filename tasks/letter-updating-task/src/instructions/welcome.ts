// Import plugins to this file
import externalHtml from "@jspsych/plugin-external-html";
import { jsPsych } from "../jsp";
// jsPsych official plugin
import { SCREEN_INFO } from "../task-fun/text";
import { expInfo } from "../settings";

var check_ID = function () {
  //@ts-ignore get participant ID
  var participantID = document.getElementById("participant_id").value;

  if (participantID === "") {
    alert(`${SCREEN_INFO.loginWarning[expInfo.LANG]}`);
    return false;
  } else {
    // Add participant's ID to the database
    jsPsych.data.addProperties({ participant: participantID });

    return true;
  }
};

export const welcome_screen = {
  type: externalHtml,
  url: `../assets/external-html/welcome-${expInfo.LANG}.html`,
  cont_btn: "welcomeButton",
  check_fn: check_ID,
  data: { screen_id: "welcome" },
};
