/**
 * @title Color Delayed Estimation Task
 * @description In this task participants see a cloud of color (red or blue) dots and should decide if there are more red or blue dots.
 * @author Elena Venturi
 * @version 0.3.1
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
import { createNewTrial } from "./trials/trialProcess";
import { expInfo } from "./settings";
import { pra_instr_screen, exp_start_screen } from "./instructions/InstrTrial";
import { fullMode_screen } from "./instructions/fullScreen";
import {
  instructions_screen,
  fingers_instructions_practice,
  fingers_instructions_exp,
  break_screen,
} from "./instructions/InstrStart";

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
  // This still need to be implemebted


  /************************************** Practice **************************************/
  let prac_line: any[] = [];

  // Here we should create 9 practice trials with 3 from each set size
  for (let i = 0; i < expInfo.DESIGN.nPRACTICE; i++) {
    let trial = createNewTrial(1, true, [0]);
    prac_line = prac_line.concat(trial);
  }

  /************************************** Experiment **************************************/

  // Here we need to create the trial_list with 50 trials from each setsize 

  let exp_line: any[] = [];
  for (let i = 0; i < expInfo.DESIGN.nTRIALS; i++) {
    let trial = createNewTrial(1, false, [0]);
    exp_line = exp_line.concat(trial);
  }


  /************************************** Procedure **************************************/

  // Push all the screen slides into timeline
  // When you want to test the experiment, you can easily comment out the screens you don't want
  timeline.push(preload_screen);
  timeline.push(welcome_screen);
  // timeline.push(consent_screen);
  // timeline.push(notice_screen);
  timeline.push(browser_screen);
  // timeline.push(fullMode_screen);
  // timeline.push(instructions_screen);
  // timeline.push(pra_instr_screen);
  //timeline.push(example_trial);
  timeline = timeline.concat(prac_line);
  timeline = timeline.concat(exp_line);
  // timeline.push(exp_start_screen);
  // timeline.push(fingers_instructions_exp);
  // timeline = timeline.concat(exp_line);

  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  // return jsPsych;
}
