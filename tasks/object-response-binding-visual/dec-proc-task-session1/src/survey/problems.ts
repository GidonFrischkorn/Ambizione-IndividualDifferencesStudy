// import
import surveyText from "@jspsych/plugin-survey-text"
import surveyMultiChoice from "@jspsych/plugin-survey-multi-choice"
import { jsPsych } from "../jsp";

// answer scale yes/no question
const scale_yesno = [
	"Yes",
	"No"
];

// yes/no technical problems question
export const problems = {
	type: surveyMultiChoice,
	questions: [
		{
			prompt: 'Did you encounter any technical problems during the experiment? <br>',
			options: scale_yesno,
			name: 'problems',
			required: true
		},
		
	],
	name: "problem_question",
	button_label: "Continue",
	on_finish: function (data) {
		
		if (data.response.problems =='Yes') {
			data.problems_text_answer = true;
		} else {
			data.problems_text_answer = false;
		}
	},
	data: {
	  screenID: 'survey_problems1',
	  USE: true,
	}
};

// open question to describe technical problems
export var problems_text: boolean|any = {
	type: surveyText,
	questions: [
		{
			prompt: `Please briefly describe the problems you encountered: <br>`,
			rows: 4, columns: 40,
			name: 'problems_text',
			required: true
		}
	],
	name: "problem_question_open",
	button_label: "Continue",
	function () {
		console.log(problems_text)
	},
	data: {
	  screenID: 'survey_problems2',
	  USE: true,
	},
};

// conditional loop: display open question if yes selected in previous yes/no question
export const conditional_problems = {
	timeline: [problems_text],
	conditional_function: function () {

		// answer from previous yes/no question
		var problems_answer = jsPsych.data.get().filter({screenID: 'survey_problems1'}).last(1).values()[0].problems_text_answer;
		
		if (problems_answer){
			return true // not skip
		} else {
			return false // skip
		}
	}
};

