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
import surveyMultiChoice from "@jspsych/plugin-survey-multi-choice";

// Global variables
import { jsPsych } from "./jsp";
import { expInfo } from "./settings";

// screens
import { welcome_screen } from "./instructions/welcome";
import { bmw3 } from "./survey/bmw3";
import { bfi2 } from "./survey/big5";

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

  /************************************** BMW-3 **************************************/
  const bmw3_questionnaire = bmw3("DE");

  /************************************** Big-5 **************************************/
  const bfi2_questionnaire = bfi2("DE", "short");

  /************************************** NFC **************************************/

  /************************************** ISI **************************************/

  // Push all the screen slides into timeline
  // When you want to test the experiment, you can easily comment out the screens you don't want
  timeline.push(preload_screen);
  timeline.push(welcome_screen);
  // timeline.push(consent_screen);
  // timeline.push(notice_screen);
  timeline.push(demographics);
  timeline.push(bmw3_questionnaire);
  timeline.push(bfi2_questionnaire);

  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  // return jsPsych;
}
