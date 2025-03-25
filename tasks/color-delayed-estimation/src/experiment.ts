/**
 * @title Color Delayed Estimation Task
 * @description In this task participants see a cloud of color (red or blue) dots and should decide if there are more red or blue dots.
 * @author Elena Venturi
 * @version color_DE_final
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
import { consent_screen, notice_screen } from "./instructions/consent";
import { participant_code, extract_code } from "./survey/participant_code";
import { browser_screen } from "./instructions/browserCheck";
import { createNewTrial } from "./trials/trialProcess";
import { expInfo } from "./settings";
import { pra_instr_screen, exp_start_screen } from "./instructions/InstrTrial";
import { fullMode_screen } from "./instructions/fullScreen";
import { instructions_screen, break_screen } from "./instructions/InstrStart";
import { create_trialList } from "./trials/trialStim";

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
    //images: assetPaths.images,
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
        "Teilnehmer Code: Color Delayed Estimation Task",
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
  
  // For every set size 3 practice trials 
  let prac_line: any[] = [];
  let setSizes = expInfo.DESIGN.CONDITIONS.SETSIZE;

  for (let setSize of setSizes) {
    // Create 3 trials for each set size
    for (let i = 0; i < expInfo.DESIGN.nPRACTICE; i++) {
      let prac_trial = createNewTrial(setSize, true, [0]);
      prac_line = prac_line.concat(prac_trial);
    }
  }

  /************************************** Experiment **************************************/
  
  const trial_list = create_trialList();
  console.log(trial_list);
  let exp_line: any[] = [];
  
  
  for (let i = 0; i < trial_list.length; i++) {
    let exp_trial = createNewTrial(trial_list[i].setsize, false, [0]);
    exp_line = exp_line.concat(exp_trial);
}
  

  /************************************** Procedure **************************************/

  // Push all the screen slides into timeline
  // When you want to test the experiment, you can easily comment out the screens you don't want
  timeline.push(preload_screen);
  timeline.push(id_survey);
  timeline.push(welcome_screen);
  // timeline.push(consent_screen);
  // timeline.push(notice_screen);
  timeline.push(browser_screen);
  // timeline.push(fullMode_screen);
  timeline.push(instructions_screen);
  timeline.push(pra_instr_screen);
  timeline = timeline.concat(prac_line);
  timeline.push(exp_start_screen);
  timeline = timeline.concat(exp_line);

  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  return jsPsych;
}
