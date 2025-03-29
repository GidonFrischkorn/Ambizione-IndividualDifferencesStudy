// import
import { setCSS } from "./task-fun/setCSS";
import { sampleColorWheel } from "./task-fun/sampleColorWheel";
import { random } from "@coglabuzh/webpsy.js";

setCSS();

export const varOnline = {
    RUN_JATOS: true, // true, if you run your experiment in jatos
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
    RESPONSE_BOX: true, // a switch to control whether participants use a response box or not (i.e., keyboard)
    TRACK: false, // a switch to track participants' interactions with the browser
    nBLUR: 0, // use to count how many times participants left the browser
    MAX_BLUR: 3, // the maximum number of times participants can leave the browser
    LOOP: true, // a switch to control whether participants need to read the instruction and practice again
    STATUS: "online"
};

// define experimental variables and color condition
export function MakeExpInfo(task_condition) {
    
    // determine task condition
    // declarative or procedural task
    var exp_task = 'declarative';

    // color condition
    // determined based on calibration experiment (fall back for start values)
    // within color group: 39 degrees, from ProcDecBindingCaliStair
    // between color group: 50 degrees
    const col_dist = 40;
    const group_dist = 50;
    
    // random start for sampling of colors
    // sample colors, each color group consists of 4 colors
    var cols_start = [250] //random.sample(Array.from({length: 360}, (_, i) => i + 1), 1);
    var sample_cols = sampleColorWheel(4, col_dist, group_dist, cols_start);

    // RGB value of colors
    var cols_rgb = sample_cols[0];

    // angle values on color wheel of colors
    var cols_angs = sample_cols[1].concat(sample_cols[2]);

    // define object with experimental variables
    const expInfo = {

        // experiment name
        exp_name: "BindingVisual_" + exp_task , // experiment name
        
        // define list conditions
        list_condition: ['Control', 'Control', 'Hebb'], // list conditions

        // number of blocks and trials
        n_proc_speed_trials: 64, // number of processing speed trials
        n_prac_trials: 6, // number of practice trials
        n_exp_trials: 3, // number of experiment trials within mini block
        n_proc_speed_blocks: 1, // number of processing speed blocks
        n_prac_blocks: 1, // number of practice blocks
        n_exp_blocks: 16, // number of experimental blocks
        n_blocks_break: 4, // number of mini blocks before break

        // number of slides for isntructions
        n_proc_speed_slides_dec: 9,
        n_prac_slides_dec: 11,
        
        // set sizes and certain variable values
        setsize: 6, // number of stimulus in experimental trials
        prac_setsize: [2, 2, 3, 3, 6, 6], // setsizes for practice trials
        stim_count: 274, // number of stimuli
        stim_index_dec: random.sample(Array.from(Array(274).keys()).map(i => i + 1), 252),
        stim_index_proc: random.sample(Array.from(Array(274).keys()).map(i => i + 1), 252), // sample 252 from 274 stimulus indices 
        instruction_keys_keyboard: ['ArrowLeft', 'ArrowRight'], // instruction keys on keyboard
        instruction_keys_box: ['alt', 'control'], // instruction keys on response box
        resp_keys_keyboard:['a', 's', 'd', 'f', 'h', 'j', 'k', 'l'], // response keys on keyboard
        resp_keys_box:['a', 's', 'd', 'alt', 'control', 'j', 'k', 'l'], // response keys on repsonse box
        pos: Array.from(Array(8).keys()), // positions of responses
            
        // define colors
        col_dist: col_dist, // distance between colors within a group in degrees
        group_dist: group_dist, // distance between the two color groups in degrees
        cols_start: cols_start, // random start values for color groups
        cols: cols_rgb, // RGB value of colors
        cols_angles: cols_angs, // angle values on color wheel of colors
        cols_name: ['col0', 'col1', 'col2', 'col3', 'col4', 'col5', 'col6', 'col7'], // color names
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

