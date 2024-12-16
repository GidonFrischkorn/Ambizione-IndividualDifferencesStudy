// Purpose: Functions for generating stimuli and creating elements

// Global variables
import { expInfo } from "../settings";

// Third party plugins
import psychophysics from "@kurokida/jspsych-psychophysics";
import htmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";
import { helpers } from "../task-fun/helpers";
import { CIElab } from "../task-fun/CIElab";
import { jsPsych } from "../jsp";
import { generateStims } from "./trialStim";

/**
 * A function used to create a single trial.
 * @param setsize The number of items in a trial.
 *
 * @returns An array containing all the slides of a trial.
 */
export function createNewTrial(setsize: number, isPractice: boolean): any[] {
  var trial_line: any[] = [];

  // Fixation Screen
  var fixation_cross = {
    obj_type: "cross", // means a rectangle
    startX: 0, // location in the canvas
    startY: 0,
    origin_center: true, // if true, the location is the center of the rectangle
    width: 20, // of the rectangle
    height: 20,
  };

  const fixation_screen = {
    type: psychophysics,
    stimulus: fixation_cross,
    choices: "NO-KEYS",
    background_color: expInfo.DESIGN.backgroundCOLOR,
    trial_duration:
      expInfo.TIMING.FIXATION +
      Math.floor(Math.random() * (expInfo.TIMING.JITTER + 1)),
  };

  

  // Encoding Screen
  var memory_stims = generateStims(setsize);

  const encoding_screen = {
    type: psychophysics,
    stimuli: memory_stims,
    background_color: expInfo.DESIGN.backgroundCOLOR, // white background
    trial_duration: expInfo.TIMING.TARGET,
  };

  // Retention Invterval
  const retention_interval = {
    type: htmlKeyboardResponse,
    stimulus: "",
    choices: "NO-KEYS",
    trial_duration: 1000, // Add retention interval variable here
  };
  
  // Continous Reproduction
  const reproduction_screen = {
    type: psychophysics,
    stimulus: [color_wheel, placeholders],
    choices: "NO-KEYS",
    background_color: expInfo.DESIGN.backgroundCOLOR,
  };


  // Inter Trial Interval Screen
  const inter_trial_interval = {
    type: htmlKeyboardResponse,
    stimulus: "",
    choices: "NO-KEYS",
    trial_duration:
      expInfo.TIMING.ITI +
      Math.floor(Math.random() * expInfo.TIMING.JITTER + 1),
  };

  // Push screens into trial_line

  if (isPractice) {
    trial_line.push(
      fixation_screen,
      encoding_screen,
      retention_interval
      //feedback,
      inter_trial_interval
    );
  } else {
    trial_line.push(
      fixation_screen,
      encoding_screen,
      retention_interval, 
      inter_trial_interval);
  }

  // return
  return trial_line;
}
