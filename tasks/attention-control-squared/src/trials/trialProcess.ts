// Purpose: Functions for generating stimuli and creating elements

// Global variables
import { expInfo } from "../settings";

// Third party plugins
import htmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";
import { jsPsych } from "../jsp";

/**
 * A function used to create a single trial.
 * @param XY The number of items in a trial.
 * @param targetStim The stimulus of a trial.
 * @param isPractice A boolean value indicating whether the trial is a practice trial or not.
 *
 * @returns An array containing all the slides of a trial.
 */
export function createNewTrial(XY: number, isPractice: boolean, box: boolean, animacy: number, wordlength: number, targetStim: string) {  
  let trial_line: any[] = [];

  // Fixation Screen
  const fixation_screen = {
    type: htmlKeyboardResponse,
    stimulus: "<div style='font-size:60px;'>+</div>",
    choices: "NO-KEYS",
    trial_duration:
      expInfo.TIMING.FIXATION +
      Math.floor(Math.random() * (expInfo.TIMING.JITTER + 1)),
  };

  // Target and Response Screen
  const target_response_screen = {
    type: htmlKeyboardResponse,
    stimulus: `<div style='font-size:50px;'> ${targetStim} </div>`,
    choices: box ? expInfo.DESIGN.BOX_CHOICES : expInfo.DESIGN.CHOICES, 
    mapping: {
      animate: box ? expInfo.DESIGN.BOX_CHOICES[expInfo.DESIGN.MAPPING[expInfo.DESIGN.CONDITIONS.ANIMACY.indexOf("animate")]] : expInfo.DESIGN.CHOICES[expInfo.DESIGN.MAPPING[expInfo.DESIGN.CONDITIONS.ANIMACY.indexOf("animate")]], 
      inanimate: box ?  expInfo.DESIGN.BOX_CHOICES[expInfo.DESIGN.MAPPING[expInfo.DESIGN.CONDITIONS.ANIMACY.indexOf("inanimate")]] : expInfo.DESIGN.CHOICES[expInfo.DESIGN.MAPPING[expInfo.DESIGN.CONDITIONS.ANIMACY.indexOf("inanimate")]],
    },
    trial_duration: expInfo.TIMING.TARGET,
    response_ends_trial: true,
    data: {
      trial_number: XY,
      animacy: animacy,
      wordlength: wordlength,
      fix_duration: fixation_screen.trial_duration,
      procedure: isPractice ? "practice" : "experiment"
      },
      stimulus: targetStim,
    },
    on_finish: function (data) {
      let correct =
        data.response ==
        (data.animacy == 1 ? this.mapping.animate : this.mapping.inanimate);
      let correctKey =
        data.animacy == 1 ? this.mapping.animate : this.mapping.inanimate;
      jsPsych.data
        .get()
        .addToLast({ correct: correct, correct_key: correctKey });
    },
  };

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
  };

  // Inter Trial Interval Screen
  const inter_trial_interval = {
    type: htmlKeyboardResponse,
    stimulus: "",
    choices: "NO-KEYS",
    trial_duration:
      expInfo.TIMING.ITI +
      Math.floor(Math.random() * 2 * (expInfo.TIMING.JITTER + 1)),
  };

  // Push screens into trial_line

  if (isPractice) {
    trial_line.push(
      fixation_screen,
      target_response_screen,
      feedback,
      inter_trial_interval
    );
  } else {
    trial_line.push(
      fixation_screen,
      target_response_screen,
      inter_trial_interval
    );
  }

  // return
  return trial_line;
}
