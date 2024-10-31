/**
 * @title Object Response Binding Task Visual
 * @description Visual bindings (objects-responses)
 * @version 0.0.1 
 *
 * @assets assets/
 */

// import

import "../styles/main.scss"; // stylesheets (.scss or .css)
import preload from '@jspsych/plugin-preload'; // plugins from jspsych
import psychophysics from "@kurokida/jspsych-psychophysics"; // import psychophysics plugin
import { MakeExpInfo, varOnline} from "./settings"; // settings
import { jsPsych } from "./jsp";
import { setConditions, finishCondition } from "./task-fun/setConditions";
import { createInstr, createSingleInstr } from "./instructions/createInstrStart";
import { createNewTrial } from "./trials/trialProcess";
import { MakeTrial } from "./trials/trialStims";
import { chunkTrials } from "@coglabuzh/webpsy.js";
import { calculateMods } from "./task-fun/calculateMods";
import { createIfNode } from "./task-fun/createIfNode";
import { endExpPractice, endExpFingerCheck} from "./task-fun/endExperiment";
import { random } from "@coglabuzh/webpsy.js";

import { welcome_screen } from "./instructions/welcome";
import { browser_screen } from "./instructions/browserCheck";
import { fullMode_screen } from "./instructions/fullScreen";
import { end_screen } from "./instructions/end";

import { problems, conditional_problems } from "./survey/problems";
import { question_cheat_participation } from "./survey/question_cheat";
import { question_serious_participation } from "./survey/question_serious_participation";

/**
 * This function will be executed by jsPsych Builder and is expected to run the jsPsych experiment
 * @type {import("jspsych-builder").RunFunction}
 */
