

// jsPsych official plugin
import htmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';
import Psychophysics from '@kurokida/jspsych-psychophysics';

// Basic Functions
import { random } from "@coglabuzh/webpsy.js";

// Task functions
import { createNumberButtonMatrix, createAlterButtons } from "../task-fun/responseMatrix";
import { samplePair } from '../task-fun/samplePair';
import { returnNumbers } from '../task-fun/returnImages';
import { drawNumberObject } from "./elements";

// Global variables
import { jsPsych } from "../jsp";
import { expInfo, varSystem } from "../settings";
let { NUMBERS, TIMING, COLORS, DESIGN } = expInfo;
import { SCREEN_INFO } from "../task-fun/text";

// screens
import { trial_start_screen } from "../instructions/InstrTrial";


class createTrialBody {

    condition: string;
    question: string;
    correctJudge: string[];
    blockID: number;
    trialID: number;
    trialIndex: number;
    canW: number;
    canH: number;
    center: number[];
    pairList: number[];
    cueList: string[];
    consistencyList: string[];
    numberObj: object;
    responseList: number[];
    retrievalInfo: object;
    procedure: string;


    constructor(condition, question, blockID, trialID, procedure) {
        // trial information
        this.condition = condition;
        this.question = question;
        this.blockID = blockID;
        this.trialID = trialID;
        this.trialIndex = 1000 + blockID * 100 + trialID;
        this.procedure = procedure;

        // center of the canvas
        this.canW = varSystem.CANVAS_WIDTH;
        this.canH = varSystem.CANVAS_HEIGHT;
        this.center = [this.canW / 2, this.canH / 2];

        this.pairList = Array.from({ length: DESIGN.SETSIZE }, (_, i) => i + 1);

        let availableNumbers = [...NUMBERS.POOL];

        // random select the NUMBERS
        this.numberObj = {};
        for (let i = 0; i < DESIGN.SETSIZE; i++) {

          let pairNumbers = random.sample(availableNumbers, 2, false);

          availableNumbers = availableNumbers.filter(num => !pairNumbers.includes(num));

          this.numberObj[i] = {
            left: {
              number: pairNumbers[0],
              pair: this.pairList[i],
              width: this.canH * 0.18,
              position: [this.canW * 0.38, this.canH / 2],
            },
            right: {
              number: pairNumbers[1],
              pair: this.pairList[i],
              width: this.canH * 0.18,
              position: [this.canW * 0.62, this.canH / 2],
            },
          };

            // assign positions
            this.numberObj[i].left.position = [this.canW * 0.40, this.canH / 2];
            this.numberObj[i].right.position = [this.canW * 0.65, this.canH / 2];
            
        }
        
        // collect the numbers that have been used for the current block
        let usedNumbers: number[] = [];
          for (let i = 0; i < DESIGN.SETSIZE; i++) {
            usedNumbers.push(this.numberObj[i].left.number);
            usedNumbers.push(this.numberObj[i].right.number);
        }

        // remove used numbers from the pool
        let unusedNumbers = NUMBERS.POOL.filter(num => !usedNumbers.includes(num));

        // random select six numbers that were not presented as others distractors 
        let nNPL = expInfo.DESIGN.COLS_ResponseMat*expInfo.DESIGN.ROWS_ResponseMat - DESIGN.SETSIZE*2;
        let additionalNumbers = random.sample(unusedNumbers, nNPL, false);

        this.responseList = usedNumbers.concat(additionalNumbers);
        this.responseList = [...new Set(this.responseList)];

        // shuffle the response list
        random.shuffle(this.responseList);

        // return the images
        returnNumbers(NUMBERS.POOL, NUMBERS.MEMORY, 15)

        // correct judgement
        this.correctJudge = [];
        for (let i = 0; i < DESIGN.SETSIZE; i++) {
          if (this.question === "smaller") {
            this.correctJudge[i] =
              this.numberObj[i].left.number < this.numberObj[i].right.number
                ? "left"
                : "right";
          } else {
            this.correctJudge[i] =
              this.numberObj[i].left.number > this.numberObj[i].right.number
                ? "left"
                : "right";
          }
        }

        // cue list
            this.cueList = random.sample(
              ["left", "right"],
              DESIGN.SETSIZE,
              true
            );

        // correct object
        this.retrievalInfo = {};
        for (let i = 0; i < DESIGN.SETSIZE; i++) {
          let cueSide = this.cueList[i]; // 'left' or 'right'
          let pair = this.pairList[i];
          this.retrievalInfo[pair] = {
            number: this.numberObj[i][cueSide].number,
            congruency: this.correctJudge[i] === cueSide ? "congruent" : "incongruent",
          };
        }

    }

