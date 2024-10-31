import htmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';
import { jsPsych } from "../../jsp";

// screen to display feedback
export const screen_feedback_dec = function(exp_info) {
  
  // display feedback screen
  const screen_feedback = {
    type: htmlKeyboardResponse,
    trial_duration: exp_info.feedback_time,
    choices: 'NO_KEYS',
    stimulus: function() {

      // accuracy of last trial
      var last_trial_correct = jsPsych.data.get().filter({screenID: 'retrieval2_dec'}).last(1).values()[0].acc;
      
      // last trial correct
      if(last_trial_correct === 1){

        // display 'correct'
        return `<p class='fb-text' style = "color: lime;" >CORRECT</p>` //,'<p style = "color: lime;" >CORRECT</p>'; // the parameter value has to be returned from the function
      
      } else { // last trial incorrect

        // display 'incorrect'
        return `<p class='fb-text' style = "color: red;" >INCORRECT</p>` // the parameter value has to be returned from the function
      
      }
    },
    data: { // data to be saved
      screenID: 'feedback_dec'
    }
  };

  // return feedback screen
  return screen_feedback;
};

