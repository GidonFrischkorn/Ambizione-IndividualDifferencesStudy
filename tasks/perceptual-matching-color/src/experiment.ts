/**
 * @title Perceptual Matching Task
 * @description In this task participants have to match a visual feature (color, orientation, or shape) of a target stimulus as accuractely as possible.
 * @author Gidon Frischkorn
 * @version color_matching_final
 *
 * @assets assets/
 */

// import stylesheets (.scss or .css).
import "../styles/main.scss";

// jsPsych official plugin
import preload from "@jspsych/plugin-preload";
import survey from "@jspsych/plugin-survey";

// Global variables
import { jsPsych } from "./jsp";

// screens
import { welcome_screen } from "./instructions/welcome";
import { participant_code, extract_code } from "./survey/participant_code";
import { consent_screen, notice_screen } from "./instructions/consent";
import { browser_screen } from "./instructions/browserCheck";
import { createNewTrial } from "./trials/trialProcess";
import { expInfo } from "./settings";
import { pra_instr_screen, exp_start_screen } from "./instructions/InstrTrial";
import { fullMode_screen } from "./instructions/fullScreen";
import {
  instructions_color_screen,
  instructions_luminance_screen,
  break_screen,
} from "./instructions/InstrStart";

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

  /************************************** Participant Code ******************************/
  const id_page = participant_code(expInfo.LANG);
  const id_survey = {
    type: survey,
    survey_json: {
      showQuestionNumbers: false,
      title:
        "Teilnehmer Code: Perceptual Matching - Color",
      pages: [id_page],
    },
    on_finish: function (data) {
      // Get responses from questionnaires
      // if the welcome screen is not included: const search_object = jsPsych.data.get().values()[1].response
      const search_object = jsPsych.data.get().values()[1].response
      console.log(search_object);

      // Extract the participant code from the survey responses
      let participant_id = extract_code(search_object);
      console.log(participant_id);
      jsPsych.data.addProperties({participant_id: participant_id});
    }
  };
  
  let block_line: any[] = [];
  // Create two blocks one for color and one for orientation matching
  for (let j = 0; j < expInfo.DESIGN.CONDITIONS.feature.length; j++) {
    /************************************** Practice **************************************/
    const prac_trials = jsPsych.randomization.factorial(expInfo.DESIGN.CONDITIONS, 20, false);
    console.log(prac_trials);

    let prac_line: any[] = [];

    // Here we should create 9 practice trials for each feature 
    for (let i = 0; i < expInfo.DESIGN.nPRACTICE; i++) {
      let trial = createNewTrial(prac_trials[i].feature, prac_trials[i].trial_type, true, false);
      prac_line = prac_line.concat(trial);
    }

    /************************************** Experiment **************************************/
    const exp_trials = jsPsych.randomization.factorial(expInfo.DESIGN.CONDITIONS, expInfo.DESIGN.nTRIALS, false);
    console.log(exp_trials);

    // Here we need to create the trial_list with 50 trials for each feature 
    let exp_line: any[] = [];
    for (let k = 0; k < exp_trials.length; k++) {
      let trial = createNewTrial(exp_trials[k].feature, exp_trials[k].trial_type, false, false);
      exp_line = exp_line.concat(trial);
    }

    block_line = block_line.concat(prac_line);
    block_line.push(exp_start_screen);
    block_line = block_line.concat(exp_line);

    // Add a break screen + instructions for the second block 
    /*if (j === 0) { // After the first block
      block_line.push(instructions_luminance_screen);
    }*/
  }

  


  /************************************** Procedure **************************************/

  // Push all the screen slides into timeline
  // When you want to test the experiment, you can easily comment out the screens you don't want
  timeline.push(preload_screen);
  timeline.push(id_survey);
  // timeline.push(welcome_screen);
  // timeline.push(consent_screen);
  // timeline.push(notice_screen);
  timeline.push(browser_screen);
  timeline.push(fullMode_screen);
  timeline.push(instructions_color_screen);
  timeline.push(pra_instr_screen);
  timeline = timeline.concat(block_line);
  //timeline.push(exp_start_screen);
  // timeline.push(fingers_instructions_exp);
  // timeline = timeline.concat(exp_line);

  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  // return jsPsych;
}
