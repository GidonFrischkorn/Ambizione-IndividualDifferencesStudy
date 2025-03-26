/**
 * @title The name of the task
 * @description A short description of the task
 * @author Chenyu Li and Hannah (Dames) Tschannen
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
import { exp_start_screen, pra_instr_screen } from "./instructions/InstrTrial";
import { createNewTrial } from "./trials/trialProcess";
import { expInfo } from "./settings";
import { practice_break_screen, break_screen } from "./instructions/InstrStart";
import { numbers } from "../assets/stimuli";

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
  let practice_line: any[] = [];

  for (let i = 0; i < expInfo.DESIGN.nPRACTICE; i++) {
    practice_line.push(...createNewTrial(i, true)); 
  }


  /************************************** Experiment **************************************/
  let expLine: any[] = [];
  const practice_trials = expInfo.DESIGN.nPRACTICE;
  for (let i = practice_trials; i < numbers.length; i++) {
    expLine.push(...createNewTrial(i, false)); // false indicates main experiment
  }
  

  /************************************** Procedure **************************************/


  // Push all the screen slides into timeline
  // When you want to test the experiment, you can easily comment out the screens you don't want
  //timeline.push(preload_screen);
  //timeline.push(welcome_screen);
  //timeline.push(consent_screen);
  //timeline.push(notice_screen);
  //timeline.push(browser_screen);
  timeline = timeline.concat(practice_line);
  timeline.push(exp_start_screen);
  timeline = timeline.concat(expLine);

  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  // return jsPsych;
}