    // display the memory phase
    displayMemoryPhase() { }

    // ask participants to recall the color
    displayRetrievalPhase() { }

    // display the feedback
    displayDebriefingPhase(results:string = "memory") { }
}


/**
 * Display the memory phase
 */
createTrialBody.prototype.displayMemoryPhase = function () {

    let screen_line:any[] = [];

    for (let i = 0; i < DESIGN.SETSIZE; i++){

        // cue text
        const cueImage = {
            obj_type: 'image',
            file: `assets/images/arrows/${this.cueList[i]}.png`,
            image_width: this.canH * 0.2,
        }

        // empty text
        const emptyText = {
            obj_type: 'text',
            content: '',
            font: `bold ${this.canH * 0.15}px Arial`,
        }

        // pre-cue screen - WE DON'T HAVE A PRE CUE 
        const preCueScreen = {
          type: Psychophysics,
          canvas_width: this.canW,
          canvas_height: this.canH,
          background_color: COLORS.BACKGROUND,
          stimuli: () => {
            if (this.condition === "pre") {
              return [cueImage];
            } else {
              return [emptyText];
            }
          },
          trial_duration: TIMING.PRECUE,
          data: {
            screenID: "preStim",
            blockID: this.blockID,
            trialID: this.trialID,
            condition: this.condition,
            question: this.question,
            cue: this.condition === "pre" ? this.cueList[i] : "null",
          },
        };


        // add the pre-cue screen to the screen line
        screen_line.push(preCueScreen);

        let memoryScreen: object;
        let stepNumbers = this.numberObj[i];

        if (this.question === "null") {

          // draw the image NUMBERS
          const elementList = drawNumberObject([stepNumbers.left, stepNumbers.right]);

          // memory screen
          memoryScreen = {
            type: Psychophysics,
            canvas_width: this.canW,
            canvas_height: this.canH,
            background_color: COLORS.BACKGROUND,
            stimuli: elementList,
            response_type: "key",
            choices: "NO_KEYS",
            trial_duration: TIMING.STIMULUS,
            data: {
              screenID: "memory",
              blockID: this.blockID,
              trialID: this.trialID,
              condition: this.condition,
              procedure: this.procedure,
              pair: this.pairList[i],
              cue: this.cueList[i],
              leftNumber: stepNumbers.left.number,
              rightNumber: stepNumbers.right.number,
            },
          };
        } else {
          let questionContent = SCREEN_INFO[this.question][expInfo.LANG];

          // draw a question mark
          const questionMark = {
            obj_type: "text",
            content: questionContent,
            font: `${this.canH * 0.05}px Arial`,
            text_color: "#000000",
            startX: this.center[0],
            startY: this.center[1] * 0.2,
          };

          // create the button html for the current screen
          let buttonHtmlIndex = `${this.condition}${this.blockID}${this.trialID}${i}`;
          const buttonHtml = createAlterButtons(
            stepNumbers.left,
            stepNumbers.right,
            buttonHtmlIndex
          );

          // memory screen
          memoryScreen = {
            type: Psychophysics,
            canvas_width: this.canW,
            canvas_height: this.canH,
            background_color: COLORS.BACKGROUND,
            stimuli: [questionMark],
            response_type: "button",
            button_choices: [
              stepNumbers.left.number,
              stepNumbers.right.number,
            ],
            response_ends_trial: false,
            button_html: buttonHtml,
            trial_duration: TIMING.STIMULUS,
            data: {
              screenID: "memory",
              blockID: this.blockID,
              trialID: this.trialID,
              condition: this.condition,
              procedure: this.procedure,
              pair: this.pairList[i],
              cue: this.cueList[i],
              leftNumber: stepNumbers.left.number,
              rightNumber: stepNumbers.right.number,
              correctJudge: this.correctJudge[i],
            },
            on_finish: function (data) {
              // congruency
              data.congruency =
                data.cue === data.correctJudge ? "congruent" : "incongruent";

              // transform the response
              data.response =
                data.response === null
                  ? "null"
                  : ["left", "right"][data.response];

              // accuracy
              data.acc = data.response === data.correctJudge ? true : false;
            },
          };
        }
        
        // add the memory screen to the screen line
        screen_line.push(memoryScreen);

        // retro-cue screen
        const retroCueScreen = {
            type: Psychophysics,
            canvas_width: this.canW,
            canvas_height: this.canH,
            background_color: COLORS.BACKGROUND,
            stimuli: () => {
                if (this.condition === "retro") {
                    return [cueImage]
                } else {
                    return [emptyText]
                }
            },
            trial_duration: TIMING.PRECUE,
            data: {
                screenID: 'retroStim',
                blockID: this.blockID,
                trialID: this.trialID,
                condition: this.condition,
                cue: this.condition === "retro" ? this.cueList[i] : "null"
            },
        }

        // add the retro-cue screen to the screen line
        screen_line.push(retroCueScreen);
    }


    return screen_line;
}


