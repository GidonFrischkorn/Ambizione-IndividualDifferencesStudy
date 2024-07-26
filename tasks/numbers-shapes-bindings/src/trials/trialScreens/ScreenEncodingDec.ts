// import
import psychophysics from "@kurokida/jspsych-psychophysics";

// screen to display stimulus and color circle for encoding
export const screen_encoding_dec = function(exp_info, exp_trial, stim) {

    // define variables
    var col_circle_rad = exp_info.canH/10; // radius of color circle
    var img_height = exp_info.canH/3.5; // height of stimulus image
    
    // color circle
    const decl_number = {
      obj_type: 'text',
      content: `${exp_trial.number_index[stim]}`,
      font: exp_info.font_cues,
      startX: exp_info.right, // location in the canvas
      startY: exp_info.center[1],
    };
  
    
    // stimulus image
    const stim_shape = {
      obj_type: 'image',
      file: exp_info.shapes[Number(exp_trial.binding_shapes[stim].split('shape')[1])], 
      image_height: img_height,
      startX: exp_info.left,
      startY: exp_info.center[1]
    };
    
  
    // display screen with stimulus image and color circle
    const stim_screen = {
      type: psychophysics,
      background_color: 'white',
      canvas_width: exp_info.canW,
      canvas_height: exp_info.canH,
      stimuli: [decl_number, stim_shape],
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