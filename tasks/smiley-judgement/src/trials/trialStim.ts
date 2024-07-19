// Purpose: Generates a stimulus array based on the specified condition.

import { jsPsych } from "../jsp";
import { expInfo } from "../settings";

/**
 * Generates a stimulus array.
 * @param diff The difficulty of the task (10px or 1px difference).
 * @param fit Whether the line fits in the 2 dots or not.
 * @param location The location of the line.
 */
export const generateStims = function (diff: number, fit: number, location: number) { 

  function randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  let lineLength = 2 * randomNumber(30, 60);

  let line = {
    obj_type: 'rect', 
    origin_center: true, 
    startX: 0, // the line will be in the center of the screen
    startY: 0 + location, // if the condition is top, the line will be 20 px above the line, otherwise it will be 20 px below the line
    width: lineLength, // the length of the line
    height: expInfo.STIMULI.HEIGHT, // the height of the objects
    fill_color: expInfo.STIMULI.objectCOLOR, // black line
  }

  let dot_left = {
    obj_type: 'rect', 
    origin_center: true,
    startX: 0 - ((lineLength + 10)/2) - diff * fit,
    startY: 0 - location,
    width: expInfo.STIMULI.dotWIDTH,
    height: expInfo.STIMULI.HEIGHT,
    fill_color: expInfo.STIMULI.objectCOLOR, // black dot
  }

  let dot_right = {
    obj_type: 'rect', 
    origin_center: true,
    startX: 0 + ((lineLength+10)/2) + diff * fit,
    startY: 0 - location,
    width: expInfo.STIMULI.dotWIDTH,
    height: expInfo.STIMULI.HEIGHT,
    fill_color: expInfo.STIMULI.objectCOLOR, // black dot
  }

  let stim_array: any[] = [line, dot_left, dot_right];
  
  return stim_array;
};


export function create_trialList () {
  let target_conditions = {
      difficulty: expInfo.DESIGN.CONDITIONS.DIFFICULTY,
      fit: expInfo.DESIGN.CONDITIONS.FIT,
      location: expInfo.DESIGN.CONDITIONS.LOCATION,
  };
  
  let block_conditions = jsPsych.randomization.factorial(target_conditions, expInfo.DESIGN.nTRIALS, false);
  console.log(block_conditions);

  block_conditions.forEach((trial, i) => {
    if(trial.difficulty == "easy") {
        trial.offset_diff = expInfo.STIMULI.OFFSET_DIFF[0];
    } else if (trial.difficulty == "hard") {
      trial.offset_diff = expInfo.STIMULI.OFFSET_DIFF[1];
    }

    if(trial.fit == "fit") {
        trial.offset_fit = 1;
    } else if (trial.fit == "nofit") {
        trial.offset_fit = -1;
    }

    if(trial.location == "top") {
      trial.offset_location = expInfo.STIMULI.OFFSET_LOCATION;
    } else if (trial.location == "bottom") {
      trial.offset_location = -expInfo.STIMULI.OFFSET_LOCATION;
    }

    trial.stimulus = generateStims(trial.offset_diff, trial.offset_fit, trial.offset_location);
    trial.trial_number = i + 1;
});

  return block_conditions;
};