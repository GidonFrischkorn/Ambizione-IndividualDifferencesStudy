// import
import psychophysics from "@kurokida/jspsych-psychophysics";

// screen 1 to display response image and color dots for retrieval
export const screen_retrieval1_dec = function(exp_info, exp_trial, stim){

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
    var ret_dots_y = [(2*exp_info.canH/36)+30, 
                      (3*exp_info.canH/36)+30, 
                      (3.6*exp_info.canH/36)+30, 
                      (3*exp_info.canH/36)+30, 
                      (3*exp_info.canH/36)+30, 
                      (3.6*exp_info.canH/36)+30, 
                      (3*exp_info.canH/36)+30, 
                      (2*exp_info.canH/36)+30];
  
    // radius of retrieval color dots
    var ret_shape_height = (exp_info.canH/72)*4;
    var ret_shape_width = (exp_info.canH/72)*4;

    // height of the response image
    var img_height = exp_info.canH/3.5;
  
    // stimulus image
    const stim_number = {
      obj_type: 'text',
      content: `${exp_trial.number_index[stim]}`, 
      font: exp_info.font_cues,
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
  
    // target shape response for retrieval
    const resp_shape = {
      obj_type: 'image',
      file: exp_info.shapes[Number(exp_trial.binding_shapes[stim].split('shape')[1])],
      startX: exp_info.center[0] + ret_dots_x[exp_trial.ret_binding_shapes_pos[stim]], // location in the canvas
      startY: exp_info.bottom - ret_dots_y[exp_trial.ret_binding_shapes_pos[stim]], 
      image_height: ret_shape_height
      //radius: ret_dots_rad,
  
      // RGB values of target color dot
      /*fill_color: `rgb(${exp_info.cols[Number(exp_trial.ret_binding_cols[stim].split('col')[1])][0]}, 
                    ${exp_info.cols[Number(exp_trial.ret_binding_cols[stim].split('col')[1])][1]}, 
                    ${exp_info.cols[Number(exp_trial.ret_binding_cols[stim].split('col')[1])][2]})`*/ 
          
    };
    
    // create array displaying color dots on response image for retrieval
    let ret_shapes = [stim_number, resp_img, resp_shape]
    
    // loop through other dot responses for retrieval
    for (let dot = 0; dot < (exp_info.pos.length - 1); dot++){
      
      // other dot responses for retrieval
      var resp_shapes = {
        obj_type: 'image',
        file: exp_info.shapes[Number(exp_trial.ret_other_shape[stim][dot].split('shape')[1])],
        startX: exp_info.center[0] + ret_dots_x[exp_trial.ret_other_shape_pos[stim][dot]], // location in the canvas
        startY: exp_info.bottom - ret_dots_y[exp_trial.ret_other_shape_pos[stim][dot]], 
        image_height: ret_shape_height,
        //radius: ret_dots_rad,
  
        // RGB values of corresponding color
        /*fill_color: `rgb(${exp_info.cols[Number(exp_trial.ret_other_col[stim][dot].split('col')[1])][0]}, 
                      ${exp_info.cols[Number(exp_trial.ret_other_col[stim][dot].split('col')[1])][1]}, 
                      ${exp_info.cols[Number(exp_trial.ret_other_col[stim][dot].split('col')[1])][2]})`*/
        
      };
  
      // add each color dot response
      ret_shapes.push(resp_shapes);
    };
    
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
        screenID: 'retrieval1_dec',    
      }
    };
  
    // return screen with response image and color dots
    return stim_screen
  };
  