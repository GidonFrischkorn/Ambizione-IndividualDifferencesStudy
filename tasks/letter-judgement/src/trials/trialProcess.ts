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
export function createNewTrial(XY: number, isPractice: boolean, condition: string, targetStim: string) {  
  let trial_line: any[] = [];

  // Fixation Screen 
  const fixation_screen = {
    type: htmlKeyboardResponse,
    stimulus: "<div style='font-size:60px;'>+</div>",
    choices: "NO-KEYS",
    trial_duration: expInfo.TIMING.FIXATION,
  }

  // Target and Response Screen 
  const target_response_screen = {
    type: htmlKeyboardResponse,
    stimulus: `<div style='font-size:50px;'> ${targetStim} </div>`,
    choices: expInfo.DESIGN.CHOICES, 
    mapping: {
      vowel: expInfo.DESIGN.CHOICES[expInfo.DESIGN.MAPPING[expInfo.DESIGN.CONDITIONS.indexOf("vowel")]], 
      consonant: expInfo.DESIGN.CHOICES[expInfo.DESIGN.MAPPING[expInfo.DESIGN.CONDITIONS.indexOf("consonant")]],
    },
    trial_duration: expInfo.TIMING.TARGET,
    response_ends_trial: true,
    data: {
      is_vowel: function (data){
        let response = targetStim;
        return response == "A" || response == "E" || response == "I" || response == "O" || response == "U";
      },
      trial_number: XY,
      condition: condition, 
      practice: function (data) {
        if (isPractice) {
          return "practice";
        } else {
          return "experiment"
        }
      },
      stimulus: targetStim, 
    },
    on_finish: function (data) {
      let correct = data.response == (data.is_vowel ? this.mapping.vowel : this.mapping.consonant);
      jsPsych.data.get().addToLast({correct: correct});
      
      let stimulus_value = jsPsych.data.get().last(1).values()[0];
      stimulus_value.stimulus = targetStim;
    } 
  }

  // Feedback Stimuls for Practice Trials
  const feedback = {
    type: htmlKeyboardResponse,
    stimulus: function () {
      let lastTrialCorrect = jsPsych.data.get().last(1).values()[0].correct;
      if (lastTrialCorrect) {
        return "<div style='font-size:60px; color:green;'>Correct :)</div>";
      } else {
        return "<div style='font-size:60px; color:red'>Incorrect :(</div>";
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
    trial_line.push(fixation_screen, target_response_screen, feedback, inter_trial_interval); 
  } else {
    trial_line.push(fixation_screen, target_response_screen, inter_trial_interval);
  };
  

  // return
  return trial_line;
  
};
