// import
import psychophysics from "@kurokida/jspsych-psychophysics";

// processing speed task screen 1
export const screen_proc_speed1_dec = function(exp_info, exp_trial, stim) {
  
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
  
    // radius of retrieval color dots
    var ret_dots_rad = exp_info.canH/72;
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
  
    // target color dot response for retrieval
    const resp_col_circle = {
      obj_type: 'circle',
      startX: exp_info.center[0] + ret_dots_x[exp_trial.proc_speed_pos], // location in the canvas
      startY: exp_info.bottom - ret_dots_y[exp_trial.proc_speed_pos], 
      radius: ret_dots_rad,
  
      // RGB values of corresponding color
      fill_color: `rgb(${exp_info.cols[Number(exp_trial.proc_speed_col.split('col')[1])][0]},
                      ${exp_info.cols[Number(exp_trial.proc_speed_col.split('col')[1])][1]}, 
                      ${exp_info.cols[Number(exp_trial.proc_speed_col.split('col')[1])][2]})` 
    };
    
    // create array displaying color dots on response image for retrieval
    let ret_dots = [resp_img, resp_col_circle]; // target color dot on top of response image
    
    // other dot responses for retrieval
    for (let dot = 0; dot < (exp_info.pos.length - 1); dot++){
      var resp_col_dots = {
        obj_type: 'circle',
        startX: exp_info.center[0] + ret_dots_x[exp_trial.ret_other_col_pos[dot]], // location in the canvas
        startY: exp_info.bottom - ret_dots_y[exp_trial.ret_other_col_pos[dot]], 
        radius: ret_dots_rad,
  
        // RGB values of corresponding color
        fill_color: `rgb(${exp_info.cols[Number(exp_trial.ret_other_col[dot].split('col')[1])][0]}, 
                        ${exp_info.cols[Number(exp_trial.ret_other_col[dot].split('col')[1])][1]}, 
                        ${exp_info.cols[Number(exp_trial.ret_other_col[dot].split('col')[1])][2]})`
      };
    
      // add each color dot response
      ret_dots.push(resp_col_dots);
    }
    
    // display screen with response image and color dots
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
  
    // return screen with response image and color dots
    return stim_screen;
  };