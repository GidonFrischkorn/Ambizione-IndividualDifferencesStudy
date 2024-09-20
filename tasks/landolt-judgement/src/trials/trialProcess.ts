// Purpose: Functions for generating stimuli and creating elements

// Global variables
import { expInfo } from "../settings";

// Third party plugins
import psychophysics from "@kurokida/jspsych-psychophysics";
import htmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";
import { jsPsych } from "../jsp";

/**
 * A function used to create a single trial.
 * @param XY The number of items in a trial.
 *
 * @returns An array containing all the slides of a trial.
 */
export function createNewTrial(XY: number, isPractice: boolean, difficulty: string, diff: number, bigL: number, bigR: number, location_right: number, location_left: number, targetStim: any) {
  var trial_line: any[] = [];
  
  // Fixation Screen 
  const fixation_screen = {
    type: htmlKeyboardResponse,
    stimulus: "<div style='font-size:60px;'>+</div>",
    choices: "NO-KEYS",
    trial_duration: expInfo.TIMING.FIXATION,
  }

  // Stimuli Screen 
  const stimuli_screen = {
    type: psychophysics,
    stimuli: targetStim,
    choices: expInfo.DESIGN.CHOICES,
    mapping: {
      left: expInfo.DESIGN.CHOICES[expInfo.DESIGN.MAPPING[expInfo.DESIGN.CONDITIONS.BIGGERGAP.indexOf("left")]],
      right: expInfo.DESIGN.CHOICES[expInfo.DESIGN.MAPPING[expInfo.DESIGN.CONDITIONS.BIGGERGAP.indexOf("right")]],
    },
    background_color: expInfo.DESIGN.backgroundCOLOR, // white background
    response_ends_trial: true,
    trial_duration: expInfo.TIMING.STIMULI,
    data: {
      trial_number: XY,
      left_bigger: bigL == 1,
      condition: difficulty,
      practice: function () {
        if (isPractice) {
          return "practice";
        } else {
          return "experiment"
        }
      },
    },
    on_finish: function (data) {
      let correct = data.response == (data.left_bigger ? this.mapping.left : this.mapping.right);
      let correctKey = data.left_bigger ? this.mapping.left : this.mapping.right;
      jsPsych.data.get().addToLast({correct: correct, correct_key: correctKey});
    }
  }

  // Feedback Screen
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
    trial_line.push(fixation_screen, stimuli_screen, feedback, inter_trial_interval); 
  } else {
    trial_line.push(fixation_screen, stimuli_screen, inter_trial_interval);
  };
  

  // return
  return trial_line;
}
