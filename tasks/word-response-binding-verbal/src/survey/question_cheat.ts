// import
import surveyMultiChoice from "@jspsych/plugin-survey-multi-choice"

// answer scale
var scale_cheat = [
	"Ja, ich habe unerlaubte Hilfsmittel verwendet.",
	"Nein, ich habe keine unerlaubten Hilfsmittel verwendet."
]

// cheating question
export var question_cheat_participation = {
	type: surveyMultiChoice,
	questions: [
		{
			prompt: "<strong>Haben Sie während des Experiments unerlaubte Hilfsmittel verwendet? <br>" +
				"z. B. externe Geräte, Materialien oder Notizen zur Bearbeitung der Aufgaben</strong><br><br>" +
				"Bitte beantworten Sie diese Frage wahrheitsgemäss." +
				"<strong> Unabhängig von der Antwort auf diese Frage, " +
				"erhalten Sie die Vergütung unabhängig von Ihrer Antwort, solange Sie vollständig an der Studie teilgenommen haben (auch wenn Sie 'Ja' auswählen). </strong>" +
				"Wir bitten Sie um ehrliche Antworten, da wir nur auf Grundlage zuverlässiger Angaben aussagekräftige Analysen durchführen können.<br><br>",

			options: scale_cheat,
			name: "cheat_selection",
			required: true
		}
	],
	scale_width: 400,
	name: "question_cheat",
	button_label: "Weiter",
	data: {
		screenID: 'survey_cheat',
		USE: true,
	  }
}


