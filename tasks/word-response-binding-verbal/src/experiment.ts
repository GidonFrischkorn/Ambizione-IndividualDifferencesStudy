/**
 * @title Word Response Binding Task Verbal
 * @description Verbal bindings (word-responses)
 * @version ProcBinding_Verbal_final2
 *
 * @assets assets/
 */

// import

import "../styles/main.scss"; // stylesheets (.scss or .css)
import preload from '@jspsych/plugin-preload'; // plugins from jspsych
import survey from "@jspsych/plugin-survey";

import { MakeExpInfo, varOnline, varSystem} from "./settings"; // settings
import { jsPsych } from "./jsp";
import { createInstr, createSingleInstr } from "./instructions/createInstrStart";
import { createNewTrial } from "./trials/trialProcess";
import { MakeTrial } from "./trials/trialStims";
import { chunkTrials } from "@coglabuzh/webpsy.js";
import { calculateMods } from "./task-fun/calculateMods";
import { createIfNode } from "./task-fun/createIfNode";
import { endExpPractice} from "./task-fun/endExperiment";

import { welcome_screen } from "./instructions/welcome";
import { participant_code, extract_code } from "./survey/participant_code";
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
  var task_condition = 'procedural';

  // define experimental variables
  const exp_info = MakeExpInfo(task_condition);
 
  var timeline:any[] = [];
  
  // preload assets
  
  const preload_screen = {
    type: preload,
    images: assetPaths.images,
    // audio: assetPaths.audio,
    // video: assetPaths.video,
  };

  /************************************** Participant Code ******************************/
  const id_page = participant_code("de");
  const id_survey = {
    type: survey,
    survey_json: {
      showQuestionNumbers: false,
      title:
        "Teilnehmer Code: Word Response Binding Task",
      pages: [id_page],
    },
    on_finish: function (data) {
      // Get responses from questionnaires
      // if the welcome screen is not included: const search_object = jsPsych.data.get().values()[1].response
      const search_object = jsPsych.data.get().values()[1].response
      console.log(search_object);

      // Extract the participant code from the survey responses
      let participant_id = extract_code(search_object);
      console.log(participant_id);
      jsPsych.data.addProperties({participant_id: participant_id});
    }
  };

  /************************************** Experiment **************************************/

  // define whether to run practice and processing speed task (0 = no, 1 = yes)
  var is_practice = 1;
  var is_proc_speed = 0;

  // define response box usage
  var response_box = varSystem.RESPONSE_BOX;
  
  // create timeline variables
  let proc_speed_instr_line_task:any[] = [];
  let proc_speed_line_task:any[] = [];
  let prac_instr_line_task:any[] = [];
  let prac_line_task:any[] = [];
  let prac_line_all_task:any[] = [];
  let exp_instr_line_task:any[] = [];
  let exp_line_task:any[] = [];
  let end_instr_line_task:any[] = [];

  
  /************************************** Processing Speed Task **************************************/

  if (is_proc_speed == 1) { // processing speed task

    var slides_num_proc_speed = exp_info.n_proc_speed_slides_proc;

    // create instructions for processing speed task
    proc_speed_instr_line_task.push(createInstr(exp_info, 'Processing_Speed_Instructions_' + task_condition, 1, slides_num_proc_speed, response_box))
    proc_speed_instr_line_task.push(createSingleInstr(exp_info, 'General_Instructions', 'TaskStartProcSpeed_' + task_condition, response_box))

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
        var {trial_line, trial_body} = createNewTrial(exp_info, proc_speed_trial, is_prac_local, last_setsize_local, "proc_speed_" + task_condition, response_box);
        
        // add trial to processing speed timeline
        proc_speed_line_task = proc_speed_line_task.concat(trial_line);
        
      };
    };
  }

  // create instructions practice
  // define slide numbers for declarative and procedural task
  
  var slides_num_prac = exp_info.n_prac_slides_proc;

  prac_instr_line_task.push(createInstr(exp_info, 'Instructions_' + task_condition, 1, slides_num_prac, response_box));
  prac_instr_line_task.push(createSingleInstr(exp_info, 'General_Instructions', 'PracStart_' + task_condition, response_box));

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
    console.log(Trial);
  
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
          var {trial_line, trial_body} = createNewTrial(exp_info, prac_trial, is_prac_local, last_setsize, task_condition, response_box);
          
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
                  
                    endExpPractice(varOnline.CODES.FAILED_OTHERS);

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
          var {trial_line, trial_body} = createNewTrial(exp_info, prac_trial, is_prac_local, last_setsize, task_condition, response_box);
          
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
  exp_instr_line_task.push(createSingleInstr(exp_info, 'General_Instructions', 'TaskStart_' + task_condition, response_box));

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
      var {trial_line, trial_body} = createNewTrial(exp_info, exp_trial, is_prac_local_task, last_setsize_local_task, task_condition, response_box);
      exp_line_task = exp_line_task.concat(trial_line);

    };

    // display break instructions
    if (block + 1 != exp_info.n_exp_blocks && calculateMods(block + 1, exp_info.n_blocks_break) == 0) {

      var break_screen = createSingleInstr(exp_info, 'General_Instructions', 'Break_' + task_condition, response_box);
      exp_line_task.push(break_screen);

    };
  };

  // create end instructions
  end_instr_line_task.push(createSingleInstr(exp_info, 'General_Instructions', 'End', response_box));

  /************************************** Procedure **************************************/

  // push all the screen slides into timeline
  timeline.push(preload_screen);
  timeline.push(id_survey);
  // timeline.push(welcome_screen);
  timeline.push(browser_screen);
  timeline.push(fullMode_screen);
  timeline = timeline.concat(proc_speed_instr_line_task);
  timeline = timeline.concat(proc_speed_line_task);
  timeline = timeline.concat(prac_line_all_task);
  timeline = timeline.concat(exp_instr_line_task);
  timeline = timeline.concat(exp_line_task);
  timeline = timeline.concat(end_instr_line_task);
  // NO SURVEY for lab experiment
  // timeline.push(question_serious_participation);
  // timeline.push(question_cheat_participation);
  // timeline.push(problems);
  // timeline.push(conditional_problems);
  // timeline.push(end_screen);
  
  // run the experiment
  await jsPsych.run(timeline);
  
  // return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  return jsPsych;
}
