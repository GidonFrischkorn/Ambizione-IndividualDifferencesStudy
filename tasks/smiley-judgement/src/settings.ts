/**
 * This file contains the settings for the experiment.
 */

// Task functions
import { setCSS } from "./task-fun/setCSS";

setCSS();

export const expInfo = {
  // settings for the experiment
  TITLE: "Smiley Processing Task",
  LANG: "de", // the default language of the experiment

  USE_RESPONSEBOX: false, // a switch to use the response box in the lab

  // design of the experiment
  DESIGN: {
    nTRIALS: 25, // number of experiment trials per condition
    nPRACTICE: 10, // number of practice trials
    BreaksAt: 0.5, // the proportion of trials after which a break is given
    nBLOCKS: 1, // number of blocks in the experiment
    BOX_CHOICES: ["alt", "control"], // the keys for the choices if experiment in lab with box
    CHOICES: ["d", "k"], // the choices for the task if experiment online 
    MAPPING: [0, 1], // the mapping of the choices
    CONDITIONS: {
      DIFFICULTY: ["easy", "hard"], // the difficulty of the task
      FIT: ["fit", "nofit"], // the fit of the task
      LOCATION: ["top", "bottom"], // the location of the task
    },
    backgroundCOLOR: "#FFFFFF", // the color of the background
  },

  STIMULI: {
    objectCOLOR: "#000000", // black objects
    HEIGHT: 10, // the height of the objects
    minLineLength: 60, // the minimum length of the line
    maxLineLength: 120, // the maximum length of the line
    dotWIDTH: 10, // the width of the dots
    OFFSET_DIFF: [10, 1],
    OFFSET_LOCATION: 20,
  },

  // settings for each trial
  TIMING: {
    START: 10 * 1000, // time for the countdown before a new trial starts
    BREAK: 60 * 1000, // break duration in seconds
    STIMULI: 3000, // stimuli duration in milliseconds
    FIXATION: 400, // fixation duration in milliseconds
    JITTER: 200, // jitter duration in milliseconds
    FEEDBACK: 1000, // feedback duration in milliseconds
    ITI: 1000, // inter-trial interval in milliseconds
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
  RUN_JATOS: true, // a switch to run the experiment on JATOS
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
