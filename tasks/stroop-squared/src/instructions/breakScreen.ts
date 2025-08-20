import htmlButtonResponse from "@jspsych/plugin-html-button-response";
import {SCREEN_INFO, BUTTON_INFO} from "../task-fun/text";
import {expInfo} from "../settings";

export const break_screen = {
    type: htmlButtonResponse,
    stimulus: function (){
        return SCREEN_INFO.blockBreak!(1,2, expInfo.LANG) 
    },
    choices: function () {
        return BUTTON_INFO.continueButton[expInfo.LANG];
    },
    data: { screen_id: "break" },
};