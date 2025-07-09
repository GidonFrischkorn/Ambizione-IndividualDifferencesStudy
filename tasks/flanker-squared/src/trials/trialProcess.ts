// Purpose: Functions for generating stimuli and creating elements

// Global variables
import { expInfo } from "../settings";
import { practiceTrials, experimentTrials, flankerTrial  } from './trialStim'

// Third party plugins
import htmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";
import { jsPsych } from "../jsp";

const commonResponseParams = {
  choices: expInfo.DESIGN.CHOICES,
  response_ends_trial: true as true,
};

//Practice Trials

export function createPracticeTimeline() {
  const timeline: any[] = [];

  practiceTrials.forEach((trial: flankerTrial) => {
    // 1) Fixationskreuz
    timeline.push({
      type: htmlKeyboardResponse,
      stimulus: '<div style="font-size:2em;">+</div>',
      choices: [],
      trial_duration: expInfo.TIMING.FIXATION,
    });

    // 2) Flanker Trial
    timeline.push({
      type: htmlKeyboardResponse,
      stimulus: () => {
        // Target
        const targetHTML = `<div style=\"font-size:3em; margin-bottom:3em;\">${trial.target}</div>`;
        // Response
        const respHTML = `
          <div style=\"display:flex; justify-content:center; gap:8em; font-size:3em;\">
            <div>${trial.responseOptions[0]}</div>
            <div>${trial.responseOptions[1]}</div>
          </div>
        `;
        return targetHTML + respHTML;
      },
      ...commonResponseParams,
      data: { correctChoice: trial.correctChoice, phase: 'practice' },
      on_finish: (data) => {
        data.correct = data.response === data.correctChoice;
      },
    });

// 3) Feedback
timeline.push({
  type: htmlKeyboardResponse,

  on_start: (trial) => {
  const lastPractice = jsPsych.data
    .get()                                 
    .filter({ phase: 'practice' })       
    .last(1)                                  
    .values()[0];                             
  
  console.log('*** lastPractice:', lastPractice);
  trial.stimulus = lastPractice.correct
    ? '<div style="font-size:2em; color:green;">Korrekt! :)</div>'
    : '<div style="font-size:2em; color:red;">Falsch! :(</div>';
},

  choices: [],
  trial_duration: expInfo.TIMING.FEEDBACK
});


    // 4) ITI
    timeline.push({
      type: htmlKeyboardResponse,
      stimulus: '',
      choices: [],
      trial_duration: expInfo.TIMING.ITI,
    });
  });

  return timeline;
}

// Experiment Trials
export function createExperimentTimeline() {
  const timeline: any[] = [];

  experimentTrials.forEach((trial: flankerTrial) => {
    // 1) Fixation
    timeline.push({
      type: htmlKeyboardResponse,
      stimulus: '<div style="font-size:2em;">+</div>',
      choices: [],
      trial_duration: expInfo.TIMING.FIXATION,
    });

    // 2) Flanker Trial (Target + Antwortoptionen)
    timeline.push({
      type: htmlKeyboardResponse,
      stimulus: () => {
        const targetHTML = `<div style="font-size:3em; margin-bottom:3em;">${trial.target}</div>`;
        const respHTML   = `
          <div style="display:flex; justify-content:center; gap:8em; font-size:3em;">
            <div>${trial.responseOptions[0]}</div>
            <div>${trial.responseOptions[1]}</div>
          </div>
        `;
        return targetHTML + respHTML;
      },
      ...commonResponseParams,
      data: {
        phase: 'experimental',
        stimCong: trial.stimCong,
        responseFlankCong: trial.responseFlankCong,
        flankDirection: trial.flankDirection,
        target: trial.target,
        responseOptions: trial.responseOptions,
        correctChoice: trial.correctChoice
      },
      on_finish: (data) => {
        data.correct = data.response === data.correctChoice;
      },
    });

    // 3) ITI
    timeline.push({
      type: htmlKeyboardResponse,
      stimulus: '',
      choices: [],
      trial_duration: expInfo.TIMING.ITI,
    });
  });

  return timeline;
}