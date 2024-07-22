// Import plugins to this file
import htmlButtonResponse from '@jspsych/plugin-html-button-response';

export const welcome_screen = {
    type: htmlButtonResponse,
    stimulus: `<p class="title">Welcome!</p>
      <div class="main">
        <p class="fb-text">
          Thank you very much for participating in the study <br>
          <strong>"Comparing declarative and procedural bindings: <br>
          Memorizing colors and responses - Session 2"</strong>.<br><br>
          This study is conducted by Dr. Gidon Frischkorn and Isabel Courage <br> 
          at the Department of Psychology, University of Zurich, Switzerland. <br> 
          If you have any questions, please contact: i.courage@psychologie.uzh.ch <br> <br>
        </p>
      </div>`,
    choices: ["&nbsp;Start Experiment&nbsp;"],
    data: { screenID: "welcome" },
  };