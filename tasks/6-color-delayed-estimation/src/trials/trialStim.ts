import { circleOfSquares } from "@coglabuzh/webpsy.js"
import { expInfo } from "../settings"
import psychophysics from '@kurokida/jspsych-psychophysics';
import { drawColorWheel } from "@coglabuzh/webpsy.js";
import { jsPsych } from "../jsp";




// Define parameters 
const radius: number = expInfo.WHEEL.wheelRADIUS;
const ratio: number = expInfo.WHEEL.wheelRATIO;
const pos: [number, number] = [500/ 2, 500 / 2]

// Create the color wheel stimulus
const colorWheelStimulus = drawColorWheel(radius, ratio, pos);

export const retrieval_screen = {
  type: psychophysics, 
  stimuli: [colorWheelStimulus],
  background_color: 'white',
  canvas_width: 500,
  canvas_height: 500,
  response_type: 'mouse', // Enable mouse interactions
  choices: 'NO_KEYS', // Disable keyboard responses
  mouse_down_func: function(event) {
    // Get the mouse click coordinates
    const x = event.offsetX;
    const y = event.offsetY;

    // Calculate the difference from the center
    const dx = x - pos[0];
    const dy = y - pos[1];

    // Calculate the angle of the click
    let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    if (angle < 0) angle += 360; // Normalize angle to [0, 360)

    // Save the selected hue (angle) to the data
    jsPsych.data.write({
      selected_hue: angle
    });

  }
};