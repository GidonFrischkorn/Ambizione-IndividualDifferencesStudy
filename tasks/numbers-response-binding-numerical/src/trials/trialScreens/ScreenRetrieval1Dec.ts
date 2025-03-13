// import
import psychophysics from "@kurokida/jspsych-psychophysics";

// screen 1 to display response image and color dots for retrieval
export const screen_retrieval1_dec = function(exp_info, exp_trial, stim){


    // New x coordinates of the retrieval objects
    var ret_dots_x = [(-7.7 * exp_info.canW / 72) - 15, 
                      (-6.53 * exp_info.canW / 72) - 10, 
                      (-5.37 * exp_info.canW / 72), 
                      (-4.2 * exp_info.canW / 72) + 10, 
                      ( 4.2 * exp_info.canW / 72) - 10, 
                      ( 5.37 * exp_info.canW / 72), 
                      ( 6.53 * exp_info.canH / 36) + 10, 
                      ( 7.7 * exp_info.canH / 36) + 15];

// New y coordinates of the retrieval color dots
var ret_dots_y = [(2.33 * exp_info.canH / 20), 
                  (2.9 * exp_info.canH / 20), 
                  (3.3 * exp_info.canH / 20), 
                  (2.9 * exp_info.canH / 20), 
                  (2.9 * exp_info.canH / 20), 
                  (3.3 * exp_info.canH / 20), 
                  (2.9 * exp_info.canH / 20), 
                  (2.33 * exp_info.canH / 20)];
  
    // radius of retrieval color dots
    var ret_object_height = (exp_info.canH/72)*4.8;

    // height of the response image
    var img_height = exp_info.canH/3;


    // response image
    const resp_img = {
      obj_type: 'image',
      file: exp_info.image_path + exp_info.response_image,
      image_height: img_height,
      startX: exp_info.center[0],
      startY: exp_info.bottom
    };
  
    // target object response for retrieval
    const resp_object = {
      obj_type: 'image',
      file: exp_info.objects[Number(exp_trial.ret_binding_objects[stim].split('object')[1])],
      startX: exp_info.center[0] + ret_dots_x[exp_trial.ret_binding_objects_pos[stim]], // location in the canvas
      startY: exp_info.bottom - ret_dots_y[exp_trial.ret_binding_objects_pos[stim]], 
      image_height: ret_object_height
    };
    
    // create array displaying objects on response image for retrieval
    let ret_objects = [resp_img, resp_object]
    
    // loop through other object responses for retrieval
    for (let dot = 0; dot < (exp_info.pos.length - 1); dot++){
      
      // other object responses for retrieval
      var resp_objects = {
        obj_type: 'image',
        file: exp_info.objects[Number(exp_trial.ret_other_object[stim][dot].split('object')[1])],
        startX: exp_info.center[0] + ret_dots_x[exp_trial.ret_other_object_pos[stim][dot]], // location in the canvas
        startY: exp_info.bottom - ret_dots_y[exp_trial.ret_other_object_pos[stim][dot]], 
        image_height: ret_object_height
      };
  
      // add each object response
      ret_objects.push(resp_objects);
    };
    
    // display screen with response image and objects
    let stim_screen = {
      type: psychophysics,
      background_color: 'white',
      canvas_width: exp_info.canW,
      canvas_height: exp_info.canH,
      stimuli: ret_objects,
      response_type: 'key',
      trial_duration: exp_info.resp_stim_time,
      choices: 'NO_KEYS',
      remain_canvas: true,
      data: {
        screenID: 'retrieval1_dec',    
      }
    };
  
    // return screen with response image and objects
    return stim_screen
};
