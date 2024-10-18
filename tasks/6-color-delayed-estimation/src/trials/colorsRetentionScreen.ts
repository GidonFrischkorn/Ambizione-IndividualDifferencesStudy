import htmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";
import { expInfo } from "../settings";
import exp from "constants";

export const retention_screen = {
    type: htmlKeyboardResponse,
    stimulus: "<div style='font-size:60px;'>+</div>",
    choices: [],
    trial_duration: expInfo.TIMING.RETENTION,
    respone_ends_trial: false

}