// import
import psychophysics from "@kurokida/jspsych-psychophysics";
import { varSystem } from "../../settings";

// screen 2 to display response image, color dots and color circle for retrieval
export const screen_retrieval_proc = function(exp_info, exp_trial, stim){

    // define variables    
    // stimulus text
    const stim_text = {
      obj_type: 'text',
      content: exp_info.stim_words[stim], 
      fontSize: '60px',
      startX: exp_info.center[0],
      startY: exp_info.center[1]
    };
    
    // display screen with response image, color dots and color circle
    let stim_screen = {
      type: psychophysics,
      background_color: 'white',
      canvas_width: exp_info.canW,
      canvas_height: exp_info.canH,
      stimuli: [stim_text],
      response_type: 'key',
      trial_duration: exp_info.max_rt,
      choices: exp_info.resp_keys,
      data: { // data to be saved
        screenID: 'retrieval_proc',
        task: 'procedural',
        
        procedure: exp_trial.phase,
        block_number: exp_trial.block,
        trial_number: exp_trial.trial,
        trialBlockID: exp_trial.trial2block,
        list_condition: exp_trial.list_condition,
          
        setsize: exp_trial.setsize,
        stimulusID: exp_trial.ret_stim[stim],
        ret_order: stim,
        enc_order: exp_trial.retrieval_order[stim],
  
        binding_pos: exp_trial.ret_binding_pos[stim],  
        correct_response: exp_info.resp_keys[exp_trial.ret_binding_pos[stim]]
      
      },
      on_finish: function (data) {

        //save position of response
        data.response_pos = exp_info.resp_keys.indexOf(data.response);

        // response equals correct response
        if (data.response == data.correct_response) {
          // create variable accuracy == 1 
          data.acc = 1;
          
        } else { // response unequal correct response 
          // create variable accuracy == 0
          data.acc = 0;
          
        }; 

        // determine error type (IIP/IOP/NPL)
        if (data.acc == 1) { // IIP: correct response

          data.error_type = 'IIP';
        
        // IOP: incorrect response but part of binding position of current trial
        } else if (data.acc == 0 && exp_trial.ret_binding_pos.some((val) => val == data.response_pos)) {

          data.error_type = 'IOP';

        } else { // NPL: incorrect response and not part of binding position of current trial

          data.error_type = 'NPL';

        }

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
