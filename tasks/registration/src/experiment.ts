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
import { demographics } from "./survey/demographics";
import { bmw3 } from "./survey/bmw3";
import { bfi2 } from "./survey/big5";
import { nfc } from "./survey/nfc";
import { isi_questionnaire } from "./survey/isi";
import { mini_q } from "./survey/mini-q.ts";
import { on } from "events";

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
  // survey_pages.push(demographic_page);
  // survey_pages.push(isi_page);
  //survey_pages.push(bmw3_page);
  survey_pages = survey_pages.concat(bfi2_line);
  //survey_pages.push(nfc_page);

  const registration_survey = {
    type: survey,
    survey_json: {
      showQuestionNumbers: false,
      title:
        "Registrierung: Interesse an der Studie zu kognitiver Leistungsfàhigkeit",
      pages: survey_pages,
    },
    on_finish: function (data) {

      const search_object = jsPsych.data.get().values()[1].response

      // BMW-3
      /*
      const bmw3_resp = Object(Object.entries(search_object).filter(([key, value]) => key === "bmw3-matrix")[0][1])

      // BMW-3: I scale
      const bmw3_i = Object.entries(bmw3_resp).filter(([key, value]) => key.startsWith("MW-I"))
      let bmw3_i_sum = 0;
      bmw3_i.map(([key, value]) => value).forEach(num => bmw3_i_sum += num);
      data.bmw3_i_scale = bmw3_i_sum;
      
      // BMW-3: UI scale
      const bmw3_ui = Object.entries(bmw3_resp).filter(([key, value]) => key.startsWith("MW-UI"))
      let bmw3_ui_sum = 0;
      bmw3_ui.map(([key, value]) => value).forEach(num => bmw3_ui_sum += num);
      data.bmw3_ui_scale = bmw3_ui_sum;

      // BMW-3: MA scale
      const bmw3_ma = Object.entries(bmw3_resp).filter(([key, value]) => key.startsWith("MW-MA"))
      let bmw3_ma_sum = 0;
      bmw3_ma.map(([key, value]) => value).forEach(num => bmw3_ma_sum += num);
      data.bmw3_ma_scale = bmw3_ma_sum;*/

      // BFI-2
      const bfi2_resp = Object(Object.entries(search_object).filter(([key, value]) => key === "bfi2-matrix")[0][1])

      // BMW-3: extraversion
      const bfi2_e_all = Object.entries(bfi2_resp).filter(([key, value]) => key.startsWith("BFI-E"))
      const bfi2_e = bfi2_e_all.filter(([key, value]) => !key.endsWith("R"));
      const bfi2_e_r = bfi2_e_all.filter(([key, value]) => key.endsWith("R"));
     
      let bfi2_e_sum = 0;
      bfi2_e.map(([key, value]) => value).forEach(num => bfi2_e_sum += num);
      bfi2_e_r.map(([key, value]) => value).forEach(num => bfi2_e_sum += (6 - num));
      data.bfi2_e_scale = bfi2_e_sum;

      // BMW-3: agreeableness
      const bfi2_v_all = Object.entries(bfi2_resp).filter(([key, value]) => key.startsWith("BFI-V"))
      const bfi2_v = bfi2_v_all.filter(([key, value]) => !key.endsWith("R"));
      const bfi2_v_r = bfi2_v_all.filter(([key, value]) => key.endsWith("R"));
     
      let bfi2_v_sum = 0;
      bfi2_v.map(([key, value]) => value).forEach(num => bfi2_v_sum += num);
      bfi2_v_r.map(([key, value]) => value).forEach(num => bfi2_v_sum += (6 - num));
      data.bfi2_v_scale = bfi2_v_sum;

      // BMW-3: conscientiousness
      const bfi2_g_all = Object.entries(bfi2_resp).filter(([key, value]) => key.startsWith("BFI-G"))
      const bfi2_g = bfi2_g_all.filter(([key, value]) => !key.endsWith("R"));
      const bfi2_g_r = bfi2_g_all.filter(([key, value]) => key.endsWith("R"));
     
      let bfi2_g_sum = 0;
      bfi2_g.map(([key, value]) => value).forEach(num => bfi2_g_sum += num);
      bfi2_g_r.map(([key, value]) => value).forEach(num => bfi2_g_sum += (6 - num));
      data.bfi2_g_scale = bfi2_g_sum;

      // BMW-3: emotional stability
      const bfi2_ne_all = Object.entries(bfi2_resp).filter(([key, value]) => key.startsWith("BFI-NE"))
      const bfi2_ne = bfi2_ne_all.filter(([key, value]) => !key.endsWith("R"));
      const bfi2_ne_r = bfi2_ne_all.filter(([key, value]) => key.endsWith("R"));
     
      let bfi2_ne_sum = 0;
      bfi2_ne.map(([key, value]) => value).forEach(num => bfi2_ne_sum += num);
      bfi2_ne_r.map(([key, value]) => value).forEach(num => bfi2_ne_sum += (6 - num));
      data.bfi2_ne_scale = bfi2_ne_sum;

      // BMW-3: openness
      const bfi2_o_all = Object.entries(bfi2_resp).filter(([key, value]) => key.startsWith("BFI-O"))
      const bfi2_o = bfi2_o_all.filter(([key, value]) => !key.endsWith("R"));
      const bfi2_o_r = bfi2_o_all.filter(([key, value]) => key.endsWith("R"));
     
      let bfi2_o_sum = 0;
      bfi2_o.map(([key, value]) => value).forEach(num => bfi2_o_sum += num);
      bfi2_o_r.map(([key, value]) => value).forEach(num => bfi2_o_sum += (6 - num));
      data.bfi2_o_scale = bfi2_o_sum;

      console.log(data.bfi2_e_scale)
      
      // NFC
      // const nfc_resp = Object(Object.entries(search_object).filter(([key, value]) => key === "nfc-matrix")[0][1])
      // const nfc = Object.entries(nfc_resp).filter(([key, value]) => !key.endsWith("r"))
      // const nfc_r = Object.entries(nfc_resp).filter(([key, value]) => key.endsWith("r"))

      // let nfc_sum = 0;
      // nfc.map(([key, value]) => value).forEach(num => nfc_sum += num);
      // nfc_r.map(([key, value]) => value).forEach(num => nfc_sum += (6 - num));
      // data.nfc_scale = nfc_sum;
 
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
