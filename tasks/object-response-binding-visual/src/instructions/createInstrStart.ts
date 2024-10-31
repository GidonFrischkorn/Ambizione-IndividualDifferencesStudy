import instructions from "@jspsych/plugin-instructions"

export function createSingleInstr(exp_info, instr_folder: string, slide: string) {

    var folder = instr_folder;
    var name = slide;

    const slide_line = {
    type: instructions,
    pages: [`<div class="main">
                <img src="${exp_info.instr_path}${folder}/${name}.PNG" 
                class="image"></img>
            </div>`],
    allow_keys: true,
    key_forward: ' ',
    data: { screenID: `instruction_${slide}` }
    };

    const instr_line = {
        timeline: [slide_line] 
    }
    

    return instr_line;
}


export function createInstr(exp_info, instr_folder: string, start, end) {

    var instr_slides:any = [];
    var folder = instr_folder;
    var start_slide = start;
    var end_slide = end + 1;

    for (let slide = start_slide; slide < end_slide; slide++) {
        // last slide
        if (slide + 1 == end_slide) {

            instr_slides.push(`<div class="main">
                                <img class="image"  
                                width: 130%"
                                src="${exp_info.instr_path}${folder}/Slide${slide}.PNG">
                                </img>
                            </div>`); 

        } else { // remaining slides

            instr_slides.push(`<div class="main">
                            <img class="image"  
                            width: 130%"
                            src="${exp_info.instr_path}${folder}/Slide${slide}.PNG">
                            </img>
                        </div>
                        <div class="main">
                            <img class="image"
                            width="1" 
                            height="1" 
                            border="0"
                            style="display: none"
                            src="${exp_info.instr_path}${folder}/Slide${slide + 1}.PNG">
                            </img> 
                        </div>`);
                        
        }
    }
    
    const slide_line = {
    type: instructions,
    pages: instr_slides,
    show_clickable_nav: true,
    data: { screenID: `instruction_${instr_folder}` }
    };

    const instr_line = {
        timeline: [slide_line]
    }
    
    return instr_line;
}