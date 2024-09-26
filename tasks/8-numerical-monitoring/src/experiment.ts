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
import { instructions_screen, practice_break_screen, break_screen } from "./instructions/InstrStart";
import { generateStims } from "./trials/trialStim";

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
  let gridNumbers = generateStims();
  
for (let i = 0; i < expInfo.DESIGN.nPRACTICE * expInfo.DESIGN.practiceBLOCKS; i++) {
  var prac_list = createNewTrial(expInfo.DESIGN.nPRACTICE, gridNumbers);
  practiceLine = practiceLine.concat(prac_list);

  if ((i + 1) % 10 === 0 && (i + 1) <= 19) {
    practiceLine.push(practice_break_screen);
  }
}

console.log("Practice Line: ", practiceLine)

  /************************************** Experiment **************************************/
  let expLine: any[] = [];
  let gridNumbersExp = generateStims();
  for (let i = 0; i < expInfo.DESIGN.nTRIALS * expInfo.DESIGN.nBLOCKS; i++) {
    const exp_list = createNewTrial(expInfo.DESIGN.nTRIALS, gridNumbersExp);
    expLine = expLine.concat(exp_list);

    if ((i + 1) % 50 === 0 && (i + 1) <= 199) {
    expLine.push(break_screen);
  }
}
  console.log("Experiment Line: ", expLine)


  /************************************** Procedure **************************************/


  // Push all the screen slides into timeline
  // When you want to test the experiment, you can easily comment out the screens you don't want
  //timeline.push(preload_screen);
  //timeline.push(welcome_screen);
  //timeline.push(consent_screen);
  //timeline.push(notice_screen);
  //timeline.push(browser_screen);
  //timeline.push(instructions_screen);
  timeline = timeline.concat(practiceLine);
  timeline = timeline.concat(expLine);

  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  // return jsPsych;
}
