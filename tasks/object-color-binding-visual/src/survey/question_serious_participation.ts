// import
import surveyLikert from "@jspsych/plugin-survey-likert"
import surveyMultiChoice from "@jspsych/plugin-survey-multi-choice"

// answer scale
var scale_serious = [
	"Ja, ich habe das Experiment ernst genommen. Meine Daten können für die Analyse verwendet werden.",
	"Nein, ich wollte nur 'mal reinschauen', habe ein zweites Mal teilgenommen oder möchte nicht, dass meine Daten für die Analyse verwendet werden."
]

// question about serious participation
export var question_serious_participation = {
	type: surveyMultiChoice,
	questions: [
		{
			prompt: "<strong>Können wir Ihre Daten für die Analyse verwenden (unabhängig davon, wie gut Sie Ihre Leistung einschätzen)?</strong><br><br>" +
				"Bitte beantworten Sie diese Frage wahrheitsgemäss." +
				"<strong> Unabhängig von der Antwort auf diese Frage, " +
				"erhalten Sie die Vergütung unabhängig von Ihrer Antwort, solange Sie vollständig an der Studie teilgenommen haben (auch wenn Sie 'Nein' auswählen). </strong>" +
				"Wir bitten Sie um ehrliche Antworten, da wir nur auf Grundlage zuverlässiger Angaben aussagekräftige Analysen durchführen können.<br><br>",
			
			options: scale_serious,
			name: "serious_selection",
			required: true
		}
	],
	scale_width: 400,
	name: "question_serious_participation",
	button_label: "Weiter",
	data: {
		screenID: 'survey_serious',
		USE: true,
	  }
}


