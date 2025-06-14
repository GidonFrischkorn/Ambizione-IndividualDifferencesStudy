// Thrird party plugin
import psychophysics from "@kurokida/jspsych-psychophysics";

/**
 * Generates screen for finger check info at the beginning of the finger check
 * @param exp_info settings of the experiment
 * @returns screen for finger check info
 */

export const screen_info_finger_check = function(exp_info: any) {
  
    // Create text with finger check info
    const stim_cue = {
      obj_type: 'text',
      content: `Bitte machen Sie sich bereit für den Antwortbox-Test.`,
      fontSize: exp_info.LAYOUT.FONT_SIZE,
      fontFamily: exp_info.LAYOUT.FONT_FAMILY,
      startX: exp_info.LAYOUT.CENTER[0],
      startY: exp_info.LAYOUT.CENTER[1]
    };
    
    // Create screen for finger check info
    let info_screen = {
      type: psychophysics,
      background_color: 'white',
      canvas_width: exp_info.LAYOUT.CANW,
      canvas_height: exp_info.LAYOUT.CANH,
      stimuli: [stim_cue],
      response_type: 'key',
      choices: 'NO_KEYS',
      trial_duration: exp_info.TIMING.INFO,
      data: { 
        screenID: 'info_finger_check'
      }
    };
  
    // Return screen with text for finger check info
    return info_screen;
  };