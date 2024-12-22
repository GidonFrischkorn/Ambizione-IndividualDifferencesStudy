// import
import psychophysics from "@kurokida/jspsych-psychophysics";
import { varSystem } from "../../settings";

// screen 2 to display response image, color dots and color circle for retrieval
export const screen_retrieval2_dec = function(exp_info, exp_trial, stim){
   

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
  
    // stimulus number
    const stim_number = {
      obj_type: 'text',
      content: `${exp_trial.ret_stim[stim]}`, 
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
  
    // target object response for retrieval
    const resp_object = {
      obj_type: 'image',
      file: exp_info.objects[Number(exp_trial.ret_binding_objects[stim].split('object')[1])],
      startX: exp_info.center[0] + ret_dots_x[exp_trial.ret_binding_objects_pos[stim]], // location in the canvas
      startY: exp_info.bottom - ret_dots_y[exp_trial.ret_binding_objects_pos[stim]], 
      image_height: ret_object_height
    };
    
    
    // array displaying objects on response image and number for retrieval
    let ret_objects = [ resp_img, resp_object, stim_number]
    
    // loop through other object responses for retrieval
    for (let dot = 0; dot < (exp_info.pos.length - 1); dot++){

      var resp_objects: any = {
        obj_type: 'image',
        file: exp_info.objects[Number(exp_trial.ret_other_object[stim][dot].split('object')[1])],
        startX: exp_info.center[0] + ret_dots_x[exp_trial.ret_other_object_pos[stim][dot]], // location in the canvas
        startY: exp_info.bottom - ret_dots_y[exp_trial.ret_other_object_pos[stim][dot]], 
        image_height: ret_object_height
       };


      // add each object response
      ret_objects.push(resp_objects)
    }
    
    // display screen with response image, objects and number
    let stim_screen = {
      type: psychophysics,
      background_color: 'white',
      canvas_width: exp_info.canW,
      canvas_height: exp_info.canH,
      stimuli: ret_objects,
      response_type: 'key',
      trial_duration: exp_info.max_rt,
      choices: exp_info.resp_keys,
      data: { // data to be saved
        screenID: 'retrieval2_dec',
        task: 'declarative',
        session: exp_info.session,

        objects: exp_info.objects,
    
        procedure: exp_trial.phase,
        blockID: exp_trial.block,
        trialID: exp_trial.trial,
        trialBlockID: exp_trial.trial2block,
        list_condition: exp_trial.list_condition, // i don't see it in the results 
          
        setsize: exp_trial.setsize,
        stimulusID: exp_trial.ret_stim[stim],
        ret_order: stim,
        enc_order: exp_trial.retrieval_order[stim],
  
        binding_object_name: exp_trial.ret_binding_objects[stim],
        binding_object: exp_info.objects[Number(exp_trial.ret_binding_objects[stim].split('object')[1])],
        binding_object_pos: exp_trial.ret_binding_objects_pos[stim],    
            
        ret_other_objects: exp_trial.ret_other_object[stim],
        ret_other_objects_pos: exp_trial.ret_other_object_pos[stim],
  
        correct_response: exp_info.resp_keys[exp_trial.ret_binding_objects_pos[stim]]   
      },
      on_finish: function (data) { // end of trial

        // response equals correct response
        if (data.response == data.correct_response) {
          // create variable accuracy == 1 and response in degress of color
          data.acc = 1;
          data.response_name = data.binding_object_name;
      
        } else { // response unequal correct response 
          // create variable accuracy == 0 and response in degress of color
          data.acc = 0;      
          data.response_name = data.ret_other_objects[data.ret_other_objects_pos.indexOf(exp_info.resp_keys.indexOf(data.response))];          
        
        }; 
        
        // determine error type (IIP/IOP/NPL)
        if (data.acc == 1) { // IIP: correct response

          data.error_type = 'IIP';

        // IOP: incorrect response but part of binding colors of current trial
        } else if (data.acc == 0 && exp_trial.ret_binding_objects.some((val) => val == data.response_name)) {

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

    // return screen with response image, objects and number
    return stim_screen
  };
