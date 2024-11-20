// Import plugins to this file
import htmlButtonResponse from '@jspsych/plugin-html-button-response';

export const welcome_screen = {
    type: htmlButtonResponse,
    stimulus: `<p class="fb-text">
        Binding Task Visual (declarative) <br> <br>
        </p>
      </div>`,
    choices: ["&nbsp;Weiter&nbsp;"],
    data: { screenID: "welcome" },
  };