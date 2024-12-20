// Purpose: Functions for generating stimuli and creating elements

// Global variables
import { expInfo } from "../settings";
import { jsPsych } from "../jsp";

// Third party plugins
import psychophysics from "@kurokida/jspsych-psychophysics";
import htmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";
import { generateStims, createColorWheel, createGreyWheel, createArcResponse, createFeedbackIndicator } from "./trialStim";
import { CIElab } from "../task-fun/CIElab";
import { circle_functions } from "../task-fun/circleFun";
/**
 * A function used to create a single trial.
 * @param setsize The number of items in a trial.
 *
 * @returns An array containing all the slides of a trial.
 */
export function createNewTrial(
  feature: string, 
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
  const matching_stimuli = generateStims(feature);
  console.log(matching_stimuli)

  // get correct response 
  var correct_angle_no_offset: number = 0;
  if(feature == "color") {
    correct_angle_no_offset = matching_stimuli[1].correct_angle;
  } else if(feature == "orientation") {
    correct_angle_no_offset = matching_stimuli[1].angle;
  }

  const matching_screen = {
    type: psychophysics,
    stimuli: function() {
      var stim_array = JSON.parse(JSON.stringify(matching_stimuli));

      const offset = Math.floor(Math.random() * 360);

      var wheelStim: any;
      if(feature === "color") {
        wheelStim = createColorWheel(window.screen.width/2, window.screen.height/2, 
          expInfo.COLORWHEEL.radius, expInfo.COLORWHEEL.size, offset);
      } else if(feature === "orientation") {
        wheelStim = createGreyWheel(window.screen.width/2, window.screen.height/2, 
          expInfo.COLORWHEEL.radius, expInfo.COLORWHEEL.size, offset)
      }
      stim_array.push(wheelStim);
      return stim_array;
    },
    background_color: expInfo.DESIGN.backgroundCOLOR,
    response_type: "mouse", // This is important, as it provides a psychophysics-internal way of ending the trial when a mouse click is detected. 
    mouse_move_func: function(event) { // This function is the most important part of the trial. We use an event listener that is integrated into the psychophysics plugin, minimizing any conflict with external event listeners. We use it to constantly redraw the color of the item every time the mouse moves.
      const currentTrial = jsPsych.getCurrentTrial(); // We need to get the current trial to access the stimuli we defined earlier
      const stim_array = currentTrial.stim_array; // Get the stimuli array from the current trial

      const offset = stim_array[stim_array.length - 1].offset; // Get the offset from the color wheel

      const StimuliCenterX = window.screen.width/2; // Get the center of the circle, this would be relevant if the stimuli are not centered on the screen, we need 
      const StimuliCenterY = window.screen.height/2; // Same thing here

      const dx = event.offsetX - StimuliCenterX; // Calculate the difference between the mouse position and the center of the circle
      const dy = event.offsetY - StimuliCenterY; // Same thing here

      const angleRadians = Math.atan2(dy, dx); // Calculate the angle in radians

      let angleDegrees = circle_functions.rad2deg(angleRadians); // Convert the angle to degrees
      if (angleDegrees < 0) { // Ensure the angle is between 0 and 360 degrees
        angleDegrees += 360;
      }

      stim_array[0].current_angle = angleDegrees; // Change the angle of the circle

      // Apply the offset and ensure it stays within 0–360 degrees
      var offset_angleDegrees = (angleDegrees + offset) % 360;

      // Calculate the ever-changing color during the trial
      if (feature === "color") {
        const color = CIElab.angle_to_rgb(offset_angleDegrees);
        stim_array[0].fill_color = color; // Change the color of the circle
        stim_array[0].line_color = color; 
        stim_array[0].color_ang = offset_angleDegrees; // Save the angle of the selected color
      } else if (feature === "orientation") {
        stim_array[0].angle = angleDegrees;
      } else if (feature === "shape") {
        stim_array[0].file = "../assets/VCSshapes/VCS_" + offset_angleDegrees.toString() + ".jpg"
      }
      
    },
    on_finish: function (data) {
      // To store the final circle stimuli and the selected color, we once again access the stimuli array from the current trial
      const stim_array = jsPsych.getCurrentTrial().stim_array;
    
      // Add the selected stimuli (containing the selected color value) to the dataframe
      data.wheel_offset = stim_array[stim_array.length - 1].offset;
      data.selected_angle = stim_array[0].current_angle;
      data.color = stim_array[0].fill_color;
    },
  };

  // Arc Confidence Screen
  // create arc response screen
  const arc_response_screen = {
    type: psychophysics,
    stimuli: function() {
      const startAngle = jsPsych.data.get().last(1).values()[0].selected_angle;
      const offset = jsPsych.data.get().last(1).values()[0].wheel_offset;
      const spreadAngle = 1;
      const colorAngle = startAngle + offset;

      // Asjust the angle of the test stimulus to the selected angle
      var arc_all_stimuli = JSON.parse(JSON.stringify(matching_stimuli));
      arc_all_stimuli[0].fill_color = CIElab.angle_to_rgb(colorAngle);
      arc_all_stimuli[0].line_color = CIElab.angle_to_rgb(colorAngle);

      const colorWheel = createColorWheel(window.screen.width/2, window.screen.height/2, expInfo.COLORWHEEL.radius, expInfo.COLORWHEEL.size, offset);
      const arcResponse = createArcResponse(window.screen.width/2, window.screen.height/2, startAngle, spreadAngle, expInfo.ARC_RESPONSE.offset * expInfo.COLORWHEEL.radius, expInfo.ARC_RESPONSE.size_respInd, expInfo.ARC_RESPONSE.size_arc, offset);
    
      arc_all_stimuli.push(colorWheel);
      arc_all_stimuli.push(arcResponse);
      // Return both stimuli as an array
      return arc_all_stimuli; // Use spread operator to ensure a fresh copy
    },
    background_color: expInfo.DESIGN.backgroundCOLOR,
    response_type: "mouse", // This is important, as it provides a psychophysics-internal way of ending the trial when a mouse click is detected. 
    mouse_move_func: function(event) {
      const currentTrial = jsPsych.getCurrentTrial(); // We need to get the current trial to access the stimuli we defined earlier
      const stim_array = currentTrial.stim_array; // Get the stimuli array from the current trial

      const current_Wheel = stim_array[stim_array.length-2]; // Out of the circle and the color wheel in the stimuli array, we need to find the color wheel, because we need the offset
      const current_arc = stim_array[stim_array.length-1]; // Same thing here

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
      const TargetStimulus = stimuli_array[0];
      const ColorWheelStimulus = stimuli_array[stimuli_array.length-2];
      const ArcStimulus = stimuli_array[stimuli_array.length-1];
    
      // Add the selected stimuli (containing the selected color value) to the dataframe
      data.offset_colorWheel = ColorWheelStimulus.offset;
      data.selected_angle = TargetStimulus.selected_ang;
      data.color_angle = TargetStimulus.color_ang;
      data.color = TargetStimulus.fill_color;
      data.confidence = ArcStimulus.spreadAngle;
    },
  };

  // Feedback Screen
  const feedback_screen = {
    type: psychophysics,
    correct_angle: correct_angle_no_offset,
    stimuli: function() {
      const startAngle = jsPsych.data.get().last(2).values()[0].selected_angle;
      const offset = jsPsych.data.get().last(2).values()[0].wheel_offset;
      const spreadAngle = jsPsych.data.get().last(1).values()[0].confidence;
      const colorAngle = startAngle + offset;

      var feedback_all_stimuli = JSON.parse(JSON.stringify(matching_stimuli));
      feedback_all_stimuli[0].fill_color = CIElab.angle_to_rgb(colorAngle);
      feedback_all_stimuli[0].line_color = CIElab.angle_to_rgb(colorAngle);

      const colorWheel_fb = createColorWheel(window.screen.width/2, window.screen.height/2, 
        expInfo.COLORWHEEL.radius, expInfo.COLORWHEEL.size, offset);
      const arcResponse_fb = createArcResponse(window.screen.width/2, window.screen.height/2, 
        startAngle, spreadAngle, expInfo.ARC_RESPONSE.offset * expInfo.COLORWHEEL.radius, expInfo.ARC_RESPONSE.size_respInd, expInfo.ARC_RESPONSE.size_arc, offset);
      const feedbackInd = createFeedbackIndicator(window.screen.width/2, window.screen.height/2, 
        expInfo.ARC_RESPONSE.offset * expInfo.COLORWHEEL.radius, expInfo.ARC_RESPONSE.size_respInd, correct_angle_no_offset - offset);

      feedback_all_stimuli.push(arcResponse_fb);
      feedback_all_stimuli.push(feedbackInd);
      feedback_all_stimuli.push(colorWheel_fb);

      // Return both stimuli as an array
      return feedback_all_stimuli; // Use spread operator to ensure a fresh copy
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
  trial_line.push(arc_response_screen);
  trial_line.push(feedback_screen);
  trial_line.push(inter_trial_interval);

  // return
  return trial_line;
}
