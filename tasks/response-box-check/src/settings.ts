/**
 * This file contains the settings for the experiment.
 */

// Task functions
import { setCSS } from "./task-fun/setCSS";

setCSS();

export const expInfo = {
  // settings for the experiment
  TITLE: "finger_check",
  LANG: "de", // the default language of the experiment
  
  // design of the experiment
  DESIGN: {
    FINGER_CHECK_NTRIALS: 8, // number of experiment trials for each condition
    FINGER_CHECK_NBLOCKS: 1 // number of blocks
  },

  // settings for each trial
  TIMING: {
    START: 10 * 1000, // time for the countdown before a new trial starts
    BREAK: 30, // break duration in seconds
    INFO: 3000, // Information screen duration in ms
    MAX_RT: 3 * 1000, // Max time to respond in ms
    ISI: 500, // Inter-stimulus interval duration in ms
    FEEDBACK_CORRECT: 1000, // Feedback duration in ms
    FEEDBACK_INCORRECT: 5000, // Feedback duration in ms
  },

  MATERIAL: {
    INSTRUCTION_PATH: 'assets/images/instructions/', // Path to the instruction images
    STIMULI_PATH: 'assets/images/stimuli/', // Path to the stimuli images
    RESPONSE_IMG: 'resp.jpg', // Name of the response hand image

    RESPONSE_KEYS_KEYBOARD: ['a', 's', 'd', 'f', 'h', 'j', 'k', 'l'], // Response keys for the task
    RESPONSE_KEYS_RESPONSE_BOX: ['a', 's', 'd', 'alt', 'control', 'j', 'k', 'l'], // Response keys for the task
    RESPONSE_POS: [0, 1, 2, 3, 4, 5, 6, 7], // Position of the response keys
    RESPONSE_DOT_COL: 'red', // Color of the dot in the encoding phase when responding (red)
      
  },

  LAYOUT: {
    CANW: Math.min(screen.width, screen.height/9*16)*0.9, // Width of the canvas
    CANH: (Math.min(screen.width, screen.height/9*16)*0.9) * 0.5, // Height of the canvas
    CENTER: [(Math.min(screen.width, screen.height/9*16)*0.9) / 2, 
            ((Math.min(screen.width, screen.height/9*16)*0.9) * 0.5) / 2], // Center x/y coordinate of canvas 
    FONT_SIZE: Math.min(Math.min(window.innerWidth, window.innerHeight * 1.5) * 0.95,1200) * 0.02 * 1.5 + "px", // Font size for text
    FONT_FAMILY: "Arial", // Font family for text
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
    CONTINUE: 'a',
  },

  // If you want to use the keyCode rather than key name,
  // you can go to the following link to get the key code:
  // https://www.toptal.com/developers/keycode/

  // Running environment variables
  RUN_JATOS: false, // a switch to run the experiment on JATOS
  RESPONSE_BOX: false, // a switch to run experiment with a response box
};

// Global variables for the system. Normally, you don't need to change them.
export const varSystem = {
  TRACK: false, // a switch to track participants' interactions with the browser
  nBLUR: 0, // use to count how many times participants left the browser
  MAX_BLUR: 3, // the maximum number of times participants can leave the browser
  LOOP: true, // a switch to control whether participants need to read the instruction and practice again
  RUN_TIMER: false, // a switch to control the countdown timer
  STATUS: "success_local", // the status of the experiment
};
