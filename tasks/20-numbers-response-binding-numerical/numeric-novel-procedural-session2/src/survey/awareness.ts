// import
import surveyText from "@jspsych/plugin-survey-text"
import surveyMultiChoice from "@jspsych/plugin-survey-multi-choice"
import { jsPsych } from "../jsp";

// answer scale yes/no question
const scale_yesno = [
	"Yes",
	"No"
];

// yes/no technical awareness question
export const awareness = {
	type: surveyMultiChoice,
	questions: [
		{
			prompt: 'Did you notice that some numbers and objects were repeated throughout the experiment? <br>',
			options: scale_yesno,
			name: 'awareness',
			required: true
		},
		
	],
	name: "awareness_question",
	button_label: "Continue",
	on_finish: function (data) {
		
		if (data.response.awareness =='Yes') {
			data.awareness_text_answer = true;
		} else {
			data.awareness_text_answer = false;
		}
	},
	data: {
	  screenID: 'survey_awareness1',
	  USE: true,
	}
};

// open question to describe numerical awareness
export var awareness_text: boolean|any = {
	type: surveyText,
	questions: [
		{
			prompt: `Did you notice anything special about it?<br>`,
			rows: 4, columns: 40,
			name: 'awareness_text',
			required: true
		}
	],
	name: "awareness_question_open",
	button_label: "Continue",
	function () {
		console.log(awareness_text)
	},
	data: {
	  screenID: 'survey_awareness2',
	  USE: true,
	},
};

// conditional loop: display open question if yes selected in previous yes/no question
export const conditional_awareness = {
	timeline: [awareness_text],
	conditional_function: function () {

		// answer from previous yes/no question
		var awareness_answer = jsPsych.data.get().filter({screenID: 'survey_awareness1'}).last(1).values()[0].awareness_text_answer;
		
		if (awareness_answer){
			return true // not skip
		} else {
			return false // skip
		}
	}
};

