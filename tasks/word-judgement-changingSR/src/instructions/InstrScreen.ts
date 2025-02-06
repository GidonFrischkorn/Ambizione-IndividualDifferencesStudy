// jsPsych official plugin
import instructions from "@jspsych/plugin-instructions";
import htmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";
import { BUTTON_INFO } from "../task-fun/text";
import { expInfo } from "../settings";

export const instructions_screen = {
    type: instructions,
    pages: [
        '<img style="width: 100%; height: 80vh" src="./assets/images/instructionsBOX_1.jpg"></img>',
        '<img style="width: 100%; height: 80vh" src="./assets/images/instructionsBOX_2.jpg"></img>',
        '<img style="width: 100%; height: 80vh" src="./assets/images/instructionsBOX_3.jpg"></img>', 
        '<img style="width: 100%; height: 80vh" src="./assets/images/instructionsBOX_4.jpg"></img>',
        '<img style="width: 100%; height: 80vh" src="./assets/images/instructionsBOX_5.jpg"></img>',
        '<img style="width: 100%; height: 80vh" src="./assets/images/instructionsBOX_6.jpg"></img>'
    ],
    button_label_next: BUTTON_INFO.continueButton[expInfo.LANG],
    button_label_previous: BUTTON_INFO.prevButton[expInfo.LANG],
    allow_backward: true,
    allow_keys: true,
    key_forward: "ArrowRight",
    key_backward: "ArrowLeft",
    /* IF EXPERIMENT IN THE LAB 
    key_forward: expInfo.DESIGN.BOX_CHOICES[1],
    key_backward: expInfo.DESIGN.BOX_CHOICES[0],
    */
    show_clickable_nav: true,
};

export const fingers_instructions_practice = {
    type: htmlKeyboardResponse,
    stimulus: 
    // IF EXPERIMENT IN THE LAB - Text muss nocch angepasst werden/Ideen? 
    `<div style='font-size:35px; line-height: 1.5;'>
    Bitte legen Sie beide <strong>Zeigefinger</strong> auf die zwei <strong>untersten</strong> Tasten links und rechts.<br>
    Die Versuchsdurchgänge fangen in 5 Sekunden an oder wenn Sie irgendeine Taste drücken.
    </div>`,

    /* IF EXPERIMENT IS ONLINE
    `<div style='font-size:40px; line-height: 1.5;'>
    Bitte legen Sie beide <strong>Zeigefinger</strong> auf die Tasten <strong>D</strong> und <strong>J</strong>.<br>
    Die Versuchsdurchgänge fangen in 5 Sekunden an oder wenn Sie irgendeine Taste drücken.
    </div>`,*/
    choices: "ALL_KEYS",
    trial_duration: expInfo.TIMING.FINGERS,
};

export const fingers_instructions_exp = {
    type: htmlKeyboardResponse,
    stimulus: 
    // IF EXPERIMENT IN THE LAB - Text muss nocch angepasst werden/Ideen? 
    `<div style='font-size:35px; line-height: 1.5;'>
    Bitte legen Sie beide <strong>Zeigefinger</strong> auf die zwei <strong>untersten</strong> Tasten links und rechts.<br>
    Das Experimemt fängt in 5 Sekunden an oder wenn Sie irgendeine Taste drücken.
    </div>`,
    
    /* IF EXPERIMENT IS ONLINE
    `<div style='font-size:40px; line-height: 1.5;'>
    Bitte legen Sie beide <strong>Zeigefinger</strong> auf die Tasten <strong>D</strong> und <strong>J</strong>.<br>
    Das Experimemt fängt in 5 Sekunden an oder wenn Sie irgendeine Taste drücken.
    </div>`,*/
    choices: "ALL_KEYS",
    trial_duration: expInfo.TIMING.FINGERS,
};
