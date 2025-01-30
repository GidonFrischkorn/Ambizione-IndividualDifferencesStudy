// Purpose: Generates a stimulus array based on the specified condition.

import { expInfo } from "../settings";
import { jsPsych } from "../jsp";

/**
 * Generates a stimulus array based on the specified condition.
 * @param nBlueDots - number of blue dots
 * @param nRedDots - number of red dots
 */
export const generateStims = function (nBlueDots: number, nRedDots: number) {
  var stim_array: any[] = [];
  let dot_colors: string[] = [];

  // Add blue dots to the dot_colors array
  for (let i = 0; i < nBlueDots; i++) {
    dot_colors.push("blue");
  }

  // Add red dots to the dot_colors array
  for (let i = 0; i < nRedDots; i++) {
    dot_colors.push("red");
  }

  // Combine X and Y positions into unique pairs
  const positions: { X: number; Y: number }[] = [];
  for (let x of expInfo.DESIGN.positionX) {
    for (let y of expInfo.DESIGN.positionY) {
      positions.push({ X: x, Y: y });
    }
  }

  // Shuffle positions to randomize order
  positions.sort(() => Math.random() - 0.5);

  // Shuffle the colors to randomize their distribution
  dot_colors.sort(() => Math.random() - 0.5);

  for (let i = 0; i < expInfo.DESIGN.nDOTS; i++) {
    // Select a random index from the positions array
    const randomIndex = Math.floor(Math.random() * positions.length);
    const position = positions.splice(randomIndex, 1)[0]; // Remove the chosen position to avoid reuse

    let dot = {
      obj_type: "circle",
      startX: position.X,
      startY: position.Y,
      radius: 7,
      origin_center: true,
      fill_color: dot_colors[i],
      line_color: dot_colors[i],
    };
    stim_array.push(dot);
  }

  return stim_array;
};

export function create_trialList() {
  let target_conditions = {
    difficulty: expInfo.DESIGN.CONDITIONS.DIFFICULTY,
    majority: expInfo.DESIGN.CONDITIONS.MAJORITY,
  };

  let block_conditions = jsPsych.randomization.factorial(
    target_conditions,
    expInfo.DESIGN.nTRIALS,
    false
  );
  console.log(block_conditions);

  block_conditions.forEach((trial, i) => {
    if (trial.difficulty == "easy") {
      if (trial.majority == "moreBlue") {
        trial.nBlueDots = Math.ceil(
          expInfo.DESIGN.OFFSET.DIFF_EASY * expInfo.DESIGN.nDOTS
        );
        trial.nRedDots =
          expInfo.DESIGN.nDOTS -
          Math.ceil(expInfo.DESIGN.OFFSET.DIFF_EASY * expInfo.DESIGN.nDOTS);
      } else if (trial.majority == "moreRed") {
        trial.nBlueDots =
          expInfo.DESIGN.nDOTS -
          Math.ceil(expInfo.DESIGN.OFFSET.DIFF_EASY * expInfo.DESIGN.nDOTS);
        trial.nRedDots = Math.ceil(
          expInfo.DESIGN.OFFSET.DIFF_EASY * expInfo.DESIGN.nDOTS
        );
      }
    } else if (trial.difficulty == "hard") {
      if (trial.majority == "moreBlue") {
        trial.nBlueDots = Math.ceil(
          expInfo.DESIGN.OFFSET.DIFF_HARD * expInfo.DESIGN.nDOTS
        );
        trial.nRedDots =
          expInfo.DESIGN.nDOTS -
          Math.ceil(expInfo.DESIGN.OFFSET.DIFF_HARD * expInfo.DESIGN.nDOTS);
      } else if (trial.majority == "moreRed") {
        trial.nBlueDots =
          expInfo.DESIGN.nDOTS -
          Math.ceil(expInfo.DESIGN.OFFSET.DIFF_HARD * expInfo.DESIGN.nDOTS);
        trial.nRedDots = Math.ceil(
          expInfo.DESIGN.OFFSET.DIFF_HARD * expInfo.DESIGN.nDOTS
        );
      }
    }

    trial.stimulus = generateStims(trial.nBlueDots, trial.nRedDots);
    trial.trial_number = i + 1;
  });

  return block_conditions;
}
