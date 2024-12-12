// import
import psychophysics from "@kurokida/jspsych-psychophysics";

// screen to display stimulus and color circle for encoding
export const screen_encoding_dec = function(exp_info, exp_trial, stim) {

    // define variables
    var col_circle_rad = exp_info.canH/10; // radius of color circle
    
    // color circle
    const col_circle = {
      obj_type: 'circle',
      startX: exp_info.right, // location in the canvas
      startY: exp_info.center[1],
      radius: col_circle_rad,
  
      // RGB values of color circle with target color
      fill_color: `rgb(${exp_info.cols[Number(exp_trial.binding_cols[stim].split('col')[1])][0]},
                     ${exp_info.cols[Number(exp_trial.binding_cols[stim].split('col')[1])][1]},
                     ${exp_info.cols[Number(exp_trial.binding_cols[stim].split('col')[1])][2]})`
    
    };
  
    
    // stimulus text
    const stim_text = {
      obj_type: 'text',
      content: exp_info.stim_words[stim], 
      fontSize: '60px',
      startX: exp_info.left,
      startY: exp_info.center[1]
    };
    
  
    // display screen with stimulus image and color circle
    const stim_screen = {
      type: psychophysics,
      background_color: 'white',
      canvas_width: exp_info.canW,
      canvas_height: exp_info.canH,
      stimuli: [col_circle, stim_text],
      response_type: 'key',
      choices: 'NO_KEYS',
      trial_duration: exp_info.enc_time,
      data: {
        screenID: 'encoding_dec'
      },
    };
   
    // return screen with stimulus image and color circle
    return stim_screen; 
  };