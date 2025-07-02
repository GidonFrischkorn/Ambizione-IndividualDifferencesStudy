/**
 * @title Keep Track Task (Letters-Colors)
 * @description A short description of the task
 * @version keep_track_task_final
 *
 * @assets assets/
 */

// import stylesheets (.scss or .css).
import "../styles/main.scss";

// jsPsych official plugin
import preload from "@jspsych/plugin-preload";
import survey from "@jspsych/plugin-survey";

// Global variables
import { jsPsych } from "./jsp";
import { expInfo } from "./settings";
let { DESIGN } = expInfo;

// screens
import { welcome_screen } from "./instructions/welcome";
import { participant_code, extract_code } from "./survey/participant_code";
import { browser_screen } from "./instructions/browserCheck";
import { fullMode_screen } from "./instructions/fullScreen";
import { createNewTrial } from "./trials/trialProcess";
import { prac_start_screen, exp_start_screen } from "./instructions/InstrStart";
import { instr_line } from "./instructions/InstrStart";


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

  /************************************** Participant Code ******************************/
  const id_page = participant_code("de")
  
  const id_survey = {
    type: survey,
    survey_json: {
      showQuestionNumbers: false,
      title:
        "Teilnehmer Code: Letter Updating Task",
      pages: [id_page]
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
    }
  };

  // ********************** Practice ********************** //
  let practice_line: any[] = [];

  practice_line.push(prac_start_screen);

  for (let iTrial = 0; iTrial < DESIGN.nPRACTICE; iTrial++) {
    let trialLine = createNewTrial(
      DESIGN.SETSIZE,
      DESIGN.UPDSTEP,
      1,
      iTrial + 1,
      "practice"
    );
    practice_line = practice_line.concat(trialLine);
  }

  // ********************** Experiment ********************** //

  // Create an array to store the experiment trials for the retro condition
  let experiment_line: any[] = [];

  experiment_line.push(exp_start_screen);

  for (let iTrial = 0; iTrial < DESIGN.nTRIALS; iTrial++) {
    let trialLine = createNewTrial(
      DESIGN.SETSIZE,
      DESIGN.UPDSTEP,
      1,
      iTrial + 1,
      "experiment"
    );
    experiment_line = experiment_line.concat(trialLine);
  }

  // Push all the screen slides into timeline
  // When you want to test the experiment, you can easily comment out the screens you don't want
  timeline.push(preload_screen);
  timeline.push(id_survey);
  // timeline.push(welcome_screen);
  timeline.push(browser_screen);
  // timeline.push(fullMode_screen);
  timeline.push(instr_line);
  timeline = timeline.concat(practice_line);
  timeline = timeline.concat(experiment_line);

  // ********************** Test ********************** //
  await jsPsych.run(timeline); // run the experiment
  // await jsPsych.simulate(timeline, "data-only"); // simulate the experiment and get the data only
  // await jsPsych.simulate(timeline, "visual"); // simulate the experiment visually

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  return jsPsych;
}
