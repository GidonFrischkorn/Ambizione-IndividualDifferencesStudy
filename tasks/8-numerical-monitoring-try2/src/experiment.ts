/**
 * @title The name of the task
 * @description A short description of the task
 * @author Chenyu Li and Hannah (Dames) Tschannen
 * @version 0.3.1
 *
 *
 * @assets assets/
 */

// import stylesheets (.scss or .css).
import "../styles/main.scss";

// jsPsych official plugin
import preload from "@jspsych/plugin-preload";

// Global variables
import { jsPsych } from "./jsp";

// screens
import { welcome_screen } from "./instructions/welcome";
import { consent_screen, notice_screen } from "./instructions/consent";
import { browser_screen } from "./instructions/browserCheck";
import { generateStims, createTrialList } from "./trials/trialStim";
import { createNewTrial } from "./trials/trialProcess";
import { expInfo } from "./settings";
import { practice_break_screen, break_screen } from "./instructions/InstrStart";

/**
 * This function will be executed by jsPsych Builder and is expected to run the jsPsych experiment
 *
 * @type {import("jspsych-builder").RunFunction}
 */
export async function run({
  assetPaths,
  input = {},
  environment,
  title,
  version,
}) {
  // Initialize a timeline to hold the trials
  var timeline: any[] = [];

  // Preload assets
  const preload_screen = {
    type: preload,
    images: assetPaths.images,
    // audio: assetPaths.audio,
    // video: assetPaths.video,
  };

  /************************************** Instruction **************************************/


  /************************************** Practice **************************************/
  let prac_list = createTrialList();
  console.log("Prac List: ", prac_list)
  let practice_line: any[] = [];
  //let gridNumbers = generateStims(false);

for (let i = 0; i < expInfo.DESIGN.nPRACTICE * expInfo.DESIGN.practiceBLOCKS; i++) {
  var practice_trial = createNewTrial(i, true, prac_list[i].condition, prac_list[i].numbers);
  practice_line = practice_line.concat(practice_trial);
  
  if ((i + 1) % 10 === 0 && (i + 1) <= 19) {
    practice_line.push(practice_break_screen);
  }
}
console.log("Practice Line: ", practice_line)


  /************************************** Experiment **************************************/
  let exp_list = createTrialList();
  console.log("Exp List: ", exp_list)
  let expLine: any[] = [];
  //let gridNumbersExp = generateStims(false);
  
  for (let j = 0; j < expInfo.DESIGN.nTRIALS * expInfo.DESIGN.nBLOCKS; j++) {

    console.log("cond: ", exp_list[j].condition)
    console.log("numb: ", exp_list[j].numbers)
    console.log("trial: ", expInfo.DESIGN.nTRIALS)
    
    var exp_trial = createNewTrial(j, false, exp_list[j].condition, exp_list[j].numbers);
      console.log("trial: ", exp_trial)
    expLine = expLine.concat(exp_trial);
    console.log(expLine)

    if ((j + 1) % 50 === 0 && (j + 1) <= 199) {
      expLine.push(break_screen);
    }
  }
  
  console.log("Experiment Line: ", expLine)

  /************************************** Procedure **************************************/


  // Push all the screen slides into timeline
  // When you want to test the experiment, you can easily comment out the screens you don't want
  //timeline.push(preload_screen);
  //timeline.push(welcome_screen);
  //timeline.push(consent_screen);
  //timeline.push(notice_screen);
  //timeline.push(browser_screen);
  //timeline = timeline.concat(practice_line);
  timeline = timeline.concat(expLine);

  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  // return jsPsych;
}
