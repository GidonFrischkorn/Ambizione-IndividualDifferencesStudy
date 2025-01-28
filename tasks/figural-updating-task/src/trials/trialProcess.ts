

// jsPsych official plugin
import htmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';
import Psychophysics from '@kurokida/jspsych-psychophysics';

// Basic Functions
import { random } from "@coglabuzh/webpsy.js";

// Task functions
import { createButtonMatrix, createAlterButtons } from "../task-fun/responseMatrix";
import { returnLetters } from '../task-fun/returnImages';
import { drawTextObject } from "./elements";

// Global variables
import { jsPsych } from "../jsp";
import { expInfo, varSystem } from "../settings";
let { OBJECTS, TIMING, COLORS, DESIGN } = expInfo;
import { SCREEN_INFO } from "../task-fun/text";

// screens
import { trial_start_screen } from "../instructions/InstrTrial";


class createTrialBody {
  blockID: number;
  trialID: number;
  trial_type: string;
  setsize: number;
  updStep: number;
  canW: number;
  canH: number;
  center: number[];

  colorList: string[];
  updColorList: string[];
  objectList: string[];
  initialResp: object;
  updatingResp: object;
  responseList: string[];
  correctResp: object;

  constructor(setsize, updStep, blockID, trialID, trial_type) {
    // trial information
    this.blockID = blockID;
    this.trialID = trialID;
    this.setsize = setsize;
    this.updStep = updStep;
    this.trial_type = trial_type;

    // center of the canvas
    this.canW = varSystem.CANVAS_WIDTH;
    this.canH = varSystem.CANVAS_HEIGHT;
    this.center = [this.canW / 2, this.canH / 2];

    // generate colors
    this.colorList = random.sample(COLORS.POOL, this.setsize, false);
    this.updColorList = random.sample(this.colorList, this.updStep, false);

    // random select the objects and assign colors and positions to them
    this.objectList = random.sample(
      OBJECTS.letterPOOL, // changed for letters
      this.setsize + this.updStep,
      false
    );

    // assign colors to the objects (initial)
    this.initialResp = {};
    this.colorList.forEach((color, index) => {

      let selectedObject = this.objectList[index];

      this.initialResp[color] = {
        letter: selectedObject,
        color: color,
      };
      this.initialResp[color].letter = selectedObject;
      this.initialResp[color].color = color;
    });

    // assign colors to the objects (updating)
    this.updatingResp = {};
    this.correctResp = JSON.parse(JSON.stringify(this.initialResp));
    this.updColorList.forEach((color, index) => {

      let selectedObject = this.objectList[index + this.setsize];

      // updating object
      this.updatingResp[color] = {
        letter: selectedObject, // Store the letter
        color: color,
      };
      this.updatingResp[color].letter = selectedObject; //image to letter
      this.updatingResp[color].color = color;

      // update the correct response
      this.correctResp[color].letter = selectedObject; // image to letter 
    });

    // Create a copy of the letter pool for sampling
    let availableLetters = OBJECTS.letterPOOL.filter(letter => !this.objectList.includes(letter));

    // Randomly select six unique letters that aren’t already in objectList
    this.responseList = [];
    while (this.responseList.length < DESIGN.nNPL) { // assuming DESIGN.nNPL is 6
        let newLetter = random.sample(availableLetters, 1, false)[0];

        // Add the letter if it's not already in the responseList
        if (!this.responseList.includes(newLetter)) {
            this.responseList.push(newLetter);
        }
    }

    // Combine this.responseList with objectList to get a full set of options
    this.responseList = this.responseList.concat(this.objectList);

    // Shuffle the final response list to randomize the display order
    random.shuffle(this.responseList);


    // return the images
    returnLetters(OBJECTS.letterPOOL, OBJECTS.MEMORY, 4);// changed for letters
  }

  // display the memory phase
  displayEncodingPhase() {}

  // display the updating phase
  displayUpdatingPhase() {}

  // ask participants to recall the color
  displayRetrievalPhase() {}

  // display the feedback
  displayDebriefingPhase() {}
}


/**
 * Display the encoding phase
 */
createTrialBody.prototype.displayEncodingPhase = function () {

    let encoding_line:any[] = [];

    Object.keys(this.initialResp).forEach((color, index) => {
      // the object
      let object = this.initialResp[color];

      // interval
      let post_trial_gap = index < this.setsize - 1 ? TIMING.ISI : TIMING.IPI;

      // encoding object
      let encodingObject = drawTextObject( // changed for letters
        { letter: object.letter, 
          color: object.color },
        this.center,
        this.canH * 0.18
      );

      // encoding screen
      let encodingScreen = {
        type: Psychophysics,
        canvas_width: this.canW,
        canvas_height: this.canH,
        background_color: COLORS.BACKGROUND,
        stimuli: encodingObject,
        trial_duration: TIMING.ENCODING,
        post_trial_gap: post_trial_gap,
        data: {
          screenID: "encoding",
          blockID: this.blockID,
          trialID: this.trialID,
          trial_type: this.trial_type,
          stepID: index,
          setsize: this.setsize,
          color: color,
          initial_item: object.letter,
        },
      };

      encoding_line.push(encodingScreen);
    });

    return encoding_line;
}


