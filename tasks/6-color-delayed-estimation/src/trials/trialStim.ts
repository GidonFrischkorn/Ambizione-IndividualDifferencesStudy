import { circleOfSquares } from "@coglabuzh/webpsy.js"
import { expInfo } from "../settings"
import psychophysics from '@kurokida/jspsych-psychophysics';
// import { drawColorWheel } from "@coglabuzh/webpsy.js";
import { jsPsych } from "../jsp";




// Define parameters 
const radius: number = expInfo.WHEEL.wheelRADIUS;
const ratio: number = expInfo.WHEEL.wheelRATIO;
const pos: [number, number] = [expInfo.CANVAS.WIDTH / 2, expInfo.CANVAS.HEIGHT / 2]
// const pos: [number, number] = [50, 50]

// Create the color wheel stimulus
const colorWheelStimulus = drawColorWheel(radius, ratio, pos);

export const retrieval_screen = {
  type: psychophysics, 
  stimuli: [colorWheelStimulus],
  background_color: 'rgba(100, 100, 100, 1)',
  canvas_width: expInfo.CANVAS.WIDTH,
  canvas_height: expInfo.CANVAS.HEIGHT,
  response_type: 'mouse', // Enable mouse interactions
  choices: 'NO_KEYS', // Disable keyboard responses
  mouse_down_func: function(event) {
    // Get the mouse click coordinates
    const x = event.offsetX;
    const y = event.offsetY;

    // Calculate the difference from the center
    const dx = x - pos[0];
    const dy = y - pos[1];

    // Calculate the angle of the click
    let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    if (angle < 0) angle += 360; // Normalize angle to [0, 360)

    // Save the selected hue (angle) to the data
    jsPsych.data.write({
      selected_hue: angle
    });
  }
};

function drawColorWheel(radius, ratio = 0.5, pos) {
  // Define the jsPsych object that will be returned
  const colorWheelObject = {
      obj_type: 'manual',
      startX: pos[0],
      startY: pos[1],
      drawFunc: function (stimulus, canvas, context) {
          // Get the center of the canvas
          const centerX = pos[0]; //canvas.width / 2;
          const centerY = pos[1]; //canvas.height / 2;
          // Draw the color wheel
          for (var angle = 0; angle < 360; angle += 1) {
              // Define the start and end angles
              var startAngle = (angle - 2) * Math.PI / 180;
              var endAngle = angle * Math.PI / 180;
              // Set the fill color based on the angle
              context.fillStyle = "hsl(" + angle + ", 80%, 50%)";
              // Draw a slice of the color wheel
              context.beginPath();
              context.moveTo(centerX, centerY);
              context.arc(centerX, centerY, radius, startAngle, endAngle);
              context.closePath();
              context.fill();
          }
          var innerRadius = radius * ratio; // Set the radius of the inner area
          // Set the global composite operation to "destination-out"
          context.globalCompositeOperation = "destination-out";
          // Draw a solid circle to clear the inner area
          context.fillStyle = "rgba(0, 0, 0, 1)"; // Set solid black color
          context.beginPath();
          context.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
          context.closePath();
          context.fill();
          // Reset the global composite operation
          context.globalCompositeOperation = "source-over";
      }
  };
  // Return the jsPsych object
  return colorWheelObject;
}