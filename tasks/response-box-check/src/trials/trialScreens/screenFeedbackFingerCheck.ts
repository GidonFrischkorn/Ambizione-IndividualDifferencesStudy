// JsPsych official plugin
import htmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';

// Global variables
import { jsPsych } from "../../jsp";

/**
 * Generates screen for feedback for finger check
 * @param exp_info settings of the experiment
 * @returns screen for feedback for finger check
 */

export const screen_feedback_finger_check = function(exp_info: any) {

  // Set response keys for finger check
  if (exp_info.RESPONSE_BOX == true) {
    var resp_keys = exp_info.MATERIAL.RESPONSE_KEYS_RESPONSE_BOX;
  } else {
    var resp_keys = exp_info.MATERIAL.RESPONSE_KEYS_KEYBOARD;
  };
  
  // Create feedback screen for finger check
  const screen_feedback = {
    type: htmlKeyboardResponse,
    trial_duration: function() {
      
      // Get accuracy of last trial
      let last_trial_correct = jsPsych.data.get().filter({screenID: 'finger_check'}).last(1).values()[0].acc;
      
      // If last trial correct
      if (last_trial_correct === 1) {
        // Display time for correct answer
        return exp_info.TIMING.FEEDBACK_CORRECT;

      // If last trial incorrect
      } else { // last trial incorrect
        // Display time for incorrect answer
        return exp_info.TIMING.FEEDBACK_INCORRECT;
      };
    },
    stimulus: function() {
      
      // Get accuracy of last trial
      let last_trial_correct = jsPsych.data.get().filter({screenID: 'finger_check'}).last(1).values()[0].acc;
      
      // If last trial correct
      if(last_trial_correct === 1){
        // Display text 'correct'
        return `<p class = fb-text style = "color: lime;" >RICHTIG</p>`;

      // If last trial incorrect
      } else { 
        // Display text 'incorrect'
        return  `<p class = fb-text style = "color: red;" >FALSCH<br>
                Bitte legen Sie Ihre Finger auf die korrekten Positionen auf der Antwortbox. <br>
                Drücken Sie den rot markierten Finger. <br>
                Bitte drücken Sie irgendeine Taste um weiterzumachen.</p>`; 
      };
    }, 
    choices: resp_keys, 
    data: { 
      screenID: 'feedback_finger_check',
    }
  };

  // Return feedback screen for finger check
  return screen_feedback;
};

