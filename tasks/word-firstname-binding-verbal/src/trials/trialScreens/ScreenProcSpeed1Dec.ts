// import
import psychophysics from "@kurokida/jspsych-psychophysics";

// processing speed task screen 1
export const screen_proc_speed1_dec = function(exp_info, exp_trial, stim) {
  
    // define variables
    // x coordinates of the retrieval names
    var ret_dots_x = [-7*exp_info.canW/72, 
                      -6*exp_info.canW/72, 
                      -4.6*exp_info.canW/72, 
                      -3.2*exp_info.canW/72, 
                      3.2*exp_info.canW/72, 
                      4.6*exp_info.canW/72, 
                      6*exp_info.canW/72, 
                      7*exp_info.canW/72];
  
    // y coordinates of the retrieval names
    var ret_dots_y = [3*exp_info.canH/36, 
                      4*exp_info.canH/36, 
                      4.6*exp_info.canH/36, 
                      4*exp_info.canH/36, 
                      4*exp_info.canH/36, 
                      4.6*exp_info.canH/36, 
                      4*exp_info.canH/36, 
                      3*exp_info.canH/36];
  
    // height of the response image
    var img_height = exp_info.canH/3.5;
  
    // response image
    const resp_img = {
      obj_type: 'image',
      file: exp_info.image_path + exp_info.response_image,
      image_height: img_height,
      startX: exp_info.center[0],
      startY: exp_info.bottom
    };
  
    // target name response for retrieval
    const resp_first_text = {
      obj_type: 'text',
      content: exp_info.firsts[Number(exp_trial.proc_speed_firsts.split('name')[1])],
      fontSize: '17px',
      startX: exp_info.center[0] + ret_dots_x[exp_trial.proc_speed_pos], // location in the canvas
      startY: exp_info.bottom - ret_dots_y[exp_trial.proc_speed_pos]
  
    };
    
    // create array displaying names on response image for retrieval
    let ret_dots = [resp_img, resp_first_text]; // target names on top of response image
    
    // other dot responses for retrieval
    for (let dot = 0; dot < (exp_info.pos.length - 1); dot++){
      var resp_first_dots = {
        obj_type: 'text',
        content: exp_info.firsts[Number(exp_trial.ret_other_firsts[dot].split('name')[1])],
        fontSize: '17px',
        startX: exp_info.center[0] + ret_dots_x[exp_trial.ret_other_first_pos[dot]], // location in the canvas
        startY: exp_info.bottom - ret_dots_y[exp_trial.ret_other_first_pos[dot]] 
             
      };
    
      // add each name response
      ret_dots.push(resp_first_dots);
    }
    
    // display screen with response image and names
    let stim_screen = {
      type: psychophysics,
      background_color: 'white',
      canvas_width: exp_info.canW,
      canvas_height: exp_info.canH,
      stimuli: ret_dots,
      response_type: 'key',
      trial_duration: exp_info.resp_stim_time,
      choices: 'NO_KEYS',
      remain_canvas: true,
      data: {
        screenID: 'proc_speed1_dec',
      }
    };
  
    // return screen with response image and names
    return stim_screen;
  };