// Purpose: Generates a stimulus array based on the specified condition.

import { expInfo } from "../settings";
import { jsPsych } from "../jsp";
import { CIElab } from "../task-fun/CIElab";
import { helpers } from "../task-fun/helpers";
import { random, generateArray } from "@coglabuzh/webpsy.js";

/**
 * Generates a stimulus array based on the specified condition.
 * @param nBlueDots - number of blue dots
 * @param nRedDots - number of red dots
 */
export const generateStims = function (
  set_size: number,
  location: string = "circle",
  patch_size: number = 10,
  patch_type: string = "circle",
  location_size: number = 100
) {
  var stim_array: any[] = [];

  // Sample array of colors with length set size
  const color_angles: number[] = generateArray.number(0, 360, 1);
  var trial_colors = random.sample(color_angles, set_size);

  // Sample array of locations with length set size
  var trial_locations = random.sample(
    generateArray.number(0, 360, 1),
    set_size
  );
  var grid_dims = Math.floor((2 * location_size) / (patch_size + 5));
  var grid_X = random.sample(generateArray.number(0, grid_dims, 1), set_size);
  var grid_Y = random.sample(generateArray.number(0, grid_dims, 1), set_size);

  for (let i = 0; i < set_size; i++) {
    // Select a random position for the color patch
    var position = {
      X: 0,
      Y: 0,
    };

    if (location == "circle") {
      position.X =
        Math.cos((trial_locations[i] * Math.PI) / 180) * location_size;
      position.Y =
        Math.sin((trial_locations[i] * Math.PI) / 180) * location_size;
    } else if (location == "rect") {
      position.X = grid_X[i] * (patch_size + 5) - location_size;
      position.Y = grid_Y[i] * (patch_size + 5) - location_size;
    } else {
      new Error("Invalid location type");
    }

    if (patch_type == "circle") {
      var circle_patch = {
        obj_type: patch_type,
        startX: position.X,
        startY: position.Y,
        radius: patch_size,
        origin_center: true,
        fill_color: CIElab.angle_to_rgb(trial_colors[i]),
        line_color: CIElab.angle_to_rgb(trial_colors[i]),
      };

      // Add the patch to the stimulus array
      stim_array.push(circle_patch);
    } else if (patch_type == "rect") {
      var rect_patch = {
        obj_type: patch_type,
        startX: position.X,
        startY: position.Y,
        width: patch_size,
        height: patch_size,
        origin_center: true,
        fill_color: CIElab.angle_to_rgb(trial_colors[i]),
        line_color: CIElab.angle_to_rgb(trial_colors[i]),
      };

      // Add the patch to the stimulus array
      stim_array.push(rect_patch);
    } else {
      new Error("Invalid patch type");
    }
  }

  // Return the stimulus array
  return stim_array;
};

export const generateRetrievalCue = function (cued_stim, memory_stims) {
  for (let i = 0; i < memory_stims.length; i++) {
    if (i == cued_stim) {
      memory_stims[i].line_color = "black";
      memory_stims[i].fill_color = "grey";
    } else {
      memory_stims[i].line_color = "black";
      memory_stims[i].fill_color = "transparent";
    }
  }

  return memory_stims;
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
