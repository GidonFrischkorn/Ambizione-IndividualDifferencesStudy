// Import plugins to this file
import htmlButtonResponse from '@jspsych/plugin-html-button-response';

export const end_screen = {
    type: htmlButtonResponse,
    stimulus: `<p class="title">The End</p>
      <div class="main">
        <p class="fb-text">
          <strong>Congratulations, you are done!</strong><br><br>
          <strong><font color = "red">Please don't close or reload this browser window!</font></strong><br>
          If you have any technical issues, please contact the experimenter.<br><br>
          If you press "Finish", you will automatically be redirected to Prolific.<br><br>
        </p>
      </div>`,
    choices: ["&nbsp;Finish&nbsp;"],
    data: { screenID: "end" },
  };