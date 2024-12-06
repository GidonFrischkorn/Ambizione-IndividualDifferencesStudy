import htmlButtonResponse from "@jspsych/plugin-html-button-response";
import { createNewTrial, createSizeJudgement } from "../trials/trialProcess";
import { jsPsych } from "../jsp";
import { varSystem, expInfo } from "../settings";
let { DESIGN } = expInfo;
import { BUTTON_INFO, SCREEN_INFO } from "../task-fun/text";


/**************************** Practice for the memory task ****************************/   

const instr_start_screen = {
  type: htmlButtonResponse,
  stimulus: `<div class="image">
      <img src=assets/images/instruction-${expInfo.LANG}/instr0.jpeg width=${Math.min(
        1920,
        varSystem.CANVAS_WIDTH
      )}></img>
      </div>`,
  choices: function() {
    return BUTTON_INFO.continueButton[expInfo.LANG];
  }
};


const instr_memory_task_screen = {
  type: htmlButtonResponse,
  stimulus: `<div class="image">
      <img src=assets/images/instruction-${expInfo.LANG}/instr1.jpeg width=${Math.min(
        1920,
        varSystem.CANVAS_WIDTH
      )}></img>
      </div>`,
  choices: function() { 
    return BUTTON_INFO.continueButton[expInfo.LANG];
  }
};


let trial_memory_task_line:any[] = [];
for (let i = 0; i < DESIGN.nPRACTICE_RETRO; i++) {
  var tmp_line = createNewTrial("retro", "null", -2, i, "practice");
  trial_memory_task_line = trial_memory_task_line.concat(tmp_line);
}

const failed_memory_task_screen = {
  type: htmlButtonResponse,
  stimulus: function() {
    return SCREEN_INFO.failed_memory[expInfo.LANG];
  },
  choices: function() { return BUTTON_INFO.continueButton[expInfo.LANG];}
};

const failed_memory_task_line = {
  timeline: [failed_memory_task_screen],
  conditional_function: function () {
    let acc = jsPsych.data
      .get()
      .filter({ screenID: "debrief", blockID: -2 })
      .last(5)
      .select("response")
      .mean();

    // if the accuracy is less 2 items, then we loop through the practice again
    if (acc >= 0.5) {
      return false;
    } else {
      return true;
    }
  },
};


const memory_task_line = {
  timeline: [instr_memory_task_screen].concat(
    trial_memory_task_line,
    //@ts-ignore
    failed_memory_task_line
  ),
  loop_function: function (data) {
    let acc = jsPsych.data
      .get()
      .filter({ screenID: "debrief", blockID: -2 })
      .last(DESIGN.nPRACTICE_RETRO)
      .select("response")
      .mean();

    // if the accuracy is lower than 0.5, then we loop through the practice again
    if (acc >= 0.5) {
      return false;
    } else {
      return true;
    }
  },
};

export const practice_memory_task_line = [instr_start_screen].concat(
  // @ts-ignore
  memory_task_line
);

/**************************** Practice for the size judgement task ****************************/

const instr_judgement_task_screen = {
  type: htmlButtonResponse,
  stimulus: `<div class="image">
      <img src=assets/images/instruction-${expInfo.LANG}/instr2.jpeg width=${Math.min(
        1920,
        varSystem.CANVAS_WIDTH
      )}></img>
      </div>`,
  choices: function() { 
    return BUTTON_INFO.continueButton[expInfo.LANG];
  }
};


let trial_judgement_task_line:any[] = [];

for (let i = 0; i < DESIGN.nJUDGE; i++) {
  
  let tmp_line = createSizeJudgement(DESIGN.QUESTION, -3, i, "practice");
  trial_judgement_task_line = trial_judgement_task_line.concat(tmp_line);

}


const failed_judgement_task_screen = {
  type: htmlButtonResponse,
  stimulus: function() {
    return SCREEN_INFO.failed_judgement[expInfo.LANG];
  },
  choices: function() { 
    return BUTTON_INFO.continueButton[expInfo.LANG];
  }
};

