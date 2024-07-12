// jsPsych official plugin
import instructions from "@jspsych/plugin-instructions";
import { BUTTON_INFO } from "../task-fun/text";
import { expInfo } from "../settings";

export const instructions_screen = {
    type: instructions,
    pages: [
        '<img style="width: 100%; height: 80vh" src="../assets/images/instructions_1.jpg"></img>',
        '<img style="width: 100%; height: 80vh" src="../assets/images/instructions_2.jpg"></img>',
        '<img style="width: 100%; height: 80vh" src="../assets/images/instructions_3.jpg"></img>'
    ],
    button_label_next: BUTTON_INFO.continueButton[expInfo.LANG],
    button_label_previous: BUTTON_INFO.prevButton[expInfo.LANG],
    allow_backward: true,
    allow_keys: false,
    show_clickable_nav: true,
};
