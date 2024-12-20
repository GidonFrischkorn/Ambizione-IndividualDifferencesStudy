// Purpose: Generates a stimulus array based on the specified condition.

import { expInfo } from "../settings";
import { CIElab } from "../task-fun/CIElab";
import { random, generateArray } from "@coglabuzh/webpsy.js";
import { createDifference } from "../task-fun/helpers";

/**
 * Generates a stimulus array based on the specified condition.
 * @param nBlueDots - number of blue dots
 * @param nRedDots - number of red dots
 */
export const generateStims = function (
  feature: string,
) {
  var stim_array: any[] = [];

  // Randomly generate the target angle and the start angle for the test stimulus
  var target_angle = Math.floor(Math.random() * 360);
  var start_angle_test = Math.floor(Math.random() * 360);

  // Pre-allocate variables required to define the stimuli
  var rand_sf: number = expInfo.STIMULI.sf[0]
  var target_stim: any
  var test_stim: any

  if (feature == "color") {
    target_stim = {
      obj_type: "circle",
      startX: window.screen.width/2 - expInfo.STIMULI.OFFSET,
      startY: window.screen.height/2,
      radius: expInfo.STIMULI.SIZE/2,
      correct_angle: target_angle,
      line_color: CIElab.angle_to_rgb(target_angle),
      fill_color: CIElab.angle_to_rgb(target_angle),
    }
  
    test_stim = {
      obj_type: "circle",
      startX: window.screen.width/2 + expInfo.STIMULI.OFFSET,
      startY: window.screen.height/2,
      radius: expInfo.STIMULI.SIZE/2,
      current_angle: start_angle_test,
      line_color: CIElab.angle_to_rgb(start_angle_test),
      fill_color: CIElab.angle_to_rgb(start_angle_test),
    }
  } else if (feature == "orientation") {
    target_stim = {
      obj_type: "line",
      startX: window.screen.width/2 - expInfo.STIMULI.OFFSET,
      startY: window.screen.height/2,
      line_length: expInfo.STIMULI.SIZE,
      line_width: expInfo.STIMULI.LINE_WIDTH,
      line_color: "#000000",
      angle: target_angle,
    }
  
    test_stim = {
      obj_type: "line",
      startX: window.screen.width/2 + expInfo.STIMULI.OFFSET,
      startY: window.screen.height/2,
      line_length: expInfo.STIMULI.SIZE,
      line_width: expInfo.STIMULI.LINE_WIDTH,
      line_color: "#000000",
      angle: start_angle_test,
    }
  } else {
    new Error("Feature not defined");
  }

  stim_array.push(test_stim);
  stim_array.push(target_stim);

  return stim_array;
};



/*
export function create_trialList() {
  let target_conditions = {
    difficulty: expInfo.DESIGN.CONDITIONS.DIFFICULTY,
    majority: expInfo.DESIGN.CONDITIONS.MAJORITY,
  };

  let block_conditions = jsPsych.randomization.factorial(
    target_conditions,
    expInfo.DESIGN.nTRIALS,
    false
  );
  console.log(block_conditions);

  block_conditions.forEach((trial, i) => {
    if (trial.difficulty == "easy") {
      if (trial.majority == "moreBlue") {
        trial.nBlueDots = Math.ceil(
          expInfo.DESIGN.OFFSET.DIFF_EASY * expInfo.DESIGN.nDOTS
        );
        trial.nRedDots =
          expInfo.DESIGN.nDOTS -
          Math.ceil(expInfo.DESIGN.OFFSET.DIFF_EASY * expInfo.DESIGN.nDOTS);
      } else if (trial.majority == "moreRed") {
        trial.nBlueDots =
          expInfo.DESIGN.nDOTS -
          Math.ceil(expInfo.DESIGN.OFFSET.DIFF_EASY * expInfo.DESIGN.nDOTS);
        trial.nRedDots = Math.ceil(
          expInfo.DESIGN.OFFSET.DIFF_EASY * expInfo.DESIGN.nDOTS
        );
      }
    } else if (trial.difficulty == "hard") {
      if (trial.majority == "moreBlue") {
        trial.nBlueDots = Math.ceil(
          expInfo.DESIGN.OFFSET.DIFF_HARD * expInfo.DESIGN.nDOTS
        );
        trial.nRedDots =
          expInfo.DESIGN.nDOTS -
          Math.ceil(expInfo.DESIGN.OFFSET.DIFF_HARD * expInfo.DESIGN.nDOTS);
      } else if (trial.majority == "moreRed") {
        trial.nBlueDots =
          expInfo.DESIGN.nDOTS -
          Math.ceil(expInfo.DESIGN.OFFSET.DIFF_HARD * expInfo.DESIGN.nDOTS);
        trial.nRedDots = Math.ceil(
          expInfo.DESIGN.OFFSET.DIFF_HARD * expInfo.DESIGN.nDOTS
        );
      }
    }

    trial.stimulus = generateStims(trial.nBlueDots, trial.nRedDots);
    trial.trial_number = i + 1;
  });

  return block_conditions;
}
*/


