// jsPsych official plugin
import fullscreen from "@jspsych/plugin-fullscreen";

// Global variables
import { expInfo, varSystem } from "../settings";
import { BUTTON_INFO } from "../task-fun/text";

// Switch to fullscreen
export const fullMode_screen = {
  type: fullscreen,
  fullscreen_mode: true,
  message: function () {
    return `<div class="main">
      <p class = 'fb-text'>"Das Experiment wechselt in den Vollbildmodus"</p>
    </div>`;
  },
  button_label: function () {
    return BUTTON_INFO.continueButton[expInfo.LANG];
  },
  on_finish: function () {
    // Start to count that how many times participants has left the browser.
    varSystem.TRACK = false;
    varSystem.nBLUR = 0;
  },
};
