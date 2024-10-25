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
 * @param XY The number of items in a trial.
 * @param targetStim The stimulus of a trial.
 * @param isPractice A boolean value indicating whether the trial is a practice trial or not.
 *
 * @returns An array containing all the slides of a trial.
 */
export function createNewTrial(XY: number, isPractice: boolean, animacy: number, wordlength: number, targetStim: string, mapping: string) {  
  let trial_line: any[] = [];

  // Compute the correct response based on mapping
  let correct_response = "";
  if (mapping === "normal") {
      if (animacy === 1) {
          correct_response = "d"; // Press "D" for animate
      } else {
          correct_response = "j"; // Press "J" for inanimate
      }
  } else if (mapping === "switched") {
      if (animacy === 1) {
          correct_response = "j"; // Press "J" for animate (switched)
      } else {
          correct_response = "d"; // Press "D" for inanimate (switched)
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
          return "<div style='font-size:60px;'>B&nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;U</div>";
      } else if (mapping === "switched") {
          return "<div style='font-size:60px;'>U&nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;B</div>";
      }
  },
  choices: "NO-KEYS",
  trial_duration: expInfo.TIMING.CUE, // Show for a fixed time
}

   // Target and Response Screen 
   const target_response_screen = {
    type: htmlKeyboardResponse,
    stimulus: `<div style='font-size:50px;'> ${targetStim} </div>`,
    choices: expInfo.DESIGN.CHOICES, 
    trial_duration: expInfo.TIMING.TARGET,
    response_ends_trial: true,
    data: {
      trial_number: XY,
      animacy: animacy,
      wordlength: wordlength, 
      procedure: isPractice ? "practice" : "experiment",
      stimulus: targetStim,
      mapping: mapping,
      correct_response: correct_response,
    },
    on_finish: function (data) {
      let correct = data.response === data.correct_response;
      let correctKey = data.correct_response;
      jsPsych.data.get().addToLast({correct: correct, correct_key: correctKey});
    }
  }

  // Feedback Stimuls for Practice Trials
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
  

  // return
  return trial_line;
  
};
