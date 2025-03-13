// import
import psychophysics from "@kurokida/jspsych-psychophysics";

// screen to display fixation cross
export const screen_fix = function(exp_info, exp_trial) {

    // fixation cross
    const fix_cue = {
      obj_type: 'cross',
      line_length: 20,
      startX: exp_info.center[0],
      startY: exp_info.center[1]
    };
    
    // display fixation cross
    let fix_screen = {
      type: psychophysics,
      background_color: 'white',
      canvas_width: exp_info.canW,
      canvas_height: exp_info.canH,
      stimuli: [fix_cue],
      response_type: 'key',
      choices: 'NO_KEYS',
      trial_duration: exp_info.fix_time,
      data: { // data to be saved
        screenID: 'fixation'
      }
    };
  
    // return screen with fixation cross
    return fix_screen;
  };
  