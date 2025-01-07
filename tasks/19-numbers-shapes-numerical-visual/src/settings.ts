// import
import { jsPsych } from "./jsp";
import { setCSS } from "./task-fun/setCSS";
import { random } from "@coglabuzh/webpsy.js";

setCSS();

export const varOnline = {
  RUN_JATOS: false, // true, if you run your experiment in jatos
  RUN_PROLIFIC: false, // true, if you run your experiment in Prolific
  COMPLETION_CODE: "C4G0SAV6", // for Prolific
  FAIL_CODE: "C17WAN5T", // for Prolific
  INTERNET_CODE: "CUX6ZJG1", // for Prolific
  DRIVE_LINK: "https://drive.switch.ch/index.php/s/NposiPszFpv6Lfg",
};

export const varSystem = {
  TRACK: false, // a switch to track participants' interactions with the browser
  nBLUR: 0, // use to count how many times participants left the browser
  MAX_BLUR: 3, // the maximum number of times participants can leave the browser
  LOOP: true, // a switch to control whether participants need to read the instruction and practice again
  FAILED_ATTENTION_CHECK: false,
  STATUS: "offline",
};

// define experimental variables and color condition
export function MakeExpInfo(task_condition) {
  // determine task condition
  var exp_task = 'declarative';

  // objects
  var stimuli = [
    "assets/images/task_objects/object0.png",
    "assets/images/task_objects/object1.png",
    "assets/images/task_objects/object2.png",
    "assets/images/task_objects/object3.png",
    "assets/images/task_objects/object4.png",
    "assets/images/task_objects/object5.png",
    "assets/images/task_objects/object6.png",
    "assets/images/task_objects/object7.png",
  ];

  // define object with experimental variables
  const expInfo = {
    // experiment name
    exp_name: "BindingNumerical" + exp_task, // experiment name

    // define list conditions
    list_condition: ["Control", "Control", "Hebb"], // list conditions

    // number of blocks and trials
    n_finger_check_trials: 8, // number of finger check trials
    n_proc_speed_trials: 64, // number of processing speed trials 64
    n_prac_trials: 8, // number of practice trials
    n_exp_trials: 3, // number of experiment trials within mini block
    n_finger_check_blocks: 1, // number of finger check blocks
    n_proc_speed_blocks: 1, // number of processing speed blocks
    n_prac_blocks: 1, // number of practice blocks
    n_exp_blocks: 20, // number of experimental blocks --> too long?
    n_blocks_break: 4, // number of mini blocks before break
    repeat_controls_stims_after: 4, // number of times control stimuli are repeated

    // number of slides for isntructions
    n_proc_speed_slides_dec: 9,
    n_prac_slides_dec: 11,
   
    // set sizes and certain variable values
    setsize: 5, // number of stimulus in experimental trials
    prac_setsize: [1, 1, 2, 2, 3, 3, 5, 5], // setsizes for practice trials
    stim_count: 90, // number of stimuli (10-99)
    stim_index_dec: random.sample(
      Array.from(Array(90).keys()).map((i) => i + 10),
      90
    ),
    stim_index_proc: random.sample(
      Array.from(Array(90).keys()).map((i) => i + 10),
      90
    ),
    online_resp_keys: ["a", "s", "d", "f", "h", "j", "k", "l"], // response keys if experiment is run online
    lab_resp_keys: ['a', 's', 'd', 'alt', 'control', 'j', 'k', 'l'], // response keys if experiment is run in the lab with the response box
    pos: Array.from(Array(8).keys()), // positions of responses (0-7)

    // define objects
    objects: stimuli,
    objects_name: [
      "object0",
      "object1",
      "object2",
      "object3",
      "object4",
      "object5",
      "object6",
      "object7",
    ], // objects names

    // define color for circle in finger check and procedural task
    response_dot_col: "red",

    // canvas locations and font sizes
    canW: Math.min(screen.width, (screen.height / 9) * 16) * 0.9, // width of the canvas
    canH: Math.min(screen.width, (screen.height / 9) * 16) * 0.9 * 0.5, // height of the canvas
    center: [
      (Math.min(screen.width, (screen.height / 9) * 16) * 0.9) / 2,
      (Math.min(screen.width, (screen.height / 9) * 16) * 0.9 * 0.5) / 2,
    ], // center of canvas
    left: Math.min(screen.width, (screen.height / 9) * 16) * 0.9 * 0.4, // left position of canvas
    right: Math.min(screen.width, (screen.height / 9) * 16) * 0.9 * 0.6, // right position of canvas
    top: Math.min(screen.width, (screen.height / 9) * 16) * 0.9 * 0.5 * 0.3, // top position of canvas
    bottom: Math.min(screen.width, (screen.height / 9) * 16) * 0.9 * 0.5 * 0.7, // bottom position of canvas

    // font size
    font_cues:
      Math.min(
        Math.min(window.innerWidth, window.innerHeight * 1.5) * 0.95,
        1200
      ) *
        0.02 *
        1.5 +
      "px Arial",

    // timings
    enc_time: 2000,
    isi: 500,
    max_rt: 10000,
    fix_time: 500,
    cue_time: 1000,
    iti: 1000,
    feedback_time: 800,
    info_time: 4000,
    resp_stim_time: 1000,

    // paths and file names
    image_path: "assets/images/task_objects/",
    path_response: "assets/images/task_objects" + "/",
    image_path_finger_check: "assets/images/Finger_Check/",
    instr_path: "assets/images/",
    response_image: "resp.jpg",
    finger_image: "finger_allocation.jpg",
  };

  // return experimental variables
  return expInfo;
}
