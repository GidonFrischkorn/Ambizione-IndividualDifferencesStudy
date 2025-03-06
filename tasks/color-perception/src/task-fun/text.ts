import { expInfo } from "../settings";
let { TIMING, CODES } = expInfo;

// Text on the screens 
export const SCREEN_INFO = {
  welcome: {
    en: `<div class='main'>
    <h1 class='title'>Welcome!</h1>
    <p class='fb-text'>
      Thank you very much for participating in this experiment.
    </p>
    </div>`,
    de: `<div class='main'>
    <h1 class='title'>Willkommen!</h1>
    <p class='fb-text'>
      Vielen Dank für Ihre Teilnahme an diesem Experiment.
    </p>
    </div>`,
    
  },

  startTrial: {
    en: ` <p>The next trial will start in <span id="clock" style="color:red">10</span> seconds.</p>
    <p>Press the space bar to start directly.</p>`,
    de: ` <p>Der nächste Durchgang beginnt in <span id="clock" style="color:red">10</span> Sekunden.</p>
    <p>Drücken Sie die Leertaste, um direkt zu beginnen.</p>`,
    
  },

  blockBreak: function (blockID: number, nBlock: number, lang: string) {
    switch (lang) {
      case "en":
        return `<div class='main'>
          <h1 class='title'>Take a break</h1>
          <p class='fb-text'>
            You have completed ${blockID}/${nBlock} blocks. 
            The next block will start in <span id='break' style='color:red'>${expInfo.TIMING.BREAK}</span> seconds.
          </p>
          <p class="fb-text">Press the space bar to skip the break</p>
          <br>
        </div>`;
    }
  },

  fullScreen: {
    en: "The experiment will switch to full screen",
    de: "Das Experiment wechselt in den Vollbildmodus",
  },

  feedback: function (accuracy: number, nTest: number, lang: string) {
    switch (lang) {
      case "en":
        return `<div class='fb-text'>You correctly recalled ${accuracy} out of ${nTest} letters.</div>`;
      case "de":
        return `<div class='fb-text'>Sie haben ${accuracy} von ${nTest} Buchstaben korrekt erinnert.</div>`;
    }
  },

  startPractice: {
    en: `<div class='main'>
        <h1 class='title'>Practice</h1>
        <p class='fb-text'>We will do some practice to get familiar with the experiment.</p>
      </div>`,
    de: `<div class='main'>
        <h1 class='title'>Übung</h1>
        <p class='fb-text'>Wir werden nun einige Übungen machen, damit Sie mit dem Experiment vertraut werden.</p>
      </div>`,
   
  },

  startExperiment: {
    en: `<div class='main'>
        <h1 class='title'>Experiment</h1>
        <p class='fb-text'>Good job! Now we will start running the experiment.</p>
      </div>`,
    de: `<div class='main'>
        <h1 class='title'>Experiment</h1>
        <p class='fb-text'>Gut gemacht! Jetzt beginnen wir mit dem Experiment.</p>
      </div>`,
   
  },
};

