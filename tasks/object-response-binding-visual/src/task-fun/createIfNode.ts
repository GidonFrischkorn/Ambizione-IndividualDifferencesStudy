// import
import { jsPsych } from "../jsp";
import { MakeTrial } from "../trials/trialStims";
import { createNewTrial } from "../trials/trialProcess";

// function to create if node for practice trials
export const createIfNode = function(exp_info, is_prac, prev_setsize, task){

    // define array for if node for practice trials
    let prac_if_line:any[] = [];

    // define name for retrieval screen based on task (declarative or procedural)
    if (task == "declarative") {

      var ret_screen = "retrieval2_dec";

    } else if (task == "procedural") {

      var ret_screen = "retrieval_proc";
      
    }

    // create practice trials for if node 1
    var {Trial, stim_idx} = MakeTrial(exp_info, is_prac, task); // stim_index
    var prac_trials_if = Trial, stim_index_prac_if = stim_idx;
    
    var {trial_line, trial_body} = createNewTrial(exp_info, prac_trials_if[0], is_prac, prev_setsize, task);
    prac_if_line = prac_if_line.concat(trial_line); 
    var {trial_line, trial_body} = createNewTrial(exp_info, prac_trials_if[1], is_prac, 2, task); // last setsize = 2
    prac_if_line = prac_if_line.concat(trial_line);

    // create if node for practice trials
    var prac_if_trials = {
        timeline: prac_if_line,
        conditional_function: function () {

          // at least 1 trial is incorrect
          if(jsPsych.data.get().filter({ screenID: `${ret_screen}`}).last(4).filter({ acc : 1}).count() < 4) {

            // loop           
            return true;

          } else { // both trials are correct

            // stop loop
            return false;

          };
        }
      };

      return {prac_if_trials, stim_index_prac_if};
}