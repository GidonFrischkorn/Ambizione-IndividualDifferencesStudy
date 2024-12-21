// Purpose: Functions for generating stimuli and creating elements

// Global variables
import { expInfo } from "../settings";
import { jsPsych } from "../jsp";

// Third party plugins
import psychophysics from "@kurokida/jspsych-psychophysics";
import htmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";
import { generateStims, generatePlaceholders, createColorWheel, createArcResponse, createFeedbackIndicator, generateRetrievalCue} from "./trialStim";
import { CIElab } from "../task-fun/CIElab";
/**
 * A function used to create a single trial.
 * @param setsize The number of items in a trial.
 *
 * @returns An array containing all the slides of a trial.
 */
export function createNewTrial(
  setsize: number, 
  isPractice: boolean,
  retrieval_order: number[]
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
    line_length: 30, 
    line_width: 2.5
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

  // Encoding Screen
  var memory_stims = generateStims(setsize, "circle", 25, "circle", 100);
  //console.log(memory_stims);

  const encoding_screen = {
    type: psychophysics,
    stimuli: memory_stims,
    background_color: expInfo.DESIGN.backgroundCOLOR, // white background
    trial_duration: expInfo.TIMING.ENCODING,
  };

  // Retention Invterval
  const retention_interval = {
    type: htmlKeyboardResponse,
    stimulus: "",
    background_color: expInfo.DESIGN.backgroundCOLOR,
    choices: "NO-KEYS",
    trial_duration: expInfo.TIMING.RETENTION, // Add retention interval variable here
  };
  
// Start Test
let retrieval_line: any[] = [];
for (let retPos = 0; retPos < retrieval_order.length; retPos++) {
  // We also need to calculate the random offset of the colored circle. We do this here so that the offset is the same for the color wheel as for the "invisible" color wheel that the participant selects from.
  const offset = Math.floor(Math.random() * 360); // Random offset between 0 and 359

  // get correct response 
  const correct_angle = memory_stims[retrieval_order[0]].angle_col;

  // set placeholder objects
  const placeholders = generatePlaceholders(memory_stims);

  // create retrieval cue object
  const retrieval_cue = generateRetrievalCue(retrieval_order[0], memory_stims);

  // combine all stimuli into one array
  var all_stimuli: any[] = [];
  all_stimuli = all_stimuli.concat(fixation_cross);
  all_stimuli = all_stimuli.concat(placeholders);
  all_stimuli = all_stimuli.concat(retrieval_cue);
  
  // create the reproduction screen
  const reproduction_screen = {
    type: psychophysics,
    stimuli: function() {
      const radius = expInfo.COLORWHEEL.radius; 
      const width_cw = expInfo.COLORWHEEL.size;

      // Define the center coordinates of the wheel
      // These values will probably be either the center of the screen or the center of the stimuli of which you are trying to change the color
      const centerX = window.screen.width/2; // Lets just use the center for example purposes
      const centerY = window.screen.height/2; // Lets just use the center for example purposes

      const colorWheel = createColorWheel(centerX, centerY, radius, width_cw, offset);
    
      var stim_array: any[] = [colorWheel];
      stim_array = stim_array.concat(...all_stimuli);
      // Return both stimuli as an array
      return stim_array; // Use spread operator to ensure a fresh copy
    },

    background_color: expInfo.DESIGN.backgroundCOLOR,
    response_type: "mouse", // This is important, as it provides a psychophysics-internal way of ending the trial when a mouse click is detected. 

    mouse_move_func: function(event) { // This function is the most important part of the trial. We use an event listener that is integrated into the psychophysics plugin, minimizing any conflict with external event listeners. We use it to constantly redraw the color of the item every time the mouse moves.
      const currentTrial = jsPsych.getCurrentTrial(); // We need to get the current trial to access the stimuli we defined earlier
      const stim_array = currentTrial.stim_array; // Get the stimuli array from the current trial

      const current_circle = stim_array[stim_array.length - 1]; // Out of the circle and the color wheel in the stimuli array, we need to find the circle, because we want to change its color
      const current_Wheel = stim_array[0]; // Out of the circle and the color wheel in the stimuli array, we need to find the color wheel, because we need the offset

      const offset = current_Wheel.offset; // Get the offset from the color wheel

      const StimuliCenterX = current_Wheel.startX; // Get the center of the circle, this would be relevant if the stimuli are not centered on the screen, we need 
      const StimuliCenterY = current_Wheel.startY; // Same thing here

      const dx = event.offsetX - StimuliCenterX; // Calculate the difference between the mouse position and the center of the circle
      const dy = event.offsetY - StimuliCenterY; // Same thing here

      const angleRadians = Math.atan2(dy, dx); // Calculate the angle in radians

      let angleDegrees = angleRadians * (180 / Math.PI); // Convert the angle to degrees
      if (angleDegrees < 0) { // Ensure the angle is between 0 and 360 degrees
        angleDegrees += 360;
      }

      current_circle.selected_ang = angleDegrees; // Change the angle of the circle

      // Apply the offset and ensure it stays within 0–360 degrees
      var offset_angleDegrees = (angleDegrees + offset) % 360;

      // Calculate the ever-changing color during the trial
      const color = CIElab.angle_to_rgb(offset_angleDegrees);
      current_circle.fill_color = color; // Change the color of the circle
      current_circle.line_color = color; 
      current_circle.color_ang = offset_angleDegrees; // Save the angle of the selected color
    },
    on_finish: function (data) {
      // To store the final circle stimuli and the selected color, we once again access the stimuli array from the current trial
      const stimuli_array = jsPsych.getCurrentTrial().stim_array 

      // Find the circle stimulus
      const CircleStimulus = stimuli_array[stimuli_array.length - 1];
      const ColorWheelStimulus = stimuli_array[0];

      if (!CircleStimulus) {
        console.error("Circle stimulus not found in the current trial.");
        return;
      }
    
      // Add the selected stimuli (containing the selected color value) to the dataframe
      data.offset_colorWheel = ColorWheelStimulus.offset;
      data.selected_angle = CircleStimulus.selected_ang;
      data.color_angle = CircleStimulus.color_ang;
      data.color = CircleStimulus.fill_color;
    },
  };

  // create arc response screen
  const arc_response_screen = {
    type: psychophysics,
    stimuli: function() {
      const radius = expInfo.COLORWHEEL.radius; 
      const width_cw = expInfo.COLORWHEEL.size;
      const width_respInd = expInfo.ARC_RESPONSE.size_respInd;
      const widht_arc = expInfo.ARC_RESPONSE.size_arc;

      // Define the center coordinates of the wheel
      // These values will probably be either the center of the screen or the center of the stimuli of which you are trying to change the color
      const centerX = window.screen.width/2; // Lets just use the center for example purposes
      const centerY = window.screen.height/2; // Lets just use the center for example purposes

      const startAngle = jsPsych.data.get().last(1).values()[0].selected_angle;
      const colorAngle = jsPsych.data.get().last(1).values()[0].color_angle;
      const spreadAngle = 1;

      var arc_all_stimuli = JSON.parse(JSON.stringify(all_stimuli));
      arc_all_stimuli[arc_all_stimuli.length - 1].fill_color = CIElab.angle_to_rgb(colorAngle);
      arc_all_stimuli[arc_all_stimuli.length - 1].line_color = CIElab.angle_to_rgb(colorAngle);

      const colorWheel = createColorWheel(centerX, centerY, radius, width_cw, offset);
      const arcResponse = createArcResponse(centerX, centerY, startAngle, spreadAngle, expInfo.ARC_RESPONSE.offset * radius, width_respInd, widht_arc, offset);
    
      var stim_array: any[] = [colorWheel];
      stim_array = stim_array.concat(arcResponse);
      stim_array = stim_array.concat(...arc_all_stimuli);
      // Return both stimuli as an array
      return stim_array; // Use spread operator to ensure a fresh copy
    },
    background_color: expInfo.DESIGN.backgroundCOLOR,
    response_type: "mouse", // This is important, as it provides a psychophysics-internal way of ending the trial when a mouse click is detected. 
    mouse_move_func: function(event) {
      const currentTrial = jsPsych.getCurrentTrial(); // We need to get the current trial to access the stimuli we defined earlier
      const stim_array = currentTrial.stim_array; // Get the stimuli array from the current trial

      const current_Wheel = stim_array[0]; // Out of the circle and the color wheel in the stimuli array, we need to find the color wheel, because we need the offset
      const current_arc = stim_array[1];

      const StimuliCentreX = current_Wheel.startX; // Get the center of the circle, this would be relevant if the stimuli are not centered on the screen, we need 
      const StimuliCentreY = current_Wheel.startY; // Same thing here

      const dx = event.offsetX - StimuliCentreX; // Calculate the difference between the mouse position and the center of the circle
      const dy = event.offsetY - StimuliCentreY; // Same thing here

      const angleRadians = Math.atan2(dy, dx); // Calculate the angle in radians
    
      let angleDegrees = angleRadians * (180 / Math.PI); // Convert the angle to degrees
      if (angleDegrees < 0) { // Ensure the angle is between 0 and 360 degrees
        angleDegrees += 360;
      }
    
      var diffAngle = Math.abs(current_arc.centerAngle - angleDegrees);

      diffAngle = ((diffAngle + 180) % (2 * 180)) - 180
      current_arc.spreadAngle =  diffAngle;
    },
    on_finish: function (data) {
      // To store the final circle stimuli and the selected color, we once again access the stimuli array from the current trial
      const stimuli_array = jsPsych.getCurrentTrial().stim_array 

      // Find the circle stimulus
      const CircleStimulus = stimuli_array[stimuli_array.length - 1];
      const ColorWheelStimulus = stimuli_array[0];
      const ArcStimulus = stimuli_array[1];

      if (!CircleStimulus) {
        console.error("Circle stimulus not found in the current trial.");
        return;
      }
    
      // Add the selected stimuli (containing the selected color value) to the dataframe
      data.offset_colorWheel = ColorWheelStimulus.offset;
      data.selected_angle = CircleStimulus.selected_ang;
      data.color_angle = CircleStimulus.color_ang;
      data.color = CircleStimulus.fill_color;
      data.confidence = ArcStimulus.spreadAngle;
    },
  };

  // Feedback Screen
  const feedback_screen = {
    type: psychophysics,
    correct_angle: correct_angle,
    stimuli: function() {
      const radius = expInfo.COLORWHEEL.radius; 
      const width_cw = expInfo.COLORWHEEL.size;
      const width_respInd = expInfo.ARC_RESPONSE.size_respInd;
      const widht_arc = expInfo.ARC_RESPONSE.size_arc;

      // Define the center coordinates of the wheel
      // These values will probably be either the center of the screen or the center of the stimuli of which you are trying to change the color
      const centerX = window.screen.width/2; // Lets just use the center for example purposes
      const centerY = window.screen.height/2; // Lets just use the center for example purposes

      const startAngle = jsPsych.data.get().last(2).values()[0].selected_angle;
      const colorAngle = jsPsych.data.get().last(2).values()[0].color_angle;
      const spreadAngle = jsPsych.data.get().last(1).values()[0].confidence;

      var feedback_all_stimuli = JSON.parse(JSON.stringify(all_stimuli));
      feedback_all_stimuli[feedback_all_stimuli.length - 1].fill_color = CIElab.angle_to_rgb(colorAngle);
      feedback_all_stimuli[feedback_all_stimuli.length - 1].line_color = CIElab.angle_to_rgb(colorAngle);

      const colorWheel_fb = createColorWheel(centerX, centerY, radius, width_cw, offset);
      const arcResponse_fb = createArcResponse(centerX, centerY, startAngle, spreadAngle, expInfo.ARC_RESPONSE.offset * radius, width_respInd, widht_arc, offset);
      const feedbackInd = createFeedbackIndicator(centerX, centerY, expInfo.ARC_RESPONSE.offset * radius, width_respInd, correct_angle - offset);

      var stim_array_fb: any[] = [colorWheel_fb];
      stim_array_fb = stim_array_fb.concat(arcResponse_fb);
      stim_array_fb = stim_array_fb.concat(feedbackInd);
      stim_array_fb = stim_array_fb.concat(...feedback_all_stimuli);

      // Return both stimuli as an array
      return stim_array_fb; // Use spread operator to ensure a fresh copy
    },
    background_color: expInfo.DESIGN.backgroundCOLOR,
    choices: "NO-KEYS",
    trial_duration: expInfo.TIMING.FEEDBACK,
  };

  retrieval_line.push(reproduction_screen, arc_response_screen);
  if (isPractice) {
      retrieval_line.push(feedback_screen);
  }
}
  
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
  trial_line.push(
    fixation_screen,
    encoding_screen,
    retention_interval);
  trial_line = trial_line.concat(retrieval_line);
  trial_line.push(inter_trial_interval);
  

  // return
  return trial_line;
}
