// Purpose: Generates a stimulus array based on the specified condition.

// CogLabUZH functions
import { random } from "@coglabuzh/webpsy.js";

// Task functions
import { removeItems } from "../task-fun/basicFunctions";
import exp from "constants";

/**
 * Generates an Object with all variables necessary for current trial of the specific task.
 * @param exp_info settings of the experiment
 * @param design design across all blocks with trial variables for the current task
 * @returns Object with the trial variables for the current task
 */

export const generateTrial = function (
  info:any, 
  design:any) {

  // Set variables
  let exp_info = info;
  let block_design = design;
  
/************************************** Finger Check **************************************/
 
  // Create trials for finger check task
  // Define arrays for variables
  let trial_num:any = [],
      block_num:any = [],
      phase:any = [],
      finger_check_pos:any = [];

  // Set number of blocks and trials
  let n_blocks = exp_info.DESIGN.FINGER_CHECK_NBLOCKS;
  let n_trials = exp_info.DESIGN.FINGER_CHECK_NTRIALS;

  // Set trial type for session (condition from Jatos, between-subject)
  const trial_type = exp_info.DESIGN.SESSION_TYPE;
  
  // Loop through blocks
  for(let block = 0; block < n_blocks; block ++) {

    // Loop through trials
    for (let trial_block = 0; trial_block < n_trials; trial_block ++) {

      // Define finger check position (conditions from block design)
      finger_check_pos.push(block_design[block][trial_block].finger_check_pos); 

      // Define block, trial and phase
      block_num.push(block);
      trial_num.push(trial_block);
      phase.push('finger_check');
  
    };
  };

  // Create trial object with all variables
  const Trial = trial_num.map((trial_num, index) => {

    return Object.assign({}, {
    
      block: block_num[index],
      trial: trial_num,
      phase: phase[index],
      session_type: trial_type,
      finger_check_pos: finger_check_pos[index]
    
    });
  });

  // Return trials object
  return Trial;

};
