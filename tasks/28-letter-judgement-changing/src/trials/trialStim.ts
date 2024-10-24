// Purpose: Generates a stimulus array based on the specified condition.

import { jsPsych } from "../jsp";
import { expInfo } from "../settings";

/**
 * A function used to create random vowels.
 * 
 *
 * @returns An array containing all the random vowels.
 */

function create_vowel() : any {
    let vowel: string[] = ['A', 'E', 'I', 'O', 'U'];
    let random_vowel = Math.floor(Math.random() * vowel.length);
    return vowel[random_vowel];
};
let vowel = create_vowel();
console.log(vowel);

/**
 * A function used to create random consonants.
 *
 * @returns An array containing all the random consonants.
 */

function create_consonant() : any {
    let consonant: string[] = ['B', 'V', 'T', 'F', 'Z'];
    let random_consonant = Math.floor(Math.random() * consonant.length);
    return consonant[random_consonant];
};

let consonant = create_consonant();
console.log(consonant);

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
export function create_trialList () {
    let target_conditions = {
        condition: expInfo.DESIGN.CONDITIONS
    };
    
    let block_conditions = jsPsych.randomization.factorial(target_conditions, expInfo.DESIGN.nTRIALS, false);

    // Generate the mapping sequence
    let mapping_sequence = generate_mapping_sequence(expInfo.DESIGN.nTRIALS*expInfo.DESIGN.CONDITIONS.length);

    block_conditions.forEach((trial, i) => {
        if(trial.condition == "vowel") {
            trial.stimulus = create_vowel();
        } else if (trial.condition == "consonant") {
            trial.stimulus = create_consonant();
        }
        trial.trial_number = i + 1;
        trial.mapping = mapping_sequence[i]; // Assign mapping to each trial
    });

    return block_conditions;
}