export async function run({ assetPaths, input = {}, environment, title, version }) {
  
  /************************************** Preparation **************************************/
  
  // define possible conditions (procedural)
  var condition_pool = ['procedural'];

  // retrieve color condition from jatos batch session or randomly sample if jatos is not used
  if (varOnline.RUN_JATOS) { // jatos
    var task_condition = setConditions(condition_pool);   
  } else { // no jatos
    var task_condition = random.sample(condition_pool, 1)[0];
  };

  // define experimental variables
  const exp_info = MakeExpInfo(task_condition, condition_pool);
 
  var timeline:any[] = [];
  
  // preload assets
  const preload_screen = {
    type: preload,
    images: assetPaths.images,
    // audio: assetPaths.audio,
    // video: assetPaths.video,
  };

  /************************************** Experiment **************************************/

 // define whether to run practice and processing speed task (0 = no, 1 = yes)
 var is_practice = 1;
 var is_finger_check = 1;
 var is_proc_speed = 1;
 
  // create timeline variables
  let finger_check_line_speed_task:any[] = [];
  let finger_check_loop_line_speed_task:any = [];
  let finger_check_line_task:any[] = [];
  let finger_check_loop_line_task:any = [];
  let proc_speed_instr_line_task:any[] = [];
  let proc_speed_line_task:any[] = [];
  let prac_instr_line_task:any[] = [];
  let prac_line_task:any[] = [];
  let prac_line_all_task:any[] = [];
  let exp_instr_line_task:any[] = [];
  let exp_line_task:any[] = [];
  let end_instr_line_task:any[] = [];

  /************************************** Finger Check Tasks **************************************/

  if (is_finger_check == 1) {

    // define local variables: practice = no
    let is_prac_local = 0;

    ////////////////////////////////////////// Finger Check Processing Speed //////////////////////////////////////////
    
    // create finger check trials
    var {Trial, stim_idx} = MakeTrial(exp_info, is_prac_local, "finger_check"); // no stim_index
    var finger_check_trials_speed_task = Trial, stim_index_check = stim_idx;
   
    // chunk finger check trials into blocks
    const finger_check_speed_task_chunks = chunkTrials(finger_check_trials_speed_task, exp_info.n_finger_check_blocks);

    // loop through finger check blocks
    for (var [block, finger_check_block_trials] of finger_check_speed_task_chunks.entries()) {

      // define first setsize for showing setsize instructions for practice trials
      var last_setsize = 0;

      // loop through finger check trials
      for (let [trial, finger_check_trial] of finger_check_block_trials.entries()) {

        // create new trial
        var {trial_line, trial_body} = createNewTrial(exp_info, finger_check_trial, is_prac_local, last_setsize, "finger_check_speed_" + task_condition);
        
        // add trial to processing speed timeline
        finger_check_line_speed_task = finger_check_line_speed_task.concat(trial_line);

      };
    };

    // counter for finger check loop (repeat 2x)
    var counter_loop_finger_check_speed_task = 0;

    // create loop timeline for finger check timeline
    var loop_finger_check_speed_task = {
      timeline: finger_check_line_speed_task,
      loop_function: function() {

        // accuracy of finger check trial
        var finger_check_correct_speed_task = jsPsych.data.get().filter({screenID: 'finger_check', task: task_condition + '_proc_speed'}).last(exp_info.n_finger_check_trials).filter({ acc : 1}).count();
        
        // repeat 2x
        if (counter_loop_finger_check_speed_task < 2) {

          // loop if more than 1 mistake
          if (finger_check_correct_speed_task < 7) {

            counter_loop_finger_check_speed_task ++;
            
            return true; // loop

          } else {

            return false; // stop

          }

        } else { // counter_loop >= 1 then end study and redirect to Prolific 
          
          // loop if more than 1 mistake
          if (finger_check_correct_speed_task < 7) {

            endExpFingerCheck(varOnline.FAIL_CODE);

          } else { // finger_check_correct >= 7

            return false; // stop

          };
        };
      }
    };

    // add finger check loop to finger check timeline
    finger_check_loop_line_speed_task = finger_check_loop_line_speed_task.concat(loop_finger_check_speed_task);
    
    ////////////////////////////////////////// Finger Check Task //////////////////////////////////////////
    
    // create finger check trials
    var {Trial, stim_idx} = MakeTrial(exp_info, is_prac_local, "finger_check"); // no stim_index
    var finger_check_trials = Trial, stim_index_check = stim_idx;

    // chunk finger check trials into blocks
    const finger_check_chunks = chunkTrials(finger_check_trials, exp_info.n_finger_check_blocks);

    // loop through finger check blocks
    for (var [block, finger_check_block_trials] of finger_check_chunks.entries()) {

      // define first setsize for showing setsize instructions for practice trials
      var last_setsize = 0;

      // loop through finger check trials
      for (let [trial, finger_check_trial] of finger_check_block_trials.entries()) {

        // create new trial
        var {trial_line, trial_body} = createNewTrial(exp_info, finger_check_trial, is_prac_local, last_setsize, "finger_check_" + task_condition);
        
        // add trial to processing speed timeline
        finger_check_line_task = finger_check_line_task.concat(trial_line);

      };
    };

    // counter for finger check loop (repeat 2x)
    var counter_loop_finger_check_task = 0;

    // create loop timeline for finger check timeline
    var loop_finger_check_task = {
      timeline: finger_check_line_task,
      loop_function: function() {

        // accuracy of finger check trial
        var finger_check_correct_task = jsPsych.data.get().filter({screenID: 'finger_check', task: task_condition}).last(exp_info.n_finger_check_trials).filter({ acc : 1}).count();
        
        // repeat 2x
        if (counter_loop_finger_check_task < 2) {

          // loop if more than 1 mistake
          if (finger_check_correct_task < 7) {

            counter_loop_finger_check_task ++;
            
            return true; // loop

          } else {

            return false; // stop

          }

        } else { // counter_loop >= 1 then end study and redirect to Prolific 
          
          // loop if more than 1 mistake
          if (finger_check_correct_task < 7) {

            endExpFingerCheck(varOnline.FAIL_CODE);

          } else { // finger_check_correct >= 7

            return false; // stop

          };
        };
      }
    };

    // add finger check loop to finger check timeline
    finger_check_loop_line_task = finger_check_loop_line_task.concat(loop_finger_check_task);
  };

  /************************************** Processing Speed Task **************************************/

  if (is_proc_speed == 1) { // processing speed task

    if (task_condition == "declarative") {

      var slides_num_proc_speed = exp_info.n_proc_speed_slides_dec

    } else { // procedural

      var slides_num_proc_speed = exp_info.n_proc_speed_slides_proc

    }

    // create instructions for processing speed task
    proc_speed_instr_line_task.push(createInstr(exp_info, 'Processing_Speed_Instructions_' + task_condition, 1, slides_num_proc_speed))
    proc_speed_instr_line_task.push(createSingleInstr(exp_info, 'General_Instructions', 'TaskStartProcSpeed_' + task_condition))

    // define local variables: practice = no, last setsize = 0
    let is_prac_local = 0;
    let last_setsize_local = 0;

    // create processing speed trials
    var {Trial, stim_idx} = MakeTrial(exp_info, is_prac_local, "proc_speed_" + task_condition); // no stim_index
    var proc_speed_trials = Trial, stim_index_proc_speed = stim_idx;
    
    // chunk processing speed trials into blocks
    const proc_speed_chunks = chunkTrials(proc_speed_trials, exp_info.n_proc_speed_blocks);

    // loop through processing speed blocks
    for (var [block, proc_speed_block_trials] of proc_speed_chunks.entries()) {

      // loop through processing speed trials
      for (let [trial, proc_speed_trial] of proc_speed_block_trials.entries()) {

        // create new trial
        var {trial_line, trial_body} = createNewTrial(exp_info, proc_speed_trial, is_prac_local, last_setsize_local, "proc_speed_" + task_condition);
        
        // add trial to processing speed timeline
        proc_speed_line_task = proc_speed_line_task.concat(trial_line);
        
      };
    };
  }

  // create instructions practice
  // define slide numbers for declarative and procedural task
  if (task_condition == "declarative") {

    var slides_num_prac = exp_info.n_prac_slides_dec;

  } else { // procedural

    var slides_num_prac = exp_info.n_prac_slides_proc;

  }

  prac_instr_line_task.push(createInstr(exp_info, 'Instructions_' + task_condition, 1, slides_num_prac));
  prac_instr_line_task.push(createSingleInstr(exp_info, 'General_Instructions', 'PracStart_' + task_condition));

  // add instruction to practice timeline with setsize 2 for loop
  prac_line_task = prac_line_task.concat(prac_instr_line_task); 

  /************************************** Declarative or Procedural Practice **************************************/

  // practice
  if (is_practice === 1) { 
    
    // define local variables: practice = yes
    let is_prac_local = 1;
    
    // create practice trials
    var {Trial, stim_idx} = MakeTrial(exp_info, is_prac_local, task_condition); // no stim_index
    var prac_trials_task = Trial, stim_index_prac_task = stim_idx;
  
    // chunk practice trials into blocks
    const prac_chunks = chunkTrials(prac_trials_task, exp_info.n_prac_blocks);
    
    // loop through practice blocks
    for (var [block, prac_block_trials] of prac_chunks.entries()) {

      // define first setsize for showing setsize instructions for practice trials
      var last_setsize = 0;

      // loop through practice trials
      for (let [trial, prac_trial] of prac_block_trials.entries()) {
      
        // first 2 practice trials
        if (trial < 2) { 

          // create first 2 trials
          var {trial_line, trial_body} = createNewTrial(exp_info, prac_trial, is_prac_local, last_setsize, task_condition);
          
          // add to practice timeline
          prac_line_task = prac_line_task.concat(trial_line);                

          // create loop for first 2 practice trials at end of 2nd trial
          if (trial == 1) {

            var {prac_if_trials, stim_index_prac_if} = createIfNode(exp_info, is_prac_local, last_setsize, task_condition);
            var prac_if_trials1_task = prac_if_trials, stim_index_prac_if1_task = stim_index_prac_if;

            var {prac_if_trials, stim_index_prac_if} = createIfNode(exp_info, is_prac_local, last_setsize, task_condition);
            var prac_if_trials2_task = prac_if_trials, stim_index_prac_if2_task = stim_index_prac_if;
            
            var {prac_if_trials, stim_index_prac_if} = createIfNode(exp_info, is_prac_local, last_setsize, task_condition);
            var prac_if_trials3_task = prac_if_trials, stim_index_prac_if3_task = stim_index_prac_if;

            var {prac_if_trials, stim_index_prac_if} = createIfNode(exp_info, is_prac_local, last_setsize, task_condition);
            var prac_if_trials4_task = prac_if_trials, stim_index_prac_if4_task = stim_index_prac_if;

            var {prac_if_trials, stim_index_prac_if} = createIfNode(exp_info, is_prac_local, last_setsize, task_condition);
            var prac_if_trials5_task = prac_if_trials, stim_index_prac_if5_task = stim_index_prac_if;

            // add loop to practice timeline
            prac_line_task = prac_line_task.concat(prac_if_trials1_task);
            prac_line_task = prac_line_task.concat(prac_if_trials2_task);
            prac_line_task = prac_line_task.concat(prac_if_trials3_task);
            prac_line_task = prac_line_task.concat(prac_if_trials4_task);
            prac_line_task = prac_line_task.concat(prac_if_trials5_task);

            // allow to repeat instructions and set size 2 practice and
            // continue experiment if practice with set size 2 are not passed after 5 loops after the second time

            //define loop counter to allow max 1 repetition of instructions and set size 2 practice
            var counter_loop_task = 0;

            var loop_prac_line_all_task = {
              timeline: prac_line_task,
              loop_function: function() {

                // define retrieval ID for declarative and procedural task
                if (task_condition == "declarative") {
                  var retrieval_ID = "retrieval2_dec"
                } else { // procedural
                  var retrieval_ID = "retrieval_proc"
                }
        
                // number of correct answers from last practice if conditional
                // condition only fulfilled when the last practice if trials 5 are still not correct (at least 4/4 correct answers)               
                var correct_last_practice_if = jsPsych.data.get().filter({ screenID: retrieval_ID }).last(4).filter({ acc : 1}).count();

                // repeat 1x
                if (counter_loop_task < 1) {

                  // loop if at least 1 mistake
                  if (correct_last_practice_if < 4) {

                    // increase counter by 1
                    counter_loop_task ++;

                    return true; // loop

                  } else {

                    return false; // stop

                  }

                } else { // counter_loop_task >= 1 then end study and redirect to Prolific 

                  if (correct_last_practice_if < 4) {
                    
                    endExpPractice(varOnline.FAIL_CODE);

                  } else { //correct_last_practice_if = 4

                    return false; // stop

                  }
                
                }
              }
            };
            
            prac_line_all_task = prac_line_all_task.concat(loop_prac_line_all_task);
          }

        } else { // remaining practice trials

          // create remaining trials
          var {trial_line, trial_body} = createNewTrial(exp_info, prac_trial, is_prac_local, last_setsize, task_condition);
          
          // add remaining practice trials to practice timeline
          prac_line_all_task = prac_line_all_task.concat(trial_line);

        };
      
      // update last setsize
      last_setsize = prac_trial.setsize;
    
      };
    };    
  };

  /************************************** Declarative or Procedural Experimental Task **************************************/

  // experiment
  // create experiment instructions
  exp_instr_line_task.push(createSingleInstr(exp_info, 'General_Instructions', 'TaskStart_' + task_condition));

  // define local variables: practice = no and last setsize = 0
  let is_prac_local_task = 0;
  let last_setsize_local_task = 0;

  // create experiment trials
  var {Trial, stim_idx} = MakeTrial(exp_info, is_prac_local_task, task_condition); // use stim_index from practice
  let exp_trials_task = Trial, stim_index_exp_task = stim_idx;
  
  // chunk experiment trials into blocks
  const exp_chunks_task = chunkTrials(exp_trials_task, exp_info.n_exp_blocks);
  
  // loop through experiment blocks
  for (var [block, exp_block_trials] of exp_chunks_task.entries()) {

    // loop through experiment trials
    for (let [trial, exp_trial] of exp_block_trials.entries()) {
      var {trial_line, trial_body} = createNewTrial(exp_info, exp_trial, is_prac_local_task, last_setsize_local_task, task_condition);
      exp_line_task = exp_line_task.concat(trial_line);

    };

    // display break instructions
    if (block + 1 != exp_info.n_exp_blocks && calculateMods(block + 1, exp_info.n_blocks_break) == 0) {

      var break_screen = createSingleInstr(exp_info, 'General_Instructions', 'Break_' + task_condition);
      exp_line_task.push(break_screen);

    };
  };

  // create end instructions
  end_instr_line_task.push(createSingleInstr(exp_info, 'General_Instructions', 'End'));

  /************************************** Procedure **************************************/

  // push all the screen slides into timeline
  timeline.push(preload_screen);
  timeline.push(welcome_screen);
  timeline.push(browser_screen);
  timeline.push(fullMode_screen);
  timeline = timeline.concat(proc_speed_instr_line_task);
  timeline = timeline.concat(finger_check_loop_line_speed_task); 
  timeline = timeline.concat(proc_speed_line_task);
  timeline = timeline.concat(prac_line_all_task); 
  timeline = timeline.concat(exp_instr_line_task);
  timeline = timeline.concat(finger_check_loop_line_task);
  timeline = timeline.concat(exp_line_task);
  timeline = timeline.concat(end_instr_line_task);
  timeline.push(question_serious_participation);
  timeline.push(question_cheat_participation);
  timeline.push(problems);
  timeline.push(conditional_problems);
  timeline.push(end_screen);
  
  // run the experiment
  await jsPsych.run(timeline);
  
  // finish jatos batch session
  if (varOnline.RUN_JATOS) {
    finishCondition(task_condition)
  }

  // return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  return jsPsych;

}