// Button information
export const BUTTON_INFO = {
  continueButton: {
    en: ["Continue"],
    de: ["Weiter"],
  },

  prevButton: {
    en: ["Previous"],
    de: ["Zurück"],
  },

  nextButton: {
    en: ["Next"],
    de: ["Weiter"],
  },

  submitButton: {
    en: "Submit",
    de: "Bestätigen",
  },
};

  // The information for different situations as the end of the experiment
  export const END_INFO = {
    failedResize: {
      en: `<div class="main">
      <h1 class="title">Experiment discontinued</h1>
      <p>
          Unfortunately, your window size is too small to continue the experiment.
          we therefore have to end this experiment.
          If you have any questions, please contact the researcher.
      </p>
      </div>`,
      de: `<div class="main">
      <h1 class="title">Experiment abgebrochen</h1>
      <p>
          Leider ist Ihre Fenstergröße zu klein, um das Experiment fortzusetzen.
          Daher müssen wir dieses Experiment beenden.
          Wenn Sie Fragen haben, wenden Sie sich bitte an den Forscher.
      </p>
      </div>`,
    },

    failed: {
      en: `<div class="main">
      <h1 class="title">Failed Attention Check </h1>
      <p>
          Unfortunately, you have left the tab or browser window more often than allowed.
          As we told you at the beginning of the experiment,
          we therefore have to end this experiment prematurely and we cannot grant you any course credit.
          If you have any questions, please contact the researcher.
      </p>
      </div>`,
      de: `<div class="main">
      <h1 class="title">Fehlgeschlagener Aufmerksamkeitstest</h1>
      <p>
          Leider haben Sie das Browser-Tab oder das Browserfenster öfter verlassen als erlaubt.
          Wie wir Ihnen zu Beginn des Experiments mitgeteilt haben,
          müssen wir das Experiment daher vorzeitig beenden und können Ihnen keine Versuchspersonenstunden gutschreiben.
          Wenn Sie Fragen haben, wenden Sie sich bitte an die Studienleitung.
      </p>
      </div>`,
    },
  
    completedOnline: {
      en: `<div class="main">
      <h1 class="title">Congratulation!</h1>
      <p>
          You have successfully completed the experiment! 
          We are now transferring data to the server. 
          If the window is not redirected to the next task after 5 minutes, 
          please contact the researcher.
      </p>
      </div>`,
      de: `<div class="main">
      <h1 class="title">Herzlichen Glückwunsch!</h1>
      <p>
          Sie haben das Experiment erfolgreich abgeschlossen! 
          Die Daten werden nun an den Server übertragen. 
          Wenn Sie nicht nach 5 Minuten zur nächsten Aufgabe weitergeleitet werden, 
          wenden Sie sich bitte an die Studienleitung.
      </p>
      </div>`,
    },

    completedOffline: {
      en: `<div class="main">
            <h1 class="title">Congratulation!(Offline Mode)</h1>
            <p class="body-center">
            You have successfully completed the experiment while in offline mode.
            Your data failed to transfer to the server.
            It has been automatically downloaded to your "Downloads" folder.
            Please contact the researcher for further assistance.
            </p>
            </div>`,
      de: `<div class="main" lang="de">
            <h1 class="title">Herzlichen Glückwunsch!(Offline-Modus)</h1>
            <p class="body-center">
            Sie haben das Experiment im Offline-Modus erfolgreich abgeschlossen.
            Ihre Daten konnten nicht auf den Server übertragen werden.
            Sie wurden automatisch in Ihren "Downloads"-Ordner heruntergeladen.
            Bitte kontaktieren Sie den Studienleitung für weitere Unterstützung.
            </p>
            </div>`,
    },
  };


export const SURVEY_INFO = {
  TITLE_INFO: {
    cn: `<h1 class="title">事后问卷</h1>`,
    en: `<h1 class="title">Post-Experiment Questionnaire</h1>`,
    de: `<h1 class="title">Fragebogen nach dem Experiment</h1>`,
  },
  DESCRIPTION: {
    en: `<div class="main">
    This questionnaire is only used for the processing of experimental data 
    and has no effect on whether you can receive the credit. 
    Please fill in truthfully.</div>`,
    de: `<div class="main">
    Dieser Fragebogen wird nur für die Bearbeitung der Versuchsdaten verwendet 
    und hat keinen Einfluss darauf, ob Sie den Kredit erhalten oder nicht. 
    Bitte füllen Sie ihn wahrheitsgemäß aus.</div>`,
  },

  AGE_QUES: {
    en: "How old are you?",
    de: "Wie alt sind Sie",
  },

  SEX_QUES: {
    en: "What is your sex?",
    de: "Was ist Ihr Geschlecht?",
  },

  SEX_OPT: {
    en: ["Male", "Female", "Other"],
    de: ["Männlich", "Weiblich", "Andere"],
  },

  ATTENTION_QUES: {
    en: "Were you distracted during the experiment?",
    de: "Wurden Sie während des Experiments abgelenkt?",
  },
  ATTENTION_OPT: {
    en: ["Yes", "No"],
    de: ["Ja", "Nein"],
  },
  COMMENT_QUES: {
    en: "Do you have any suggestions or comments on this experiment?",
    de: "Haben Sie irgendwelche Vorschläge oder Kommentare zu diesem Experiment?",
  },
};