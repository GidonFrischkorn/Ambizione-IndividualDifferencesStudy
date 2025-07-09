/**
 * @title Flanker Squared Task
 * @description Participant has to match the flanker arrows from the target stimulus to the center arrow from the respones stimulus
 * @author Luca Läubin
 * @version flanker_squared_pretest
 *
 * @assets assets/
 */

// import stylesheets (.scss or .css).
import "../styles/main.scss";

// jsPsych official plugin
import preload from "@jspsych/plugin-preload";
import survey from "@jspsych/plugin-survey";

// Global variables
import { jsPsych } from "./jsp";
import { expInfo } from "./settings";
import { createPracticeTimeline, createExperimentTimeline } from './trials/trialProcess';

// screens
import { welcome_screen } from "./instructions/welcome";
import { participant_code, extract_code } from "./survey/participant_code";
import { consent_screen, notice_screen } from "./instructions/consent";
import { browser_screen } from "./instructions/browserCheck";
import { fullMode_screen } from "./instructions/fullScreen";
import { exp_start_screen, pra_instr_screen } from "./instructions/InstrTrial";
import { instructions_screen } from "./instructions/InstrScreen";
import { fingers_instructions_practice, fingers_instructions_practice_BOX } from "./instructions/InstrScreen";
import { fingers_instructions_exp, fingers_instructions_exp_BOX } from "./instructions/InstrScreen";
import { break_screen } from "./instructions/breakScreen";

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
  /************************************** Instruction Screens **************************************/
  


  /************************************** Practice & Experiment Trials **************************************/
  const practice_line: any[] = createPracticeTimeline()
  
  let exp_line: any[] = createExperimentTimeline();

  const itemsPerTrial = exp_line.length / expInfo.DESIGN.nTRIALS;
  const idxForBreak = (expInfo.DESIGN.nTRIALS / 2) * itemsPerTrial;
  if (exp_line.length >= idxForBreak) {
    exp_line.splice(idxForBreak, 0, break_screen);
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
  timeline.push(instructions_screen);
  timeline.push(pra_instr_screen);
  if (expInfo.USE_RESPONSEBOX) {
    timeline.push(fingers_instructions_practice_BOX)
  } else {
    timeline.push(fingers_instructions_practice);
  }
  timeline = timeline.concat(practice_line);
  timeline.push(exp_start_screen);
  if (expInfo.USE_RESPONSEBOX) {
    timeline.push(fingers_instructions_exp_BOX)
  } else {
    timeline.push(fingers_instructions_exp);
  }
  timeline = timeline.concat(exp_line);

  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  return jsPsych;
}
