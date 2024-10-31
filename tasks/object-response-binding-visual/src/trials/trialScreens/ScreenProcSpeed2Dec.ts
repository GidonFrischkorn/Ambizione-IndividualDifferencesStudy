// import
import psychophysics from "@kurokida/jspsych-psychophysics";

// processing speed task screen 2
export const screen_proc_speed2_dec = function(exp_info, exp_trial, stim) {

    // define variables
    // x coordinates of the retrieval color dots
    var ret_dots_x = [-6.6*exp_info.canW/72, 
                      -5.6*exp_info.canW/72, 
                      -4.6*exp_info.canW/72, 
                      -3.6*exp_info.canW/72, 
                      3.6*exp_info.canW/72, 
                      4.6*exp_info.canW/72, 
                      5.6*exp_info.canH/36, 
                      6.6*exp_info.canH/36];
    
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
    // radius of color circle
    var col_circle_rad = exp_info.canH/10;
    // height of the response image
    var img_height = exp_info.canH/3.5;
    
    // color circle
    const col_circle = {
      obj_type: 'circle',
      startX: exp_info.center[0], // location in the canvas
      startY: exp_info.top,
      radius: col_circle_rad,
  
      // RGB values of color circle with target color
      fill_color: `rgb(${exp_info.cols[Number(exp_trial.proc_speed_col.split('col')[1])][0]}, 
                      ${exp_info.cols[Number(exp_trial.proc_speed_col.split('col')[1])][1]}, 
                      ${exp_info.cols[Number(exp_trial.proc_speed_col.split('col')[1])][2]})`
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
      startX: exp_info.center[0] + ret_dots_x[exp_trial.proc_speed_pos], // location in the canvas
      startY: exp_info.bottom - ret_dots_y[exp_trial.proc_speed_pos], 
      radius: ret_dots_rad,
  
      // RGB values of target color dot
      fill_color: `rgb(${exp_info.cols[Number(exp_trial.proc_speed_col.split('col')[1])][0]}, 
                      ${exp_info.cols[Number(exp_trial.proc_speed_col.split('col')[1])][1]}, 
                      ${exp_info.cols[Number(exp_trial.proc_speed_col.split('col')[1])][2]})` 
    };
    
    // create array displaying color dots on response image and color circle for retrieval
    let ret_dots = [col_circle, resp_img, resp_col_circle]; // target color dot on top of response image and color circle
    
    // other dot responses for retrieval
    for (let dot = 0; dot < (exp_info.pos.length - 1); dot++){
      var resp_col_dots = {
        obj_type: 'circle',
        startX: exp_info.center[0] + ret_dots_x[exp_trial.ret_other_col_pos[dot]], // location in the canvas
        startY: exp_info.bottom - ret_dots_y[exp_trial.ret_other_col_pos[dot]], 
        radius: ret_dots_rad,
        fill_color: `rgb(${exp_info.cols[Number(exp_trial.ret_other_col[dot].split('col')[1])][0]} , ${exp_info.cols[Number(exp_trial.ret_other_col[dot].split('col')[1])][1]}, ${exp_info.cols[Number(exp_trial.ret_other_col[dot].split('col')[1])][2]})` //ret_dots_cols[dot]
      };
  
      // add each color dot response
      ret_dots.push(resp_col_dots);
    }
    
    // display screen with response image, color dots and color circle
    let stim_screen = {
      type: psychophysics,
      background_color: 'white',
      canvas_width: exp_info.canW,
      canvas_height: exp_info.canH,
      stimuli: ret_dots,
      response_type: 'key',
      trial_duration: exp_info.max_rt,
      choices: exp_info.resp_keys,
      data: { // data to be saved
        screenID: 'proc_speed2_dec',
        task: 'declarative',
       
        col_dist: exp_info.col_dist,
        group_dist: exp_info.group_dist,
        start_cols: exp_info.cols_start,
        cols: exp_info.cols,
        cols_angles: exp_info.cols_angles,
  
        procedure: exp_trial.phase,
        blockID: exp_trial.block,
        trialID: exp_trial.trial,
  
        ret_order: exp_trial.retrieval_order,
        proc_speed_col_name: exp_trial.proc_speed_col,
        proc_speed_col_angle: exp_trial.proc_speed_col_angle,
        proc_speed_col: exp_info.cols[Number(exp_trial.proc_speed_col.split('col')[1])],
        proc_speed_col_pos: exp_trial.proc_speed_pos,
  
        ret_other_cols: exp_trial.ret_other_col,
        ret_other_cols_angles: exp_trial.ret_other_cols_angles,
        ret_other_cols_pos: exp_trial.ret_other_col_pos,
        
        correct_response: exp_info.resp_keys[exp_trial.proc_speed_pos]
      },
      on_finish: function (data) {

        // response equals correct response
        if (data.response === data.correct_response) {
  
          // create variable accuracy == 1 and response in degress of color
          data.acc = 1;
          data.response_angles = data.proc_speed_col_angle;
          data.response_name = data.proc_speed_col_name;
  
        } else { // response unequal correct response
  
          // create variable accuracy == 0 and response in degress of color
          data.acc = 0;
          data.response_angles = data.ret_other_cols_angles[data.ret_other_cols_pos.indexOf(exp_info.resp_keys.indexOf(data.response))];
          data.response_name = data.ret_other_cols[data.ret_other_cols_pos.indexOf(exp_info.resp_keys.indexOf(data.response))];          
        
        }; 
      }
    };
  
    // return screen with response image, color dots and color circle
    return stim_screen;
  };