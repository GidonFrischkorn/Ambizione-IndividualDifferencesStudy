
import { imageObj } from "./task-fun/imageObject";

export const expInfo = {
  // settings for the experiment
  TITLE: "keep_track_task", // the title of the experiment
  RESEARCHER: "GF", // researcher's name
  EMAIL: "gidon.frischkorn@psychologie.uzh.ch", // researcher's email
  DURATION: 15, // duration of the experiment in minutes
  LANG: "de", // the language of the experiment

  RETRIEVAL_MATRIX: {
    n_columns: 4,
    n_rows: 3,
  },

  // experiment design
  DESIGN: {
    nPRACTICE: 3, // number of memory trials in the retro-cue condition
    nTRIALS: 10, // number of experiment trials for each condition
    SETSIZE: 4, // set size
    UPDSTEP: 2, // updating steps
    nNPL: (3 * 4) - 4 - 2, // number of not-presented lures
  },

  OBJECTS: {
    imagePath: "assets/images/objects/",
    POOL: Object.keys(imageObj),
    letterPOOL: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    MEMORY: {} as { [key: number]: string[] },
    SIZE: "80px",
  },

  COLORS: {
    BG_NAME: "white",
    BACKGROUND: "#FFFFFF",
    POOL: [
      "#2e8b57",
      "#ff0000",
      "#ffd700",
      "#c71585",
      "#00ff00",
      "#0000ff",
      "#1e90ff",
    ],
  },

  // settings for each trial
  TIMING: {
    ENCODING: 1500, // presentation time of each stimulus in milliseconds
    UPDATING: 1500, // updating time in milliseconds
    ISI: 1000, // inter-stimulus interval in milliseconds
    IPI: 1000, // inter-phase interval in milliseconds
    START: 10 * 1000, // time for the countdown before a new trial starts
    BREAK: 30, // break duration in seconds
    RETRIEVAL: 10 * 1000, // time for retrieval
    DEBRIEF: 2000, // time for feedback
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

