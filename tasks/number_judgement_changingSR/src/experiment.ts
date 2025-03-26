/**
 * @title Digit Processing Task 
 * @description Participant has to tell whether the number is odd or even as fast as possible. 
 * @author Elena Venturi 
 * @version number_judgement_SR_pretest
 *
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
import { expInfo } from "./settings";

// screens
import { welcome_screen } from "./instructions/welcome";
import { participant_code, extract_code } from "./survey/participant_code";
import { consent_screen, notice_screen } from "./instructions/consent";
import { browser_screen } from "./instructions/browserCheck";
import { fullMode_screen } from "./instructions/fullScreen";
import { exp_start_screen, pra_instr_screen } from "./instructions/InstrTrial";
import { createNewTrial } from "./trials/trialProcess";
import { create_trialList } from "./trials/trialStim";
import { 
  instructions_screen, 
  fingers_instructions_exp, 
  fingers_instructions_exp_BOX,
  fingers_instructions_practice_BOX,
  fingers_instructions_practice } from "./instructions/InstrScreen";


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
        "Teilnehmer Code: Number Judgement Task (changing SR)",
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

  /************************************** Practice **************************************/
  const prac_list = create_trialList();

  let practice_line: any[] = [];
  for(let j = 0; j < expInfo.DESIGN.nPRACTICE; j++){

    // if experiment is conducted in the lab, box (3rd parameter) is true, when online, box is false
    let practice_trial = createNewTrial(j, true, expInfo.USE_RESPONSEBOX, prac_list[j].condition, prac_list[j].stimulus, prac_list[j].mapping);
    practice_line = practice_line.concat(practice_trial);
  }

  /************************************** Experiment **************************************/
  const trial_list = create_trialList();

  let exp_line: any[] = [];
  for(let j = 0; j < trial_list.length; j++){

    // if experiment is conducted in the lab, box (3rd parameter) is true, when online, box is false
    let exp_trial = createNewTrial(j, false, expInfo.USE_RESPONSEBOX, trial_list[j].condition, trial_list[j].stimulus, trial_list[j].mapping);
    exp_line = exp_line.concat(exp_trial);
  }

  /************************************** Procedure **************************************/

  // Push all the screen slides into timeline
  // When you want to test the experiment, you can easily comment out the screens you don't want
  timeline.push(preload_screen);
  timeline.push(id_survey);
  // timeline.push(welcome_screen);
  //timeline.push(consent_screen);
  //timeline.push(notice_screen);
  timeline.push(browser_screen);
  timeline.push(fullMode_screen);
  timeline.push(instructions_screen);
  timeline.push(pra_instr_screen);
  if (expInfo.USE_RESPONSEBOX) {
    timeline.push(fingers_instructions_practice_BOX)
  } else {
    timeline.push(fingers_instructions_practice);
  }
  timeline = timeline.concat(practice_line);
  timeline.push(exp_start_screen);
  if (expInfo.USE_RESPONSEBOX) {
    timeline.push(fingers_instructions_exp_BOX)
  } else {
    timeline.push(fingers_instructions_exp);
  }
  timeline = timeline.concat(exp_line);

  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  return jsPsych;
}
