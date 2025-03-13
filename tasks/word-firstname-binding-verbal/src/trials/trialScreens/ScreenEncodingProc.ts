// import
import psychophysics from "@kurokida/jspsych-psychophysics";

// screen to display stimulus and color circle for encoding
export const screen_encoding_proc = function(exp_info, exp_trial, stim) {

    // define variables
    // x coordinates of the retrieval color dots
    var ret_dots_x = [-6.6*exp_info.canW/72, 
                      -5.6*exp_info.canW/72, 
                      -4.6*exp_info.canW/72, 
                      -3.6*exp_info.canW/72, 
                      3.6*exp_info.canW/72, 
                      4.6*exp_info.canW/72, 
                      5.6*exp_info.canW/72, 
                      6.6*exp_info.canW/72];
    
    // y coordinates of the retrieval color dots
    var ret_dots_y = [2*exp_info.canH/36, 
                      3*exp_info.canH/36, 
                      3.6*exp_info.canH/36, 
                      3*exp_info.canH/36, 
                      3*exp_info.canH/36, 
                      3.6*exp_info.canH/36, 
                      3*exp_info.canH/36, 
                      2*exp_info.canH/36];
    
    var ret_dots_rad = exp_info.canH/72; // radius of retrieval color dots
    var img_height = exp_info.canH/3.5; // height of stimulus image
  
    // stimulus word
    const stim_text = {
      obj_type: 'text',
      content: exp_trial.stim_index_word[stim],
      fontSize: '60px',
      startX: exp_info.center[0],
      startY: exp_info.top
    };
  
    // response image
    const resp_img = {
      obj_type: 'image',
      file: exp_info.image_path + exp_info.response_image,
      image_height: img_height,
      startX: exp_info.center[0],
      startY: exp_info.bottom
    };

    // target color dot response for retrieval
    const resp_col_circle = {
      obj_type: 'circle',
      startX: exp_info.center[0] + ret_dots_x[exp_trial.binding_pos[stim]], // location in the canvas
      startY: exp_info.bottom - ret_dots_y[exp_trial.binding_pos[stim]], 
      radius: ret_dots_rad,
  
      //RGB values of target color dot
      fill_color: exp_info.response_dot_col
    };

    // display screen with stimulus word and response
    const stim_screen = {
      type: psychophysics,
      background_color: 'white',
      canvas_width: exp_info.canW,
      canvas_height: exp_info.canH,
      stimuli: [stim_text, resp_img, resp_col_circle], 
      response_type: 'key',
      choices: 'NO_KEYS',
      trial_duration: exp_info.enc_time,
      data: {
        screenID: 'encoding_proc'
      }
    };
  
    // return screen with stimulus word and response
    return stim_screen;
  };