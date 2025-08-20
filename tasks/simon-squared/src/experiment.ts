/**
 * @title Simon Squared Task
 * @description Participant has to match the answers (left/right) to the direction of the shown arrow
 * @author Luca Läubin
 * @version simon_squared_pretest
 *
 * @assets assets/
 */

import "../styles/main.scss";

// jsPsych plugins
import preload from "@jspsych/plugin-preload";

// Global
import { jsPsych } from "./jsp";
import { expInfo } from "./settings";

// Timelines 
import {
  createSimonPracticeTimeline,
  createSimonExperimentTimeline,
} from "./trials/trialProcess";

// Screens
import { welcome_screen } from "./instructions/welcome";
import { browser_screen } from "./instructions/browserCheck";
import { exp_start_screen, pra_instr_screen } from "./instructions/InstrTrial";
import { instructions_screen } from "./instructions/InstrScreen";
import { break_screen } from "./instructions/breakScreen";

export async function run({
  assetPaths,
  input = {},
  environment,
  title,
  version,
}) {
  // Timeline
  let timeline: any[] = [];

  // Preload
  const preload_screen = {
    type: preload,
    images: assetPaths.images,
  };

  /*************** Practice & Experiment ***************/
  const practice_line: any[] = createSimonPracticeTimeline();
  let exp_line: any[] = createSimonExperimentTimeline();

  // Pause nach Hälfte der Trials
  const itemsPerTrial = exp_line.length / expInfo.DESIGN.nTRIALS;
  const idxForBreak = (expInfo.DESIGN.nTRIALS / 2) * itemsPerTrial;
  if (exp_line.length >= idxForBreak) {
    exp_line.splice(idxForBreak, 0, break_screen);
  }

  /********************* Ablauf *********************/
  timeline.push(preload_screen);
  timeline.push(welcome_screen);
  timeline.push(browser_screen);
  timeline.push(instructions_screen);
  timeline.push(pra_instr_screen);
  timeline = timeline.concat(practice_line);
  timeline.push(exp_start_screen);


  timeline = timeline.concat(exp_line);

  await jsPsych.run(timeline);
  return jsPsych;
}