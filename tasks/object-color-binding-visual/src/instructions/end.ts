// Import plugins to this file
import htmlButtonResponse from '@jspsych/plugin-html-button-response';

export const end_screen = {
    type: htmlButtonResponse,
    stimulus: `<p class="title">Ende</p>
      <div class="main">
        <p class="fb-text">
          <strong>Herzlichen Glückwunsch, Sie sind fertig!</strong><br><br>
          <strong><font color = "red">Bitte schliessen Sie dieses Browserfenster nicht und laden Sie es nicht neu!</font></strong><br>
          Falls Sie technische Probleme haben, wenden Sie sich bitte an die Versuchsleitung.<br><br>
        </p>
      </div>`,
    choices: ["&nbsp;Weiter&nbsp;"],
    data: { screenID: "end" },
  };