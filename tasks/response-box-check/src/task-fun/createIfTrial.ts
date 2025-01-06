// General variables
import { jsPsych } from "../jsp";
import { generateTrial } from "../trials/trialStims";
import { createNewTrial } from "../trials/trialProcess";

// function to create if node for practice trials
/**
 * Creates an if node for experiment trials (only used under defined conditions)
 * @param exp_info settings of the experiment 
 * @param design design across all blocks with trial variables for the current task
 * @param block index indicating current block
 * @param trial index indicating current trial
 * @param exp_trial experimental variables of the current trial
 * @param task name of the task for whcih to create trials (finger_practice, recognition_practice, experiment, finger_check)
 * @param is_practice practice trials or not (1 = practice, 0 = no practice)
 * @param test_stim_pool pool of test stimuli that have been used in the experiment (without repetition trial)
 * @returns experimental variables for the if node experiment trial
 */

export const createIfTrial = function(
  exp_info: any, 
  design: any, 
  block: number,
  trial: number, 
  prev_exp_trial: any, 
  task: string, 
  is_practice: number, 
  test_stim_pool: any) {

    // Create an empty timeline array to store the timeline of the if node experimental trial
    let exp_if_line:any[] = [];

    // Create  experimental trials usinf same test response for response task and stimulus positions for memory recognition task
    let {Trial, stim_test} = generateTrial(exp_info, design[block][trial].cue_type);
    let exp_trial = Trial, test_stims_exp = stim_test;
    
    let trial_line = createNewTrial(exp_info, exp_trial[0]);

    // Add if node trial to timeline
    exp_if_line = exp_if_line.concat(trial_line);

    // Create if node for experimental trial
    let exp_if_trials = {
      timeline: exp_if_line,
      conditional_function: function () {

        // If at least one mistake in the encoding phase (3 S-R bindings)
        if(jsPsych.data.get().filter({ screenID: 'encoding2'}).last(exp_info.MATERIAL.ACC_THRESHOLD).filter({ acc : 1}).count() < exp_info.MATERIAL.ACC_THRESHOLD) {
          // Loop           
          return true;

        // If all answers are correct in encoding phase
        } else { 
          // Stop 
          return false;
        };
      }
    };

    // Return timeline of the if node experimental trial
    return exp_if_trials;
};