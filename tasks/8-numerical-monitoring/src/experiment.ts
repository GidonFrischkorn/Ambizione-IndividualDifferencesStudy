/**
 * @title Number Monitoring Task 
 * @description A grid of numbers (3x3) is presented. One number changes every 1.5 seconds randomly and the participant has to detect if any row, column, or diagonal has matching last digits.
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
import { expInfo } from "./settings";
import { createNewTrial } from "./trials/trialProcess";

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
  
  let practiceLine: any[] = [];
for (let i = 0; i < expInfo.DESIGN.nPRACTICE; i++) {
  const prac_list = createNewTrial(expInfo.DESIGN.nPRACTICE);
  practiceLine.push(prac_list);
}

console.log("Practice Line: ", practiceLine)

  /************************************** Experiment **************************************/
  let expLine: any[] = [];
  for (let i = 0; i < expInfo.DESIGN.nTRIALS; i++) {
    const exp_list = createNewTrial(expInfo.DESIGN.nTRIALS);
    expLine.push(exp_list);
  }

  console.log("Experiment Line: ", expLine)


  /************************************** Procedure **************************************/


  // Push all the screen slides into timeline
  // When you want to test the experiment, you can easily comment out the screens you don't want
  timeline.push(preload_screen);
  timeline.push(welcome_screen);
  timeline.push(consent_screen);
  timeline.push(notice_screen);
  timeline.push(browser_screen);
  timeline = timeline.concat(practiceLine);
  timeline = timeline.concat(expLine);

  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  // return jsPsych;
}
