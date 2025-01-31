import survey from "@jspsych/plugin-survey";
import "@jspsych/plugin-survey/css/survey.css";

import { varSystem } from "../settings";


const DemographicInfo = [
  // title and description
  {
    type: "html",
    prompt: `<h2 class="subtitle">Demographic information</h2>`,
  },
  // age
  {
    type: "text",
    prompt: `How old are you?`,
    name: "age",
    textbox_columns: 5,
    required: true,
  },
  // sex
  {
    type: "multi-choice",
    prompt: "What is your sex?",
    name: "sex",
    options: ["Male", "Female", "Others"],
    required: true,
  },
];

const ExperimentInfo = [
  {
    type: "html",
    prompt: `<h2 class="subtitle">Questions about the experiment</h2>`,
  },
  {
    type: "likert",
    prompt:
      "In this study, we have been asking you to judge the size of objects. How often were you committed to engage in this task?",
    name: "judgement",
    likert_scale_min: 1,
    likert_scale_max: 9,
    likert_scale_stepsize: 1,
    likert_scale_min_label: "Never",
    likert_scale_max_label: "Always",
    required: true,
  },
  {
    type: "likert",
    prompt: "How difficult did you find judging the size of the objects?",
    name: "difficulty",
    likert_scale_min: 1,
    likert_scale_max: 9,
    likert_scale_stepsize: 1,
    likert_scale_min_label: "Very easy",
    likert_scale_max_label: "Very difficult",
    required: true,
  },
  {
    type: "multi-choice",
    prompt:
      "Did you use any aid (e.g., pencil-and-paper or computer file) to remember the letters?",
    name: "aid",
    options: ["Yes, I did ", "No, I did not use any aid"],
    required: true,
  },
  {
    type: "multi-choice",
    prompt:
      "Were you able to work through the experiment concentrated and without distraction?",
    name: "attention",
    options: ["Yes, I was", "No, I was distracted by something"],
    required: true,
  },
  {
    type: "text",
    prompt: "Do you have some comments about the experiments?",
    name: "comments",
    textbox_rows: 5,
    required: false,
  },
];



export const survey_screen = {
  type: survey,
  //@ts-ignore
  pages: [DemographicInfo.concat(ExperimentInfo)],
  button_label_finish: "Submit",
  show_question_numbers: "on",
  title: "Questionnaire",
  data: {
    screenID: "survey",
  },
  on_finish: function (data) {
    varSystem.TRACK = false;
  }
};