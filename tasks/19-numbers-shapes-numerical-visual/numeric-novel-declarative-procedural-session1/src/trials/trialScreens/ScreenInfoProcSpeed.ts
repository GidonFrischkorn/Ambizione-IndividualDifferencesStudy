// import
import psychophysics from "@kurokida/jspsych-psychophysics";

// screen to display info for processing speed task
export const screen_info_proc_speed = function(exp_info, exp_trial) {
  
    // text object with finger check info
    const stim_cue = {
      obj_type: 'text',
      content: `Machen Sie sich bitte bereit für die Reaktionszeit-Aufgabe`,
      font: exp_info.font_cues,
      startX: exp_info.center[0],
      startY: exp_info.center[1]
    };
    
    // display text object on screen
    let info_screen = {
      type: psychophysics,
      background_color: 'white',
      canvas_width: exp_info.canW,
      canvas_height: exp_info.canH,
      stimuli: [stim_cue],
      response_type: 'key',
      choices: 'NO_KEYS',
      trial_duration: exp_info.info_time,
      data: { // data to be saved
        screenID: 'info_proc_speed',
      }
    };
  
    // return screen with text for finger check info
    return info_screen;
  };