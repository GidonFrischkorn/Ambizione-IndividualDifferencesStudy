/**
 * @title Stroop Squared
 * @description Participant has to tell whether the word represents something animate or inanimate.
 * @author Luca Läubin
 * @version stroop_squared_pretest
 *
 * @assets assets/
 */

// import stylesheets
import "../styles/main.scss";

// jsPsych official plugins
import preload from "@jspsych/plugin-preload";
import jsPsychHtmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";

// Global variables
import { jsPsych } from "./jsp";
import { expInfo } from "./settings";

// instruction screens
import { welcome_screen } from "./instructions/welcome";
import { consent_screen, notice_screen } from "./instructions/consent";
import { browser_screen } from "./instructions/browserCheck";
import { fullMode_screen } from "./instructions/fullScreen";
import { instructions_screen, fingers_instructions_practice, fingers_instructions_exp } from "./instructions/InstrScreen";
import { exp_start_screen, pra_instr_screen } from "./instructions/InstrTrial";
import { break_screen } from "./instructions/breakScreen";

// trial functions & stimuli
import { createPracticeTrial, createExperimentTrial } from "./trials/trialProcess";
import { createStroopTrials } from "./trials/stroopTrialList";

/** 
 * This function will be executed by jsPsych Builder and is expected to run the jsPsych experiment 
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
  const timeline: any[] = [];

  // Preload assets
  const preload_screen = {
    type: preload,
    images: assetPaths.images,
    // audio: assetPaths.audio,
    // video: assetPaths.video,
  };

  /************************************** Instruction Screens **************************************/
  timeline.push(preload_screen);
  timeline.push(welcome_screen);
  // timeline.push(consent_screen);
  // timeline.push(notice_screen);
  timeline.push(browser_screen);
  // timeline.push(fullMode_screen);
  timeline.push(instructions_screen);
  timeline.push(pra_instr_screen);
  // timeline.push(fingers_instructions_practice);

  /************************************** Practice & Experiment Trials Setup **************************************/
  const practiceTrials = createStroopTrials().slice(
    0,
    expInfo.STROOP.nPracticeTrials
  );
  const expTrials = createStroopTrials().slice(
    0,
    expInfo.STROOP.nTrials
  );

  // build practice timeline
  const practice_line: any[] = practiceTrials
    .map(trial => createPracticeTrial(trial))
    .flat();

  // build experiment timeline
  let exp_line: any[] = expTrials
    .map(trial => createExperimentTrial(trial))
    .flat();

  // insert break screen after N trials
  const idxForBreak = expInfo.STROOP.nBreakAfter * 2; // each trial produces 2 items (fix + stim)
  if (exp_line.length >= idxForBreak) {
    exp_line.splice(idxForBreak, 0, break_screen);
  }

  /************************************** Procedure **************************************/
  // practice trials
  timeline.push(...practice_line);

  // start of main experiment
  timeline.push(exp_start_screen);
  timeline.push(fingers_instructions_exp);

  // experiment trials
  timeline.push(...exp_line);

  /************************************** Run **************************************/
  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the results
  return jsPsych;
}
