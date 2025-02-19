// Purpose: Functions for generating stimuli and creating elements

// Global variables
import { expInfo } from "../settings";

// Third party plugins
import htmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";
import { jsPsych } from "../jsp";
import psychophysics from "@kurokida/jspsych-psychophysics";

/**
 * A function used to create a single trial.
 * @param XY The number of items in a trial.
 * @param targetStim The stimulus of a trial.
 * @param isPractice A boolean value indicating whether the trial is a practice trial or not.
 *
 * @returns An array containing all the slides of a trial.
 */
export function createNewTrial(XY: number, isPractice: boolean, box: boolean, animacy: number, wordlength: number, targetStim: string, mapping: string) {  
  let trial_line: any[] = [];

  let correct_response = "";
  if (mapping === "normal") {
      if (animacy === 1) {
        if (box === true) {
          correct_response = expInfo.DESIGN.BOX_CHOICES[0]
        } else {
          correct_response = expInfo.DESIGN.CHOICES[0]
        };
      } else {
        if (box === true) {
          correct_response = expInfo.DESIGN.BOX_CHOICES[1]
        } else {
          correct_response = expInfo.DESIGN.CHOICES[1]
          };
      }
  } else if (mapping === "switched") {
      if (animacy === 1) {
        if (box === true) {
          correct_response = expInfo.DESIGN.BOX_CHOICES[1]
        } else {
          correct_response = expInfo.DESIGN.CHOICES[1]
          };
      } else {
        if (box === true) {
          correct_response = expInfo.DESIGN.BOX_CHOICES[0]
        } else {
          correct_response = expInfo.DESIGN.CHOICES[0]
          };
      }
  }

  // Fixation Screen 
  const fixation_screen = {
    type: htmlKeyboardResponse,
    stimulus: "<div style='font-size:60px;'>+</div>",
    choices: "NO-KEYS",
    trial_duration: expInfo.TIMING.FIXATION + Math.floor((expInfo.TIMING.JITTER+1) * Math.random()),
  }

  // Right cue image
  const fixation_cue = {
    obj_type: 'text',
    content: '+', 
    fontSize: '60px',
    startX: expInfo.LAYOUT.CENTER[0],
    startY: expInfo.LAYOUT.CENTER[1]
  };
  
  // Left Cue Image
  const left_cue = {
    obj_type: 'image',
    file: function () {
      if (mapping === "normal") {
        return 'assets/images/animate_cue.png';
      } else if (mapping === "switched") {
        return 'assets/images/inanimate_cue.png';
      };
    }, 
    image_height: 100,
    startX: expInfo.LAYOUT.LEFT,
    startY: expInfo.LAYOUT.CENTER[1]
  };

  // Right Cue Image
  const right_cue = {
    obj_type: 'image',
    file: function () {
      if (mapping === "normal") {
        return `assets/images/inanimate_cue.png`;
      } else if (mapping === "switched") {
        return `assets/images/animate_cue.png`;
      };
    }, 
    image_height: 100,
    startX: expInfo.LAYOUT.RIGHT,
    startY: expInfo.LAYOUT.CENTER[1]
  };
  
  // Cue Screen
  const cue_screen = {
    type: psychophysics,
    background_color: 'white',
    canvas_width: expInfo.LAYOUT.CAN_W,
    canvas_height: expInfo.LAYOUT.CAN_H,
    stimuli: [left_cue, fixation_cue, right_cue],
    response_type: 'key',
    choices: 'NO_KEYS',
    trial_duration: expInfo.TIMING.CUE, // Show for a fixed time
  };

   // Target and Response Screen 
   const target_response_screen = {
    type: htmlKeyboardResponse,
    stimulus: `<div style='font-size:50px;'> ${targetStim} </div>`,
    choices: box ? expInfo.DESIGN.BOX_CHOICES : expInfo.DESIGN.CHOICES, 
    trial_duration: expInfo.TIMING.TARGET,
    response_ends_trial: true,
    data: {
      trial_number: XY,
      animacy: animacy,
      wordlength: wordlength, 
      procedure: isPractice ? "practice" : "experiment",
      fix_duration: expInfo.TIMING.FIXATION,
      stimulus: targetStim,
      mapping: mapping,
      correct_response: correct_response,
    },
    on_finish: function (data) {
      let correct = data.response === data.correct_response;
      jsPsych.data.get().addToLast({correct: correct});
    }
  }

  // Feedback Stimuls for Practice Trials
  const feedback = {
    type: htmlKeyboardResponse,
    stimulus: function () {
      let lastTrialCorrect = jsPsych.data.get().last(1).values()[0].correct;
      if (lastTrialCorrect) {
        return "<div style='font-size:60px; color:green;'>Richtig :)</div>";
      } else {
        return "<div style='font-size:60px; color:red'>Falsch :(</div>";
      }
    },
    trial_duration: expInfo.TIMING.FEEDBACK,
  } 

  // Inter Trial Interval Screen 
  const inter_trial_interval = {
    type: htmlKeyboardResponse,
    stimulus: "",
    choices: "NO-KEYS",
    trial_duration: expInfo.TIMING.ITI+ 2 * Math.floor((expInfo.TIMING.JITTER+1) * Math.random()),
  }


  // Push screens into trial_line

  if (isPractice) {
    trial_line.push(fixation_screen, cue_screen, target_response_screen, feedback, inter_trial_interval); 
  } else {
    trial_line.push(fixation_screen, cue_screen, target_response_screen, inter_trial_interval);
  };
  

  // return
  return trial_line;
  
};
