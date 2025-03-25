// Import plugins to this file
import htmlButtonResponse from '@jspsych/plugin-html-button-response';

export const welcome_screen = {
    type: htmlButtonResponse,
    stimulus: `<p class="title">Willkommen!</p>
      <div class="main">
        <p class="fb-text">
        Binding Task Numerical (declarative) <br> <br>
        </p>
      </div>`,
    choices: ["&nbsp;Weiter&nbsp;"],
    data: { screenID: "welcome" },
  };