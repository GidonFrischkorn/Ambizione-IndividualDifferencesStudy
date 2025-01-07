// import
import psychophysics from "@kurokida/jspsych-psychophysics";

// ISI screen
export const screen_isi = function(exp_info){

    // display blank screen with isi
    let blank_screen_isi = {
      type: psychophysics,
      background_color: 'white',
      canvas_width: exp_info.canW,
      canvas_height: exp_info.canH,
      stimuli: [],
      response_type: 'key',
      choices: 'NO_KEYS',
      trial_duration: exp_info.isi,
      data: { // data to be saved
        screenID: 'ISI'
      }
    } 
  
    // return isi screen 
    return blank_screen_isi;
  };