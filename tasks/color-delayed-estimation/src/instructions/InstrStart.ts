// jsPsych official plugin
import instructions from "@jspsych/plugin-instructions";
import htmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";
import { BUTTON_INFO } from "../task-fun/text";
import { expInfo } from "../settings";

export const instructions_screen = {
    type: instructions,
    pages: [
        '<img style="width: 100%; height: 80vh" src="./assets/images/instr0.jpg"></img>',
        '<img style="width: 100%; height: 80vh" src="./assets/images/instr1.jpg"></img>',
        '<img style="width: 100%; height: 80vh" src="./assets/images/instr2.jpg"></img>',
        '<img style="width: 100%; height: 80vh" src="./assets/images/instr3.jpg"></img>',
        '<img style="width: 100%; height: 80vh" src="./assets/images/instr4.jpg"></img>',
        '<img style="width: 100%; height: 80vh" src="./assets/images/instr5.jpg"></img>',
    ],
    button_label_next: BUTTON_INFO.continueButton[expInfo.LANG],
    button_label_previous: BUTTON_INFO.prevButton[expInfo.LANG],
    allow_backward: true,
    allow_keys: false,
    show_clickable_nav: true,
};

export const break_screen = {
    type: htmlKeyboardResponse,
    stimulus: `<div style='font-size:40px; line-height: 2em;'>
    <strong>Kleine Pause</strong><br>
    Drücken Sie die Leertaste, um fortzufahren.<br>
    </div>`,
    choice: [" "],
    trial_duration: expInfo.TIMING.BREAK,
}