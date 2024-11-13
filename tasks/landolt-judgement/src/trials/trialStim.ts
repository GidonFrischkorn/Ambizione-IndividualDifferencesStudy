// Purpose: Generates a stimulus array based on the specified condition.

import exp from "constants";
import { jsPsych } from "../jsp";
import { expInfo } from "../settings";

/**
 * Generates a stimulus array.
 * @param diff The difficulty of the task (10px or 1px difference).
 * @param fit Whether the line fits in the 2 dots or not.
 * @param location The location of the line.
 */
export const generateStims = function (
  diff: number,
  bigL: number,
  bigR: number,
  location_right: number,
  location_left: number
) {
  let ladolt_rect = {
    obj_type: "rect",
    origin_center: true, // the ladolt like stimulus will be in the center of the screen
    width: expInfo.STIMULI.landolt_width, // the width of the ladolt like stimulus
    height: expInfo.STIMULI.landolt_height, // the height of the ladolt like stimulus
    line_color: expInfo.STIMULI.ladolt_color, // the border of the rectangle is black
    line_width: expInfo.STIMULI.ladolt_line, // the border of the rectangle is 20px
    fill_color: expInfo.STIMULI.ladolt_fillcolor, // the inside of the rectangle is white (same as the background)
  };

  let gap_height =
    expInfo.STIMULI.gap_height[0] +
    Math.floor(Math.random() * (expInfo.STIMULI.gap_height[1] + 1));

  const right_gap = {
    obj_type: "rect",
    origin_center: true,
    startX: expInfo.STIMULI.landolt_width / 2,
    startY: 0 + location_right,
    width: expInfo.STIMULI.gap_width,
    height: gap_height + diff * bigR,
    fill_color: expInfo.STIMULI.gap_color,
  };

  const left_gap = {
    obj_type: "rect",
    origin_center: true,
    startX: -expInfo.STIMULI.landolt_width / 2,
    startY: 0 + location_left,
    width: expInfo.STIMULI.gap_width,
    height: gap_height + diff * bigL,
    fill_color: expInfo.STIMULI.gap_color,
  };

  let stim_array: any[] = [ladolt_rect, right_gap, left_gap];

  return stim_array;
};

export function create_trialList() {
  let target_conditions = {
    difficulty: expInfo.DESIGN.CONDITIONS.DIFFICULTY,
    bigger: expInfo.DESIGN.CONDITIONS.BIGGERGAP,
    location: expInfo.DESIGN.CONDITIONS.LOCATION,
  };

  let block_conditions = jsPsych.randomization.factorial(
    target_conditions,
    expInfo.DESIGN.nTRIALS,
    false
  );
  console.log(block_conditions);

  block_conditions.forEach((trial, i) => {
    if (trial.difficulty == "easy") {
      trial.offset_diff = expInfo.STIMULI.OFFSET_DIFF[0];
    } else if (trial.difficulty == "hard") {
      trial.offset_diff = expInfo.STIMULI.OFFSET_DIFF[1];
    }

    if (trial.bigger == "left") {
      trial.offset_bigL = expInfo.STIMULI.OFFSET_BIG[1];
      trial.offset_bigR = expInfo.STIMULI.OFFSET_BIG[0];
    } else if (trial.bigger == "right") {
      trial.offset_bigL = expInfo.STIMULI.OFFSET_BIG[0];
      trial.offset_bigR = expInfo.STIMULI.OFFSET_BIG[1];
    }

    if (trial.location == "leftup") {
      trial.offset_location_right = expInfo.STIMULI.OFFSET_LOCATION;
      trial.offset_location_left = -expInfo.STIMULI.OFFSET_LOCATION;
    } else if (trial.location == "leftdown") {
      trial.offset_location_right = -expInfo.STIMULI.OFFSET_LOCATION;
      trial.offset_location_left = expInfo.STIMULI.OFFSET_LOCATION;
    }

    trial.stimulus = generateStims(
      trial.offset_diff,
      trial.offset_bigL,
      trial.offset_bigR,
      trial.offset_location_right,
      trial.offset_location_left
    );
    trial.trial_number = i + 1;
  });

  return block_conditions;
}