export const createColorWheel = function(startX, startY, radius, width, offset) {
  return {
    category: 'customWheel', // Custom category to identify this stimulus
    obj_type: 'manual', // Ensure this matches your registration
    startX: startX, // This is the x-coordinate of the center of the wheel
    startY: startY, // This is the y-coordinate of the center of the wheel
    radius: radius, 
    width: width,
    show_start_time: 0, // Not necessarily relevant for this experiment, but can tecnically be used to show the wheel at a specific time
    show_end_time: null, // Show for the duration of the trial
    offset: offset, // Offset in degrees -> I use this so that the color wheel does not always have the same layout. It's important to match this number with the "invisible" color wheel that a participant selects from when they move the mouse around the stimulus.
    drawFunc: function(stimulus, canvas, context) { // (these are not passed by me, but required by the psychophysics plugin)
      const numSegments = 360; // Number of color segments
      const angleStep = (2 * Math.PI) / numSegments;

      for (let i = 0; i < numSegments; i++) {
        const startAngle = i * angleStep;
        const endAngle = startAngle + angleStep + (1/720 * (2*Math.PI));
        const angleDegrees = (i / numSegments) * 360;

        const rgb_color = CIElab.angle_to_rgb((angleDegrees + offset) % 360);
        context.beginPath();
        context.arc(startX, startY, this.radius + this.width/2, startAngle, endAngle, false);
        context.arc(startX, startY, this.radius - this.width/2, endAngle, startAngle, true);
        context.closePath();
        context.fillStyle = rgb_color;
        context.fill();
      }
    }
  };
};

export const createGreyWheel = function(startX, startY, radius, width, offset) {
  return {
    category: 'customWheel', // Custom category to identify this stimulus
    obj_type: 'manual', // Ensure this matches your registration
    startX: startX, // This is the x-coordinate of the center of the wheel
    startY: startY, // This is the y-coordinate of the center of the wheel
    radius: radius, 
    width: width,
    show_start_time: 0, // Not necessarily relevant for this experiment, but can tecnically be used to show the wheel at a specific time
    show_end_time: null, // Show for the duration of the trial
    offset: offset, // Offset in degrees -> I use this so that the color wheel does not always have the same layout. It's important to match this number with the "invisible" color wheel that a participant selects from when they move the mouse around the stimulus.
    drawFunc: function(stimulus, canvas, context) { // (these are not passed by me, but required by the psychophysics plugin)
      const numSegments = 360; // Number of color segments
      const angleStep = (2 * Math.PI) / numSegments;

      for (let i = 0; i < numSegments; i++) {
        const startAngle = i * angleStep;
        const endAngle = startAngle + angleStep + (1/720 * (2*Math.PI));
        const angleDegrees = (i / numSegments) * 360;

        context.beginPath();
        context.arc(startX, startY, this.radius + this.width/2, startAngle, endAngle, false);
        context.arc(startX, startY, this.radius - this.width/2, endAngle, startAngle, true);
        context.closePath();
        context.fillStyle = "rgb(100, 100, 100)";
        context.fill();
      }
    }
  };
};

export const createShapeWheel = function(startX, startY, radius, width, offset) {
  return {
    category: 'customWheel', // Custom category to identify this stimulus
    obj_type: 'manual', // Ensure this matches your registration
    startX: startX, // This is the x-coordinate of the center of the wheel
    startY: startY, // This is the y-coordinate of the center of the wheel
    radius: radius, 
    width: width,
    show_start_time: 0, // Not necessarily relevant for this experiment, but can tecnically be used to show the wheel at a specific time
    show_end_time: null, // Show for the duration of the trial
    offset: offset, // Offset in degrees -> I use this so that the color wheel does not always have the same layout. It's important to match this number with the "invisible" color wheel that a participant selects from when they move the mouse around the stimulus.
    drawFunc: function(stimulus, canvas, context) { // (these are not passed by me, but required by the psychophysics plugin)
      const numSegments = 360; // Number of color segments
      const angleStep = (2 * Math.PI) / numSegments;

      for (let i = 0; i < numSegments; i++) {
        const startAngle = i * angleStep;
        const endAngle = startAngle + angleStep + (1/720 * (2*Math.PI));
        const angleDegrees = (i / numSegments) * 360;

        context.beginPath();
        context.arc(startX, startY, this.radius + this.width/2, startAngle, endAngle, false);
        context.arc(startX, startY, this.radius - this.width/2, endAngle, startAngle, true);
        context.closePath();
        context.fillStyle = "rgb(100, 100, 100)";
        context.fill();
      }
    }
  };
};

