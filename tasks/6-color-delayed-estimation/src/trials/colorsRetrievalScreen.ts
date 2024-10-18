import { drawColorWheel } from "@coglabuzh/webpsy.js";
import psychophysics from "@kurokida/jspsych-psychophysics";
import { expInfo } from "../settings";
import { jsPsych } from "../jsp";
import exp from "constants";

export const retrievalColors = function () {

// Define parameters 
const radius: number = expInfo.DESIGN.wheelRADIUS;
const ratio: number = expInfo.DESIGN.wheelRATIO;
const pos: [number, number] = [expInfo.DESIGN.wheelPOSX, expInfo.DESIGN.wheelPOSY];

// Create the color wheel stimulus
const colorWheelStimulus = drawColorWheel(radius, ratio, pos);

// Create fixation cross 
const fixation_cross = {
    obj_type: "cross", 
    origin_center: true,
    line_length: 10, 
    line_width: 2
}

// Create the trial
const retrieval_screen = {
    type: psychophysics, 
    background_color: 'white', 
    canvas_width: expInfo.CANVAS.canW,
    canvas_height: expInfo.CANVAS.canH,
    stimuli: [colorWheelStimulus, fixation_cross],
    choices: 'NO_KEYS', 
    response_type: 'mouse', 
    mouse_down_func: function(event) {
        const x = event.offsetX;
        const y = event.offsetY;
        const dx = x - pos[0];
        const dy = y - pos[1];
        let angle = Math.atan2(dy, dx) * (180 / Math.PI);
        if (angle < 0) angle += 360;
    
        jsPsych.data.write({
          selected_hue: angle
        });
    }
}

return retrieval_screen;

}