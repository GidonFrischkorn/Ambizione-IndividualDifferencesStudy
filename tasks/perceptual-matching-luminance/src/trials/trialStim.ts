// Purpose: Generates a stimulus array based on the specified condition.

import { expInfo } from "../settings";
import { CIElab } from "../task-fun/CIElab";
import { random, generateArray } from "@coglabuzh/webpsy.js";
import { createDifference } from "../task-fun/helpers";

// generate Stimuli for perceptual matching

export const generateStims = function (
  feature: string,
  trial_type: string
) {
  var stim_array: any[] = [];

  // Randomly generate the target angle and the start angle for the test stimulus
  var target_angle = Math.floor(Math.random() * 360);
  var start_angle_test = Math.floor(Math.random() * 360);

  // Pre-allocate variables required to define the stimuli
  var rand_sf: number = expInfo.STIMULI.sf[0]
  var target_stim: any
  var test_stim: any
  var gray_patch: any

  if(trial_type == "side_by_side") {
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
      line_color: "rgb(100,100,100)", // CIElab.angle_to_rgb(start_angle_test),
      fill_color: "rgb(100,100,100)" // CIElab.angle_to_rgb(start_angle_test),
    }
    
    stim_array.push(target_stim);
    stim_array.push(test_stim);
  } else if(trial_type == "concentric") {
    target_stim = {
      obj_type: "circle",
      startX: window.screen.width/2,
      startY: window.screen.height/2,
      radius: expInfo.STIMULI.SIZE,
      correct_angle: target_angle,
      line_color: CIElab.angle_to_rgb(target_angle),
      fill_color: CIElab.angle_to_rgb(target_angle),
    }

    gray_patch = {
      obj_type: "circle",
      startX: window.screen.width/2,
      startY: window.screen.height/2,
      radius: expInfo.STIMULI.SIZE * 3/4,
      correct_angle: target_angle,
      line_color: "rgb(255, 253, 253)",
      fill_color: "rgb(255, 255, 255)",
    }
  
    test_stim = {
      obj_type: "circle",
      startX: window.screen.width/2,
      startY: window.screen.height/2,
      radius: expInfo.STIMULI.SIZE * 1/2,
      current_angle: start_angle_test,
      line_color: "rgb(100,100,100)" ,//CIElab.angle_to_rgb(start_angle_test),
      fill_color: "rgb(100,100,100)"  // CIElab.angle_to_rgb(start_angle_test),
    }
    
    // Push stimuli to stim_array
    stim_array.push(target_stim);
    stim_array.push(gray_patch);
    stim_array.push(test_stim);
  } else {
    new Error("Trial type not defined");
  }

  return stim_array;
};


export const createColorWheel = function(startX, startY, radius, width, offset, is_gray_wheel = false) {
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
        context.fillStyle = is_gray_wheel ? "rgb(100,100,100)" : rgb_color;
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

