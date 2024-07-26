// import
import psychophysics from "@kurokida/jspsych-psychophysics";

// processing speed task screen 1
export const screen_proc_speed1_dec = function(exp_info, exp_trial, stim) {
  
   // define variables
    /*
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
    var ret_dots_y = [(2*exp_info.canH/36)+30, 
                      (3*exp_info.canH/36)+30, 
                      (3.6*exp_info.canH/36)+30, 
                      (3*exp_info.canH/36)+30, 
                      (3*exp_info.canH/36)+30, 
                      (3.6*exp_info.canH/36)+30, 
                      (3*exp_info.canH/36)+30, 
                      (2*exp_info.canH/36)+30];
*/
    // New x coordinates of the retrieval color dots
var ret_dots_x = [(-7.7 * exp_info.canW / 72) - 8, 
                  (-6.53 * exp_info.canW / 72) - 6, 
                  (-5.37 * exp_info.canW / 72), 
                  (-4.2 * exp_info.canW / 72) + 4, 
                  ( 4.2 * exp_info.canW / 72) - 4, 
                  ( 5.37 * exp_info.canW / 72), 
                  ( 6.53 * exp_info.canH / 36) + 6, 
                  ( 7.7 * exp_info.canH / 36) + 8];

// New y coordinates of the retrieval color dots
var ret_dots_y = [(2.33 * exp_info.canH / 36) + 35, 
(3.5 * exp_info.canH / 36) + 35, 
(4.2 * exp_info.canH / 36) + 35, 
(3.5 * exp_info.canH / 36) + 35, 
(3.5 * exp_info.canH / 36) + 35, 
(4.2 * exp_info.canH / 36) + 35, 
(3.5 * exp_info.canH / 36) + 35, 
(2.33 * exp_info.canH / 36) + 35];

// radius of retrieval color dots
    //var ret_dots_rad = exp_info.canH/72;
    var ret_shape_height = (exp_info.canH/72)*5;
    var ret_shape_width = (exp_info.canH/72)*5;

    // radius of color circle
    var col_circle_rad = exp_info.canH/10;
    // height of the response image
    var img_height = exp_info.canH/3;

    // color circle
    const shape = {
      obj_type: 'image',
      file: exp_info.shapes[Number(exp_trial.proc_speed_shape.split('shape')[1])],
      startX: exp_info.center[0], // location in the canvas
      startY: exp_info.top,
      image_height: img_height
      //radius: col_circle_rad,
  
      // RGB values of color circle with target color
      /*fill_color: `rgb(${exp_info.cols[Number(exp_trial.proc_speed_col.split('col')[1])][0]}, 
                      ${exp_info.cols[Number(exp_trial.proc_speed_col.split('col')[1])][1]}, 
                      ${exp_info.cols[Number(exp_trial.proc_speed_col.split('col')[1])][2]})`*/
    };
  
    // response image
    const resp_img = {
      obj_type: 'image',
      file: exp_info.path_response + exp_info.response_image,
      image_height: img_height,
      startX: exp_info.center[0],
      startY: exp_info.bottom
    };
  
    // target color dot response for retrieval
    const resp_shape = {
      obj_type: 'image',
      file: exp_info.shapes[Number(exp_trial.proc_speed_shape.split('shape')[1])],
      startX: exp_info.center[0] + ret_dots_x[exp_trial.proc_speed_pos], // location in the canvas
      startY: exp_info.bottom - ret_dots_y[exp_trial.proc_speed_pos], 
      image_height: ret_shape_height
      //radius: ret_dots_rad,
  
      // RGB values of corresponding color
      /*fill_color: `rgb(${exp_info.shapes[Number(exp_trial.proc_speed_shape.split('col')[1])][0]},
                      ${exp_info.shapes[Number(exp_trial.proc_speed_shape.split('col')[1])][1]}, 
                      ${exp_info.shapes[Number(exp_trial.proc_speed_shape.split('col')[1])][2]})`*/
    };
    
    // create array displaying color dots on response image for retrieval
    let ret_shapes = [shape, resp_img, resp_shape]; // target color dot on top of response image
    
    // other dot responses for retrieval
    for (let dot = 0; dot < (exp_info.pos.length - 1); dot++){
      var resp_shapes = {
        obj_type: 'image',
        file: exp_info.shapes[Number(exp_trial.ret_other_shape[dot].split('shape')[1])],
        startX: exp_info.center[0] + ret_dots_x[exp_trial.ret_other_shape_pos[dot]], // location in the canvas
        startY: exp_info.bottom - ret_dots_y[exp_trial.ret_other_shape_pos[dot]], 
        image_height: ret_shape_height
        //radius: ret_dots_rad,
  
        // RGB values of corresponding color
        /*fill_color: `rgb(${exp_info.cols[Number(exp_trial.ret_other_col[dot].split('col')[1])][0]}, 
                        ${exp_info.cols[Number(exp_trial.ret_other_col[dot].split('col')[1])][1]}, 
                        ${exp_info.cols[Number(exp_trial.ret_other_col[dot].split('col')[1])][2]})`*/
      };
    
      // add each color dot response
      ret_shapes.push(resp_shapes);
    }
    
    // display screen with response image and color dots
    let stim_screen = {
      type: psychophysics,
      background_color: 'white',
      canvas_width: exp_info.canW,
      canvas_height: exp_info.canH,
      stimuli: ret_shapes,
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