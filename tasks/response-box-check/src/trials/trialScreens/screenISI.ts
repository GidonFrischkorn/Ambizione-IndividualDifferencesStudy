// Third party plugins
import psychophysics from "@kurokida/jspsych-psychophysics";

/**
 * Generates screen with blank screen for ISI
 * @param exp_info settings of the experiment
 * @returns screen with blank screen for ISI
 */

export const screen_isi = function(exp_info: any){

    // Create blank screen with ISI duration
    let blank_screen_isi = {
      type: psychophysics,
      background_color: 'white',
      canvas_width: exp_info.LAYOUT.CANW,
      canvas_height: exp_info.LAYOUT.CANH,
      stimuli: [],
      response_type: 'key',
      choices: 'NO_KEYS',
      trial_duration: exp_info.TIMING.ISI,
      data: { 
        screenID: 'ISI'
      }
    } 
  
    // Return ISI screen 
    return blank_screen_isi;
  };