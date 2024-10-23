// Purpose: Generates a stimulus array based on the specified condition.

import { jsPsych } from "../jsp";
import { expInfo } from "../settings";

/**
 * A function used to create random odd numbers.
 * @param ntrials The number of odd trials (half of the total trials).
 * @param max The highest number to be generated.
 *
 * @returns An array containing all the random odd numbers.
 */
function create_odd_number (min: number, max: number): number {
    let odd_number: number = NaN;
    let random_number = NaN;
    while (Number.isNaN(odd_number)) {
        random_number = Math.floor(min + Math.random() * (max-min+1));
        if (random_number % 2 !== 0) {
            odd_number = random_number;
        }
    } 
    return odd_number;
}
let odd_number = create_odd_number(10,99);
console.log(odd_number);

/**
 * A function used to create random even numbers.
 * @param ntrials The number of even trials (half of the total trials).
 * @param max The highest number to be generated.
 *
 * @returns An array containing all the random even numbers.
 */
function create_even_number (min: number, max: number): number {
    let even_number: number = NaN;
    let random_number = NaN;
    while (Number.isNaN(even_number)) {
        random_number = Math.floor(min + Math.random() * (max-min+1));
        if (random_number % 2 === 0) {
            even_number = random_number;
        }
    } 
    return even_number;
}
let even_number = create_even_number(10,99);
console.log(even_number);

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
 * @param nTrials The number of trials to create.
 *
 * @returns A list of trials.
 */
export function create_trialList() {
    let target_conditions = {
        condition: expInfo.DESIGN.CONDITIONS
    };
    
    let block_conditions = jsPsych.randomization.factorial(target_conditions, expInfo.DESIGN.nTRIALS, false);

    // Generate the mapping sequence
    let mapping_sequence = generate_mapping_sequence(expInfo.DESIGN.nTRIALS*expInfo.DESIGN.CONDITIONS.length);

    block_conditions.forEach((trial, i) => {
        if(trial.condition == "odd") {
            trial.stimulus = create_odd_number(expInfo.DESIGN.StimLimits[0],expInfo.DESIGN.StimLimits[1]);
        } else if (trial.condition == "even") {
            trial.stimulus = create_even_number(expInfo.DESIGN.StimLimits[0],expInfo.DESIGN.StimLimits[1]);
        }
        trial.trial_number = i + 1;
        trial.mapping = mapping_sequence[i]; // Assign mapping to each trial
    });
    console.log(mapping_sequence)

    return block_conditions;
}