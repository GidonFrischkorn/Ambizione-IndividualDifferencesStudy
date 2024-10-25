// Purpose: Generates a stimulus array based on the specified condition.

import { jsPsych } from "../jsp";
import { expInfo } from "../settings";
import { words } from "../../assets/stimuli";
import { removeItem, removeItems } from "../task-fun/removeItems";
import exp from "constants";



/**
 * Generates a stimulus array.
 * @param animacy Is the object animated or inanimated.
 * @param wordlength How long is the word.
 */
export const chooseStimuli = function (stimArray, animacy: string, wordlength: number, excludeWords: string[] = []) {

    let localStimArray = [...stimArray];


    // Filter words based on the animacy and word length
    let filteredWords = localStimArray.filter((word) => 
        word.Animacy == animacy && Number(word.Wordlength) == wordlength && !excludeWords.includes(word.Word)
    );

    // Check if filteredWords is empty
    if (filteredWords.length === 0) {
        throw new Error("No stimuli available that match the criteria. Please check your filtering conditions.");
    }
    
    // Choose a random word from the filtered list
    let randomIndex = Math.floor(Math.random() * filteredWords.length);
    let chosenWord = filteredWords[randomIndex].Word;
    //stimArray = removeItem(stimArray, chosenWord);

    const remainingWords = removeItem(localStimArray, chosenWord);
    stimArray.length = 0; // Clear the original array
    stimArray.push(...remainingWords); // Refill it with the updated array
    console.log("Chosen Word: ",chosenWord);
    console.log("Remaining Words: ", stimArray);

    return chosenWord;
}

/**
 * A function used to generate a sequence of mappings.
 * @param nTrials The number of trials.
 *
 * @returns An array containing the mapping for each trial.
 */
function generate_mapping_sequence(nTrials: number): string[] {
    const mappings = ["normal", "switched"];
    let mapping_sequence: string[] = [];
    const max_repeat = 3;

    // Initialize previous mapping
    let last_mapping: string | null = null;
    // Counter for how many times the last mapping has repeated
    let repeat_count = 0;

    for (let i = 0; i < nTrials; i++) {
        let available_mappings = mappings.slice();

        // If the last mapping has repeated max_repeat times, we must switch
        if (repeat_count >= max_repeat && last_mapping !== null) {
            // Remove last_mapping from available_mappings
            available_mappings = available_mappings.filter(mapping => mapping !== last_mapping);
        }

        // Randomly select a mapping from available_mappings
        let random_index = Math.floor(Math.random() * available_mappings.length);
        let selected_mapping = available_mappings[random_index];

        // Append selected_mapping to sequence
        mapping_sequence.push(selected_mapping);

        // Update last_mapping and repeat_count
        if (selected_mapping === last_mapping) {
            repeat_count += 1;
        } else {
            last_mapping = selected_mapping;
            repeat_count = 1;
        }
    }

    return mapping_sequence;
}

/**
 * A function used to create a list of trials.
 *
 * @returns A list of trials.
 */

export function create_trialList (excludeWords: string[] = []) {
    let localWords = [...words];
    
    let target_conditions = {
        animacy: expInfo.DESIGN.CONDITIONS.ANIMACY,
        wordlength: expInfo.DESIGN.CONDITIONS.WORDLENGTH,
    };
    
    let block_conditions = jsPsych.randomization.factorial(target_conditions, expInfo.DESIGN.nTRIALS, false);
     // Generate the mapping sequence
     let mapping_sequence = generate_mapping_sequence(expInfo.DESIGN.nTRIALS*expInfo.DESIGN.CONDITIONS.ANIMACY.length*expInfo.DESIGN.CONDITIONS.WORDLENGTH.length);
  
    block_conditions.forEach((trial, i) => {
      if(trial.animacy == "animate") {
          trial.word_animacy = expInfo.DESIGN.ANIMACY_VALUE[1];
      } else if (trial.animacy == "inanimate") {
        trial.word_animacy = expInfo.DESIGN.ANIMACY_VALUE[0];
      }
  
      if(trial.wordlength == 4) {
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
  
      trial.stimulus = chooseStimuli(localWords, trial.word_animacy, trial.word_length, excludeWords);
      trial.trial_number = i + 1;
      trial.mapping = mapping_sequence[i]; // Assign mapping to each trial
  });
  console.log(mapping_sequence);
    return block_conditions;
  };

