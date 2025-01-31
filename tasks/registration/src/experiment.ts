/**
 * @title Registration: Ambizione Study
 * @description This experiment will collect individuals interested in the Ambizione Study, collect some demographic data, and questionnaire data.
 * @author Gidon Frischkorn
 * @version 0.3.1
 *
 *
 * @assets assets/
 */

// import stylesheets (.scss or .css).
import "../styles/main.scss";

// jsPsych official plugin
import preload from "@jspsych/plugin-preload";
import survey from "@jspsych/plugin-survey";
import "@jspsych/plugin-survey/css/survey.css";

// Global variables
import { jsPsych } from "./jsp";
import { expInfo } from "./settings";

// screens
import { welcome_screen } from "./instructions/welcome";
import { consent_screen } from "./instructions/consent";
import { participant_code } from "./survey/participant_code";
import { demographics } from "./survey/demographics";
import { bmw3 } from "./survey/bmw3";
import { bfi2 } from "./survey/big5";
import { nfc } from "./survey/nfc";
import { isi_questionnaire } from "./survey/isi";
import { mini_q } from "./survey/mini-q.ts";
import { bmw3_scores } from "./survey/bmw3_scores.ts";
import { bif2_scores } from "./survey/big5_scores.ts";
import { nfc_scores } from "./survey/nfc_scores.ts";

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

  /************************************** Information: Ambizione Study **************************************/
  const id_page = participant_code("DE");
  console.log(id_page);

  /************************************** Demographic Data **************************************/
  const demographic_page = demographics("DE");

  /************************************** BMW-3 **************************************/
  const bmw3_page = bmw3("DE");

  /************************************** Big-5 **************************************/
  const bfi2_line = bfi2("DE", "short", true);

  /************************************** NFC **************************************/
  const nfc_page = nfc("DE");

  /************************************** ISI **************************************/
  const isi_page = isi_questionnaire("DE");


  // Combine all survey pages
  var survey_pages: any[] = [];
  survey_pages.push(id_page);
  survey_pages.push(demographic_page);

  // add the questionnaires dependent on settings
  if (expInfo.DESIGN.ADD_BMW3) {
    survey_pages.push(bmw3_page);
  }

  if (expInfo.DESIGN.ADD_BFI2) {
    survey_pages = survey_pages.concat(bfi2_line);
  }

  if (expInfo.DESIGN.ADD_NFC) {
    survey_pages.push(nfc_page);
  }

  if (expInfo.DESIGN.ADD_ISI) {
    survey_pages.push(isi_page);
  }

  const registration_survey = {
    type: survey,
    survey_json: {
      showQuestionNumbers: false,
      title:
        "Registrierung: Interesse an der Studie zu kognitiver Leistungsfähigkeit",
      pages: survey_pages,
    },
    on_finish: function (data) {
      // Get responses from questionnaires
      const search_object = jsPsych.data.get().values()[1].response



      // BMW-3 scale scores
      if (expInfo.DESIGN.ADD_BMW3) {
        const bmw3_scale_scores = bmw3_scores(search_object, expInfo);
        data.bmw3_i_score = bmw3_scale_scores[0];
        data.bmw3_ui_score = bmw3_scale_scores[1];
        data.bmw3_ma_score = bmw3_scale_scores[2];
      };
      
      // BFI-2 scale scores
      if (expInfo.DESIGN.ADD_BFI2) {
        const bif2_scale_scores = bif2_scores(search_object, expInfo);
        data.bif2_e_score = bif2_scale_scores[0];
        data.bif2_v_score = bif2_scale_scores[1];
        data.bif2_g_score = bif2_scale_scores[2];
        data.bif2_ne_score = bif2_scale_scores[3];
        data.bif2_o_score = bif2_scale_scores[4];
      };

      // NFC scale scores
      if (expInfo.DESIGN.ADD_NFC) {
        const nfc_scale_scores = nfc_scores(search_object, expInfo);
        data.nfc_score = nfc_scale_scores;
      };
      
      console.log(data.nfc_score)
    }
  };

  // Push all the screen slides into timeline
  // When you want to test the experiment, you can easily comment out the screens you don't want
  timeline.push(preload_screen);
  // timeline.push(welcome_screen);
  // timeline.push(consent_screen);
  // timeline.push(mini_q_test);
  timeline.push(registration_survey);

  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  // return jsPsych;
}