/**
 * Display the updating phase
 */
createTrialBody.prototype.displayUpdatingPhase = function () {

    let updating_line:any[] = [];

    Object.keys(this.updatingResp).forEach((color, index) => {
      // the object
      let object = this.correctResp[color];

      // interval
      let post_trial_gap = index < this.updStep - 1 ? TIMING.ISI : TIMING.IPI;

      // encoding object
      let updatingObject = drawTextObject(
        { letter: object.letter, color: object.color },
        this.center,
        this.canH * 0.18
      );

      // encoding screen
      let updatingScreen = {
        type: Psychophysics,
        canvas_width: this.canW,
        canvas_height: this.canH,
        background_color: COLORS.BACKGROUND,
        stimuli: updatingObject,
        trial_duration: TIMING.UPDATING,
        post_trial_gap: post_trial_gap,
        data: {
          screenID: "updating",
          blockID: this.blockID,
          trialID: this.trialID,
          trial_type: this.trial_type,
          stepID: index,
          setsize: this.setsize,
          color: color,
          initial_item: this.initialResp[color].letter,
          final_item: object.letter,
        },
      };

      updating_line.push(updatingScreen);
    });

    return updating_line;
}


/**
 * Ask participants to recall the object corresponding to the color
 */
createTrialBody.prototype.displayRetrievalPhase = function () {
  // copy the information from the current object
  const info = {
    responseList: this.responseList,
  };

  const retrieval_line: any[] = [];

  // shuffle the color list
  random.shuffle(this.colorList);

  // create the button html for the current trial
  let buttonHtmlIndex = `${this.blockID}${this.trialID}`;
  const colorButtonHtml = createButtonMatrix(
    expInfo.RETRIEVAL_MATRIX.n_rows, expInfo.RETRIEVAL_MATRIX.n_columns, // number of rows and columns
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
      button_choices: this.responseList,
      button_html: colorButtonHtml,
      trial_duration: TIMING.RETRIEVAL,
      data: {
        screenID: "retrieval",
        blockID: this.blockID,
        trialID: this.trialID,
        trial_type: this.trial_type,
        setsize: this.setsize,
        color: color,
        initial_item: this.initialResp[color].letter,
        final_item: this.correctResp[color].letter,
      },
      on_finish: function (data) {
        const responseIndex = data.response;
        const chosenObject = responseIndex !== null ? info.responseList[responseIndex] : null;
        data.response = chosenObject;
    
        // Check if the chosen response matches the correct object
        const correctObject = data.final_item;
        data.acc = chosenObject === correctObject;

        console.log("Chosen Object:", chosenObject);
        console.log("Correct Object:", correctObject);
        console.log("Accuracy:", data.acc);
      },
    };

    retrieval_line.push(testScreen);
  }

  return retrieval_line;
}


createTrialBody.prototype.displayDebriefingPhase = function() {

    let nTest = this.setsize;
    
    let debriefingScreen:object;

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

        return SCREEN_INFO.feedback(accuracy, nTest, expInfo.LANG);
      },
      choices: "NO_KEYS",
      data: {
        screenID: "debrief",
        expPart: this.expPart,
        blockID: this.blockID,
        trialID: this.trialID,
        setsize: this.setsize,
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

    return debriefingScreen;
}



export function createNewTrial(
  setsize: number,
  updStep: number,
  blockID: number,
  trialID: number,
  trial_type: string,
) {
  let trialBody = new createTrialBody(setsize, updStep, blockID, trialID, trial_type);

  let trialLine: any[] = [];

  // start screen
  trialLine.push(trial_start_screen);
  // encoding screen
  let encodingLine = trialBody.displayEncodingPhase();
  trialLine = trialLine.concat(encodingLine);
  // updating screen
  let updatingLine = trialBody.displayUpdatingPhase();
  trialLine = trialLine.concat(updatingLine);
  // retrieval screen
  let retrievalLine = trialBody.displayRetrievalPhase();
  trialLine = trialLine.concat(retrievalLine);
  // debriefing screen
  let debriefingScreen = trialBody.displayDebriefingPhase();
  trialLine.push(debriefingScreen);

  return trialLine;
}