import htmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';
import { jsPsych } from "../../jsp";
import { varOnline } from "../../settings";
import { endExpProcSpeed } from '../../task-fun/endExperiment'; 

// screen to display feedback
export const screen_feedback_proc_speed = function(exp_info, task) {
  
  if (task == 'proc_speed_declarative') { // declarative task

    var screen = 'proc_speed2_dec'

  } else { // 'proc_speed_procedural'

    var screen = 'proc_speed_proc'

  }

  // display feedback screen
  const screen_feedback = {
    type: htmlKeyboardResponse,
    stimulus: function() {

      // accuracy of proc_speed trials
      var proc_speed_correct = jsPsych.data.get().filter({screenID: screen}).last(exp_info.n_proc_speed_trials).filter({ acc : 1}).count();
      var accuracy = Math.round(proc_speed_correct / exp_info.n_proc_speed_trials * 100)
  
      // display accuracy
      return `<p class='fb-text'> Sie haben in ${accuracy}% der Durchgänge richtig geantwortet.</p>
      <p class='fb-text'> Drücken Sie eine beliebige Taste, um fortzufahren. </p>`; 
      
    },
    choices: 'ALL_KEYS',
    data: { // data to be saved
      screenID: 'feedback_proc_speed_' + task
    },
    on_finish: function(data) {

      // accuracy of proc_speed trials
      var proc_speed_correct = jsPsych.data.get().filter({screenID: screen}).last(exp_info.n_proc_speed_trials).filter({ acc : 1}).count();
      var accuracy = Math.round(proc_speed_correct / exp_info.n_proc_speed_trials * 100)
  
      // end experiment if accuracy is below 75%
      if (accuracy < 75) {
        endExpProcSpeed("FAIL");
      }; 
    }
  };

  // return feedback screen
  return screen_feedback;
};

