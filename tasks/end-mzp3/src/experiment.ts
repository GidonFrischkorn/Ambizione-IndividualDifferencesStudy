/**
 * @title End Questionnaire - MZP 3: Ambizione Study
 * @description
 * @author Gidon Frischkorn
 * @version end3_final
 *
 * @assets assets/
 */

// import stylesheets (.scss or .css).
import "../styles/main.scss";

// jsPsych official plugin
import preload from "@jspsych/plugin-preload";
import survey from "@jspsych/plugin-survey";
import jsPsychHtmlButtonResponse from "@jspsych/plugin-html-button-response";
import "@jspsych/plugin-survey/css/survey.css";

// Global variables
import { jsPsych } from "./jsp";
import { expInfo } from "./settings";

// screens
import { participant_code, extract_code } from "./survey/participant_code";
import { end_questionnaire } from "./survey/followup";
import { bfi2 } from "./survey/big5";
import { bfi2_scores } from "./survey/big5_scores.ts";

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
  const followup_pages = end_questionnaire(expInfo.LANG, 3);

  /************************************** Big-5 ************************************/
  const bfi2_line = bfi2(expInfo.LANG, expInfo.DESIGN.BFI2_type, true);


  // Combine all survey pages
  var survey_pages: any[] = [];
  survey_pages.push(id_page);
  survey_pages.push(...followup_pages);
  if(expInfo.DESIGN.ADD_BFI2) {
    survey_pages.push(...bfi2_line);
  }

  // Create Survey
  const end_survey = {
    type: survey,
    survey_json: {
      showQuestionNumbers: false,
      title:
        "Schlussbefragung MZP 3:\n Grundlagen Kognitiver Leistungsfähigkeit",
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
    }
  };

  // Create End Screen
  var end_screen = {
    type: jsPsychHtmlButtonResponse,
    stimulus: '<h1> Fertig </h1>' +
      '<p> Herzlichen Glückwunsch! Sie haben alle Aufgaben des 3. Messzeitpunkts der Studie' +
      ' zu den Grundlagen kognitiver Leistungsfähigkeit erfolgreich abgeschlossen. </p>' +
      '<p> Vielen Dank für Ihre Teilnahme! </p>' +
      '<p> Klicken Sie unten auf "Fertig" und melden Sie sich dann bitte bei der Studienleitung </p>' ,
    choices: ['Fertig'],
  };

  // Push all the screen slides into timeline
  // When you want to test the experiment, you can easily comment out the screens you don't want
  timeline.push(preload_screen);
  timeline.push(end_survey);
  timeline.push(end_screen);
  
  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  return jsPsych;
}
