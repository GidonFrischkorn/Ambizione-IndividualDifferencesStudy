// import
import psychophysics from "@kurokida/jspsych-psychophysics";

// processing speed task screen 2
export const screen_proc_speed2_dec = function(exp_info, exp_trial, stim) {

    // define variables
    // x coordinates of the retrieval names
    var ret_dots_x = [-7*exp_info.canW/72, 
                      -6*exp_info.canW/72, 
                      -4.6*exp_info.canW/72, 
                      -3.2*exp_info.canW/72, 
                      3.2*exp_info.canW/72, 
                      4.6*exp_info.canW/72, 
                      6*exp_info.canW/72, 
                      7*exp_info.canW/72];
    
    // y coordinates of the retrieval names
    var ret_dots_y = [3*exp_info.canH/36, 
                      4*exp_info.canH/36, 
                      4.6*exp_info.canH/36, 
                      4*exp_info.canH/36, 
                      4*exp_info.canH/36, 
                      4.6*exp_info.canH/36, 
                      4*exp_info.canH/36, 
                      3*exp_info.canH/36];
  
    // height of the response image
    var img_height = exp_info.canH/3.5;
    
    // first name text
    const first_text = {
      obj_type: 'text',
      content: exp_info.firsts[Number(exp_trial.proc_speed_firsts.split('name')[1])],
      fontSize: '60px',
      startX: exp_info.center[0], // location in the canvas
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
      content: exp_info.firsts[Number(exp_trial.proc_speed_firsts.split('name')[1])],
      fontSize: '17px',
      startX: exp_info.center[0] + ret_dots_x[exp_trial.proc_speed_pos], // location in the canvas
      startY: exp_info.bottom - ret_dots_y[exp_trial.proc_speed_pos]
  
    };
    
    // create array displaying names on response image and target name for retrieval
    let ret_dots = [first_text, resp_img, resp_first_text]; // target name on top of response image and names
    
    // other dot responses for retrieval
    for (let dot = 0; dot < (exp_info.pos.length - 1); dot++){
      var resp_first_dots = {
        obj_type: 'text',
        content: exp_info.firsts[Number(exp_trial.ret_other_firsts[dot].split('name')[1])],
        fontSize: '17px',
        startX: exp_info.center[0] + ret_dots_x[exp_trial.ret_other_first_pos[dot]], // location in the canvas
        startY: exp_info.bottom - ret_dots_y[exp_trial.ret_other_first_pos[dot]], 
             
      };
      
      // add each name response
      ret_dots.push(resp_first_dots);
    }
    
    // display screen with response image, names and target name
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
                
        procedure: exp_trial.phase,
        block_number: exp_trial.block,
        trial_number: exp_trial.trial,
  
        ret_order: exp_trial.retrieval_order,
        proc_speed_first_names: exp_trial.proc_speed_firsts,
        proc_speed_firsts: exp_info.firsts_name[Number(exp_trial.proc_speed_firsts.split('name')[1])],
        proc_speed_first_pos: exp_trial.proc_speed_pos,
  
        ret_other_firsts: exp_trial.ret_other_firsts,
        ret_other_first_pos: exp_trial.ret_other_first_pos,
        
        correct_response: exp_info.resp_keys[exp_trial.proc_speed_pos]
      },
      on_finish: function (data) {

        // response equals correct response
        if (data.response === data.correct_response) {
  
          // create variable accuracy == 1 and response
          data.acc = 1;
          data.response_name = data.proc_speed_first_name;
  
        } else { // response unequal correct response
  
          // create variable accuracy == 0 and response
          data.acc = 0;
          data.response_name = data.ret_other_firsts[data.ret_other_first_pos.indexOf(exp_info.resp_keys.indexOf(data.response))];          
        
        }; 
      }
    };
  
    // return screen with response image, names and target name
    return stim_screen;
  };