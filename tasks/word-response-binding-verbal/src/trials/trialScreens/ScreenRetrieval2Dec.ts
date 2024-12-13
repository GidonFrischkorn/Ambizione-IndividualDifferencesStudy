// import
import psychophysics from "@kurokida/jspsych-psychophysics";
import { varSystem } from "../../settings";

// screen 2 to display response image, names and word for retrieval
export const screen_retrieval2_dec = function(exp_info, exp_trial, stim){
    
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
  
    // stimulus text
    const stim_text = {
      obj_type: 'text',
      content: exp_trial.ret_stim_word[stim],
      fontSize: '60px',
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
  
    // target name response for retrieval
    const resp_first_text = {
      obj_type: 'text',
      content: exp_info.firsts[Number(exp_trial.ret_binding_firsts[stim].split('name')[1])],
      fontSize: '17px',
      startX: exp_info.center[0] + ret_resp_x[exp_trial.ret_binding_first_pos[stim]], // location in the canvas
      startY: exp_info.bottom - ret_resp_y[exp_trial.ret_binding_first_pos[stim]]
  
    };
    
    // array displaying names on response image and word for retrieval
    let ret_resp = [stim_text, resp_img, resp_first_text];  
    
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
      ret_resp.push(resp_first)
    }
    
    // display screen with response image, names and word
    let stim_screen = {
      type: psychophysics,
      background_color: 'white',
      canvas_width: exp_info.canW,
      canvas_height: exp_info.canH,
      stimuli: ret_resp,
      response_type: 'key',
      trial_duration: exp_info.max_rt,
      choices: exp_info.resp_keys,
      data: { // data to be saved
        screenID: 'retrieval2_dec',
        task: 'declarative',
       
        procedure: exp_trial.phase,
        block_number: exp_trial.block,
        trial_number: exp_trial.trial,
        trialBlockID: exp_trial.trial2block,
        list_condition: exp_trial.list_condition,
          
        setsize: exp_trial.setsize,
        stimulusID: exp_trial.ret_stim[stim],
        stimulusID_word: exp_trial.ret_stim_word[stim],
        ret_order: stim,
        enc_order: exp_trial.retrieval_order[stim],
  
        binding_first_name: exp_trial.ret_binding_firsts[stim],
        binding_firsts: exp_info.firsts_name[Number(exp_trial.ret_binding_firsts[stim].split('name')[1])],
        binding_first_pos: exp_trial.ret_binding_first_pos[stim],    
            
        ret_other_firsts: exp_trial.ret_other_firsts[stim],
        ret_other_first_pos: exp_trial.ret_other_first_pos[stim],
  
        correct_response: exp_info.resp_keys[exp_trial.ret_binding_first_pos[stim]]        
      },
      on_finish: function (data) { // end of trial

        // response equals correct response
        if (data.response == data.correct_response) {
          // create variable accuracy == 1 and response 
          data.acc = 1;
          data.response_name = data.binding_first_name;
      
        } else { // response unequal correct response 
          // create variable accuracy == 0 and response 
          data.acc = 0;
          data.response_name = data.ret_other_firsts[data.ret_other_first_pos.indexOf(exp_info.resp_keys.indexOf(data.response))];          
        
        }; 
        
        // determine error type (IIP/IOP/NPL)
        if (data.acc == 1) { // IIP: correct response

          data.error_type = 'IIP';

        // IOP: incorrect response but part of binding names of current trial
        } else if (data.acc == 0 && exp_trial.ret_binding_firsts.some((val) => val == data.response_name)) {

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
  
    // return screen with response image, names and word
    return stim_screen
  };
