// import
import psychophysics from "@kurokida/jspsych-psychophysics";

// screen to display setsize for practice trials
export const screen_prac_setsize_proc = function(exp_info, exp_trial) {
  
    // text object with setsize
    const stim_cue = {
      obj_type: 'text',
      content: `You will see now ${exp_trial.setsize} numbers and their response keys`,
      font: exp_info.font_cues,
      startX: exp_info.center[0],
      startY: exp_info.center[1]
    };
    
    // display text object on screen
    let prac_stim_screen = {
      type: psychophysics,
      background_color: 'white',
      canvas_width: exp_info.canW,
      canvas_height: exp_info.canH,
      stimuli: [stim_cue],
      response_type: 'key',
      choices: 'NO_KEYS',
      trial_duration: exp_info.info_time,
      data: { // data to be saved
        screenID: 'prac_setsize_proc'
      }
    };
  
    // return screen with text for setsize
    return prac_stim_screen;
  };