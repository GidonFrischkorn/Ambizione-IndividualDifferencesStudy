/**
 * @title Stroop Squared
 * @description Participant has to tell whether the word represents somthing animate or inanimate.
 * @author Luca Läubin
 * @version stroop_squared_pretest
 *
 *
 * @assets assets/
 */

// import stylesheets (.scss or .css).
import "../styles/main.scss";

// jsPsych official plugin
import preload from "@jspsych/plugin-preload";
import jsPsychHtmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";
// Global variables
import { jsPsych } from "./jsp";
import { expInfo } from "./settings";

// screens
import { welcome_screen } from "./instructions/welcome";
import { consent_screen, notice_screen } from "./instructions/consent";
import { browser_screen } from "./instructions/browserCheck";
import { fullMode_screen } from "./instructions/fullScreen";
import { exp_start_screen, pra_instr_screen } from "./instructions/InstrTrial";
import { createNewTrial } from "./trials/trialProcess";
import { create_trialList, chooseStimuli } from "./trials/trialStim";
import { instructions_screen } from "./instructions/InstrScreen";
import { fingers_instructions_practice } from "./instructions/InstrScreen";
import { fingers_instructions_exp } from "./instructions/InstrScreen";
import { words } from "../assets/stimuli";


// Import trials
import { createStroopTrials } from "./trials/stroopTrialList"
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

  /************************************** Instruction **************************************/

  /************************************** Practice **************************************/
  const stroop_trials = createStroopTrials();
  console.log("Generated Stroop Trials:", stroop_trials);
  let practice_line: any[] = [];
  let exp_line: any[] = [];
  
  for (let i = 0; i < stroop_trials.length; i++) {
    const trial = stroop_trials[i];
  
    const jsPsychTrial = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: `
        <div style="font-size:48px;color:${trial.textColor.toLowerCase()};">
          ${trial.targetWord}
        </div>
        <div style="display:flex;justify-content:center;margin-top:60px;font-size:28px;">
          <div style="color:${trial.leftColor.toLowerCase()};padding:0 40px">
            ${trial.leftOption}
          </div>
          <div style="color:${trial.rightColor.toLowerCase()};padding:0 40px">
            ${trial.rightOption}
          </div>
        </div>
      `,
      choices: expInfo.STROOP.choices,       
      data: trial,
      on_finish: (data: any) => {
        data.correct = (
          (data.response === "d" && trial.correctAnswer === "left") ||
          (data.response === "j" && trial.correctAnswer === "right")
        );
      }
    };
  
    // First 10 are practice
    if (i < expInfo.STROOP.nPracticeTrials) { 
      practice_line.push(jsPsychTrial);
      practice_line.push({
        type: jsPsychHtmlKeyboardResponse,
        stimulus: () => {
          const last = jsPsych.data.get().last(1).values()[0];
          return last.correct
            ? "<p style='color:green;'>Richtig!</p>"
            : "<p style='color:red;'>Falsch!</p>";
        },
        choices: "ALL_KEYS",
        trial_duration: expInfo.TIMING.FEEDBACK   
      });
    } else {
      exp_line.push({
        type: jsPsychHtmlKeyboardResponse,
        stimulus: "<p style='font-size:40px;'>+</p>",
        choices: "NO_KEYS",
        trial_duration: expInfo.TIMING.FIXATION  
      });
      exp_line.push(jsPsychTrial);
    }
  }
  /************************************** Experiment **************************************/



  /************************************** Procedure **************************************/

  // Push all the screen slides into timeline
  // When you want to test the experiment, you can easily comment out the screens you don't want
  timeline.push(preload_screen);
  timeline.push(welcome_screen);
  // timeline.push(consent_screen);
  //timeline.push(notice_screen);
  timeline.push(browser_screen);
  // timeline.push(fullMode_screen);
  timeline.push(instructions_screen);
  timeline.push(pra_instr_screen);
  //timeline.push(fingers_instructions_practice);
  timeline = timeline.concat(practice_line);
  timeline.push(exp_start_screen);
  timeline.push(fingers_instructions_exp);
  timeline = timeline.concat(exp_line);

  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  return jsPsych;
}
