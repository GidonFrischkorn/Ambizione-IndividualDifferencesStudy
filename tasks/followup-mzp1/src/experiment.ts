/**
 * @title Follow Up - MZP 1: Ambizione Study
 * @description  
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
import jsPsychHtmlButtonResponse from "@jspsych/plugin-html-button-response";
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

  /************************************** NFC **************************************/
  const nfc_page = nfc(expInfo.LANG);

  // Combine all survey pages
  var survey_pages: any[] = [];
  survey_pages.push(id_page);
  survey_pages = survey_pages.concat(followup_pages);

  if (expInfo.DESIGN.ADD_NFC) {
    survey_pages.push(nfc_page);
  }

  const registration_survey = {
    type: survey,
    survey_json: {
      showQuestionNumbers: false,
      title:
        "Nachbefragung MZP 1:\n Grundlagen Kognitiver Leistungsfähigkeit",
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

      // NFC scale scores
      if (expInfo.DESIGN.ADD_NFC) {
        const nfc_scale_scores = nfc_scores(search_object, expInfo);
        data.nfc_sum = nfc_scale_scores[0];
        data.nfc_mean = nfc_scale_scores[1];
      };
      
    }
  };


  // Create End Screen
  var end_screen = {
    type: jsPsychHtmlButtonResponse,
    stimulus: '<h1> Fertig </h1>' +
      '<p> Vielen Dank, dass Sie sich die Zeit genommen haben die Nachbefragung' +
      ' zum ersten Messzeitpunnkt der Studie zu Grundlagen kognitiver Leistungsfähigkeit auszufüllen.</p>' +
      '<p> Um den Termin für den zweiten Messzeitpunkt auszumachen erhalten Sie von uns ein seperates Mail. </p>' +
      '<p> Klicken Sie nun unten auf "Fertig". </p>' ,
    choices: ['Fertig'],
  };

  // Push all the screen slides into timeline
  // When you want to test the experiment, you can easily comment out the screens you don't want
  timeline.push(preload_screen);
  timeline.push(registration_survey);
  timeline.push(end_screen);
  
  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  return jsPsych;
}
