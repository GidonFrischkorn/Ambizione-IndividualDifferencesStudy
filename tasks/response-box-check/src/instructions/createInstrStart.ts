// JsPsych official plugin
import instructions from "@jspsych/plugin-instructions";

// Global variables
import { BUTTON_INFO } from "../task-fun/text";
import { varSystem } from "../settings";

/**
 * Generates instructions timeline from an image for a single slide
 * @param exp_info settings for the experiment
 * @param instr_folder path to the instruction folder
 * @param slide name of the slide image
 * @returns timeline with the instructions
 */

export function createSingleInstr(exp_info: any, instr_folder: string, slide: string) {

    // Set variables
    let folder = instr_folder;
    let name = slide;

    // Create single slide
    const slide_line = {
    type: instructions,
    pages: [`<div class="main">
                <img src="${exp_info.MATERIAL.INSTRUCTION_PATH}${folder}/${name}.PNG" 
                class="image"></img>
            </div>`],
    allow_keys: true,
    key_forward: exp_info.KEYS.CONTINUE,
    data: { screenID: `instruction_${slide}` }
    };

    // Create timeline with single slide
    const instr_line = {
        timeline: [slide_line]
    };
    
    // Return timeline with instruction slide
    return instr_line;
}

/**
 * Generates instructions timeline from images for multiple slides (image names should be numbered in the format 'Slide1')
 * @param exp_info settings for the experiment
 * @param instr_folder path to the instruction folder
 * @param start number of the first slide
 * @param end number of the last slide
 * @returns timeline with the instructions
 */

export function createInstr(exp_info: any, instr_folder: string, start: number, end: number) {

    // Set variables
    let folder = instr_folder;
    let start_slide = start;
    let instr_slides:any = []; // Array to store the slide images
    let end_slide = end + 1; // Add 1 to include the last slide (0-based)

    //Loop through the slides
    for (let slide = start_slide; slide < end_slide; slide++) {

        // Last slide: do not prepare following slide to avoid lag
        if (slide + 1 === end_slide) {

            // Add slide image to array
            instr_slides.push(`<div class="main">
                                <img class="image"  
                                width: 130%"
                                src="${exp_info.MATERIAL.INSTRUCTION_PATH}${folder}/Slide${slide}.PNG">
                                </img>
                            </div>`); 
                        
        // Remaining slides: prepare following slide to avoid lag
        } else { 

            // Add slide image to the array including prepared following slide
            instr_slides.push(`<div class="main">
                            <img class="image"  
                            width: 130%"
                            src="${exp_info.MATERIAL.INSTRUCTION_PATH}${folder}/Slide${slide}.PNG">
                            </img>
                        </div>
                        <div class="main">
                            <img class="image"
                            width="1" 
                            height="1" 
                            border="0"
                            style="display: none"
                            src="${exp_info.MATERIAL.INSTRUCTION_PATH}${folder}/Slide${slide + 1}.PNG">
                            </img> 
                        </div>`);
                        
        };
    };
    
    const slide_line = {
    type: instructions,
    pages: instr_slides,
    show_clickable_nav: true,
    button_label_previous: BUTTON_INFO.prevButton[exp_info.LANG],
    button_label_next: BUTTON_INFO.nextButton[exp_info.LANG],
    data: { screenID: `instruction` }
    };

    // Create timeline with multiple slides
    const instr_line = {
        timeline: [slide_line]
    };
    
    // Return timeline with instruction slides
    return instr_line;
};