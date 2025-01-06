import instructions from "@jspsych/plugin-instructions"
import { varSystem } from "../settings";

export function createSingleInstr(exp_info, instr_folder: string, slide: string, box: boolean) {

    var folder = instr_folder;
    var name = slide;

    if (box == true) {
        var instruction_keys = 'a';
        var keys_folder = 'response_box';
    } else { // box == false
        var instruction_keys = 'a';
        var keys_folder = 'keyboard';
    };

    const slide_line = {
    type: instructions,
    pages: [`<div class="main">
                <img src="${exp_info.instr_path}${folder}/${keys_folder}/${name}.PNG" 
                class="image"></img>
            </div>`],
    allow_keys: true,
    key_forward: instruction_keys,
    data: { screenID: `instruction_${slide}` }
    };

    const instr_line = {
        timeline: [slide_line] 
    }
    

    return instr_line;
}


export function createInstr(exp_info, instr_folder: string, start, end, box: boolean) {

    var instr_slides:any = [];
    var folder = instr_folder;
    var start_slide = start;
    var end_slide = end + 1;

    if (box == true) {
        var instruction_keys = exp_info.instruction_keys_box;
        var keys_folder = 'response_box';
    } else { // box == false
        var instruction_keys = exp_info.instruction_keys_keyboard;
        var keys_folder = 'keyboard';
    };

    for (let slide = start_slide; slide < end_slide; slide++) {
        // last slide
        if (slide + 1 == end_slide) {

            instr_slides.push(`<div class="main">
                                <img class="image"  
                                width: 130%"
                                src="${exp_info.instr_path}${folder}/${keys_folder}/Slide${slide}.PNG">
                                </img>
                            </div>`); 

        } else { // remaining slides

            instr_slides.push(`<div class="main">
                            <img class="image"  
                            width: 130%"
                            src="${exp_info.instr_path}${folder}/${keys_folder}/Slide${slide}.PNG">
                            </img>
                        </div>
                        <div class="main">
                            <img class="image"
                            width="1" 
                            height="1" 
                            border="0"
                            style="display: none"
                            src="${exp_info.instr_path}${folder}/${keys_folder}/Slide${slide + 1}.PNG">
                            </img> 
                        </div>`);
                        
        }
    }
    
    const slide_line = {
    type: instructions,
    pages: instr_slides,
    allow_keys: true,
    allow_backward: true,
    key_forward: instruction_keys[1],
    key_backward: instruction_keys[0],
    show_clickable_nav: true,
    button_label_previous: 'Zurück',
    button_label_next: 'Weiter',
    data: { screenID: `instruction_${instr_folder}` }
    };

    const instr_line = {
        timeline: [slide_line]
    }
    
    return instr_line;
}