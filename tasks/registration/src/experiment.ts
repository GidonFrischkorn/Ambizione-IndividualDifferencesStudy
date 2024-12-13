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
import { demographics } from "./survey/demographics";
import { bmw3 } from "./survey/bmw3";
import { bfi2 } from "./survey/big5";
import { nfc } from "./survey/nfc";
import { isi_questionnaire } from "./survey/isi";

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

  /************************************** Demographic Data **************************************/
  const demographic_page = demographics("DE");

  /*
  const demographics = {
    type: surveyMultiChoice,
    questions: [
      {
        prompt: "Was ist Ihr Geschlecht?",
        name: "Geschlecht",
        options: [
          "weiblich",
          "männlich",
          "nicht-binär/ genderqueer",
          "kein Geschlecht",
          "keine Angabe",
          "eigene Angabe",
        ],
        required: true,
      },
      {
        prompt: "Was ist ihr höchster Bildungsabschluss?",
        name: "Bildungsabschluss",
        options: [
          "Eidg. Berufsattest",
          "Eidg. Fähigkeitszeugnis",
          "Berufsmaturität",
          "Fachmaturität",
          "Gymnasiale Maturität",
          "Eidg. Diplom",
          "Diplom HF",
          "Fach- oder Pädag. Hochschule",
          "Universität / ETH",
          "ETH",
          "andere",
          "keine Angabe",
        ],
        required: true,
      },
    ],
  };
*/
  /************************************** BMW-3 **************************************/
  const bmw3_page = bmw3("DE");

  /************************************** Big-5 **************************************/
  const bfi2_page = bfi2("DE", "short");

  /************************************** NFC **************************************/
  const nfc_page = nfc("DE");

  /************************************** ISI **************************************/
  const isi_page = isi_questionnaire("DE");

  // Combine all survey pages
  const survey_pages: any[] = [];
  survey_pages.push(demographic_page);
  survey_pages.push(isi_page);
  survey_pages.push(bmw3_page);
  survey_pages.push(bfi2_page);
  survey_pages.push(nfc_page);

  const registration_survey = {
    type: survey,
    survey_json: {
      showQuestionNumbers: false,
      title:
        "Registrierung: Interesse an der Studie zu kognitiver Leistungsfàhigkeit",
      pages: survey_pages,
    },
  };

  // Push all the screen slides into timeline
  // When you want to test the experiment, you can easily comment out the screens you don't want
  timeline.push(preload_screen);
  timeline.push(welcome_screen);
  timeline.push(registration_survey);

  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  // return jsPsych;
}
