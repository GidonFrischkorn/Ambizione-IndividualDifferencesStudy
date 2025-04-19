/**
 * @title End Questionnaire - MZP 2: Ambizione Study
 * @description
 * @author Gidon Frischkorn
 * @version end2_final
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
import { bmw3 } from "./survey/bmw3";
import { bmw3_scores } from "./survey/bmw3_scores.ts";

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
  const followup_pages = end_questionnaire(expInfo.LANG, 2);

  /************************************** BMW-3 ************************************/
  const bmw3_page = bmw3(expInfo.LANG);


  // Combine all survey pages
  var survey_pages: any[] = [];
  survey_pages.push(id_page);
  survey_pages = survey_pages.concat(followup_pages);

  // add the questionnaires dependent on settings
  if (expInfo.DESIGN.ADD_BMW3) {
    survey_pages.push(bmw3_page);
  }

  // Create Survey
  const end_survey = {
    type: survey,
    survey_json: {
      showQuestionNumbers: false,
      title:
        "Schlussbefragung MZP 1:\n Grundlagen Kognitiver Leistungsfähigkeit",
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
    }
  };

  // Create End Screen
  var end_screen = {
    type: jsPsychHtmlButtonResponse,
    stimulus: '<h1> Fertig </h1>' +
      '<p> Herzlichen Glückwunsch! Sie haben alle Aufgaben des 2. Messzeitpunkts der Studie' +
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
