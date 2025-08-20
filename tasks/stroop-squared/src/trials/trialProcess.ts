// Purpose: Functions for generating stimuli and creating elements

// Global variables
import { expInfo } from "../settings";

// Third party plugins
import htmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";
import { jsPsych } from "../jsp";
// Stroop Trial List
import { StroopTrial } from "./stroopTrialList";

// 1) Practice-Trial
export function createPracticeTrial(trial: StroopTrial): any[] {
  const trial_line: any[] = [];
   trial_line.push({
    type: htmlKeyboardResponse,
    stimulus: "<p style='font-size:40px;'>+</p>",
    choices: "NO_KEYS",
    trial_duration: expInfo.TIMING.FIXATION
  });
  // Stimulus-Screen
  trial_line.push({
    type: htmlKeyboardResponse,
    stimulus: `
      <div style="font-size:48px; color:${trial.textColor.toLowerCase()};">
        ${trial.targetWord}
      </div>
      <div style="display:flex; justify-content:center; margin-top:60px; font-size:28px;">
        <div style="color:${trial.leftColor.toLowerCase()}; padding:0 40px;">
          ${trial.leftOption}
        </div>
        <div style="color:${trial.rightColor.toLowerCase()}; padding:0 40px;">
          ${trial.rightOption}
        </div>
      </div>
    `,
    choices: expInfo.STROOP.choices,
    data: trial,
    on_finish: (data: any) => {
      data.correct = (
        (data.response === "d" && trial.correctAnswer === "left") ||
        (data.response === "j" && trial.correctAnswer === "right")
      );
    }
  });

  // Feedback-Screen
  trial_line.push({
    type: htmlKeyboardResponse,
    stimulus: () => {
      const last = jsPsych.data.get().last(1).values()[0];
      return last.correct
        ? "<p style='color:green; font-size:32px;'>Richtig! :)</p>"
        : "<p style='color:red; font-size:32px;'>Falsch! :(</p>";
    },
    choices: "ALL_KEYS",
    trial_duration: expInfo.TIMING.FEEDBACK
  });
  // ITI-Screen
  trial_line.push({
    type: htmlKeyboardResponse,
    stimulus: "",
    choices: "NO_KEYS",
    trial_duration: expInfo.TIMING.ITI
  });
  return trial_line;
}

// Experimental-Trial
export function createExperimentTrial(trial: StroopTrial): any[] {
  const trial_line: any[] = [];

  // Fixations-Kreuz
  trial_line.push({
    type: htmlKeyboardResponse,
    stimulus: "<p style='font-size:40px;'>+</p>",
    choices: "NO_KEYS",
    trial_duration: expInfo.TIMING.FIXATION
  });

  // Stimulus-Screen
  trial_line.push({
    type: htmlKeyboardResponse,
    stimulus: `
      <div style="font-size:48px;color:${trial.textColor.toLowerCase()};">
        ${trial.targetWord}
      </div>
      <div style="display:flex;justify-content:center;margin-top:60px;font-size:28px;">
        <div style="color:${trial.leftColor.toLowerCase()};padding:0 40px">
          ${trial.leftOption}
        </div>
        <div style="color:${trial.rightColor.toLowerCase()};padding:0 40px">
          ${trial.rightOption}
        </div>
      </div>
    `,
    choices: expInfo.STROOP.choices,
    data: trial,
    on_finish: (data: any) => {
      data.correct = (
        (data.response === "d" && trial.correctAnswer === "left") ||
        (data.response === "j" && trial.correctAnswer === "right")
      );
      data.response_congruency = trial.responseCongruency;
      data.target_congruency   = trial.targetCongruency;
      data.target_word         = trial.targetWord;
      data.target_color        = trial.textColor;
      data.correct_response    = trial.correctAnswer;
      data.left_option         = data.leftOption;
      data.left_color          = data.leftColor;
      data.rigt_option         = data.rightOption;
      data.right_color         = data.rightColor;
      data.key_press           = data.response;
      data.rt                  = data.rt
      data.trial_index         = jsPsych.data.get().last(1).values()[0].trial_index;
      data.time_elapsed        = jsPsych.getProgress().current_trial_global;
    }
  });
  // ITI-Screen
  trial_line.push({
    type: htmlKeyboardResponse,
    stimulus: "",
    choices: "NO_KEYS",
    trial_duration: expInfo.TIMING.ITI
  });
  return trial_line;
}
