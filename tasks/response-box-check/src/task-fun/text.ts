// Global variables
import { expInfo, varSystem } from "../settings";
let { CODES } = expInfo;

// Define button information in different languanges
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

// The information for different situations at the end of the experiment
export const END_INFO = {

  // If the participant fails to resize browser window
  failedResize: {
    de: `<div class="main">
    <h1 class="title">Experiment beendet</h1>
    <p>
        Leider ist das Browserfenster zu klein und das Experiment wurde beendet. <br>
        Bitte drücken Sie "OK" in dem Pop-up, um Ihre Daten herunterzuladen <br>
        (ein json-file mit dem Namen "${expInfo.TITLE}_[Zahl].json") <br>
        Bitte wenden Sie sich an die Versuchsleitung.
    </p>
    </div>`,
  },

  // If the participant fails practice
  failedPractice: {
    de: `<div class="main">
    <h1 class="title">Experiment beendet</h1>
    <p>
        Leider haben Sie die Übungsaufgabe nicht bestanden und das Experiment wurde beendet. <br>
        Bitte drücken Sie "OK" in dem Pop-up, um Ihre Daten herunterzuladen <br>
        (ein json-file mit dem Namen "${expInfo.TITLE}_[Zahl].json") <br>
        Bitte wenden Sie sich an die Versuchsleitung.
    </p>
    </div>`,
  },

  // If the participant fails finger check
  failedFinger: {
    de: `<div class="main">
    <h1 class="title">Experiment beendet</h1>
    <p>
        Leider haben Sie den Antwortbox-Test nicht bestanden und das Experiment wurde beendet. <br>
        Bitte drücken Sie "OK" in dem Pop-up, um Ihre Daten herunterzuladen <br>
        (ein json-file mit dem Namen "${expInfo.TITLE}_[Zahl].json") <br>
        Bitte wenden Sie sich an die Versuchsleitung.
    </p>
    </div>`,
  },

  // If the participant fails an attention check
  failed: {
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

  // If the participant completes study and has internet connection
  completedOnline: {
    de: `<div class="main">
    <h1 class="title">Herzlichen Glückwunsch!</h1>
    <p>
        Sie haben das Experiment erfolgreich beendet! 
        Wir werden nun die Daten an unseren Server übermitteln. 
        Bitte warten Sie und Refreshen Sie nicht Ihren Brower oder schliessen das Browserfenster.<br>
        Sie werden an Prolific weitergeleitet, um die Studie zu beenden.<br>
        Bei Komplikationen kontaktieren Sie bitte die Studienleitung.<br>
    </p>
    </div>`,
  },

  // If the participant completes study and has no internet connection
  completedOffline: {
    de: `<div class="main">
        <p h1 class="title">Herzlichen Glückwunsch!</h1>
        <p class="body-center">
        Leider, besteht ein Problem mit der Verbindung zu unserem Datenserver. <br>
        Aber Sie haben das Experiment erfolgreich beendet. <br>
        Bitte drücken Sie "OK" im Pop-up, um Ihre Daten herunterzuladen <br>
        (eine json-Datei mit dem Namen "${expInfo.TITLE}_[Zahl].json") <br>
        und schicken Sie die Daten an die Studienleitung über den Filesharer der Universität Zürich (SwitchDrive) über folgenden Link: <br>
        <br>
        Der Filesharer ist anonym und nur die Studienleitung hat Zugriff darauf. <br> 
        Auch wenn es Ihnen unmöglich ist die Datei hochzuladen, erhalten Sie Ihre Entlohnung. <br>
        Bitte geben Sie folgenden Code auf Prolific ein: ${CODES.OFFLINE} <br>
        Falls Sie Fragen haben, wenden Sie sich bitte an die Studienleitung. <br>
        </p>
        </div>`,
  },

  // If the participant completes study locally and has no internet connection
  // Screen 1: Inform about local download
  completedLocal: {
    de: `<div class="main">
          <p h1 class="title">Herzlichen Glückwunsch!</h1>
          <p class="body-center">
          Sie haben das Experiment erfolgreich beendet. <br>
          Bitte drücken Sie "OK" in dem Pop-up, um Ihre Daten herunterzuladen <br>
          (ein json-file mit dem Namen "${expInfo.TITLE}_[Zahl].json") <br>
          Bitte wenden Sie sich an die Studienleitung. <br>
          </p>
          </div>`,
  },

  // If the participant completes study locally and has no internet connection
  // Screen 2: After local download
  completedLocal2: {
    de: `<div class="main">
          <p h1 class="title">Herzlichen Glückwunsch!</h1>
          <p class="body-center">
          Sie haben das Experiment erfolgreich beendet. <br>
          Bitte wenden Sie sich an die Studienleitung. <br>
          </p>
          </div>`,
  },

  // Informaation about local download
  downloadData: {
    de: `\nDownload\nBitte drücken Sie "OK", um den Download zu bestätigen`,
    },
};
