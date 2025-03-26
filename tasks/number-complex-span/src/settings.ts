
import { imageObj } from "./task-fun/imageObject";
import { random } from "@coglabuzh/webpsy.js";



export const expInfo = {
  // settings for the experiment
  TITLE: "complex_span", // the title of the experiment
  RESEARCHER: "Gidon Frischkorn", // researcher's name
  EMAIL: "gidon.frischkorn@psychologie.uzh.ch", // researcher's email
  DURATION: 20, // duration of the experiment in minutes
  LANG: "de", // the language of the experiment

  // experiment design
  DESIGN: {
    nPRACTICE_RETRO: 1, //3, // number of memory trials in the retro-cue condition
    nJUDGE: 1, // 3, // number of judgement trials
    nDUAL: 1, //3, // number of dual-task trials
    nTRIALS: 2, //15 // number of experiment trials for each condition
    SETSIZE: 3, // set size
    QUESTION: "question", // questions
    ROWS_ResponseMat: 3, // number of rows in the response matrix
    COLS_ResponseMat: 4, // number of columns in the response matrix
  },

  OBJECTS: {
    imagePath: "assets/images/objects/",
    CONTROL_OBJECT: "image26",
    POOL: Object.assign({}, imageObj),
    MEMORY: {} as { [key: number]: object },
  },

  NUMBERS: {
    POOL: Array.from({ length: 90 }, (_, i) => i + 10), // Numbers from 10 to 99 (2 digits)
    MEMORY: {} as { [key: number]: number[] },
  },

  COLORS: {
    BG_NAME: "white",
    BACKGROUND: "#FFFFFF",
    POOL: [
      "#2e8a3c",
      "#e9ae0c",
      "#e35431",
      "#c81919",
      "#299ac7",
      "#4d3bb5",
      "#b234a1",
    ],
  },

  // settings for each trial
  TIMING: {
    STIMULUS: 2000, // presentation time of each stimulus in milliseconds
    PRECUE: 700, // time for the precue in milliseconds
    RETROCUE: 1000, // time for the retrocue in milliseconds
    START: 10 * 1000, // time for the countdown before a new trial starts
    BREAK: 30, // break duration in seconds
    RETRIEVAL: 10 * 1000, // time for retrieval
    DEBRIEF: 1500, // time for feedback
  },

  SIZE: {
    WINDOW_RATIO: 16 / 9,
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

  // Running environment variables
  RUN_JATOS: false, // a switch to run the experiment on JATOS
  RUN_PROLIFIC: false, // a switch to run the experiment on Prolific
};

let maxWidth = Math.min(screen.width, screen.height * expInfo.SIZE.WINDOW_RATIO)

// Global variables for the system. Normally, you don't need to change them.
export const varSystem = {
  TRACK: false, // a switch to track participants' interactions with the browser
  nBLUR: 0, // use to count how many times participants left the browser
  MAX_BLUR: 3, // the maximum number of times participants can leave the browser
  FAILED_ATTENTION_CHECK: false,
  CANVAS_WIDTH: maxWidth * 0.95,
  CANVAS_HEIGHT: maxWidth * 0.95 / expInfo.SIZE.WINDOW_RATIO,
  PAGE_WIDTH: Math.min(maxWidth, 1300) * 0.95,
  RUN_TIMER: false, // a switch to control the countdown timer
  STATUS: "success", // the status of the experiment
};

