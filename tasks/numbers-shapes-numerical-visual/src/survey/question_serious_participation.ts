// import
import surveyLikert from "@jspsych/plugin-survey-likert"
import surveyMultiChoice from "@jspsych/plugin-survey-multi-choice"

// answer scale
var scale_serious = [
	"Yes, I took the experiment seriously. My data can be used for analysis.",
	"No, I just wanted to 'have a look', participated a second time or do not want my data to be used for analysis."
]

// question about serious participation
export var question_serious_participation = {
	type: surveyMultiChoice,
	questions: [
		{
			prompt: "<strong>Can we use your data for analysis (regardless of how well you think your performance was)?</strong><br><br>" +
				"Note: Please answer this question honestly. " +
				"<strong>Regardless of the response to this question, " +
				"you will receive credit when you fully participated in the study (even in case you press 'no'). </strong>" +
				"We ask for your honesty in order to include only meaningful data into our analyses.<br><br>",
			
			options: scale_serious,
			name: "serious_selection",
			required: true
		}
	],
	scale_width: 400,
	name: "question_serious_participation",
	button_label: "Continue",
	data: {
		screenID: 'survey_serious',
		USE: true,
	  }
}


