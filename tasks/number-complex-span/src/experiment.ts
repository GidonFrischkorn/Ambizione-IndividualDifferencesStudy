/**
 * @title Number Complex Span Task (Object) Exp 2
 * @description A short description of the task
 * @version number_CS_pretest
 *
 * @assets assets/
 */

// import stylesheets (.scss or .css).
import "../styles/main.scss";

// jsPsych official plugin
import preload from "@jspsych/plugin-preload";

// Global variables
import { jsPsych } from "./jsp";
import { expInfo } from "./settings";
let { DESIGN } = expInfo;

// screens
import { welcome_screen } from "./instructions/welcome";
import { fullMode_screen } from "./instructions/fullScreen";
import { createNewTrial } from "./trials/trialProcess";
import {
  exp_start_screen,
} from "./instructions/InstrStart";
import { 
  practice_dual_tasks_line, 
  practice_judgement_task_line, 
  practice_memory_task_line
} from "./instructions/practice";
import { survey_screen } from "./survey/survey";


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
    //images: assetPaths.images,
    // audio: assetPaths.audio,
    // video: assetPaths.video,
  };

  // ********************** Experiment ********************** //


  // Create an array to store the experiment trials for the retro condition
  let experiment_line: any[] = [];

  experiment_line.push(exp_start_screen);

  for (let iTrial = 0; iTrial < DESIGN.nTRIALS; iTrial++) {
    let trialLine = createNewTrial(
      "retro",
      DESIGN.QUESTION,
      1,
      iTrial + 1,
      "experiment"
    );
    experiment_line = experiment_line.concat(trialLine);
  };

  // Push all the screen slides into timeline
  // When you want to test the experiment, you can easily comment out the screens you don't want
  timeline.push(preload_screen);
  timeline.push(welcome_screen);
  // timeline.push(fullMode_screen);
  timeline = timeline.concat(practice_memory_task_line);
  timeline = timeline.concat(practice_judgement_task_line);
  timeline = timeline.concat(practice_dual_tasks_line);
  timeline = timeline.concat(experiment_line);
  //timeline.push(survey_screen);

  

  // ********************** Test ********************** //
  await jsPsych.run(timeline); // run the experiment
  // await jsPsych.simulate(timeline, "data-only"); // simulate the experiment and get the data only 
  // await jsPsych.simulate(timeline, "visual"); // simulate the experiment visually

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  return jsPsych;
}
