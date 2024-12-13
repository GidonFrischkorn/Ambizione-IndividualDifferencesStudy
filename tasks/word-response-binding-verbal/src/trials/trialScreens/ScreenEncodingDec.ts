// import
import psychophysics from "@kurokida/jspsych-psychophysics";

// screen to display stimulus and name for encoding
export const screen_encoding_dec = function(exp_info, exp_trial, stim) {

    // first name text
    const first_text = {
      obj_type: 'text',
      content: exp_info.firsts[Number(exp_trial.binding_firsts[stim].split('name')[1])],
      fontSize: '60px',
      startX: exp_info.right, // location in the canvas
      startY: exp_info.center[1]

    };
  
    // stimulus text
    const stim_text = {
      obj_type: 'text',
      content: exp_trial.stim_index_word[stim],
      fontSize: '60px',
      startX: exp_info.left,
      startY: exp_info.center[1]
    };    
  
    // display screen with stimulus word and name
    const stim_screen = {
      type: psychophysics,
      background_color: 'white',
      canvas_width: exp_info.canW,
      canvas_height: exp_info.canH,
      stimuli: [first_text, stim_text],
      response_type: 'key',
      choices: 'NO_KEYS',
      trial_duration: exp_info.enc_time,
      data: {
        screenID: 'encoding_dec'
      },
    };
   
    // return screen with stimulus word and name
    return stim_screen; 
  };