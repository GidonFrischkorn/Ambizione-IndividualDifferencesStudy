import imageKeyboardResponse from '@jspsych/plugin-image-keyboard-response';
import { jsPsych } from "../../jsp";

// screen to display feedback
export const screen_feedback_finger_check = function(exp_info) {
  
  // display feedback screen
    const screen_feedback = {
      type: imageKeyboardResponse,
      trial_duration: function() {
        
        // accuracy of last trial
        var last_trial_correct = jsPsych.data.get().filter({screenID: 'finger_check'}).last(1).values()[0].acc;
        
        // last trial correct
        if(last_trial_correct === 1){

          // limited time for feedback
          return exp_info.feedback_time;
        
        } else { // last trial incorrect

          // extended time to position fingers correctly
          return 10000;

        }
      },
      stimulus: function() {
        
        // accuracy of last trial
        var last_trial_correct = jsPsych.data.get().filter({screenID: 'finger_check'}).last(1).values()[0].acc;
        
        // last trial incorrect
        if(last_trial_correct === 1){

          return [] // no stimulus

        } else { // last trial incorrect
 
          // display finger allocation image
          return exp_info.image_path_finger_check + exp_info.finger_image
          
        }; 
      },
      stimulus_height: function () {
        
        // accuracy of last trial
        var last_trial_correct = jsPsych.data.get().filter({screenID: 'finger_check'}).last(1).values()[0].acc;
        
        // last trial correct
        if(last_trial_correct === 1){

          return 0 // no stimulus

        } else { // last trial incorrect

          return exp_info.canH/3.5

        }
      }, // height of stimulus image,
      prompt: function() {
        
        // accuracy of last trial
        var last_trial_correct = jsPsych.data.get().filter({screenID: 'finger_check'}).last(1).values()[0].acc;
        
        // last trial correct
        if(last_trial_correct === 1){

          // display 'correct'
          return `<p class='fb-text' style = "color: lime;" >CORRECT</p>` //,'<p style = "color: lime;" >CORRECT</p>'; // the parameter value has to be returned from the function
        
        } else { // last trial incorrect

          // display 'incorrect'
          return `<p class='fb-text' style = "color: red;" >INCORRECT <br>
                  Please position your fingers on the correct positions on the keyboard. <br>
                  Press the finger that is marked by the red circle. <br>
                  Press space bar to continue.</p>` // the parameter value has to be returned from the function
        
        }
      },
      choices: [' '], // space bar to continue
      data: { // data to be saved
        screenID: 'feedback_finger_check',
      }
  };

  // return feedback screen
  return screen_feedback
};

