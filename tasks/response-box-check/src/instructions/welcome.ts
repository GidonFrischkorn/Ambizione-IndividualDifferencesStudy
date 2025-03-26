// jsPsych official plugin
import htmlButtonResponse from "@jspsych/plugin-html-button-response";
import { BUTTON_INFO } from "../task-fun/text";
import { expInfo } from "../settings";

export const welcome_screen = {
  type: htmlButtonResponse,
  stimulus: function () {
    return `<div class="main">
      <p class = 'fb-text'>Im Folgenden wird ein Antwort-Box-Check durchgeführt</p>
    </div>`;
  },
  choices: function () {
    return BUTTON_INFO.continueButton[expInfo.LANG];
  },
  data: { screenID: "welcome" },
};
