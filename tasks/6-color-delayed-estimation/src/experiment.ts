/**
 * @title Color Delayed Estimation Task
 * @description Participants have to remember the colors of the squares presented to them and after a delay, they have to reproduce the color of the one that its being cued. 
 * @author Elena Venturi 
 * @version 0.3.1
 *
 *
 * @assets assets/
 */

// import stylesheets (.scss or .css).
import "../styles/main.scss";

// jsPsych official plugin
import preload from "@jspsych/plugin-preload";

// Global variables
import { jsPsych } from "./jsp";

// screens
import { welcome_screen } from "./instructions/welcome";
import { consent_screen, notice_screen } from "./instructions/consent";
import { browser_screen } from "./instructions/browserCheck";
import { encodingColors } from "./trials/colorsEncodingScreen";
import htmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";
import { circleOfSquares } from "@coglabuzh/webpsy.js";
import { random } from "@coglabuzh/webpsy.js";
import { expInfo } from "./settings";
import { drawColorWheel } from "@coglabuzh/webpsy.js";
import psychophysics from "@kurokida/jspsych-psychophysics";

/**
 * This function will be executed by jsPsych Builder and is expected to run the jsPsych experiment
 *
 * @type {import("jspsych-builder").RunFunction}
 */
export async function run({
  assetPaths,
  input = {},
  environment,
  title,
  version,
}) {
  // Initialize a timeline to hold the trials
  var timeline: any[] = [];

  // Preload assets
  const preload_screen = {
    type: preload,
    images: assetPaths.images,
    // audio: assetPaths.audio,
    // video: assetPaths.video,
  };

  /************************************** Instruction **************************************/


  /************************************** Practice **************************************/

  /************************************** Experiment **************************************/

  /************************************** Procedure **************************************/


  // Push all the screen slides into timeline
  // When you want to test the experiment, you can easily comment out the screens you don't want
  //timeline.push(preload_screen);
  //timeline.push(welcome_screen);
  //timeline.push(consent_screen);
  //timeline.push(notice_screen);
  //timeline.push(browser_screen);
  
  // Define parameters 
const radius: number = expInfo.DESIGN.wheelRADIUS;
const ratio: number = expInfo.DESIGN.wheelRATIO;
const pos: [number, number] = [expInfo.CANVAS.canW/ 2, expInfo.CANVAS.canH / 2]

// Create the color wheel stimulus
const colorWheelStimulus = drawColorWheel(radius, ratio, pos);

// Create fixation cross 
const fixation_cross = {
    obj_type: "cross", 
    origin_center: true,
    line_length: 30, 
    line_width: 3
}

const retrieval_screen = {
  type: psychophysics, 
  stimuli: [colorWheelStimulus],
  background_color: 'white',
  canvas_width: expInfo.CANVAS.canW,
  canvas_height: expInfo.CANVAS.canH,
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

timeline.push(retrieval_screen);

  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  // return jsPsych;
}
