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

  let correctResponse = trialData.match === "present" ? " " : null;

  const grid_screen = {
    type: htmlKeyboardResponse,
    stimulus: () => {
      return `<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; text-align: center; font-size: 36px; width: 500px; height: 500px">
        ${targetStim.map(num => `<div style="background-color: ${expInfo.DESIGN.backgroundCOLOR}; padding: 30px; border: 0.5px solid black;display: flex; align-items: center; justify-content: center;">${num}</div>`).join('')}
      </div>`;
    },
    choices: [" "], // Only the spacebar is a valid response
    trial_duration: expInfo.TIMING.GRID,
    data: {
      trial_number: trialIndex,
      correct_response: correctResponse,
      practice: isPractice ? "practice" : "experiment",
    },
    on_finish: function (data) {
      data.response_given = data.response === " "; // Check if spacebar was pressed

      if (trialData.match === "present") {
        // If match is "present", pressing space is correct
        data.correct = data.response_given;
      } else {
        // If match is "absent", NOT pressing space is correct
        data.correct = !data.response_given;
      }

      // Store response data
      jsPsych.data.get().addToLast({ correct: data.correct, response_given: data.response_given }); // can't access data.response_given 
    }
  };

  // Check if feedback should be displayed
  const last_trial = jsPsych.data.get().last(1).values()[0];
  //const feedback_needed = isPractice && last_trial.response_given;

  // Feedback screen (only in practice trials when a response was given)
  const feedback = {
    type: htmlKeyboardResponse,
    stimulus: function () {
      return last_trial.correct
        ? "<p style='font-size: 36px; color: green;'>Richtig :)</p>"
        : "<p style='font-size: 36px; color: red;'>Falsch :(</p>";
    },
    choices: "NO_KEYS", // No response required
    trial_duration: expInfo.TIMING.FEEDBACK, // Show feedback for 1 second
  };

  if (isPractice) {
    if(last_trial.response_given) {
      trial_line.push(grid_screen, feedback);
  } else {
    trial_line.push(grid_screen);
  }
  } else {
      trial_line.push(grid_screen);
    }

  console.log(trial_line);


  // return
  return trial_line;
}
