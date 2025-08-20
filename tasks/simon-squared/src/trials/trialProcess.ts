import { practiceTrialsSimon, experimentTrialsSimon, SimonTrial } from "./trialStim";
import htmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";
import { jsPsych } from "../jsp";
import { expInfo } from "../settings";

const commonResponseParams = {
  choices: expInfo.DESIGN.CHOICES,
  response_ends_trial: true as true,
};

// Practice-Timeline
export function createSimonPracticeTimeline() {
  const timeline: any[] = [];

  practiceTrialsSimon.forEach((trial: SimonTrial) => {
    // 1) Fixation
    timeline.push({
      type: htmlKeyboardResponse,
      stimulus: '<div style="font-size:2em;">+</div>',
      choices: [],
      trial_duration: expInfo.TIMING.FIXATION,
    });

    // 2) Simon-Trial
    timeline.push({
      type: htmlKeyboardResponse,
      stimulus: () => {
        const [leftLabel, rightLabel] = trial.responseOptions;
        const arrowLeft  = trial.arrowSide === "left"  ? trial.target : "&nbsp;";
        const arrowRight = trial.arrowSide === "right" ? trial.target : "&nbsp;";

        return `
          <div style="
            display:grid;
            grid-template-columns: 1fr 1fr;
            justify-items:center;
            align-items:start;
            row-gap: 2.8em;        
            column-gap: 8em;       
            font-size: 2em;
          ">
            <div style="font-size:3em; min-height:1em; line-height:1em;">${arrowLeft}</div>
            <div style="font-size:3em; min-height:1em; line-height:1em;">${arrowRight}</div>

            <div>${leftLabel}</div>
            <div>${rightLabel}</div>
          </div>
        `;
      },
      ...commonResponseParams,
      data: {
        phase: "practice",
        direction: trial.direction,
        arrowSide: trial.arrowSide,
        stimCong: trial.stimCong,      
        respCong: trial.respCong,      
        responseOptions: trial.responseOptions,
        correctChoice: trial.correctChoice,
      },
      on_finish: (data: any) => {
        data.correct = data.response === data.correctChoice;
      },
    });

    // 3) Feedback 
    timeline.push({
      type: htmlKeyboardResponse,
      on_start: (t: any) => {
        const lastPractice = jsPsych.data
          .get()
          .filter({ phase: "practice" })
          .last(1)
          .values()[0];

        t.stimulus = lastPractice?.correct
          ? '<div style="font-size:2em; color:green;">Korrekt! :)</div>'
          : '<div style="font-size:2em; color:red;">Falsch! :(</div>';
      },
      choices: [],
      trial_duration: expInfo.TIMING.FEEDBACK,
    });

    // 4) ITI
    timeline.push({
      type: htmlKeyboardResponse,
      stimulus: "",
      choices: [],
      trial_duration: expInfo.TIMING.ITI,
    });
  });

  return timeline;
}

// Experiment-Timeline (ohne Feedback)
export function createSimonExperimentTimeline() {
  const timeline: any[] = [];

  experimentTrialsSimon.forEach((trial: SimonTrial) => {
    // 1) Fixation
    timeline.push({
      type: htmlKeyboardResponse,
      stimulus: '<div style="font-size:2em;">+</div>',
      choices: [],
      trial_duration: expInfo.TIMING.FIXATION,
    });

    // 2) Simon-Trial
    timeline.push({
      type: htmlKeyboardResponse,
      stimulus: () => {
        const [leftLabel, rightLabel] = trial.responseOptions;
        const arrowLeft  = trial.arrowSide === "left"  ? trial.target : "&nbsp;";
        const arrowRight = trial.arrowSide === "right" ? trial.target : "&nbsp;";

        return `
          <div style="
            display:grid;
            grid-template-columns: 1fr 1fr;
            justify-items:center;
            align-items:start;
            row-gap: 2.8em;
            column-gap: 8em;
            font-size: 2em;
          ">
            <div style="font-size:3em; min-height:1em; line-height:1em;">${arrowLeft}</div>
            <div style="font-size:3em; min-height:1em; line-height:1em;">${arrowRight}</div>

            <div>${leftLabel}</div>
            <div>${rightLabel}</div>
          </div>
        `;
      },
      ...commonResponseParams,
      data: {
        phase: "experimental",
        direction: trial.direction,
        arrowSide: trial.arrowSide,
        stimCong: trial.stimCong,
        respCong: trial.respCong,
        responseOptions: trial.responseOptions,
        correctChoice: trial.correctChoice,
      },
      on_finish: (data: any) => {
        data.correct = data.response === data.correctChoice;
      },
    });

    // 3) ITI
    timeline.push({
      type: htmlKeyboardResponse,
      stimulus: "",
      choices: [],
      trial_duration: expInfo.TIMING.ITI,
    });
  });

  return timeline;
}