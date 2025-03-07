// import all screens
import { screen_preload } from "./trialScreens/ScreenPreload";
import { screen_fix } from "./trialScreens/ScreenFixation";
import { screen_cue } from "./trialScreens/ScreenRetrievalCue";
import { screen_iti } from "./trialScreens/ScreenITI";
import { screen_isi } from "./trialScreens/ScreenISI";

import { screen_info_proc_speed } from "./trialScreens/ScreenInfoProcSpeed";
import { screen_proc_speed1_dec } from "./trialScreens/ScreenProcSpeed1Dec";
import { screen_proc_speed2_dec } from "./trialScreens/ScreenProcSpeed2Dec";
import { screen_feedback_proc_speed } from "./trialScreens/ScreenFeedbackProcSpeed";

import { screen_info_dec } from "./trialScreens/ScreenInfoDec";
import { screen_prac_setsize_dec} from "./trialScreens/ScreenPracSetsizeDec";
import { screen_encoding_dec } from "./trialScreens/ScreenEncodingDec";
import { screen_retrieval1_dec } from "./trialScreens/ScreenRetrieval1Dec";
import { screen_retrieval2_dec } from "./trialScreens/ScreenRetrieval2Dec";
import { screen_feedback_dec } from "./trialScreens/ScreenFeedbackDec";

import { screen_proc_speed_proc } from "./trialScreens/ScreenProcSpeedProc";
import { screen_info_proc } from "./trialScreens/ScreenInfoProc";
import { screen_prac_setsize_proc} from "./trialScreens/ScreenPracSetsizeProc";
import { screen_encoding_proc } from "./trialScreens/ScreenEncodingProc";
import { screen_retrieval_proc } from "./trialScreens/ScreenRetrievalProc";
import { screen_feedback_proc } from "./trialScreens/ScreenFeedbackProc";

// create object for each tria with all relevant variables

/**
 * This function creates a main object that will be displayed on the screen.
 * @param {object} exp_info Experimental variables
 * @param {array} exp_trial Array of variables for current trial
 * @param {number} is_practice Perform practice trials or not (1 = yes, 0 = no)
 * @param {number} is_proc_speed Perform proessing speed trials or not (1 = yes, 0 = no)
 */

function trialStim(exp_info, exp_trial, is_practice = 0, last_setsize = 0, task: string, box: boolean) {
  
  // define input variables for current trial
  this.exp_info = exp_info;
  this.exp_trial = exp_trial;
  this.is_practice = is_practice;
  this.task = task;
  this.last_setsize = last_setsize;
  this.response_box = box;
}

// memory phase of the object

/**
 * function used to display memory phase items
 */

