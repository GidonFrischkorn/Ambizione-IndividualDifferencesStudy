// import
import surveyMultiChoice from "@jspsych/plugin-survey-multi-choice"

// answer scale
var scale_cheat = [
	"Yes, I cheated.",
	"No, I did not not cheat."
]

// cheating question
export var question_cheat_participation = {
	type: surveyMultiChoice,
	questions: [
		{
			prompt: "<strong>Did you cheat during the experiment?<br>" +
				"for example: use of any external devices/materials/notes to complete the tasks</strong><br><br>" +
				"Note: Please answer this question honestly. " +
				"<strong>Regardless of the response to this question, " +
				"you will receive credit when you fully participated in the study (even in case you press 'yes'). </strong>" +
				"We ask for your honesty in order to include only meaningful data into our analyses.<br><br>",

			options: scale_cheat,
			name: "cheat_selection",
			required: true
		}
	],
	scale_width: 400,
	name: "question_cheat",
	button_label: "Continue",
	data: {
		screenID: 'survey_cheat',
		USE: true,
	  }
}


