// Purpose: Generates a stimulus array based on the specified condition.

import { expInfo } from "../settings";
import { CIElab } from "../task-fun/CIElab";
import { random, generateArray } from "@coglabuzh/webpsy.js";
import { createDifference } from "../task-fun/helpers";
import { jsPsych } from "../jsp";


export const generateStims = function (
  set_size: number,
  location: string = "circle",
  patch_size: number = 10,
  patch_type: string = "circle",
  location_size: number = 100
) {
  var stim_array: any[] = [];

  // Sample array of colors with length set size
  const color_angles: number[] = generateArray.number(0, 360, 1);
  var trial_colors = random.sample(color_angles, set_size);
  // console.log(trial_colors);

  // Sample array of locations with length set size
  let array_fail: boolean = true;
  var circle_locations: number[] = [];
  while (array_fail) {
    circle_locations = random.sample(generateArray.number(0, 360, 1), set_size);
    var location_diffs = createDifference(circle_locations);

    if (location_diffs.every((diff: number) => diff > expInfo.COLOR_PATCHES.MIN_DIST)) {
      array_fail = false;
    } else {
      array_fail = true;
    }
  };
  
  var grid_dims = Math.floor((2 * location_size) / (patch_size + expInfo.DESIGN.POS_OFFSET));
  var grid_locations_X = random.sample(generateArray.number(0, grid_dims, 1), set_size);
  var grid_locations_Y = random.sample(generateArray.number(0, grid_dims, 1), set_size);

  for (let i = 0; i < set_size; i++) {
    // Select a random position for the color patch
    var position = {
      X: 0,
      Y: 0,
    };

    if (location == "circle") {
      position.X =
        Math.cos((circle_locations[i] * Math.PI) / 180) * location_size;
      position.Y =
        Math.sin((circle_locations[i] * Math.PI) / 180) * location_size;
    } else if (location == "rect") {
      position.X = grid_locations_X[i] * (patch_size + expInfo.DESIGN.POS_OFFSET) - location_size;
      position.Y = grid_locations_Y[i] * (patch_size + expInfo.DESIGN.POS_OFFSET) - location_size;
    } else {
      new Error("Invalid location type");
    }

    if (patch_type == "circle") {
      var circle_patch = {
        obj_type: patch_type,
        startX: position.X,
        startY: position.Y,
        radius: patch_size/2,
        angle_loc: circle_locations[i],
        angle_col: trial_colors[i],
        selected_col: 0,
        origin_center: true,
        fill_color: CIElab.angle_to_rgb(trial_colors[i]),
        line_color: CIElab.angle_to_rgb(trial_colors[i]),
      };

      // Add the patch to the stimulus array
      stim_array.push(circle_patch);
    } else if (patch_type == "rect") {
      var rect_patch = {
        obj_type: patch_type,
        startX: position.X,
        startY: position.Y,
        width: patch_size,
        height: patch_size,
        origin_center: true,
        angle_col: trial_colors[i],
        fill_color: CIElab.angle_to_rgb(trial_colors[i]),
        line_color: CIElab.angle_to_rgb(trial_colors[i]),
      };

      // Add the patch to the stimulus array
      stim_array.push(rect_patch);
    } else {
      new Error("Invalid patch type");
    }
  }

  // Return the stimulus array
  return stim_array;
};

export const generatePlaceholders = function (memory_stims: any[]) {
  var stim_array: any[] = JSON.parse(JSON.stringify(memory_stims));
  for (let i = 0; i < stim_array.length; i++) {
    stim_array[i].fill_color = "rgb(255, 255, 255)";
    stim_array[i].line_color = "black";
  }

  return stim_array;
};

export const generateRetrievalCue = function (cued_pos, memory_stims) {
  var cues_array: any[] = JSON.parse(JSON.stringify(memory_stims));
  var cue_stim = cues_array[cued_pos];
  cue_stim.fill_color = "rgba(150,150,150,1)";
  cue_stim.line_color = "black";
  return cue_stim;
};


// function to determine the current location of the mouse
export const getDirection = function(mouseX, mouseY, itemX, itemY) {
  // compute the angle according to the center of the tested item
  let angleMouse = Math.atan2(mouseY - itemY, mouseX - itemX) * 180 / Math.PI;
  if(Math.round(angleMouse) <= 0){angleMouse += 360}  
  return (Math.round(angleMouse));
}

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
      context.fillStyle = "rgba(150,150,150,1)";
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

export const createFeedbackIndicator = function(startX, startY, radius, width, correctAngle) {
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


export function create_trialList() {
  let target_conditions = {
    setsize: expInfo.DESIGN.CONDITIONS.SETSIZE,
  };

  let block_conditions = jsPsych.randomization.factorial(
    target_conditions,
    expInfo.DESIGN.nTRIALS,
    false
  );
  

  block_conditions.forEach((trial, i) => {
    if (trial.setsize == 1) {
      trial.size = 1;
    } else if (trial.setsize == 2) {
      trial.size = 2;
    } else if (trial.setsize == 3) {
      trial.size = 3;
    } else if (trial.setsize == 4) {
      trial.size = 4;
    } else if (trial.setsize == 5) {
      trial.size = 5;
    } else if (trial.setsize == 6) {
      trial.size = 6;
    } else if (trial.setsize == 7) {
      trial.size = 7;
    } else if (trial.setsize == 8) {
      trial.size = 8;
    }

    trial.stimulus = generateStims(
      trial.size,
      trial.location,
      trial.patch_size,
      trial.patch_type,
      trial.location_size
    );
    trial.trial_number = i + 1;
  });

  return block_conditions;
}