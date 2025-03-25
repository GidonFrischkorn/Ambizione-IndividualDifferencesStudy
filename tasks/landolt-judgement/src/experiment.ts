/**
 * @title Landolt Gap Processing Task
 * @description One rectangle is presented with a gap on the left and on the right side.
 * The participant has to indicat on which side the gap is bigger.
 * @author Elena Venturi
 * @version landolt_judgement_final
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

// screens
import { welcome_screen } from "./instructions/welcome";
import { consent_screen, notice_screen } from "./instructions/consent";
import { participant_code, extract_code } from "./survey/participant_code";
import { browser_screen } from "./instructions/browserCheck";
import { create_trialList } from "./trials/trialStim";
import { createNewTrial } from "./trials/trialProcess";
import { expInfo } from "./settings";
import { pra_instr_screen, exp_start_screen } from "./instructions/InstrTrial";
import { fullMode_screen } from "./instructions/fullScreen";
import {
  instructions_screen,
  fingers_instructions_practice,
  fingers_instructions_exp,
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
  };

  /************************************** Participant Code ******************************/
  const id_page = participant_code(expInfo.LANG);
  const id_survey = {
    type: survey,
    survey_json: {
      showQuestionNumbers: false,
      title:
        "Teilnehmer Code: Landolt Judgement Task",
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
  for (let j = 0; j < expInfo.DESIGN.nPRACTICE; j++) {
    let practice_trial = createNewTrial(
      j,
      true,
      expInfo.USE_RESPONSEBOX, // if experiment is conducted in the lab, box (3rd parameter) is true, when online, box is false
      prac_list[j].difficutly,
      prac_list[j].offset_diff,
      prac_list[j].offset_bigL,
      prac_list[j].offset_bigR,
      prac_list[j].offset_location_right,
      prac_list[j].offset_location_left,
      prac_list[j].stimulus
    );
    practice_line = practice_line.concat(practice_trial);
  }
  console.log(practice_line);

  /************************************** Experiment **************************************/
  const trial_list = create_trialList();

  let exp_line: any[] = [];
  for (let j = 0; j < trial_list.length; j++) {
    let exp_trial = createNewTrial(
      j,
      false,
      expInfo.USE_RESPONSEBOX, // if experiment is conducted in the lab, box (3rd parameter) is true, when online, box is false
      trial_list[j].difficulty,
      trial_list[j].offset_diff,
      trial_list[j].offset_bigL,
      prac_list[j].offset_bigR,
      trial_list[j].offset_location_right,
      prac_list[j].offset_location_left,
      trial_list[j].stimulus
    );
    exp_line = exp_line.concat(exp_trial);

    if (
      j + 1 != trial_list.length && // don't add a break screen at the end
      (j + 1) % (trial_list.length * expInfo.DESIGN.BreaksAt) === 0 // add a break screen as specified by BreaksAt proportion of trials
    ) {
      exp_line.push(break_screen);
    }
  }
  console.log(exp_line);

  /************************************** Procedure **************************************/

  // Push all the screen slides into timeline
  // When you want to test the experiment, you can easily comment out the screens you don't want
  timeline.push(preload_screen);
  timeline.push(id_survey);
  // timeline.push(welcome_screen);
  // timeline.push(consent_screen);
  // timeline.push(notice_screen);
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
  return jsPsych;
}
