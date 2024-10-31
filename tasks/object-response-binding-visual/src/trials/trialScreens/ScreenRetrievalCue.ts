// import
import psychophysics from "@kurokida/jspsych-psychophysics";

// screen to display cue for retrieval
export const screen_cue = function(exp_info){

    // retrieve cue
    const ret_cue = {
      obj_type: 'text',
      content: '?',
      font: exp_info.font_cues,
      startX: exp_info.center[0],
      startY: exp_info.center[1]
    };
    
    // display screen with retrieval cue
    let cue_screen = {
      type: psychophysics,
      background_color: 'white',
      canvas_width: exp_info.canW,
      canvas_height: exp_info.canH,
      stimuli: [ret_cue],
      response_type: 'key',
      choices: 'NO_KEYS',
      trial_duration: exp_info.cue_time,
      data: { // data to be saved
        screenID: 'retrieval_cue'
      }
    };
  
    // return screen with retrieval cue
    return cue_screen
  };