/**
 * Ask participants to recall the object corresponding to the color
 */
createTrialBody.prototype.displayRetrievalPhase = function () {
  
  const button_choices = this.responseList.map((number: number) => number.toString());

  // copy the information from the current object
  const info = {
    responseList: this.responseList,
    button_choices: button_choices,
  };

  const retrievalLine: any[] = [];

  // shuffle the color list
  //random.shuffle(this.pairList);

  // create the button html for the current trial
  let buttonHtmlIndex = `${this.condition}${this.blockID}${this.trialID}`;
  const colorButtonHtml = createNumberButtonMatrix(
    expInfo.DESIGN.ROWS_ResponseMat, expInfo.DESIGN.COLS_ResponseMat, // number of rows and columns
    this.canW * 0.4,
    this.canH * 0.5, // size of the whole matrix
    [this.canW * 0.75, this.canH * 0.5], // center position of the matrix
    this.canH * 0.18, // button width
    "#FFFFFF", // color
    buttonHtmlIndex,
    this.responseList
  );

  for (let pair of this.pairList) {
    let cueStimuli: any[];

    let positionIndex = pair;

    let cueText = {
      obj_type: "text",
      content: `${positionIndex}. Zahl`,
      font: `bold ${this.canH * 0.05}px Arial`,
      text_color: "#000000",
      startX: this.center[0] * 0.6,
      startY: this.center[1],
      text_align: "center",
      text_baseline: "middle",
    };

    cueStimuli = [cueText];

    const testScreen = {
      type: Psychophysics,
      canvas_width: this.canW,
      canvas_height: this.canH,
      background_color: COLORS.BACKGROUND,
      stimuli: cueStimuli,
      response_type: "button",
      button_choices: this.responseList.map((number: number) => number.toString()),
      button_html: colorButtonHtml,
      trial_duration: TIMING.RETRIEVAL,
      data: {
        screenID: "retrieval",
        blockID: this.blockID,
        trialID: this.trialID,
        condition: this.condition,
        procedure: this.procedure,
        pair: pair,
        cue: positionIndex,
        correctNumber: this.retrievalInfo[pair].number,
        congruency: this.retrievalInfo[pair].congruency,
      },
      on_finish: function (data) {

        if (data.response === null) {
          data.response = "null";
      } else {
          const responseIndex = data.response;
          const responseValue = info.button_choices[responseIndex];
          data.response = parseInt(responseValue);
      }
      data.acc = data.response === data.correctNumber;
      
      },
  
    };

    retrievalLine.push(testScreen);
  }

  return retrievalLine;
}


