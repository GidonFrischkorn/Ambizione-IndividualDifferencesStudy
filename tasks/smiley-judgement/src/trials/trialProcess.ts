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
export function createNewTrial(
  XY: number,
  isPractice: boolean,
  difficulty: string,
  diff: number,
  fit: number,
  location: number,
  targetStim: any
) {
  var trial_line: any[] = [];

  // Fixation Screen
  const fixation_screen = {
    type: htmlKeyboardResponse,
    stimulus: "<div style='font-size:60px;'>+</div>",
    choices: "NO-KEYS",
    trial_duration: Math.floor(
      expInfo.TIMING.FIXATION + Math.random() * expInfo.TIMING.JITTER
    ),
  };

  // Stimuli Screen
  const stimuli_screen = {
    type: psychophysics,
    stimuli: targetStim,
    choices: expInfo.DESIGN.CHOICES,
    mapping: {
      fit: expInfo.DESIGN.CHOICES[
        expInfo.DESIGN.MAPPING[expInfo.DESIGN.CONDITIONS.FIT.indexOf("fit")]
      ],
      nofit:
        expInfo.DESIGN.CHOICES[
          expInfo.DESIGN.MAPPING[expInfo.DESIGN.CONDITIONS.FIT.indexOf("nofit")]
        ],
    },
    background_color: expInfo.DESIGN.backgroundCOLOR, // white background
    response_ends_trial: true,
    trial_duration: expInfo.TIMING.STIMULI,
    data: {
      trial_number: XY,
      condition: difficulty,
      does_fit: fit == 1,
      line_length: targetStim[0].width,
      line_location: targetStim[0].startY > 0 ? "top" : "bottom",
      fix_duration: fixation_screen.trial_duration,
      procedure: function () {
        if (isPractice) {
          return "practice";
        } else {
          return "experiment";
        }
      },
    },
    on_finish: function (data) {
      let correct =
        data.response ==
        (data.does_fit ? this.mapping.fit : this.mapping.nofit);
      let correctKey = data.does_fit ? this.mapping.fit : this.mapping.nofit;
      jsPsych.data
        .get()
        .addToLast({ correct: correct, correct_key: correctKey });
    },
  };

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
  };

  // Inter Trial Interval Screen
  const inter_trial_interval = {
    type: htmlKeyboardResponse,
    stimulus: "",
    choices: "NO-KEYS",
    trial_duration: Math.floor(
      expInfo.TIMING.ITI + 2 * Math.random() * expInfo.TIMING.JITTER
    ),
  };

  // Push screens into trial_line

  if (isPractice) {
    trial_line.push(
      fixation_screen,
      stimuli_screen,
      feedback,
      inter_trial_interval
    );
  } else {
    trial_line.push(fixation_screen, stimuli_screen, inter_trial_interval);
  }

  // return
  return trial_line;
}
