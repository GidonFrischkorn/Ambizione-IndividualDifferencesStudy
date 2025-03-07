// import
import psychophysics from "@kurokida/jspsych-psychophysics";

// processing speed task screen 2
export const screen_proc_speed2_dec = function(exp_info, exp_trial, stim, box) {

    // define response keys
    if (box == true) {
      var resp_keys = exp_info.resp_keys_box;
    } else { // box == false
      var resp_keys = exp_info.resp_keys_keyboard;
    };
    
    // Coordinates of the retrieval objects
    var ret_dots_x = [(-7.7 * exp_info.canW / 72) - 15, 
                      (-6.53 * exp_info.canW / 72) - 10, 
                      (-5.37 * exp_info.canW / 72), 
                      (-4.2 * exp_info.canW / 72) + 10, 
                      ( 4.2 * exp_info.canW / 72) - 10, 
                      ( 5.37 * exp_info.canW / 72), 
                      ( 6.53 * exp_info.canW / 72) + 10, 
                      ( 7.7 * exp_info.canW / 72) + 15];

    // New y coordinates of the retrieval objects
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
    
    // object
    const object = {
      obj_type: 'image',
      file: exp_info.objects[Number(exp_trial.proc_speed_object.split('object')[1])],
      startX: exp_info.center[0], // location in the canvas
      startY: exp_info.top,
      image_height: img_height
    };
  
    // response image
    const resp_img = {
      obj_type: 'image',
      file: exp_info.path_response + exp_info.response_image,
      image_height: img_height,
      startX: exp_info.center[0],
      startY: exp_info.bottom
    };
  
    // target object response for retrieval
    const resp_object = {
      obj_type: 'image',
      file: exp_info.objects[Number(exp_trial.proc_speed_object.split('object')[1])],
      startX: exp_info.center[0] + ret_dots_x[exp_trial.proc_speed_pos], // location in the canvas
      startY: exp_info.bottom - ret_dots_y[exp_trial.proc_speed_pos], 
      image_height: ret_object_height
    };
    
    // create array displaying objects on response image and object for retrieval
    let ret_objects = [object, resp_img, resp_object]; // target color dot on top of response image and color circle
    
    // other object responses for retrieval
    for (let dot = 0; dot < (exp_info.pos.length - 1); dot++){
      var resp_objects: any = {
        obj_type: 'image',
        file: exp_info.objects[Number(exp_trial.ret_other_object[dot].split('object')[1])],
        startX: exp_info.center[0] + ret_dots_x[exp_trial.ret_other_object_pos[dot]], // location in the canvas
        startY: exp_info.bottom - ret_dots_y[exp_trial.ret_other_object_pos[dot]], 
        image_height: ret_object_height
       };
  
      // add each object response
      ret_objects.push(resp_objects);
    }
    
    // display screen with response image, target object and objects 
    let stim_screen = {
      type: psychophysics,
      background_color: 'white',
      canvas_width: exp_info.canW,
      canvas_height: exp_info.canH,
      stimuli: ret_objects,
      response_type: 'key',
      trial_duration: exp_info.max_rt,
      choices: resp_keys,
      data: { // data to be saved
        screenID: 'proc_speed2_dec',
        task: 'declarative',
          
        objects: exp_info.objects,
      
        procedure: exp_trial.phase,
        block_number: exp_trial.block,
        trial_number: exp_trial.trial,
  
        ret_order: exp_trial.retrieval_order,
        proc_speed_object_name: exp_trial.proc_speed_object,
        proc_speed_object: exp_info.objects[Number(exp_trial.proc_speed_object.split('object')[1])],
        proc_speed_object_pos: exp_trial.proc_speed_pos,
  
        ret_other_objects: exp_trial.ret_other_object,
        ret_other_objects_pos: exp_trial.ret_other_object_pos,
        
        correct_response: resp_keys[exp_trial.proc_speed_pos]
      },
      on_finish: function (data) {

        // response equals correct response
        if (data.response === data.correct_response) {
  
          // create variable accuracy == 1 and response in degress of color
          data.acc = 1;
          data.response_name = data.proc_speed_object_name;
  
        } else { // response unequal correct response
  
          // create variable accuracy == 0 and response in degress of color
          data.acc = 0;
          data.response_name = data.ret_other_objects[data.ret_other_objects_pos.indexOf(resp_keys.indexOf(data.response))];          
        
        }; 
      }
    };
  
    // return screen with response image, color dots and color circle
    return stim_screen;
  };