trialStim.prototype.memoryPhase = function () {
  
  // create an empty array called "phase_line" to store the screens that will be presented in memory phase
  var phase_line: any[] = [];

  const preload_screen = screen_preload(this.exp_info, this.exp_trial, this.task);
  phase_line.push(preload_screen);
  
  // processing speed task
  if (this.task == "proc_speed_declarative") { // practice or experimental trials
    
    // show info
    if (this.exp_trial.trial == 0) {
      // display info for finger check
      const info_proc_speed_screen = screen_info_proc_speed(this.exp_info, this.exp_trial);
      phase_line.push(info_proc_speed_screen);
    }

    // display fixation cross
    const fix_screen = screen_fix(this.exp_info, this.exp_trial);
    phase_line.push(fix_screen);

    // display key assignment of colors
    const proc_speed1_dec_screen = screen_proc_speed1_dec(this.exp_info, this.exp_trial, 0);
    phase_line.push(proc_speed1_dec_screen);
    
  } else if (this.task == "proc_speed_procedural") { // practice or experimental trials
    
    // show info 
    if (this.exp_trial.trial == 0) {
      // display info 
      const info_proc_speed_screen = screen_info_proc_speed(this.exp_info, this.exp_trial);
      phase_line.push(info_proc_speed_screen);
    }

    // display fixation cross
    const fix_screen = screen_fix(this.exp_info, this.exp_trial);
    phase_line.push(fix_screen);
    
  } else if (this.task == "declarative") { // declarative task

    // create a screen displaying the setsize for the practice trials
    // always display for first trial
    if (this.is_practice == 1 && this.exp_trial.trial == 0) {

      const prac_setsize_dec_screen = screen_prac_setsize_dec(this.exp_info, this.exp_trial);
      phase_line.push(prac_setsize_dec_screen);
    
    // display before practice trials when the setsize increases
    } else if (this.is_practice == 1 && this.exp_trial.trial != 0 && this.exp_trial.setsize > this.last_setsize) {
      
      const prac_setsize_dec_screen = screen_prac_setsize_dec(this.exp_info, this.exp_trial);
      phase_line.push(prac_setsize_dec_screen);
      
    } 

    // show info
    if (this.is_practice == 0 && this.exp_trial.trial == 0) {
      // display info
      const info_dec_screen = screen_info_dec(this.exp_info, this.exp_trial);
      phase_line.push(info_dec_screen);
    }

    // display fixation cross
    const fix_screen = screen_fix(this.exp_info, this.exp_trial);
    phase_line.push(fix_screen);

    // loop through each stimulus 
    for (let stim = 0; stim < this.exp_trial.setsize; stim++) {

      // display encoding screen with the stimulus and color
      const encoding_dec_screen = screen_encoding_dec(this.exp_info, this.exp_trial, stim);
      phase_line.push(encoding_dec_screen);

      // isi
      const isi_screen = screen_isi(this.exp_info);
      phase_line.push(isi_screen);
    };
  } else if (this.task == "procedural") { // procedural  task
    
    // create a screen displaying the setsize for the practice trials
    // always display for first trial
    if (this.is_practice == 1 && this.exp_trial.trial == 0) {

      const prac_setsize_proc_screen = screen_prac_setsize_proc(this.exp_info, this.exp_trial);
      phase_line.push(prac_setsize_proc_screen);
    
    // display before practice trials when the setsize increases
    } else if (this.is_practice == 1 && this.exp_trial.trial != 0 && this.exp_trial.setsize > this.last_setsize) {
      
      const prac_setsize_proc_screen = screen_prac_setsize_proc(this.exp_info, this.exp_trial);
      phase_line.push(prac_setsize_proc_screen);
      
    } 

    // show info 
    if (this.is_practice == 0 && this.exp_trial.trial == 0) {
      // display info 
      const info_proc_screen = screen_info_proc(this.exp_info, this.exp_trial);
      phase_line.push(info_proc_screen);
    }

    // display fixation cross
    const fix_screen = screen_fix(this.exp_info, this.exp_trial);
    phase_line.push(fix_screen);

    // loop through each stimulus 
    for (let stim = 0; stim < this.exp_trial.setsize; stim++) {

      // display encoding screen with the stimulus and color
      const encoding_proc_screen = screen_encoding_proc(this.exp_info, this.exp_trial, stim);
      phase_line.push(encoding_proc_screen);

      // isi
      const isi_screen = screen_isi(this.exp_info);
      phase_line.push(isi_screen);
    };
    
  } 

  // Return the array of screens
  return phase_line;
  
};

// retrieval phase of the object

/**
 * function to display retrieval phase items
 */

