// Purpose: Functions for generating stimuli and creating elements

// Global variables
import { expInfo } from "../settings";

// Third party plugins
import jsPsych from "jspsych";
import psychophysics from "@kurokida/jspsych-psychophysics";
import htmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";
import { generateStims } from "./trialStim";
import { updateRandomNumber } from "../task-fun/updateRandomNumber";
import { checkForSameLastDigit } from "../task-fun/checkNumbers";
import exp from "constants";


/**
 * A function used to create a single trial.
 * @param XY The number of items in a trial.
 *
 * @returns An array containing all the slides of a trial.
 */
export function createNewTrial(XY: number): any[] {
  var trial_line: any[] = [];
  let gridNumbers = generateStims();


  const trial_screen = {
    type: psychophysics, 
    stimuli: gridNumbers,
    canvas_width: 210,
    canvas_height: 210,
    background_color: expInfo.DESIGN.backgroundCOLOR,
    choices: expInfo.DESIGN.CHOICES, 
    trial_duration: expInfo.TIMING.TRIAL, 
    on_start: function() {
      updateRandomNumber(gridNumbers);
    },
    on_finish: (data) => {
      let match = checkForSameLastDigit(gridNumbers);
      data.correct = match && data.response === " ";
    }
  }

  trial_line.push(trial_screen);


  // return
  return trial_line;
}
