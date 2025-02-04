// Purpose: Functions for generating stimuli and creating elements

// Global variables
import { expInfo } from "../settings";

// Third party plugins
import psychophysics from "@kurokida/jspsych-psychophysics";
import htmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";
import { jsPsych } from "../jsp";
import { numbers } from "../../assets/stimuli"

/**
 * Function to create a single trial with a 3x3 grid.
 * @param {number} trialIndex - Index of the trial.
 * @param {boolean} isPractice - Indicates whether it's a practice trial.
 * @returns {Object[]} - The trial timeline.
 */
export function createNewTrial(trialIndex, isPractice) {
  var trial_line: any[] = [];
  const trialData = numbers[trialIndex];
  let targetStim = Object.keys(trialData)
    .filter(key => key.startsWith("stimulusValue"))
    .map(key => trialData[key]);

  let correctResponse = trialData.correctResponse === "present" ? " " : null;

  const grid_screen = {
    type: htmlKeyboardResponse,
    stimulus: () => {
      return `<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; text-align: center; font-size: 24px; width: 150px;">
        ${targetStim.map(num => `<div style="background-color: ${expInfo.DESIGN.backgroundCOLOR}; padding: 20px; border: 0.5px solid black;">${num}</div>`).join('')}
      </div>`;
    },
    choices: [" "], // Only the spacebar is valid
    trial_duration: expInfo.TIMING.GRID,
    data: {
      trial_number: trialIndex,
      correct_response: correctResponse,
      practice: isPractice ? "practice" : "experiment",
    },
    on_finish: function (data) {
      data.response_given = data.response === " "; // Check if the spacebar was pressed
      data.correct = data.response_given ? data.response === correctResponse : null;
      jsPsych.data.get().addToLast({ correct: data.correct, response_given: data.response_given });
    }
  };

  const feedback = {
    type: htmlKeyboardResponse,
    stimulus: function () {
      let lastTrial = jsPsych.data.get().last(1).values()[0];
      if (lastTrial.response_given) {
        return lastTrial.correct ? "<div style='font-size:60px; color:green;'>Richtig :)</div>" : "<div style='font-size:60px; color:red'>Falsch :(</div>";
      } else null 
    },
    trial_duration: expInfo.TIMING.FEEDBACK,
    choices: "NO_KEYS", // Ensures no key press is needed
  };

  if (isPractice) {
      trial_line.push(grid_screen, feedback);
  } else {
    trial_line.push(grid_screen);
  }

  console.log(trial_line);


  // return
  return trial_line;
}
