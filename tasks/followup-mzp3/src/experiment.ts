/**
 * @title Follow Up - MZP 3: Ambizione Study
 * @description This experiment will collect individuals interested in the Ambizione Study, collect some demographic data, and questionnaire data.
 * @author Gidon Frischkorn
 * @version followup1_final
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
import { id_screen } from "./instructions/participant_id";
import { participant_code, extract_code } from "./survey/participant_code";
import { followup } from "./survey/followup";
import { bmw3 } from "./survey/bmw3";
import { bfi2 } from "./survey/big5";
import { nfc } from "./survey/nfc";
import { isi_questionnaire } from "./survey/isi";
import { mini_q } from "./survey/mini-q.ts";
import { bmw3_scores } from "./survey/bmw3_scores.ts";
import { bfi2_scores } from "./survey/big5_scores.ts";
import { nfc_scores } from "./survey/nfc_scores.ts";
import { ishihara_test } from "./task-fun/ishihara.ts";

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

  /************************** Information: Ambizione Study *************************/
  const id_page = participant_code(expInfo.LANG);

  /************************************** Demographic Data *************************/
  const followup_pages = followup(expInfo.LANG, 1);

  /************************************** BMW-3 ************************************/
  const bmw3_page = bmw3(expInfo.LANG);

  /************************************** Big-5 ************************************/
  const bfi2_line = bfi2(expInfo.LANG, expInfo.DESIGN.BFI2_type, true);

  /************************************** NFC **************************************/
  const nfc_page = nfc(expInfo.LANG);

  /************************************** ISI **************************************/
  const isi_page = isi_questionnaire(expInfo.LANG);

  /********************* ISHIHARA TEST  ********************************************/
  const ishihara_page = ishihara_test(expInfo.LANG);


  // Combine all survey pages
  var survey_pages: any[] = [];
  survey_pages.push(id_page);
  survey_pages = survey_pages.concat(followup_pages);

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
        "Nachbefragung MZP 3:\n Grundlagen Kognitiver Leistungsfähigkeit",
      pageNextText: "Weiter",
      pagePrevText: "Zurück",
      completeText: "Fertig",
      showProgressBar: "top",
      progressBarShowPageNumbers: true,
      progressBarShowPageTitles: true,
      pages: survey_pages,
      
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

      // BMW-3 scale scores
      if (expInfo.DESIGN.ADD_BMW3) {
        const bmw3_scale_scores = bmw3_scores(search_object, expInfo);

        data.bmw3_i_sum = bmw3_scale_scores[0][0];
        data.bmw3_ui_sum = bmw3_scale_scores[0][1];
        data.bmw3_ma_sum = bmw3_scale_scores[0][2];

        data.bmw3_i_mean = bmw3_scale_scores[1][0];
        data.bmw3_ui_mean = bmw3_scale_scores[1][1];
        data.bmw3_ma_mean = bmw3_scale_scores[1][2];
      };
      
      // BFI-2 scale scores
      if (expInfo.DESIGN.ADD_BFI2) {
        const bif2_scale_scores = bfi2_scores(search_object, expInfo);
        
        if (expInfo.DESIGN.BFI2_type === "extra-short") {
          data.bif2_extraversion_sum = bif2_scale_scores[0][0];
          data.bif2_agreeableness_sum = bif2_scale_scores[0][1];
          data.bif2_conscientiousness_sum = bif2_scale_scores[0][2];
          data.bif2_emotional_stability_sum = bif2_scale_scores[0][3];
          data.bif2_openness_sum = bif2_scale_scores[0][4];

          data.bif2_extraversion_mean = bif2_scale_scores[1][0];
          data.bif2_agreeableness_mean = bif2_scale_scores[1][1];
          data.bif2_conscientiousness_mean = bif2_scale_scores[1][2];
          data.bif2_emotional_stability_mean = bif2_scale_scores[1][3];
          data.bif2_openness_mean = bif2_scale_scores[1][4];
        } else {
          data.bif2_extraversion_sum = bif2_scale_scores[0][0];
          data.bif2_agreeableness_sum = bif2_scale_scores[0][1];
          data.bif2_conscientiousness_sum = bif2_scale_scores[0][2];
          data.bif2_emotional_stability_sum = bif2_scale_scores[0][3];
          data.bif2_openness_sum = bif2_scale_scores[0][4];

          data.bif2_sociability_sum = bif2_scale_scores[1][0];
          data.bif2_assertiveness_sum = bif2_scale_scores[1][1];
          data.bif2_energy_level_sum = bif2_scale_scores[1][2];
          data.bif2_compassion_sum = bif2_scale_scores[1][3];
          data.bif2_respectfulness_sum = bif2_scale_scores[1][4];
          data.bif2_trust_sum = bif2_scale_scores[1][5];
          data.bif2_organization_sum = bif2_scale_scores[1][6];
          data.bif2_productiveness_sum = bif2_scale_scores[1][7];
          data.bif2_responsibility_sum = bif2_scale_scores[1][8];
          data.bif2_anxiety_sum = bif2_scale_scores[1][9];
          data.bif2_depression_sum = bif2_scale_scores[1][10];
          data.bif2_emotional_volatility_sum = bif2_scale_scores[1][11];
          data.bif2_intellectual_curiosity_sum = bif2_scale_scores[1][12];
          data.bif2_aesthetic_sensitivity_sum = bif2_scale_scores[1][13];
          data.bif2_creative_imagination_sum = bif2_scale_scores[1][14];

          data.bif2_extraversion_mean = bif2_scale_scores[2][0];
          data.bif2_agreeableness_mean = bif2_scale_scores[2][1];
          data.bif2_conscientiousness_mean = bif2_scale_scores[2][2];
          data.bif2_emotional_stability_mean = bif2_scale_scores[2][3];
          data.bif2_openness_mean = bif2_scale_scores[2][4];

          data.bif2_sociability_mean = bif2_scale_scores[3][0];
          data.bif2_assertiveness_mean = bif2_scale_scores[3][1];
          data.bif2_energy_level_mean = bif2_scale_scores[3][2];
          data.bif2_compassion_mean = bif2_scale_scores[3][3];
          data.bif2_respectfulness_mean = bif2_scale_scores[3][4];
          data.bif2_trust_mean = bif2_scale_scores[3][5];
          data.bif2_organization_mean = bif2_scale_scores[3][6];
          data.bif2_productiveness_mean = bif2_scale_scores[3][7];
          data.bif2_responsibility_mean = bif2_scale_scores[3][8];
          data.bif2_anxiety_mean = bif2_scale_scores[3][9];
          data.bif2_depression_mean = bif2_scale_scores[3][10];
          data.bif2_emotional_volatility_mean = bif2_scale_scores[3][11];
          data.bif2_intellectual_curiosity_mean = bif2_scale_scores[3][12];
          data.bif2_aesthetic_sensitivity_mean = bif2_scale_scores[3][13];
          data.bif2_creative_imagination_mean = bif2_scale_scores[3][14];
        };
      };

      // NFC scale scores
      if (expInfo.DESIGN.ADD_NFC) {
        const nfc_scale_scores = nfc_scores(search_object, expInfo);
        data.nfc_sum = nfc_scale_scores[0];
        data.nfc_mean = nfc_scale_scores[1];
      };
      
    }
  };

  // Push all the screen slides into timeline
  // When you want to test the experiment, you can easily comment out the screens you don't want
  timeline.push(preload_screen);
  timeline.push(registration_survey);
  timeline = timeline.concat(ishihara_page);
  
  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  return jsPsych;
}
