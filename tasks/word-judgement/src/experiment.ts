/**
 * @title Word Processing Task
 * @description Participant has to tell whether the word represents somthing animate or inanimate.
 * @author Elena Venturi
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
import { expInfo } from "./settings";

// screens
import { welcome_screen } from "./instructions/welcome";
import { consent_screen, notice_screen } from "./instructions/consent";
import { browser_screen } from "./instructions/browserCheck";
import { fullMode_screen } from "./instructions/fullScreen";
import { exp_start_screen, pra_instr_screen } from "./instructions/InstrTrial";
import { createNewTrial } from "./trials/trialProcess";
import { create_trialList, chooseStimuli } from "./trials/trialStim";
import { instructions_screen } from "./instructions/InstrScreen";
import { fingers_instructions_practice } from "./instructions/InstrScreen";
import { fingers_instructions_exp } from "./instructions/InstrScreen";
import { words } from "./../assets/stimuli";

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
  let usedWords: string[] = [];

  const prac_list = create_trialList();
  console.log(prac_list);
  
  let practice_line: any[] = [];
  for (let j = 0; j < expInfo.DESIGN.nPRACTICE; j++) {
    usedWords.push(prac_list[j].stimulus.word);
    
    // if experiment is conducted in the lab, box (3rd parameter) is true, when online, box is false
    let practice_trial = createNewTrial(j, true, expInfo.RESPONSE_BOX, prac_list[j].word_animacy, prac_list[j].word_length, prac_list[j].stimulus.word);
    practice_line = practice_line.concat(practice_trial);

  }
  console.log(usedWords);
  /************************************** Experiment **************************************/

  const trial_list = create_trialList(usedWords);
  console.log(trial_list);

  let exp_line: any[] = [];
  for(let j = 0; j < trial_list.length; j++){
    // if experiment is conducted in the lab, box (3rd parameter) is true, when online, box is false
    let exp_trial = createNewTrial(j, false, expInfo.RESPONSE_BOX, trial_list[j].word_animacy, trial_list[j].word_length, trial_list[j].stimulus.word);
    exp_line = exp_line.concat(exp_trial);
  }

  /************************************** Procedure **************************************/

  // Push all the screen slides into timeline
  // When you want to test the experiment, you can easily comment out the screens you don't want
  timeline.push(preload_screen);
  timeline.push(welcome_screen);
  //timeline.push(consent_screen);
  //timeline.push(notice_screen);
  timeline.push(browser_screen);
  // timeline.push(fullMode_screen);
  timeline.push(instructions_screen);
  timeline.push(pra_instr_screen);
  timeline.push(fingers_instructions_practice);
  timeline = timeline.concat(practice_line);
  timeline.push(exp_start_screen);
  timeline.push(fingers_instructions_exp);
  timeline = timeline.concat(exp_line);

  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  // return jsPsych;
}
