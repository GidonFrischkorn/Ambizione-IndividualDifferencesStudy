// jsPsych official plugin
import fullscreen from "@jspsych/plugin-fullscreen";

// Global variables
import { varSystem } from "../settings";


  // Switch to fullscreen
 export const fullMode_screen = {
    type: fullscreen,
    fullscreen_mode: true,
    message: `<div class="main">
      <p class = 'fb-text'>Das Experiment wechselt in den Vollbildschirm-Modus</p>
    </div>`,
    button_label: 'Weiter',
    on_finish: function() {
      // start to count that how many times participants has left the browser.
      varSystem.TRACK = true;
      varSystem.nBLUR = 0;
    }
  }