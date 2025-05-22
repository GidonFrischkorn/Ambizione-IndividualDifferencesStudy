// Purpose: Functions for generating stimuli and creating elements

// Global variables
import { expInfo } from "../settings";
import { jsPsych } from "../jsp";

// Third party plugins
import psychophysics from "@kurokida/jspsych-psychophysics";
import htmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";
import { generateStims, createColorWheel, createGreyWheel, createArcResponse, createFeedbackIndicator, create_response_line } from "./trialStim";
import { CIElab, grayscale } from "../task-fun/CIElab";
import { circle_functions } from "../task-fun/circleFun";
/**
 * A function used to create a single trial.
 * @param setsize The number of items in a trial.
 *
 * @returns An array containing all the slides of a trial.
 */
export function createNewTrial(
  XY: number,
  feature: string,
  trial_type: string, 
  isPractice: boolean,
  arc_confidence: boolean,
): any[] {
  var trial_line: any[] = [];

  // Fixation Screen
  const fixation_cross = {
    obj_type: "cross", // means a rectangle
    startX: 0, // location in the canvas
    startY: 0,
    origin_center: true, // if true, the location is the center of the rectangle
    width: 20, // of the rectangle
    height: 20,
    line_length: 20
  };

  const fixation_screen = {
    type: psychophysics,
    stimuli: [fixation_cross],
    choices: "NO-KEYS",
    background_color: expInfo.DESIGN.backgroundCOLOR,
    trial_duration:
      expInfo.TIMING.FIXATION +
      Math.floor(Math.random() * (expInfo.TIMING.JITTER + 1)),
  };

  // Matching Screen
  const matching_stimuli = generateStims(feature, trial_type);

  // get correct response 
  var correct_response: number = matching_stimuli[matching_stimuli.length - 1].correct_gray;

  var response_scale: any = {
        obj_type: 'manual',
        horiz_pix_sec: 0,
        show_start_time: 0,
        startX: window.screen.width/2 - expInfo.COLORWHEEL.radius,
        startY: window.screen.height/2 + 2*expInfo.STIMULI.OFFSET,
        drawFunc: function(stimulus, canvas, context){
            context.beginPath();

            const gradLength = expInfo.COLORWHEEL.radius * 2;
            const gradWidth = expInfo.STIMULI.SIZE/2;
            const grad  = context.createLinearGradient(stimulus.startX, stimulus.startY, stimulus.startX + gradLength, stimulus.startY);

            grad.addColorStop(0,`hsl(0, 0%, ${expInfo.STIMULI.MIN_GRAY}%)`); // black
            grad.addColorStop(1,`hsl(0, 0%, ${expInfo.STIMULI.MAX_GRAY}%)`); // white

            context.fillStyle = grad;
            context.rect(stimulus.currentX, stimulus.currentY, gradLength, gradWidth);
            context.fill();
            context.closePath();
        }
    }

  var stim_array = JSON.parse(JSON.stringify(matching_stimuli));
  stim_array.push(response_scale);

  // Matching Screen
  const matching_screen = {
    type: psychophysics,
    stimuli: stim_array,
    background_color: expInfo.DESIGN.backgroundCOLOR,
    response_type: "mouse",
    mouse_move_func: function(event) {
      const currentTrial = jsPsych.getCurrentTrial(); // We need to get the current trial to access the stimuli we defined earlier
      const stim_array = currentTrial.stim_array; // Get the stimuli array from the current trial

      const StimuliCenterX = window.screen.width/2; // Same thing here
      const dx = event.offsetX - (StimuliCenterX - expInfo.COLORWHEEL.radius); // Same thing here

      var selected_gray = expInfo.STIMULI.MIN_GRAY + (dx/(2*expInfo.COLORWHEEL.radius)) * (expInfo.STIMULI.MAX_GRAY - expInfo.STIMULI.MIN_GRAY); // Calculate the angle in radians
      selected_gray = Math.round(selected_gray); // Round the angle to the nearest integer

      stim_array[stim_array.length - 2].fill_color = grayscale(selected_gray);
      stim_array[stim_array.length - 2].line_color = grayscale(selected_gray);
      stim_array[stim_array.length - 2].current_gray = selected_gray;
      stim_array[stim_array.length - 2].response = dx + (StimuliCenterX - expInfo.COLORWHEEL.radius);
    },
    on_finish: function (data) {
      // To store the final circle stimuli and the selected color, we once again access the stimuli array from the current trial
      const stimuli_array = jsPsych.getCurrentTrial().stim_array 

      // Find the Target & Response Stimuli
      const TargetStimulus = stimuli_array[stimuli_array.length-3];
      const ResponseStimulus = stimuli_array[stimuli_array.length-2];
    
      // Add the selected stimuli (containing the selected color value) to the dataframe
      data.procedure = isPractice ? "practice" : "experiment";
      data.trial_number = XY;
      data.condition = trial_type;
      data.selected_gray = ResponseStimulus.current_gray;
      data.correct_gray = TargetStimulus.correct_gray;
      data.correct_response = correct_response;
      data.responseX = ResponseStimulus.response;
    }
  };
  
  // Confidence Screen
  // create arc response screen
  const confidence_response_screen = {
    type: psychophysics,
    stimuli: function() {
      // Asjust the angle of the test stimulus to the selected angle
      var confidence_stimuli = JSON.parse(JSON.stringify(matching_stimuli));
      confidence_stimuli.push(response_scale);
      
      const start_gray = jsPsych.data.get().last(1).values()[0].selected_gray;
      var selected_X = jsPsych.data.get().last(1).values()[0].responseX;
      const spreadAngle = 1;

      confidence_stimuli[confidence_stimuli.length - 2].fill_color = grayscale(start_gray);
      confidence_stimuli[confidence_stimuli.length - 2].line_color = grayscale(start_gray);
      confidence_stimuli[confidence_stimuli.length - 2].current_gray = start_gray;
      confidence_stimuli[confidence_stimuli.length - 2].response = selected_X;

      const response_indicator = {
        obj_type: "line",
        startX: selected_X + 6/2,
        startY: window.screen.height/2 + 2*expInfo.STIMULI.OFFSET + expInfo.COLORWHEEL.size + expInfo.ARC_RESPONSE.offset,
        line_length: expInfo.ARC_RESPONSE.size_respInd,
        line_width: 6,
        angle: 90,
        line_color: grayscale(0),
        fill_color: grayscale(0),
      }

      const confidence_indicator = {
        obj_type: "line",
        startX: selected_X + 6/2,
        startY: window.screen.height/2 + 2*expInfo.STIMULI.OFFSET + expInfo.COLORWHEEL.size + expInfo.ARC_RESPONSE.offset,
        line_length: spreadAngle,
        line_width: 6,
        angle: 0,
        line_color: grayscale(0),
        fill_color: grayscale(0),
      }
      confidence_stimuli.push(response_indicator);
      confidence_stimuli.push(confidence_indicator);
      
      // Return all stimuli as an array
      return confidence_stimuli; 
    },
    background_color: expInfo.DESIGN.backgroundCOLOR,
    response_type: "mouse", // This is important, as it provides a psychophysics-internal way of ending the trial when a mouse click is detected. 
    mouse_move_func: function(event) {
      const currentTrial = jsPsych.getCurrentTrial(); // We need to get the current trial to access the stimuli we defined earlier
      const stim_array = currentTrial.stim_array; // Get the stimuli array from the current trial

      const StimuliCenterX = window.screen.width/2; // Same thing here
      const dx = Math.abs(event.offsetX - (stim_array[stim_array.length - 1].startX)); // Same thing here

      stim_array[stim_array.length - 1].line_length = 2*dx;
    },
    on_finish: function (data) {
      // To store the final circle stimuli and the selected color, we once again access the stimuli array from the current trial
      const stim_array = jsPsych.getCurrentTrial().stim_array 

      // Find the circle stimulus
      const response_stimulus = stim_array[stim_array.length-4];
      const target_stimulus = stim_array[0];
      const confidence_line = stim_array[stim_array.length-1];
    
      // Add the selected stimuli (containing the selected color value) to the dataframe
      data.procedure = isPractice ? "practice" : "experiment";
      data.trial_number = XY;
      data.condition = trial_type;
      data.selected_gray = response_stimulus.current_gray;
      data.responseX = response_stimulus.response;
      data.correct_gray = target_stimulus.correct_gray;
      data.correct_response = correct_response;
      data.confidence_scaled = 1 - confidence_line.line_length / (2 * expInfo.COLORWHEEL.radius);
      data.confidence_raw = confidence_line.line_length;
    },
  };

  // Feedback Screen
  const feedback_screen = {
    type: psychophysics,
    correct_angle: correct_response,
    stimuli: function() {
      // Asjust the angle of the test stimulus to the selected angle
      var feedback_stimuli = JSON.parse(JSON.stringify(matching_stimuli));
      feedback_stimuli.push(response_scale);

      const start_gray = jsPsych.data.get().last(1).values()[0].selected_gray;

      feedback_stimuli[feedback_stimuli.length - 2].fill_color = grayscale(start_gray);
      feedback_stimuli[feedback_stimuli.length - 2].line_color = grayscale(start_gray);

      var selected_X = jsPsych.data.get().last(1).values()[0].responseX;
      var conf_line_length = jsPsych.data.get().last(1).values()[0].confidence_raw;

      const response_indicator = {
        obj_type: "line",
        startX: selected_X + 6/2,
        startY: window.screen.height/2 + 2*expInfo.STIMULI.OFFSET + expInfo.COLORWHEEL.size + expInfo.ARC_RESPONSE.offset,
        line_length: expInfo.ARC_RESPONSE.size_respInd,
        line_width: 6,
        angle: 90,
        line_color: grayscale(0),
        fill_color: grayscale(0),
      }

      const confidence_indicator = {
        obj_type: "line",
        startX: selected_X + 6/2,
        startY: window.screen.height/2 + 2*expInfo.STIMULI.OFFSET + expInfo.COLORWHEEL.size + expInfo.ARC_RESPONSE.offset,
        line_length: conf_line_length,
        line_width: 6,
        angle: 0,
        line_color: grayscale(0),
        fill_color: grayscale(0),
      }

      var correct_gray = jsPsych.data.get().last(1).values()[0].correct_gray;

      // calculate correct gray into X positions
      var correctX = correct_gray - expInfo.STIMULI.MIN_GRAY;
      correctX = correctX / (expInfo.STIMULI.MAX_GRAY - expInfo.STIMULI.MIN_GRAY) * 2 * expInfo.COLORWHEEL.radius;
      correctX = correctX + (window.screen.width/2 - expInfo.COLORWHEEL.radius);


      const feedback_indicator = {
        obj_type: "line",
        startX: correctX + 6/2,
        startY: window.screen.height/2 + 2*expInfo.STIMULI.OFFSET + expInfo.COLORWHEEL.size + expInfo.ARC_RESPONSE.offset,
        line_length: expInfo.ARC_RESPONSE.size_respInd,
        line_width: 6,
        angle: 90,
        line_color: "rgb(0, 255, 0)",
        fill_color: "rgb(0, 255, 0)",
      }

      feedback_stimuli.push(response_indicator);
      feedback_stimuli.push(confidence_indicator);
      feedback_stimuli.push(feedback_indicator);
      return feedback_stimuli;
    },
    background_color: expInfo.DESIGN.backgroundCOLOR,
    choices: "NO-KEYS",
    trial_duration: expInfo.TIMING.FEEDBACK,
  };

  // Inter Trial Interval Screen
  const inter_trial_interval = {
    type: htmlKeyboardResponse,
    stimulus: "",
    choices: "NO-KEYS",
    trial_duration:
      expInfo.TIMING.ITI +
      Math.floor(Math.random() * 2 * expInfo.TIMING.JITTER + 1),
  };

  // Push screens into trial_line
  trial_line.push(fixation_screen);
  trial_line.push(matching_screen);
  trial_line.push(confidence_response_screen);
  trial_line.push(feedback_screen);
  trial_line.push(inter_trial_interval);

  // return
  return trial_line;
}