export const createArcResponse = function(startX, startY, centerAngle, spreadAngle, radius, widthResp, widthArc, offset) {
  return {
    category: 'ArcResponse', // Custom category to identify this stimulus
    obj_type: 'manual', // Ensure this matches your registration
    startX: startX, // This is the x-coordinate of the center of the wheel
    startY: startY, // This is the y-coordinate of the center of the wheel
    radius: radius, 
    widthResp: widthResp,
    widthArc: widthArc,
    centerAngle: centerAngle,
    spreadAngle: spreadAngle,
    show_start_time: 0, // Not necessarily relevant for this experiment, but can tecnically be used to show the wheel at a specific time
    show_end_time: null, // Show for the duration of the trial
    offset: offset, // Offset in degrees -> I use this so that the color wheel does not always have the same layout. It's important to match this number with the "invisible" color wheel that a participant selects from when they move the mouse around the stimulus.
    drawFunc: function(stimulus, canvas, context) { // (these are not passed by me, but required by the psychophysics plugin)
      var start_resAngle = stimulus.centerAngle - 0.5;
      var end_resAngle = stimulus.centerAngle + 0.5;

      if (end_resAngle < start_resAngle) {
        start_resAngle = this.centerAngle - 0.5;
        end_resAngle = this.centerAngle + 0.5;
      }
      
      var startAngle = this.centerAngle - this.spreadAngle;
      var endAngle = this.centerAngle + this.spreadAngle;

      if (endAngle < startAngle) {
        startAngle = this.centerAngle + this.spreadAngle;
        endAngle = this.centerAngle - this.spreadAngle;
      }

      const start_resAngleRad = start_resAngle * Math.PI / 180;
      const end_resAngleRad = end_resAngle * Math.PI / 180;

      const startAngleRad = startAngle * Math.PI / 180;
      const endAngleRad = endAngle * Math.PI / 180;

      // Draw arc response
      context.beginPath();
      context.arc(startX, startY, this.radius + this.widthArc / 2, startAngleRad, endAngleRad, false);
      context.arc(startX, startY, this.radius - this.widthArc / 2, endAngleRad, startAngleRad, true);
      context.closePath();
      context.fillStyle = "rgba(0,0,0,1)";
      context.fill();

      // Draw response indicator
      context.beginPath();
      context.arc(startX, startY, this.radius + this.widthResp / 2, start_resAngleRad, end_resAngleRad, false);
      context.arc(startX, startY, this.radius - this.widthResp / 2, end_resAngleRad, start_resAngleRad, true);
      context.closePath();
      context.fillStyle = "rgba(0,0,0,1)";
      context.fill();
    }
  };
};

export const createFeedbackIndicator = function(startX: number, startY: number, radius: number, width: number, correctAngle: number) {
  return {
    category: 'Feedback', // Custom category to identify this stimulus
    obj_type: 'manual', // Ensure this matches your registration
    startX: startX, // This is the x-coordinate of the center of the wheel
    startY: startY, // This is the y-coordinate of the center of the wheel
    radius: radius, 
    width: width,
    correctAngle: correctAngle,
    show_start_time: 0, // Not necessarily relevant for this experiment, but can tecnically be used to show the wheel at a specific time
    show_end_time: null, // Show for the duration of the trial
    drawFunc: function(stimulus, canvas, context) {
      var startAngle = this.correctAngle - 0.5;
      var endAngle = this.correctAngle + 0.5;

      if (endAngle < startAngle) {
        startAngle = this.correctAngle + 0.5;
        endAngle = this.correctAngle - 0.5;
      }

      const startAngleRad = startAngle * Math.PI / 180;
      const endAngleRad = endAngle * Math.PI / 180;

      // Draw response indicator
      context.beginPath();
      context.arc(startX, startY, this.radius + this.width / 2, startAngleRad, endAngleRad, false);
      context.arc(startX, startY, this.radius - this.width / 2, endAngleRad, startAngleRad, true);
      context.closePath();
      context.fillStyle = "rgb(0, 150, 0)";
      context.fill();

    }
  };
};

