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
import { colorsEncodingScreen } from "./trials/colorsEncodingScreen";
import htmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";
import { circleOfSquares } from "@coglabuzh/webpsy.js";
import { random } from "@coglabuzh/webpsy.js";
import { expInfo } from "./settings";

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
        frames: framesArray,
        radius: 100
    })

  timeline.push({
    type: htmlKeyboardResponse,
    response_ends_trial: false,
    stimulus: circle,
    trial_duration: 500000,
  });

  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  // return jsPsych;
}
