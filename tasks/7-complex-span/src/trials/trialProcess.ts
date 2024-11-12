

// jsPsych official plugin
import htmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';
import Psychophysics from '@kurokida/jspsych-psychophysics';

// Basic Functions
import { random } from "@coglabuzh/webpsy.js";

// Task functions
import { createButtonMatrix, createAlterButtons } from "../task-fun/responseMatrix";
import { generateColors } from './trialStim';
import { samplePair } from '../task-fun/samplePair';
import { returnImages } from '../task-fun/returnImages';
import { drawImageObject } from "./elements";

// Global variables
import { jsPsych } from "../jsp";
import { expInfo, varSystem } from "../settings";
let { OBJECTS, TIMING, COLORS, DESIGN } = expInfo;
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

    colorList: string[];
    cueList: string[];
    consistencyList: string[];
    objectObj: object;
    responseList: string[];
    retrievalInfo: object;


    constructor(condition, question, blockID, trialID) {
        // trial information
        this.condition = condition;
        this.question = question;
        this.blockID = blockID;
        this.trialID = trialID;
        this.trialIndex = 1000 + blockID * 100 + trialID;

        // center of the canvas
        this.canW = varSystem.CANVAS_WIDTH;
        this.canH = varSystem.CANVAS_HEIGHT;
        this.center = [this.canW / 2, this.canH / 2];

        // generate colors
        this.colorList = random.sample(COLORS.POOL, DESIGN.SETSIZE, false);

        // define fixObject
        let fixObject = this.condition === "control" ? true : false

        // random select the objects and assign colors and positions to them
        this.objectObj = {};
        for (let i = 0; i < DESIGN.SETSIZE; i++) {

            let pair = samplePair(OBJECTS.POOL, OBJECTS.MEMORY, 2, this.trialIndex, fixObject);
            this.objectObj[i] = pair;
            // assign colors
            if (
              this.objectObj[i].left.image === OBJECTS.CONTROL_OBJECT &&
              this.condition === "control"
            ) {
              this.objectObj[i].left.color = "#FFFFFF";
            } else {
              this.objectObj[i].left.color = this.colorList[i];
            }

            if (
              this.objectObj[i].right.image === OBJECTS.CONTROL_OBJECT &&
              this.condition === "control"
            ) {
              this.objectObj[i].left.color = "#FFFFFF";
              this.objectObj[i].right.color = "#FFFFFF";
            } else {
              this.objectObj[i].right.color = this.colorList[i];
            }

            if (this.condition === "control") {
              this.objectObj[i].left.color = "#FFFFFF";
              this.objectObj[i].right.color = "#FFFFFF";
            }

            // assign positions
            this.objectObj[i].left.position = [this.canW * 0.38, this.canH / 2];
            this.objectObj[i].right.position = [this.canW * 0.62, this.canH / 2];
            // assign image path
            this.objectObj[i].left.imagePath = OBJECTS.imagePath + this.objectObj[i].left.image + '.png';
            this.objectObj[i].right.imagePath = OBJECTS.imagePath + this.objectObj[i].right.image + '.png';
            // assign image scale
            this.objectObj[i].left.width = this.canH * 0.18;
            this.objectObj[i].right.width = this.canH * 0.18;
        }

        // random select six not presented objects
        let nNPL = condition === "control" ? 9 : 6;
        this.responseList = random.sample(
          Object.keys(OBJECTS.POOL).filter((image)=> image !== OBJECTS.CONTROL_OBJECT), 
          nNPL, false);
        // put the used objects into the response list
        for (let i = 0; i < DESIGN.SETSIZE; i++) {
            let left_image = this.objectObj[i].left.image;
            let right_image = this.objectObj[i].right.image;

            if (!(left_image === OBJECTS.CONTROL_OBJECT)) this.responseList.push(left_image);
            if (!(right_image === OBJECTS.CONTROL_OBJECT)) this.responseList.push(right_image);
        }
        // shuffle the response list
        random.shuffle(this.responseList);

        // return the images
        returnImages(OBJECTS.POOL, OBJECTS.MEMORY, 15, OBJECTS.CONTROL_OBJECT)

        // correct judgement
        this.correctJudge = [];
        for (let i = 0; i < DESIGN.SETSIZE; i++) {
            if (this.question === "smaller") {
                this.correctJudge[i] = this.objectObj[i].left.size < this.objectObj[i].right.size ? "left" : "right";
            } else {
                this.correctJudge[i] = this.objectObj[i].left.size > this.objectObj[i].right.size ? "left" : "right";
            }
        }

        // cue list
        if (this.condition === "control") {
            this.cueList = [];
            for (let i = 0; i < DESIGN.SETSIZE; i++) {
                if (this.objectObj[i].left.image === OBJECTS.CONTROL_OBJECT) {
                    this.cueList.push("right");
                } else {
                    this.cueList.push("left");

                }
            }
        } else {
            this.cueList = random.sample(
              ["left", "right"],
              DESIGN.SETSIZE,
              true
            );
        }

        // correct object
        this.retrievalInfo = {};
        this.colorList.forEach((color, index) => {
            this.retrievalInfo[color] = {};
            this.retrievalInfo[color].object = this.objectObj[index][this.cueList[index]].image;
            this.retrievalInfo[color].congruency = this.correctJudge[index] === this.cueList[index] ? "congruent" : "incongruent";
        });

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

        // pre-cue screen
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
        let stepImages = this.objectObj[i];

        if (this.question === "null") {

          // draw the image objects
          const elementList = drawImageObject([stepImages.left, stepImages.right]);

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
              stepID: i + 1,
              condition: this.condition,
              cue: this.cueList[i],
              color: this.colorList[i],
              leftImage: stepImages.left.image,
              rightImage: stepImages.right.image,
              leftSize: stepImages.left.size,
              rightSize: stepImages.right.size,
            }
          };
        } else {
          let questionContent = SCREEN_INFO[this.question][expInfo.LANG];

          // draw a question mark
          const questionMark = {
            obj_type: "text",
            content: questionContent,
            font: `bold ${this.canH * 0.05}px Arial`,
            text_color: "#000000",
            startX: this.center[0],
            startY: this.center[1] * 0.2,
          };

          // create the button html for the current screen
          let buttonHtmlIndex = `${this.condition}${this.blockID}${this.trialID}${i}`;
          const buttonHtml = createAlterButtons(
            stepImages.left,
            stepImages.right,
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
              stepImages.left.imagePath,
              stepImages.right.imagePath,
            ],
            button_html: buttonHtml,
            trial_duration: TIMING.STIMULUS,
            data: {
              screenID: "memory",
              blockID: this.blockID,
              trialID: this.trialID,
              stepID: i + 1,
              condition: this.condition,
              cue: this.cueList[i],
              color: this.colorList[i],
              leftImage: stepImages.left.image,
              rightImage: stepImages.right.image,
              leftSize: stepImages.left.size,
              rightSize: stepImages.right.size,
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
  // copy the information from the current object
  const info = {
    responseList: this.responseList,
  };

  const retrievalLine: any[] = [];

  // shuffle the color list
  random.shuffle(this.colorList);

  // create the button html for the current trial
  let buttonHtmlIndex = `${this.condition}${this.blockID}${this.trialID}`;
  const colorButtonHtml = createButtonMatrix(
    3, 4, // number of rows and columns
    this.canW * 0.4,
    this.canH * 0.5, // size of the whole matrix
    [this.canW * 0.75, this.canH * 0.5], // center position of the matrix
    this.canH * 0.18, // button width
    "#FFFFFF", // color
    buttonHtmlIndex
  );

  for (let color of this.colorList) {
    let testColor: any[] = [
      {
        obj_type: "circle",
        startX: this.center[0] * 0.6,
        startY: this.center[1],
        fill_color: color,
        line_color: color,
        radius: this.canH * 0.15,
      },
    ];

    const testScreen = {
      type: Psychophysics,
      canvas_width: this.canW,
      canvas_height: this.canH,
      background_color: COLORS.BACKGROUND,
      stimuli: testColor,
      response_type: "button",
      button_choices: this.responseList.map(
        (image: any) => OBJECTS.imagePath + image + ".png"
      ),
      button_html: colorButtonHtml,
      trial_duration: TIMING.RETRIEVAL,
      data: {
        screenID: "retrieval",
        blockID: this.blockID,
        trialID: this.trialID,
        condition: this.condition,
        color: color,
        correctObject: this.retrievalInfo[color].object,
        congruency: this.retrievalInfo[color].congruency,
      },
      on_finish: function (data) {

        data.response =
          data.response === null ? "null" : info.responseList[data.response];

        data.acc = data.response === data.correctObject ? true : false;
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



export function createNewTrial(condition:string, question:string, blockID:number, trialID:number) {

    let trialBody = new createTrialBody(condition, question, blockID, trialID);

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
    let debriefingScreen = trialBody.displayDebriefingPhase();
    trialLine.push(debriefingScreen);

    return trialLine;

}

export function createSizeJudgement(question:string, blockID:number, trialID:number) {

    let trialBody = new createTrialBody("control", question, blockID, trialID);

    let trialLine:any[] = [];

    // start screen
    trialLine.push(trial_start_screen);
    // memory screen
    let memoryScreen = trialBody.displayMemoryPhase();
    trialLine = trialLine.concat(memoryScreen);
    // debriefing screen
    let debriefingScreen = trialBody.displayDebriefingPhase("sizeJudgement");
    trialLine.push(debriefingScreen);

    return trialLine;

}