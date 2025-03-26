// Purpose: Functions for generating stimuli and creating elements

// Task screens
import { screen_preload } from "./trialScreens/screenPreload";
import { screen_isi } from "./trialScreens/screenISI";
import { screen_info_finger_check } from "./trialScreens/screenInfoFingerCheck";
import { screen_finger_check } from "./trialScreens/screenFingerCheck";
import { screen_feedback_finger_check } from "./trialScreens/screenFeedbackFingerCheck";

/**
 * Generates the body to which to add the timeline for a single trial.
 * @param exp_info settings of the experiment
 * @param exp_trial experimental variables of the current trial
 * @returns timeline of the current trial
 */

function trialStims(exp_info, exp_trial) {
  
  // Set input variables for current trial
  this.exp_info = exp_info;
  this.exp_trial = exp_trial;
}

/**
 * Generates the timeline for the encoding phase of the current trial
 */

trialStims.prototype.encodingPhase = function () {
  
  // Create timeline array to store the screens that will be presented in the encoding phase
  let phase_line_encode: any[] = [];

  // Preload any images that are used in the current trial and add it to the encoding phase timeline
  const preload_screen = screen_preload(this.exp_info);
  phase_line_encode.push(preload_screen);

/************************************** Finger Check **************************************/
 
  // Create encoding phase timeline of finger practice task
  // Display info screen for finger check before first trial and add screen to the encoding phase
  if (this.exp_trial.trial == 0) {
    const info_finger_check_screen = screen_info_finger_check(this.exp_info);
    phase_line_encode.push(info_finger_check_screen);
  };

  // Display screen for finger check (image of hand with marked fingers) and add screen to the encoding phase timeline
  const finger_check_screen = screen_finger_check(this.exp_info, this.exp_trial);
  phase_line_encode.push(finger_check_screen);

  // Return the array of screens for encoding phase
  return phase_line_encode;
  
};

/**
 * Generates the timeline for the test phase of the current trial
 */

trialStims.prototype.testPhase = function () {

  // Create timeline array to store the screens that will be presented in the test phase
  let phase_line_test: any[] = [];

/************************************** Finger Check **************************************/
  
  // Create test phase timeline of finger check task      
  // Display feedback screen for finger check (correct/incorrect) and add screen to the test phase timeline
  const isi_screen1 = screen_isi(this.exp_info);

  const feedback_finger_check_screen = screen_feedback_finger_check(this.exp_info);
  phase_line_test.push(isi_screen1);

  phase_line_test.push(feedback_finger_check_screen);

  // Display ISI screen and add screen to the test phase timeline
  const isi_screen = screen_isi(this.exp_info);
  phase_line_test.push(isi_screen);

  // Return the array of screens for test phase
  return phase_line_test;
};

/**
 * A function used to create a single trial.
 * @param exp_info settings of the experiment
 * @param exp_trial experimental variables of the current trial
 * @returns An array containing all the slides of a trial.
 */

export function createNewTrial(exp_info:any, exp_trial:any) {
  
  // Create timeline array to store screens for trial timeline
  let trial_line: any[] = [];

  // Create a trial body for encoding and test phase  
  let trial_body = new trialStims(exp_info, exp_trial);

  // Create and add encoding phase of trial to trial timeline
  let encoding_phase = trial_body.encodingPhase();
  trial_line = trial_line.concat(encoding_phase);
  
  // Create test phase of trial
  let test_phase = trial_body.testPhase();

  // Add test phase to trial timeline for finger practice phase 1 and finger check tasks
  trial_line = trial_line.concat(test_phase);
    
  // Return trial screens timeline
  return trial_line; 
};

