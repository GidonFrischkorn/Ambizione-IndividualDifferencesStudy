// jsPsych official plugin
import htmlButtonResponse from "@jspsych/plugin-html-button-response";

// Global variables
import { SCREEN_INFO, BUTTON_INFO } from "../task-fun/text";

// Global variables
import { expInfo } from "../settings";



export const exp_start_screen = {
  type: htmlButtonResponse,
  stimulus: function () {
    return SCREEN_INFO.startExperiment[expInfo.LANG];
  },
  choices: function () {
    return BUTTON_INFO.continueButton[expInfo.LANG];
  },
};

export const prac_start_screen = {
  type: htmlButtonResponse,
  stimulus: function () {
    return SCREEN_INFO.startPractice[expInfo.LANG];
  },
  choices: function () {
    return BUTTON_INFO.continueButton[expInfo.LANG];
  },
};
