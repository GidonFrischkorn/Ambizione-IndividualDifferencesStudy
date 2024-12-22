// import
import psychophysics from "@kurokida/jspsych-psychophysics";

// screen to display stimulus and color circle for encoding
export const screen_encoding_dec = function(exp_info, exp_trial, stim) {

    // define variables
    var img_height = exp_info.canH/3.5; // height of stimulus image
    
    // number
    const decl_number = {
      obj_type: 'text',
      content: `${exp_trial.number_index[stim]}`,
      font: exp_info.font_cues,
      startX: exp_info.left, // location in the canvas
      startY: exp_info.center[1],
    };
  
    
    // object
    const stim_object = {
      obj_type: 'image',
      file: exp_info.objects[Number(exp_trial.binding_objects[stim].split('object')[1])], 
      image_height: img_height,
      startX: exp_info.right,
      startY: exp_info.center[1]
    };
    
  
    // display screen with number and object
    const stim_screen = {
      type: psychophysics,
      background_color: 'white',
      canvas_width: exp_info.canW,
      canvas_height: exp_info.canH,
      stimuli: [decl_number, stim_object],
      response_type: 'key',
      choices: 'NO_KEYS',
      trial_duration: exp_info.enc_time,
      data: {
        screenID: 'encoding_dec'
      },
    };
   
    // return screen with numbers and objects 
    return stim_screen; 
  };