// JsPsych official plugin
import preload from '@jspsych/plugin-preload'; 
import exp from 'constants';

/**
 * Generate screen to preload any images that are used in the follwoing trial
 * @param exp_info settings of the experiment
 * @returns screen that prelaods the images of the trial
 */

export const screen_preload = function(exp_info: any) {

  // Create images array
  var images_trial:any = [];

  // Set images to preload for finger check
  // Add response image
  images_trial.push(exp_info.MATERIAL.STIMULI_PATH + exp_info.MATERIAL.RESPONSE_IMG);

  // Create screen to preload images
  const preload_screen = {
    type: preload,
    images: images_trial,
    show_progress_bar: false,
    max_load_time: null,
    continue_after_error: false,
    post_trial_gap: 1,
    data: {
      screenID: 'preload_trial'  
    }
  };

  // Return preload screen 
  return preload_screen;
};