const failed_judgement_task_line = {
  timeline: [failed_judgement_task_screen],
  conditional_function: function () {
    let correct = jsPsych.data
      .get()
      .filter({ screenID: "memory", blockID: -3 })
      .last(DESIGN.nJUDGE*DESIGN.SETSIZE)
      .select("acc")
      .count();

      let acc = correct / (DESIGN.nJUDGE*DESIGN.SETSIZE);

    // if the accuracy is less 2 items, then we loop through the practice again
    if (acc >= 0.5) {
      return false;
    } else {
      return true;
    }
  },
};

export const practice_judgement_task_line = {
  timeline: [instr_judgement_task_screen].concat(
    trial_judgement_task_line,
    //@ts-ignore
    failed_judgement_task_line
  ),
  loop_function: function (data) {

    let correct = jsPsych.data
      .get()
      .filter({ screenID: "memory", blockID: -3 })
      .last(DESIGN.nJUDGE * DESIGN.SETSIZE)
      .select("acc")
      .count();

    let acc = correct / (DESIGN.nJUDGE * DESIGN.SETSIZE);

    // if the accuracy is less 1 item, then we loop through the practice again
    if (acc >= 0.5) {
      return false;
    } else {
      return true;
    }
  },
};

/**************************** Practice for the dual tasks ****************************/

const instr_dual_tasks_screen = {
  type: htmlButtonResponse,
  stimulus: `<div class="image">
      <img src=assets/images/instruction-${expInfo.LANG}/instr3.jpeg width=${Math.min(1920, varSystem.CANVAS_WIDTH)}></img>
      </div>`,
  choices: function() { 
    return BUTTON_INFO.continueButton[expInfo.LANG];
  }
};


let trial_dual_tasks_line:any[] = [];

for (let i = 0; i < DESIGN.nDUAL; i++) {

  let tmp_line = createNewTrial("retro", DESIGN.QUESTION, -4, i, "practice");
  trial_dual_tasks_line = trial_dual_tasks_line.concat(tmp_line);

}


const failed_dual_tasks_screen = {
  type: htmlButtonResponse,
  stimulus: function () {
    return SCREEN_INFO.failed_dual_tasks[expInfo.LANG];
  },
  choices: function () {
    return BUTTON_INFO.continueButton[expInfo.LANG];
  },
};

const failed_dual_tasks_line = {
  timeline: [failed_dual_tasks_screen],
  conditional_function: function () {
    let acc_memory = jsPsych.data
      .get()
      .filter({ screenID: "debrief", blockID: -4 })
      .last(DESIGN.nDUAL)
      .select("response")
      .mean();

    let correct_judgement = jsPsych.data
      .get()
      .filter({ screenID: "memory", blockID: -4 })
      .last(DESIGN.nJUDGE * DESIGN.SETSIZE)
      .select("acc")
      .count();

    let acc_judgement = correct_judgement / (DESIGN.nJUDGE * DESIGN.SETSIZE);

    // if the accuracy is less 1 item, then we loop through the practice again
    if (acc_memory >= 0.33 && acc_judgement >= 0.33) {
      return false;
    } else {
      return true;
    }
  },
};

export const practice_dual_tasks_line = {
  timeline: [instr_dual_tasks_screen].concat(
    trial_dual_tasks_line,
    //@ts-ignore
    failed_dual_tasks_line
  ),
  loop_function: function (data) {
    let acc_memory = jsPsych.data
      .get()
      .filter({ screenID: "debrief", blockID: -4 })
      .last(DESIGN.nDUAL)
      .select("response")
      .mean();

    let correct_judgement = jsPsych.data
      .get()
      .filter({ screenID: "memory", blockID: -4 })
      .last(DESIGN.nJUDGE * DESIGN.SETSIZE)
      .select("acc")
      .count();

    let acc_judgement = correct_judgement / (DESIGN.nJUDGE * DESIGN.SETSIZE);

    // if the accuracy is less 1 item, then we loop through the practice again
    if (acc_memory >= 0.33 && acc_judgement >= 0.33) {
      return false;
    } else {
      return true;
    }
  },
};