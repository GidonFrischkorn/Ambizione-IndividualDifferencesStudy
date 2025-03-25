// jsPsych official plugin
import externalHtml from "@jspsych/plugin-external-html"; 

// Global variables
import { expInfo } from "../settings";

/* informed consent */
export const id_screen = {
  type: externalHtml,
  url: function () {
    return `assets/external-html/participant_code.html`;
  },
  cont_btn: "Weiter",
};

