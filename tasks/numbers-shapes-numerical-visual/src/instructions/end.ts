// Import plugins to this file
import htmlButtonResponse from '@jspsych/plugin-html-button-response';

export const end_screen = {
    type: htmlButtonResponse,
    stimulus: `<p class="title">The End</p>
      <div class="main">
        <p class="fb-text">
          <strong>Herzlichen Glückwunsch, Sie sind fertig!</strong><br><br>
          <strong><font color = "red">Bitte schliessen Sie dieses Browserfenster nicht und laden Sie es nicht neu!</font></strong><br>
          Wenn Sie technische Probleme haben, wenden Sie sich bitte an den Versuchsleiter.<br><br>
          Wenn Sie auf "Beenden"drücken, werden Sie automatisch zu Prolific weitergeleitet.<br><br>
        </p>
      </div>`,
    choices: ["&nbsp;Beenden&nbsp;"],
    data: { screenID: "end" },
  };