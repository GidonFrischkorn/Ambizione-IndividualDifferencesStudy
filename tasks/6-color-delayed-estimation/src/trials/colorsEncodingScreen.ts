import {circleOfSquares} from "@coglabuzh/webpsy.js";
import htmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";
import { random } from "@coglabuzh/webpsy.js";
import { expInfo } from "../settings";
import exp from "constants";

export function colorsEncodingScreen() {
    let encoding_screen: any[] = [];


const numberOfFrames = random.sample(expInfo.DESIGN.CONDITIONS, 1)[0];

// b. Initialize the frames array
const framesArray: any[] = [];

// c. Populate the frames array using a for loop
for (let i = 0; i < numberOfFrames; i++) {
    const randomColor = random.sample(expInfo.DESIGN.squaresCOLORS, 1)[0];

    const frame = {
        content: "",
        width: expInfo.DESIGN.squaresWIDTH,
        height: expInfo.DESIGN.squaresHEIGHT,
        border_color: randomColor,
        bg_color: randomColor
    };
    framesArray.push(frame);
}

    const circle : string = circleOfSquares({
        frames: framesArray
    })

const fixation_cross = {
    type: htmlKeyboardResponse,
    stimulus: "<div style='font-size:60px;'>+</div>",
    choices: [],
    trial_duration: expInfo.TIMING.ENCODING,
    response_ends_trial: false
};

const circle_of_squares = {
    type: htmlKeyboardResponse,
    stimulus: circle,
    choices: [],
    trial_duration: expInfo.TIMING.ENCODING,
    response_ends_trial: false
}

encoding_screen.push(fixation_cross);
encoding_screen = encoding_screen.concat(circle_of_squares);

return encoding_screen;

};

