// Third party plugins
import psychophysics from "@kurokida/jspsych-psychophysics";

/**
 * Generates screen for finger check
 * @param exp_info settings of the experiment
 * @param exp_trial experimental variables of the current trial
 * @returns screen for finger check
 */

export const screen_finger_check = function(exp_info: any, exp_trial: any) {

  // Set response keys for finger check
  if (exp_info.RESPONSE_BOX == true) {
    var resp_keys = exp_info.MATERIAL.RESPONSE_KEYS_RESPONSE_BOX;
  } else {
    var resp_keys = exp_info.MATERIAL.RESPONSE_KEYS_KEYBOARD;
  };

  // Set x coordinates for finger positions of finger image
  let ret_dots_x = [-6.6*exp_info.LAYOUT.CANW/72, 
                    -5.6*exp_info.LAYOUT.CANW/72, 
                    -4.6*exp_info.LAYOUT.CANW/72, 
                    -3.6*exp_info.LAYOUT.CANW/72, 
                    3.6*exp_info.LAYOUT.CANW/72, 
                    4.6*exp_info.LAYOUT.CANW/72, 
                    5.6*exp_info.LAYOUT.CANW/72, 
                    6.6*exp_info.LAYOUT.CANW/72];
  
  // Set y coordinates for finger positions of finger image
  let ret_dots_y = [2*exp_info.LAYOUT.CANH/36, 
                    3*exp_info.LAYOUT.CANH/36, 
                    3.6*exp_info.LAYOUT.CANH/36, 
                    3*exp_info.LAYOUT.CANH/36, 
                    3*exp_info.LAYOUT.CANH/36, 
                    3.6*exp_info.LAYOUT.CANH/36, 
                    3*exp_info.LAYOUT.CANH/36, 
                    2*exp_info.LAYOUT.CANH/36];

  // Set radius of finger dots
  let ret_dots_rad = exp_info.LAYOUT.CANH/72;
  
  // Set height of response image (fingers)
  var img_height = exp_info.LAYOUT.CANH/3.5;

  // Create response image
  const resp_img = {
    obj_type: 'image',
    file: exp_info.MATERIAL.STIMULI_PATH + exp_info.MATERIAL.RESPONSE_IMG,
    image_height: img_height,
    startX: exp_info.LAYOUT.CENTER[0],
    startY: exp_info.LAYOUT.CENTER[1]
  };

  // Create color dot for target response
  const resp_circle = {
    obj_type: 'circle',
    startX: exp_info.LAYOUT.CENTER[0] + ret_dots_x[exp_trial.finger_check_pos], 
    startY: exp_info.LAYOUT.CENTER[1] - ret_dots_y[exp_trial.finger_check_pos], 
    radius: ret_dots_rad,
    fill_color: exp_info.MATERIAL.RESPONSE_DOT_COL
  };
  
  // Create array displaying response image and dot for target finger response
  let ret_dots = [resp_img, resp_circle];
  
  // Create screen for finger check with response image response dot
  let stim_screen = {
    type: psychophysics,
    background_color: 'white',
    canvas_width: exp_info.LAYOUT.CANW,
    canvas_height: exp_info.LAYOUT.CANH,
    stimuli: ret_dots,
    response_type: 'key',
    trial_duration: exp_info.TIMING.MAX_RT,
    choices: resp_keys,
    data: { 
      screenID: 'finger_check',
      phase: exp_trial.phase,
      block: exp_trial.block,
      trial: exp_trial.trial,
      session_type: exp_trial.session_type,

      finger_check_pos: exp_trial.finger_check_pos,
      correct_resp: resp_keys[exp_trial.finger_check_pos]
    },
    on_finish: function (data) {
      // Determine accuracy of response: correct = 1, incorrect = 0
      // If response equals correct response
      if (data.response === data.correct_resp) {
        // Correct response
        data.acc = 1;

      } else { // response unequal correct response
        // Incorrect response
        data.acc = 0; 
      }; 
    }
  };

  // Return screen with response image and response dot for finger check
  return stim_screen;
};