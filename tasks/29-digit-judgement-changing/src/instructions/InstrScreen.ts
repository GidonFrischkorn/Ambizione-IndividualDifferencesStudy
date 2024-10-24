// jsPsych official plugin
import instructions from "@jspsych/plugin-instructions";
import htmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";
import { BUTTON_INFO } from "../task-fun/text";
import { expInfo } from "../settings";

export const instructions_screen = {
    type: instructions,
    pages: [
        '<img style="width: 100%; height: 80vh" src="../assets/images/instructions_1.jpg"></img>',
        '<img style="width: 100%; height: 80vh" src="../assets/images/instructions_2.jpg"></img>',
        '<img style="width: 100%; height: 80vh" src="../assets/images/instructions_3.jpg"></img>', 
        '<img style="width: 100%; height: 80vh" src="../assets/images/instructions_4.jpg"></img>',
        '<img style="width: 100%; height: 80vh" src="../assets/images/instructions_5.jpg"></img>',
    ],
    button_label_next: BUTTON_INFO.continueButton[expInfo.LANG],
    button_label_previous: BUTTON_INFO.prevButton[expInfo.LANG],
    allow_backward: true,
    allow_keys: false,
    show_clickable_nav: true,
};

export const fingers_instructions_practice = {
    type: htmlKeyboardResponse,
    stimulus: `<div style='font-size:40px; line-height: 1.5;'>
    Bitte legen Sie beide <strong>Zeigefinger</strong> auf die Tasten <strong>E</strong> und <strong>O</strong>.<br>
    Die Versuchsdurchgänge fangen in 5 Sekunden an oder wenn Sie irgendeine Taste drücken.
    </div>`,
    choices: "ALL_KEYS",
    trial_duration: expInfo.TIMING.FINGERS,
};

export const fingers_instructions_exp = {
    type: htmlKeyboardResponse,
    stimulus: `<div style='font-size:40px; line-height: 1.5;'>
    Bitte legen Sie beide <strong>Zeigefinger</strong> auf die Tasten <strong>E</strong> und <strong>O</strong>.<br>
    Das Experimemt fängt in 5 Sekunden an oder wenn Sie irgendeine Taste drücken.
    </div>`,
    choices: "ALL_KEYS",
    trial_duration: expInfo.TIMING.FINGERS,
};
