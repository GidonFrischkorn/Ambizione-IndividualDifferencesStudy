// jsPsych official plugin
import htmlButtonResponse from "@jspsych/plugin-html-button-response";
import htmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";

// Basic Functions
import { convertTime } from "@coglabuzh/webpsy.js";

// Global variables
import { expInfo } from "../settings";
let { TIMING } = expInfo;
import { SCREEN_INFO } from "../task-fun/text";
import { jsPsych } from "../jsp";


function countDownTimer(duration, displayElementId, jsPsych) {
  // Ensure duration is an integer number of seconds.
  let timer = Math.floor(duration);
  const displayElement = document.getElementById(displayElementId);

  if (!displayElement) {
    console.error(`Element with ID "${displayElementId}" not found.`);
    return;
  }

  const interval = setInterval(() => {
    // Calculate minutes and seconds, ensuring minutes is floored.
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    // Format with leading zeros if needed.
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

    displayElement.textContent = `${formattedMinutes}:${formattedSeconds}`;

    if (timer <= 0) {
      clearInterval(interval);
      jsPsych.finishTrial();
    }
    timer--;
  }, 1000);
}


// display a cue screen with a countdown timer.
/*export const break_screen = {
  type: htmlKeyboardResponse,
  stimulus: function () {
    return `<div class="fb-text">
    <h1 class="title">Kleine Pause!</h1>
    ${SCREEN_INFO.break[expInfo.LANG]}
    <br>
    <br>
  </div>`;
  },
  choices: [" "], // The only valid key response is the space bar.
  trial_duration: TIMING.START, // Time to wait before automatically proceeding with the next trial.
  post_trial_gap: 1000, // forced inter-trial interval after participant's response.
  on_load: function () {
    let time = convertTime(TIMING.START, "ms", "s");
    //@ts-ignore
    countDownTimer(time, "clock", jsPsych);
  },
  on_finish: function () {},
};
*/

/*export const break_screen = {
  type: htmlKeyboardResponse,
  stimulus: function () {
    return `<div class="fb-text">
      <h1 class="title">Kleine Pause!</h1>
      ${SCREEN_INFO.break[expInfo.LANG]}
      <button type=button class="button" id="continue-button" disabled>Weiter</button>
    </div>`;
  },
  choices: "NO_KEYS", // disable automatic keyboard responses
  trial_duration: TIMING.START, // e.g., 300000 ms for 5 minutes
  post_trial_gap: 1000,
  on_load: function () {
    // Convert TIMING.START from ms to seconds (should be 300 for 5 minutes)
    let time = convertTime(TIMING.START, "ms", "s");
    //@ts-ignore
    countDownTimer(time, "clock", jsPsych);

    // After 2 minutes (120000 ms), enable the continue button.
    setTimeout(() => {
      const btn = document.getElementById("continue-button") as HTMLButtonElement;
      if (btn) {
        btn.disabled = false;
        btn.addEventListener("click", function () {
          jsPsych.finishTrial();
        });
      }
    }, 120000);
  },
  on_finish: function () {},
};*/


export const break_screen = {
  type: htmlKeyboardResponse,
  stimulus: function () {
    return `<div class="fb-text">
      <h1 class="title">Kleine Pause!</h1>
      ${SCREEN_INFO.break[expInfo.LANG]}
      <button type=button class="button" id="continue-button" style="display: none;" disabled>Weiter</button>
    </div>`;
  },
  choices: "NO_KEYS", 
  trial_duration: TIMING.START, 
  post_trial_gap: 1000,
  on_load: function () {
    let time = convertTime(TIMING.START, "ms", "s");
    //@ts-ignore
    countDownTimer(time, "clock", jsPsych);

    // After 2 minutes (120000 ms), show and enable the continue button.
    setTimeout(() => {
      const btn = document.getElementById("continue-button") as HTMLButtonElement;
      if (btn) {
        btn.style.display = "inline-block"; // make it visible
        btn.disabled = false;
        btn.addEventListener("click", function () {
          jsPsych.finishTrial();
        });
      }
    }, expInfo.TIMING.MIN_Break); // Show button after minimum break time
  },
  on_finish: function () {},
};


