/**
 * This file contains the settings for the experiment.
 */

// Task functions
import { setCSS } from "./task-fun/setCSS";

setCSS();

export const expInfo = {
  // settings for the experiment
  TITLE: "Landolt Gap Processing Task",
  LANG: "de", // the default language of the experiment

  USE_RESPONSEBOX: true, // a switch to use the response box

  // design of the experiment
  DESIGN: {
    nTRIALS: 25, // number of experiment trials per condition
    nPRACTICE: 10, // number of practice trials
    BreaksAt: 0.5, // the proportion of trials after which a break is given
    nBLOCKS: 1, // number of blocks in the experiment
    BOX_CHOICES: ["alt", "control"], // the choices for the experiment if in the lab with the box
    CHOICES: ["d", "k"], // the choices for the task if experiment online
    MAPPING: [0, 1], // the mapping of the choices
    CONDITIONS: {
      DIFFICULTY: ["easy", "hard"], // the difficulty of the task
      BIGGERGAP: ["left", "right"], // the fit of the task
      LOCATION: ["leftup", "leftdown"], // the location of the task
    },
    backgroundCOLOR: "#FFFFFF", // the color of the background
  },

  STIMULI: {
    ladolt_color: "#000000", // black ladolt like stimulus
    ladolt_fillcolor: "#FFFFFF", // ladolt stimulus is white inside
    landolt_width: 100, // the height of the ladolt like stimulus
    landolt_height: 100, // the width of the ladolt like stimulus
    ladolt_line: 15, // the border of the ladolt like stimulus
    gap_height: [10, 5], // the height of the gap in the ladolt like stimulus
    gap_width: 20, // the width of the gap in the ladolt like stimulus
    gap_color: "#FFFFFF", // the color of the gap in the ladolt like stimulus
    OFFSET_DIFF: [5, 1],
    OFFSET_BIG: [0, 1],
    OFFSET_LOCATION: 10,
  },

  // settings for each trial
  TIMING: {
    START: 10 * 1000, // time for the countdown before a new trial starts
    BREAK: 60 * 1000, // break duration in seconds
    STIMULI: 5000, // stimuli duration in milliseconds
    FIXATION: 400, // fixation duration in milliseconds
    JITTER: 200, // jitter duration in milliseconds
    FEEDBACK: 1000, // feedback duration in milliseconds
    ITI: 1500, // inter-trial interval in milliseconds
    FINGERS: 5000, // duration of the finger instruction
  },

  // when using Prolific, you can set customized completion codes for different situations
  // e.g., when participants complete the experiment, or when they fail the attention check
  // you can set them here and use them in the end of the experiment (jsp.ts)
  CODES: {
    SUCCESS: "success", // the code for a successfully completion of the experiment
    OFFLINE: "offline", // the code for the offline situation
    FAILED_ATTENTION: "failedAttention", // the code for the failed experiment
    FAILED_OTHERS: "failedOthers", // the code for other failed situations (e.g., failed to resize the window)
    // You can specify the codes for different situations here.
  },

  /** The key is case-sensitive and position-sensitive.
   * It is recommended to allow both upper and lower case keys.
   * You can use the `convertCase` function to prevent the issue.
   * Be cautious, the names of the number keys on the top of the keyboard
   * are different from those on the right side of the keyboard.
   */
  KEYS: {
    CONTINUE: ["enter"],
    START_TRIAL: [" "],
  },

  // If you want to use the keyCode rather than key name,
  // you can go to the following link to get the key code:
  // https://www.toptal.com/developers/keycode/

  // Running environment variables
  RUN_JATOS: false, // a switch to run the experiment on JATOS
};

// Global variables for the system. Normally, you don't need to change them.
export const varSystem = {
  TRACK: false, // a switch to track participants' interactions with the browser
  nBLUR: 0, // use to count how many times participants left the browser
  MAX_BLUR: 3, // the maximum number of times participants can leave the browser
  LOOP: true, // a switch to control whether participants need to read the instruction and practice again
  RUN_TIMER: false, // a switch to control the countdown timer
  STATUS: "success", // the status of the experiment
};
