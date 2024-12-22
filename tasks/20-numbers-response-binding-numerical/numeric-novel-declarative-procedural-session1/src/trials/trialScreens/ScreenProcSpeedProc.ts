// import
import psychophysics from "@kurokida/jspsych-psychophysics";

// processing speed task screen 2
export const screen_proc_speed_proc = function(exp_info, exp_trial, stim) {

    // define variables
    // x coordinates of the retrieval red dots
    var ret_dots_x = [-6.6*exp_info.canW/72, 
                      -5.6*exp_info.canW/72, 
                      -4.6*exp_info.canW/72, 
                      -3.6*exp_info.canW/72, 
                      3.6*exp_info.canW/72, 
                      4.6*exp_info.canW/72, 
                      5.6*exp_info.canH/36, 
                      6.6*exp_info.canH/36];
    
    // y coordinates of the retrieval red dots
    var ret_dots_y = [2*exp_info.canH/36, 
                      3*exp_info.canH/36, 
                      3.6*exp_info.canH/36, 
                      3*exp_info.canH/36, 
                      3*exp_info.canH/36, 
                      3.6*exp_info.canH/36, 
                      3*exp_info.canH/36, 
                      2*exp_info.canH/36];
  
    // radius of retrieval red dot 
    var ret_dots_rad = exp_info.canH/72;
    // height of the response image
    var img_height = exp_info.canH/3.5;
  
    // response image
    const resp_img = {
      obj_type: 'image',
      file: exp_info.image_path + exp_info.response_image,
      image_height: img_height,
      startX: exp_info.center[0],
      startY: exp_info.center[1]
    };
  
    // target red dot response for retrieval
    const resp_col_circle = {
      obj_type: 'circle',
      startX: exp_info.center[0] + ret_dots_x[exp_trial.proc_speed_pos], // location in the canvas
      startY: exp_info.center[1] - ret_dots_y[exp_trial.proc_speed_pos], 
      radius: ret_dots_rad,
      fill_color: exp_info.response_dot_col
    };
    
    // display screen with response image and red dot 
    let stim_screen = {
      type: psychophysics,
      background_color: 'white',
      canvas_width: exp_info.canW,
      canvas_height: exp_info.canH,
      stimuli: [resp_img, resp_col_circle],
      response_type: 'key',
      trial_duration: exp_info.max_rt,
      choices: exp_info.resp_keys,
      data: { // data to be saved
        screenID: 'proc_speed_proc',
        task: 'procedural',

        procedure: exp_trial.phase,
        blockID: exp_trial.block,
        trialID: exp_trial.trial,
  
        ret_order: exp_trial.retrieval_order,
        proc_speed_pos: exp_trial.proc_speed_pos,        
        correct_response: exp_info.resp_keys[exp_trial.proc_speed_pos]
      },
      on_finish: function (data) {

        //save position of response
        data.response_pos = exp_info.resp_keys.indexOf(data.response);

        // response equals correct response
        if (data.response === data.correct_response) {
  
          // create variable accuracy == 1 
          data.acc = 1;
  
        } else { // response unequal correct response
  
          // create variable accuracy == 0 
          data.acc = 0;
          
        }; 
      }
    };
  
    // return screen with response image and red dot 
    return stim_screen;
  };