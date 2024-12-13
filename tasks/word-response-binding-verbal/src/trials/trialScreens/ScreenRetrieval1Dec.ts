// import
import psychophysics from "@kurokida/jspsych-psychophysics";

// screen 1 to display response image and names for retrieval
export const screen_retrieval1_dec = function(exp_info, exp_trial, stim){

    // define variables
    // x coordinates of the retrieval names
    var ret_resp_x = [-7*exp_info.canW/72, 
                      -6*exp_info.canW/72, 
                      -4.6*exp_info.canW/72, 
                      -3.2*exp_info.canW/72, 
                      3.2*exp_info.canW/72, 
                      4.6*exp_info.canW/72, 
                      6*exp_info.canW/72, 
                      7*exp_info.canW/72];

    // y coordinates of the retrieval names
    var ret_resp_y = [3*exp_info.canH/36, 
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
      content: exp_info.firsts[Number(exp_trial.ret_binding_firsts[stim].split('name')[1])],
      fontSize: '17px',
      startX: exp_info.center[0] + ret_resp_x[exp_trial.ret_binding_first_pos[stim]], // location in the canvas
      startY: exp_info.bottom - ret_resp_y[exp_trial.ret_binding_first_pos[stim]]
  
    };
    
    // create array displaying names on response image for retrieval
    let ret_resp = [resp_img, resp_first_text];
    
    // loop through other responses for retrieval
    for (let resp = 0; resp < (exp_info.pos.length - 1); resp++){
      
      // other responses for retrieval
      var resp_first = {
        obj_type: 'text',
        content: exp_info.firsts[Number(exp_trial.ret_other_firsts[stim][resp].split('name')[1])],
        fontSize: '17px',
        startX: exp_info.center[0] + ret_resp_x[exp_trial.ret_other_first_pos[stim][resp]], // location in the canvas
        startY: exp_info.bottom - ret_resp_y[exp_trial.ret_other_first_pos[stim][resp]] 
             
      };
  
      // add each name response
      ret_resp.push(resp_first);
    };
    
    // display screen with response image and names
    let stim_screen = {
      type: psychophysics,
      background_color: 'white',
      canvas_width: exp_info.canW,
      canvas_height: exp_info.canH,
      stimuli: ret_resp,
      response_type: 'key',
      trial_duration: exp_info.resp_stim_time,
      choices: 'NO_KEYS',
      remain_canvas: true,
      data: {
        screenID: 'retrieval1_dec',    
      }
    };
  
    // return screen with response image and names
    return stim_screen
  };
  