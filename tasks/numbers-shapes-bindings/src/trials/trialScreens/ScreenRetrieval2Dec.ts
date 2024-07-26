// import
import psychophysics from "@kurokida/jspsych-psychophysics";
import { varSystem } from "../../settings";

// screen 2 to display response image, color dots and color circle for retrieval
export const screen_retrieval2_dec = function(exp_info, exp_trial, stim){
    
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
  
    // target color dot response for retrieval
    const resp_shape = {
      obj_type: 'image',
      file: exp_info.shapes[Number(exp_trial.binding_shapes[stim].split('shape')[1])],
      startX: exp_info.center[0] + ret_dots_x[exp_trial.ret_binding_shapes_pos[stim]], // location in the canvas
      startY: exp_info.bottom - ret_dots_y[exp_trial.ret_binding_shapes_pos[stim]], 
      image_height: ret_shape_height,
      //radius: ret_dots_rad,
  
      //RGB values of target color dot
      /*fill_color: `rgb(${exp_info.cols[Number(exp_trial.ret_binding_cols[stim].split('col')[1])][0]}, 
                    ${exp_info.cols[Number(exp_trial.ret_binding_cols[stim].split('col')[1])][1]}, 
                    ${exp_info.cols[Number(exp_trial.ret_binding_cols[stim].split('col')[1])][2]})` */
               
    };
    
    // array displaying color dots on response image and color circle for retrieval
    let ret_shapes = [stim_number, resp_img, resp_shape]
    
    // loop through other dot responses for retrieval
    for (let dot = 0; dot < (exp_info.pos.length - 1); dot++){

      var resp_shapes = {
        obj_type: 'image',
        file: exp_info.shapes[Number(exp_trial.ret_other_shape[stim][dot].split('shape')[1])][0],
        startX: exp_info.center[0] + ret_dots_x[exp_trial.ret_other_shape_pos[stim][dot]], // location in the canvas
        startY: exp_info.bottom - ret_dots_y[exp_trial.ret_other_shape_pos[stim][dot]], 
        image_height: ret_shape_height,
        //radius: ret_dots_rad,
  
        // RGB values of corresponding color
        /*fill_color: `rgb(${exp_info.cols[Number(exp_trial.ret_other_shape[stim][dot].split('shape')[1])][0]}, 
                      ${exp_info.cols[Number(exp_trial.ret_other_shape[stim][dot].split('shape')[1])][1]}, 
                      ${exp_info.cols[Number(exp_trial.ret_other_shape[stim][dot].split('shape')[1])][2]})`*/
        
      };

      // add each color dot response
      ret_shapes.push(resp_shapes)
    }
    
    // display screen with response image, color dots and color circle
    let stim_screen = {
      type: psychophysics,
      background_color: 'white',
      canvas_width: exp_info.canW,
      canvas_height: exp_info.canH,
      stimuli: ret_shapes,
      response_type: 'key',
      trial_duration: exp_info.max_rt,
      choices: exp_info.resp_keys,
      data: { // data to be saved
        screenID: 'retrieval2_dec',
        task: 'declarative',
        session: exp_info.session,
  
        //col_dist: exp_info.col_dist,
        //group_dist: exp_info.group_dist,
        //start_cols: exp_info.cols_start,
        shapes: exp_info.shapes,
        //cols_angles: exp_info.cols_angles,
    
        procedure: exp_trial.phase,
        blockID: exp_trial.block,
        trialID: exp_trial.trial,
        trialBlockID: exp_trial.trial2block,
        list_condition: exp_trial.list_condition,
          
        setsize: exp_trial.setsize,
        stimulusID: exp_trial.ret_stim[stim],
        ret_order: stim,
        enc_order: exp_trial.retrieval_order[stim],
  
        binding_shape_name: exp_trial.ret_binding_shapes[stim],
        //binding_shape_angle: exp_trial.ret_binding_shapes_angles[stim],
        binding_shape: exp_info.shapes[Number(exp_trial.ret_binding_shapes[stim].split('shape')[1])],
        binding_shape_pos: exp_trial.ret_binding_shapes_pos[stim],    
            
        ret_other_shapes: exp_trial.ret_other_shape[stim],
        //ret_other_shapes_angles: exp_trial.ret_other_shape_angles[stim],
        ret_other_shapes_pos: exp_trial.ret_other_shape_pos[stim],
  
        correct_response: exp_info.resp_keys[exp_trial.ret_binding_shapes_pos[stim]]        
      },
      on_finish: function (data) { // end of trial

        // response equals correct response
        if (data.response == data.correct_response) {
          // create variable accuracy == 1 and response in degress of color
          data.acc = 1;
          data.response_angles = data.binding_col_angle;
          data.response_name = data.binding_col_name;
      
        } else { // response unequal correct response 
          // create variable accuracy == 0 and response in degress of color
          data.acc = 0;
          //data.response_angles = data.ret_other_cols_angles[data.ret_other_cols_pos.indexOf(exp_info.resp_keys.indexOf(data.response))];          
          data.response_name = data.ret_other_shapes[data.ret_other_shapes_pos.indexOf(exp_info.resp_keys.indexOf(data.response))];          
        
        }; 
        
        // determine error type (IIP/IOP/NPL)
        if (data.acc == 1) { // IIP: correct response

          data.error_type = 'IIP';

        // IOP: incorrect response but part of binding colors of current trial
        } else if (data.acc == 0 && exp_trial.ret_binding_shapes.some((val) => val == data.response_name)) {

          data.error_type = 'IOP';

        } else { // NPL: incorrect response and not part of binding position of current trial

          data.error_type = 'NPL';
          
        };    

        // last block, trial, and stimulus of the experiment in the declarative task
        // turn of browser tracking before survey
        if (exp_trial.block == (exp_info.n_exp_trials - 1) && exp_trial.trial == (exp_info.n_exp_trials - 1) && stim == (exp_info.setsize - 1)) {
          
          // allow to leave browser
          varSystem.TRACK = false;
        }
        
      }
    };
  
    // return screen with response image, color dots and color circle
    return stim_screen
  };
