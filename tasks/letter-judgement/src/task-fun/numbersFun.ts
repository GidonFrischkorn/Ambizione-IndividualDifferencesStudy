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
 * A function used to create a list of trials.
 *
 * @returns A list of trials.
 */
export function create_trialList () {
    let target_conditions = {
        condition: expInfo.DESIGN.CONDITIONS
    };
    
    let block_conditions = jsPsych.randomization.factorial(target_conditions, expInfo.DESIGN.nTRIALS, false);
    console.log(block_conditions);

    block_conditions.forEach((trial, i) => {
        if(trial.condition == "vowel") {
            trial.stimulus = create_vowel();
        } else if (trial.condition == "consonant") {
            trial.stimulus = create_consonant();
        }
        trial.trial_number = i + 1;
    });

    return block_conditions;
}



