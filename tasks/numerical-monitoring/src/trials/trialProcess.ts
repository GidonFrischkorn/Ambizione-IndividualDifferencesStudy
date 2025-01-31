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
export function createNewTrial(XY: number, isPractice: boolean, isMatch: boolean, targetStim) {
  var trial_line: any[] = [];
  console.log("Target Stim: ", targetStim[0]);

  const grid_screen = {
    type: htmlKeyboardResponse,
    stimulus: `
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; text-align: center; font-size: 24px; width: 150px;">
      <div style="background-color: ${expInfo.DESIGN.backgroundCOLOR}; padding: 20px; border: 0.5px solid black;">${targetStim[0]}</div>
      <div style="background-color: ${expInfo.DESIGN.backgroundCOLOR}; padding: 20px; border: 0.5px solid black;">${targetStim[1]}</div>
      <div style="background-color: ${expInfo.DESIGN.backgroundCOLOR}; padding: 20px; border: 0.5px solid black;">${targetStim[2]}</div>
      <div style="background-color: ${expInfo.DESIGN.backgroundCOLOR}; padding: 20px; border: 0.5px solid black;">${targetStim[3]}</div>
      <div style="background-color: ${expInfo.DESIGN.backgroundCOLOR}; padding: 20px; border: 0.5px solid black;">${targetStim[4]}</div>
      <div style="background-color: ${expInfo.DESIGN.backgroundCOLOR}; padding: 20px; border: 0.5px solid black;">${targetStim[5]}</div>
      <div style="background-color: ${expInfo.DESIGN.backgroundCOLOR}; padding: 20px; border: 0.5px solid black;">${targetStim[6]}</div>
      <div style="background-color: ${expInfo.DESIGN.backgroundCOLOR}; padding: 20px; border: 0.5px solid black;">${targetStim[7]}</div>
      <div style="background-color: ${expInfo.DESIGN.backgroundCOLOR}; padding: 20px; border: 0.5px solid black;">${targetStim[8]}</div>
  </div>
    `,
    choices: expInfo.DESIGN.CHOICES,
    trial_duration: expInfo.TIMING.GRID,
    data: {
      trial_number: XY, 
      //itsAmatch: isMatch, 
      practice: isPractice ? "practice" : "experiment",
    },
    on_finish: function (data) {
      let correct = data.response == (data.itsAmatch ? this.choices : null); 
      let correctKey = data.itsAmatch ? this.choices : null;
      jsPsych.data.get().addToLast({
        correct: correct,
        correct_key: correctKey
      });
    }
  };
  

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

  if (isPractice) {
    trial_line.push(grid_screen, feedback);
  } else {
    trial_line.push(grid_screen);
  };

  console.log(trial_line);


  // return
  return trial_line;
}
