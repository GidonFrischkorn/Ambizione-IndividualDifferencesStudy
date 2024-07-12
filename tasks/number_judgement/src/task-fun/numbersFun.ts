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
        if(trial.condition == "odd") {
            trial.stimulus = create_odd_number(expInfo.DESIGN.StimLimits[0],expInfo.DESIGN.StimLimits[1]);
        } else if (trial.condition == "even") {
            trial.stimulus = create_even_number(expInfo.DESIGN.StimLimits[0],expInfo.DESIGN.StimLimits[1]);
        }
        trial.trial_number = i + 1;
    });

    return block_conditions;
}



