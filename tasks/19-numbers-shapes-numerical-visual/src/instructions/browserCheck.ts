// jsPsych official plugin
import browserCheck from "@jspsych/plugin-browser-check";

// checking the size of window
export const browser_screen = {
    type: browserCheck,
    minimum_width: Math.max(screen.width * 0.9, 1200), // minimum width of the window,
    minimum_height: Math.max(screen.height * 0.75, 550), // minimum height of the window
    resize_fail_button_text: 'We kindly ask you to close your browser and <br> return your submission of Prolific if you cannot make the window any larger.'
  };
  