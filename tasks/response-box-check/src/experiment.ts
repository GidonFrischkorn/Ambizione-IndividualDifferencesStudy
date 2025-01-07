/**
 * @title Response box check
 * @description Check the functionality of all response keys on the response box
 * @author Isabel Courage
 * @version 0.0.1
 *
 *
 * @assets assets/
 */

// import stylesheets (.scss or .css).
import "../styles/main.scss";

// jsPsych official plugin
import preload from "@jspsych/plugin-preload";

// Global variables
import { jsPsych } from "./jsp";
import { expInfo, varSystem } from "./settings";
import { createNewTrial } from "./trials/trialProcess";
import { generateDesign } from "./trials/blockDesign";
import { generateTrial } from "./trials/trialStims";
import { createIfTrial } from "./task-fun/createIfTrial";

// CogLabUZH functions
import { chunkTrials } from "@coglabuzh/webpsy.js";

// screens
import { welcome_screen } from "./instructions/welcome";
import { browser_screen } from "./instructions/browserCheck";
import { fullMode_screen } from "./instructions/fullScreen";
import { createSingleInstr } from "./instructions/createInstrStart";

/**
 * This function will be executed by jsPsych Builder and is expected to run the jsPsych experiment
 *
 * @type {import("jspsych-builder").RunFunction}
 */
export async function run({
  assetPaths,
  input = {},
  environment,
  title,
  version,
}) {
  // Initialize a timeline to hold the trials
  var timeline: any[] = [];

  // Preload assets
  const preload_screen = {
    type: preload,
    images: assetPaths.images,
    // audio: assetPaths.audio,
    // video: assetPaths.video,
  };

  /************************************** Instruction **************************************/

  // Create instruction timelines
  let finger_check_instr_line:any[] = [];

  // Create instruction slides for each timeline
  finger_check_instr_line.push(createSingleInstr(expInfo, '', 'Finger_Check'));
  
  /************************************** Experiment: Finger Check **************************************/

  // Create finger check timelines
  let finger_check_line:any[] = [];
  let finger_check_loop_line:any[] = [];

  // Generate design for a block of finger check task
  let finger_check_block_design = generateDesign(expInfo);

  // Create finger check trials based on the block design
  let finger_check_trials = generateTrial(expInfo, finger_check_block_design);
 
  // Chunk finger check trials into blocks
  const finger_check_chunks = chunkTrials(finger_check_trials, expInfo.DESIGN.FINGER_CHECK_NBLOCKS);

  // Loop through finger check blocks
  for (let [block, finger_check_block_trials] of finger_check_chunks.entries()) {

    // Loop through finger check trials
    for (let [trial, finger_check_trial] of finger_check_block_trials.entries()) {

      // Create new trial for finger check
      var trial_line = createNewTrial(expInfo, finger_check_trial); 
      
      // Add trial to finger check timeline
      finger_check_line = finger_check_line.concat(trial_line);

    };
  };

  // Create counter for finger check loop (2x max)
  let counter_loop_finger_check = 0;

  // Create loop timeline for finger check timeline
  let loop_finger_check = {
    timeline: finger_check_line,
    loop_function: function() {

      // Accuracy of finger check trial
      var finger_check_correct = jsPsych.data.get().filter({screenID: 'finger_check'}).last(expInfo.DESIGN.FINGER_CHECK_NTRIALS).filter({ acc : 1}).count();
      
      // Repeat finger check max 2x
      if (counter_loop_finger_check < 2) {

        // Loop if more than 1 mistake
        if (finger_check_correct < 7) {

          // Increase loop counter by 1
          counter_loop_finger_check ++;
          
          return true; // Loop

        } else { // If less/equal 1 mistake

          return false; // Stop

        }

      } else { // if loop counter >= 1 then end study 
        
        // End experiment if more than 1 mistake during repetition 2 (less than 7/8)
        if (finger_check_correct < 7) {

          varSystem.STATUS = "failed_finger";
          return jsPsych.endExperiment();

        } else { // If less/equal 1 mistake

          return false; // Stop

        };
      };
    }
  };

  // Add finger check loop to finger check timeline
  finger_check_loop_line = finger_check_loop_line.concat(loop_finger_check);

  /************************************** Procedure **************************************/

  // Push all the screen slides into timeline
  // When you want to test the experiment, you can easily comment out the screens you don't want
  timeline.push(preload_screen);
  timeline.push(welcome_screen);
  timeline.push(browser_screen);
  timeline.push(fullMode_screen);

  // Experiment screens
  timeline = timeline.concat(finger_check_instr_line);
  timeline = timeline.concat(finger_check_loop_line);

  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  return jsPsych;
}
