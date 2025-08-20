// Purpose: Generates a stimulus array based on the specified condition.

import { jsPsych } from "../jsp";
import { expInfo } from "../settings";
import { words } from "../../assets/stimuli";
import { removeItem, removeItems } from "../task-fun/removeItems";

/**
 * Generates a stimulus array.
 * @param animacy Is the object animated or inanimated.
 * @param wordlength How long is the word.
 */
export const chooseStimuli = function (
  stimArray,
  animacy: string,
  wordlength: number,
  excludeWords: string[] = []
) {
  let localStimArray = [...stimArray];

  // Filter words based on the animacy and word length
  let filteredWords = localStimArray.filter(
    (word) =>
      word.Animacy == animacy &&
      Number(word.Wordlength) == wordlength &&
      !excludeWords.includes(word.Word)
  );

  // Check if filteredWords is empty
  if (filteredWords.length === 0) {
    throw new Error(
      "No stimuli available that match the criteria. Please check your filtering conditions."
    );
  }

  // Choose a random word from the filtered list
  let randomIndex = Math.floor(Math.random() * filteredWords.length);
  let chosenWord = filteredWords[randomIndex].Word;
  let isAnimate = filteredWords[randomIndex].Animacy;
  let nCharacters = filteredWords[randomIndex].Wordlength;
  //stimArray = removeItem(stimArray, chosenWord);

  const remainingWords = removeItem(localStimArray, chosenWord);
  stimArray.length = 0; // Clear the original array
  stimArray.push(...remainingWords); // Refill it with the updated array

  let chosenStimulus = {
    word: chosenWord,
    animacy: isAnimate,
    wordlength: nCharacters,
  };

  return chosenStimulus;
};

/**
 * A function used to create a list of trials.
 *
 * @returns A list of trials.
 */

export function create_trialList(excludeWords: string[] = []) {
  let localWords = [...words];

  let target_conditions = {
    animacy: expInfo.DESIGN.CONDITIONS.ANIMACY,
    wordlength: expInfo.DESIGN.CONDITIONS.WORDLENGTH,
  };

  let block_conditions = jsPsych.randomization.factorial(
    target_conditions,
    expInfo.DESIGN.nTRIALS,
    false
  );

  block_conditions.forEach((trial, i) => {
    if (trial.animacy == "animate") {
      trial.word_animacy = expInfo.DESIGN.ANIMACY_VALUE[1];
    } else if (trial.animacy == "inanimate") {
      trial.word_animacy = expInfo.DESIGN.ANIMACY_VALUE[0];
    }

    if (trial.wordlength == 4) {
      trial.word_length = 4;
    } else if (trial.wordlength == 5) {
      trial.word_length = 5;
    } else if (trial.wordlength == 6) {
      trial.word_length = 6;
    } else if (trial.wordlength == 7) {
      trial.word_length = 7;
    } else if (trial.wordlength == 8) {
      trial.word_length = 8;
    }

    trial.stimulus = chooseStimuli(
      localWords,
      trial.word_animacy,
      trial.word_length,
      excludeWords
    );
    trial.trial_number = i + 1;
    localWords = removeItem(localWords, trial.stimulus.word);
  });

  return block_conditions;
}