createTrialBody.prototype.displayDebriefingPhase = function(results:string = "memoryTask") {

    let nTest = DESIGN.SETSIZE;
    
    let debriefingScreen:object;

    if (results === "memoryTask") {

      debriefingScreen = {
        type: htmlKeyboardResponse,
        trial_duration: TIMING.DEBRIEF,
        stimulus: function () {
          let accuracy = jsPsych.data
            .get()
            .filter({ screenID: "retrieval" })
            .last(nTest)
            .filter({ acc: true })
            .count();

          return SCREEN_INFO.feedbackMemory(accuracy, nTest, expInfo.LANG);
        },
        choices: "NO_KEYS",
        data: {
          screenID: "debrief",
          expPart: this.expPart,
          blockID: this.blockID,
          trialID: this.trialID,
          condition: this.condition,
          procedure: this.procedure
        },
        on_finish: function (data) {
          let accuracy = jsPsych.data
            .get()
            .filter({ screenID: "retrieval" })
            .last(nTest)
            .filter({ acc: true })
            .count();

          data.response = accuracy / nTest;
        },
      };
    } else {

      debriefingScreen = {
        type: htmlKeyboardResponse,
        trial_duration: TIMING.DEBRIEF,
        stimulus: function () {
          let accuracy = jsPsych.data
            .get()
            .filter({ screenID: "memory" })
            .last(nTest)
            .filter({ acc: true })
            .count();

          return SCREEN_INFO.feedbackJudgement(accuracy, nTest, expInfo.LANG);
        },
        choices: "NO_KEYS",
        data: {
          screenID: "debrief",
          expPart: this.expPart,
          blockID: this.blockID,
          trialID: this.trialID,
          condition: this.condition,
          procedure: this.procedure
        },
        on_finish: function (data) {
          let accuracy = jsPsych.data
            .get()
            .filter({ screenID: "memory" })
            .last(nTest)
            .filter({ acc: true })
            .count();

          data.response = accuracy/nTest;
        }
      };
    }

    return debriefingScreen;
}



export function createNewTrial(condition:string, question:string, blockID:number, trialID:number, procedure:string) {

    let trialBody = new createTrialBody(condition, question, blockID, trialID, procedure);  

    let trialLine:any[] = [];

    // start screen
    trialLine.push(trial_start_screen);
    // memory screen
    let memoryScreen = trialBody.displayMemoryPhase();
    trialLine = trialLine.concat(memoryScreen);
    // retrieval screen
    let retrievalLine = trialBody.displayRetrievalPhase();
    trialLine = trialLine.concat(retrievalLine);
    // debriefing screen
    if (procedure !== "experiment") {
      let debriefingScreen = trialBody.displayDebriefingPhase();
      trialLine.push(debriefingScreen);
    }

    return trialLine;

}

export function createSizeJudgement(question:string, blockID:number, trialID:number, procedure:string) {

    let trialBody = new createTrialBody("control", question, blockID, trialID, procedure);

    let trialLine:any[] = [];

    // start screen
    trialLine.push(trial_start_screen);
    // memory screen
    let memoryScreen = trialBody.displayMemoryPhase();
    trialLine = trialLine.concat(memoryScreen);
    // debriefing screen
    if (procedure !== "experiment") {
      let debriefingScreen = trialBody.displayDebriefingPhase("sizeJudgement");
      trialLine.push(debriefingScreen);
    }

    return trialLine;

}