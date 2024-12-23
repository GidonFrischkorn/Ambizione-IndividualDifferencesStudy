// Purpose: Functions for generating stimuli and creating elements

// Global variables
import { expInfo } from "../settings";

// Third party plugins
import htmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";
import { jsPsych } from "../jsp";
import psychophysics from "@kurokida/jspsych-psychophysics";
import exp from "constants";

/**
 * A function used to create a single trial.
 * @param XY The trial number.
 * @param isPractice A boolean indicating if it's a practice trial.
 * @param condition The condition of the trial ("odd" or "even").
 * @param targetStim The stimulus number.
 * @param mapping The mapping for the trial ("normal" or "switched").
 *
 * @returns An array containing all the slides of a trial.
 */
export function createNewTrial(XY: number, isPractice: boolean, box: boolean, condition: string, targetStim: number, mapping: string) {  
  let trial_line: any[] = [];

  // Compute the correct response based on mapping
  let correct_response = "";
  if (mapping === "normal") {
      if (targetStim % 2 !== 0) {
        if (box === true) {
          correct_response = expInfo.DESIGN.BOX_CHOICES[1]
        } else {
          correct_response = expInfo.DESIGN.CHOICES[1]
        };
      } else {
        if (box === true) {
          correct_response = expInfo.DESIGN.BOX_CHOICES[0]
        } else {
          correct_response = expInfo.DESIGN.CHOICES[0]
          };
      }
  } else if (mapping === "switched") {
      if (targetStim % 2 !== 0) {
        if (box === true) {
          correct_response = expInfo.DESIGN.BOX_CHOICES[0]
        } else {
          correct_response = expInfo.DESIGN.CHOICES[0]
          };
      } else {
        if (box === true) {
          correct_response = expInfo.DESIGN.BOX_CHOICES[1]
        } else {
          correct_response = expInfo.DESIGN.CHOICES[1]
          };
      }
  }

  // Fixation Screen 
  const fixation_screen = {
    type: htmlKeyboardResponse,
    stimulus: "<div style='font-size:60px;'>+</div>",
    choices: "NO-KEYS",
    trial_duration: expInfo.TIMING.FIXATION,
  }

  // Mapping Screen
  const cue_screen = {
    type: htmlKeyboardResponse,
    stimulus: function() {
        if (mapping === "normal") {
            return "<div style='font-size:60px;'>G&nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;U</div>";
        } else if (mapping === "switched") {
            return "<div style='font-size:60px;'>U&nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;G</div>";
        }
    },
    choices: "NO-KEYS",
    trial_duration: expInfo.TIMING.CUE,
  }

  // Target and Response Screen 
  const target_response_screen = {
    type: htmlKeyboardResponse,
    stimulus: `<div style='font-size:50px;'> ${targetStim} </div>`,
    choices: box ? expInfo.DESIGN.BOX_CHOICES : expInfo.DESIGN.CHOICES, 
    trial_duration: expInfo.TIMING.TARGET,
    response_ends_trial: true,
    data: {
      trial_number: XY,
      condition: condition, 
      procedure: isPractice ? "practice" : "experiment",
      stimulus: targetStim,
      mapping: mapping,
      correct_response: correct_response,
    },
    on_finish: function (data) {
      let correct = data.response === data.correct_response;
      data.correct = correct;
    }
  }

  // Feedback Stimulus for Practice Trials
  const feedback = {
    type: htmlKeyboardResponse,
    stimulus: function () {
      let lastTrialCorrect = jsPsych.data.get().last(1).values()[0].correct;
      if (lastTrialCorrect) {
        return "<div style='font-size:60px; color:green;'>Richtig :)</div>";
      } else {
        return "<div style='font-size:60px; color:red'>Falsch :(</div>";
      }
    },
    trial_duration: expInfo.TIMING.FEEDBACK,
  } 

  // Inter Trial Interval Screen 
  const inter_trial_interval = {
    type: htmlKeyboardResponse,
    stimulus: "",
    choices: "NO-KEYS",
    trial_duration: expInfo.TIMING.ITI,
  }

  // Push screens into trial_line
  if (isPractice) {
    trial_line.push(fixation_screen, cue_screen, target_response_screen, feedback, inter_trial_interval); 
  } else {
    trial_line.push(fixation_screen, cue_screen, target_response_screen, inter_trial_interval);
  };

  return trial_line;
};
