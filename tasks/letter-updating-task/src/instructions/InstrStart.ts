// jsPsych official plugin
import instructions from "@jspsych/plugin-instructions";
import htmlButtonResponse from "@jspsych/plugin-html-button-response";

// Global variables
import { SCREEN_INFO, BUTTON_INFO } from "../task-fun/text";


// Global variables
import { expInfo } from "../settings";


export const instr_line = {
  type: instructions,
  pages: function () {
    const instr0 = `<div class="main">
    <img src="./assets/images/instruction-${expInfo.LANG}/instr0.jpeg" class="image"></img>
    </div>`;

    const instr1 = `<div class="main">
    <img src="./assets/images/instruction-${expInfo.LANG}/instr1.jpeg" class="image"></img>
    </div>`;

    const instr2 = `<div class="main">
    <img src="./assets/images/instruction-${expInfo.LANG}/instr2.jpeg" class="image"></img>
    </div>`;

    const instr3 = `<div class="main">
    <img src="./assets/images/instruction-${expInfo.LANG}/instr3.jpeg" class="image"></img>
    </div>`;

    return [instr0, instr1, instr2, instr3];
  },
  show_clickable_nav: true,
  button_label_previous: function () {
    return BUTTON_INFO.prevButton[expInfo.LANG];
  },
  button_label_next: function () {
    return BUTTON_INFO.nextButton[expInfo.LANG];
  },
  data: { screenID: "instruction" },
};


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
