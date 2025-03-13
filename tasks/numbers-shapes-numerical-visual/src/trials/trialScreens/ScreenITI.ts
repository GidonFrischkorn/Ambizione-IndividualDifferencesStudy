// import
import psychophysics from "@kurokida/jspsych-psychophysics";

// ITI screen
export const screen_iti = function(exp_info) {
  
    // display blank screen with iti
    let blank_screen_iti = {
      type: psychophysics,
      background_color: 'white',
      canvas_width: exp_info.canW,
      canvas_height: exp_info.canH,
      stimuli: [],
      response_type: 'key',
      choices: 'NO_KEYS',
      trial_duration: exp_info.iti,
      data: { // data to be saved
        screenID: 'ITI'
      }
    };
  
    // return iti screen
    return blank_screen_iti;
  };