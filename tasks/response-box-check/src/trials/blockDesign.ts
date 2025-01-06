// Global variables
import { jsPsych } from "../jsp";

// CogLabUZH functions
import { random } from "@coglabuzh/webpsy.js";

/**
* This function will be create an object with the design across blocks for the different practice/experiment tasks
* @param exp_info settings of the experiment
* @param is_practice practice trials or not (1 = practice, 0 = no practice)
* @param task name of the task for which to create block design (finger_practice, recognition_practice, experiment, finger_check)
* @returns Object with the design across blocks for the different practice/experiment tasks
 */
export const generateDesign = function (exp_info:any) {
  
    // Create an array to store the design across all blocks
    let full_design:any = [];

    // Create design for finger check task (intro)
    // Set number of blocks and trials
    let n_blocks = exp_info.DESIGN.FINGER_CHECK_NBLOCKS;
    let n_trials = exp_info.DESIGN.FINGER_CHECK_NTRIALS;

    // Loop through blocks
    for (let block = 0; block < n_blocks; block ++) {

        // Set factors with different conditions that define the design within each block
        // Response positions for finger check task: 8 levels for response positions
        let finger_check_factors = {
            finger_check_pos: exp_info.MATERIAL.RESPONSE_POS
        };
        
        // Calculate number of repetitions for each condition within a block
        let n_repetitions = n_trials / exp_info.MATERIAL.RESPONSE_POS.length;

        // Create design for block and randomize order of conditions
        let design = jsPsych.randomization.factorial(finger_check_factors, n_repetitions);
        
        // Add block design to the full design array for all blocks
        full_design.push(design);
    };
          
    // Return the full design array for all blocks
    return full_design;
  
  };
  