trialStim.prototype.retrievalPhase = function () {

  // create phase_line for retieval phase
  var phase_line: any[] = [];

  if (this.task == "proc_speed_declarative") { // practice or experimental trials

     // display color together with key assignment of colors
     const proc_speed2_dec_screen = screen_proc_speed2_dec(this.exp_info, this.exp_trial, 0, this.response_box);
     phase_line.push(proc_speed2_dec_screen);
 
     // iti
     const iti_screen = screen_iti(this.exp_info);
     phase_line.push(iti_screen); 

    // show feedback about mean accuracy
    if (this.exp_trial.trial == this.exp_info.n_proc_speed_trials - 1){
      const feedback_proc_speed_screen = screen_feedback_proc_speed(this.exp_info, this.task);
      phase_line.push(feedback_proc_speed_screen);
    }

  } else if (this.task == "proc_speed_procedural") {

    // display color together with key assignment of colors
    const proc_speed_screen = screen_proc_speed_proc(this.exp_info, this.exp_trial, 0, this.response_box);
    phase_line.push(proc_speed_screen);

    // iti
    const iti_screen = screen_iti(this.exp_info);
    phase_line.push(iti_screen);

    // show feedback about mean accuracy
    if (this.exp_trial.trial == this.exp_info.n_proc_speed_trials - 1){
      const feedback_proc_speed_screen = screen_feedback_proc_speed(this.exp_info, this.task);
      phase_line.push(feedback_proc_speed_screen);
    }
    
  } else if (this.task == "declarative") { // declarative task
    
    // retrieval cue (?)
    const cue_screen = screen_cue(this.exp_info);
    phase_line.push(cue_screen);

    // isi
    const isi_screen = screen_isi(this.exp_info);
    phase_line.push(isi_screen);

    // loop through each stimulus
    for(let stim = 0; stim < this.exp_trial.setsize; stim++) {

      // display retrieval screen with the key assignment of the colors
      const retrieval_dec_screen1 = screen_retrieval1_dec(this.exp_info, this.exp_trial, stim);
      phase_line.push(retrieval_dec_screen1);

      // update the retireval screen and display the object together with the color key assignment
      const retrieval_dec_screen2 = screen_retrieval2_dec(this.exp_info, this.exp_trial, stim, this.response_box);
      phase_line.push(retrieval_dec_screen2);

      // show feedback for practice trials (correct/incorrect)
      if (this.is_practice == 1){
        const feedback_dec_screen = screen_feedback_dec(this.exp_info);
        phase_line.push(feedback_dec_screen);
      }

      // isi
      const isi_screen = screen_isi(this.exp_info);
      phase_line.push(isi_screen);
    }

    // iti
    const iti_screen = screen_iti(this.exp_info);
    phase_line.push(iti_screen);

  } else { // procedural task

    // retrieval cue (?)
    const cue_screen = screen_cue(this.exp_info);
    phase_line.push(cue_screen);

    // isi
    const isi_screen = screen_isi(this.exp_info);
    phase_line.push(isi_screen);

    // loop through each stimulus
    for(let stim = 0; stim < this.exp_trial.setsize; stim++) {

      // show retireval screen and display the object together with the color key assignment
      const retrieval_proc_screen = screen_retrieval_proc(this.exp_info, this.exp_trial, stim, this.response_box);
      phase_line.push(retrieval_proc_screen);

      // show feedback for practice trials (correct/incorrect)
      if (this.is_practice == 1){
        const feedback_proc_screen = screen_feedback_proc(this.exp_info);
        phase_line.push(feedback_proc_screen);
      }

      // isi
      const isi_screen = screen_isi(this.exp_info);
      phase_line.push(isi_screen);
    }

    // iti
    const iti_screen = screen_iti(this.exp_info);
    phase_line.push(iti_screen);

  } 

  // return screen array
  return phase_line;
};

/**
 * A function used to create a single trial.
 * @param {object} exp_info Experimental variables
 * @param {array} exp_trial Array of variables for current trial
 * @param {number} is_practice Perform practice trials or not (1 = yes, 0 = no)
 * @param {string} task Perform pro edural or declarative task
 */
export function createNewTrial(exp_info, exp_trial, is_practice = 0, last_setsize = 0, task: string, box: boolean) {
  
  // create array to store screens for trial
  var trial_line: any[] = [];

  // create a trial object
  var trial_body = new trialStim(exp_info, exp_trial, is_practice, last_setsize, task, box);

  // add memory phase of trial
  var memory_phase = trial_body.memoryPhase();
  trial_line = trial_line.concat(memory_phase);
  
  // add retrieval phase of trial
  var retrieval_phase = trial_body.retrievalPhase();
  trial_line = trial_line.concat(retrieval_phase);
  
  // return trial screens timelie and trial object
  return {trial_line, trial_body};
}