// import
import { setCSS } from "./task-fun/setCSS";
import { words } from "../assets/stimuli";

setCSS();

export const varOnline = {
    RUN_JATOS: false, // true, if you run your experiment in jatos
    RUN_PROLIFIC: false, // true, if you run your experiment in Prolific 

    CODES: {
        SUCCESS: "success", // the code for a successfully completion of the experiment
        OFFLINE: "offline", // the code for the offline situation
        FAILED_ATTENTION: "failedAttention", // the code for the failed experiment
        FAILED_OTHERS: "failedOthers", // the code for other failed situations (e.g., failed to resize the window)
        // You can specify the codes for different situations here.
    },

    TIMING: {
        BREAK: 30
    } 
};

export const varSystem = {
    TITLE: "BindingVisualDeclarative", // experiment name
    LANG: "de", // the language of the instructions
    RESPONSE_BOX: false, // a switch to control whether participants use a response box or not (i.e., keyboard)
    TRACK: false, // a switch to track participants' interactions with the browser
    nBLUR: 0, // use to count how many times participants left the browser
    MAX_BLUR: 3, // the maximum number of times participants can leave the browser
    LOOP: true, // a switch to control whether participants need to read the instruction and practice again
    STATUS: "offline"
};

// define experimental variables and color condition
export function MakeExpInfo(task_condition) {
    
    // determine task condition
    // declarative or procedural task
    var exp_task = 'declarative';

    // define object with experimental variables
    const expInfo = {

        // experiment name
        exp_name: "BindingVisual_" + exp_task , // experiment name
        
        // define list conditions
        list_condition: ['Control', 'Control', 'Hebb'], // list conditions

        // number of blocks and trials
        n_proc_speed_trials: 64, // number of processing speed trials
        n_prac_trials: 8, // number of practice trials
        n_exp_trials: 3, // number of experiment trials within mini block
        n_proc_speed_blocks: 1, // number of processing speed blocks
        n_prac_blocks: 1, // number of practice blocks
        n_exp_blocks: 20, // number of experimental blocks
        n_blocks_break: 4, // number of mini blocks before break

        // number of slides for isntructions
        n_proc_speed_slides_dec: 9,
        n_prac_slides_dec: 11,
        
        // set sizes and certain variable values
        setsize: 6, // number of stimulus in experimental trials
        prac_setsize: [2, 2, 3, 3, 4, 4, 6, 6], // setsizes for practice trials
        stim_count: 274, // number of stimuli
        stim_index_dec: Array.from(Array(332).keys()).map(i => i),
        stim_index_proc: Array.from(Array(332).keys()).map(i => i),
        stim_words: words.map(i => i.Word), 
        instruction_keys_keyboard: ['ArrowLeft', 'ArrowRight'], // instruction keys on keyboard
        instruction_keys_box: ['alt', 'control'], // instruction keys on response box
        resp_keys_keyboard:['a', 's', 'd', 'f', 'h', 'j', 'k', 'l'], // response keys on keyboard
        resp_keys_box:['a', 's', 'd', 'alt', 'control', 'j', 'k', 'l'], // response keys on repsonse box
        pos: Array.from(Array(8).keys()), // positions of responses
            
        // define names and colors
        firsts: ['Anna', 'Eva', 'Lena', 'Sarah', 'Petra', 'Karin', 'Doris', 'Heidi'], // https://doi.org/10.1027/1864-9335/a000383
        firsts_name: ['name0', 'name1', 'name2', 'name3', 'name4', 'name5', 'name6', 'name7'],
        response_dot_col: "red",
        
        // canvas locations and font sizes
        canW: Math.min(screen.width, screen.height/9*16)*0.9, // width of the canvas
        canH: (Math.min(screen.width, screen.height/9*16)*0.9) * 0.5, // height of the canvas
        center: [(Math.min(screen.width, screen.height/9*16)*0.9) / 2, 
                ((Math.min(screen.width, screen.height/9*16)*0.9) * 0.5) / 2], // center of canvas 
        left: (Math.min(screen.width, screen.height/9*16)*0.9) * 0.4, // left position of canvas
        right: (Math.min(screen.width, screen.height/9*16)*0.9) * 0.6, // right position of canvas
        top: ((Math.min(screen.width, screen.height/9*16)*0.9) * 0.5) * 0.3, // top position of canvas
        bottom: ((Math.min(screen.width, screen.height/9*16)*0.9) * 0.5) * 0.7, // bottom position of canvas
        // font size
        font_cues: Math.min(Math.min(window.innerWidth, window.innerHeight * 1.5) * 0.95,1200) * 0.02 * 1.5 + "px Arial", 

        // timings
        enc_time: 2000,
        isi: 500,
        max_rt: 10000,
        fix_time: 500,
        cue_time: 1000,
        iti: 1000,
        feedback_time: 800,
        info_time: 4000,
        resp_stim_time: 1000,

        // paths and file names
        image_path: 'assets/images/Stimuli_' + task_condition + '/',
        image_path_finger_check: 'assets/images/Finger_Check/',
        instr_path: 'assets/images/',
        response_image: 'resp.jpg',
        finger_image: 'finger_allocation.jpg'
        
    };

    // return experimental variables
    return expInfo;
}

