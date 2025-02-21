import { expInfo } from "../settings";
import imageButtonResponse from '@jspsych/plugin-image-button-response';

export const ishihara_test = (lang: string) => {
    let ishihara_line: any[] = [];

    var ishihara_filenames = [
        "Ishihara_01.jpg",
        "Ishihara_02.jpg",
        "Ishihara_03.jpg",
        "Ishihara_04.jpg",
        "Ishihara_05.jpg",
        "Ishihara_06.jpg",
        "Ishihara_07.jpg",
        "Ishihara_08.jpg",
        "Ishihara_09.jpg",
        "Ishihara_10.jpg",
        "Ishihara_11.jpg",
        "Ishihara_12.jpg"
    ];

    const double_digit_items = [0, 2, 4, 6, 8, 10]

    var ishihara_choices = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'keine'];

    var prompt_single_digit = "<p>Welche Zahl sehen Sie in dieser Farbtafel?</p>";
    var prompt_double_digit_first = "<p>Welche <strong>1. Zahl</strong> sehen Sie in dieser Farbtafel?</p>";
    var prompt_double_digit_second = "<p>Welche <strong>2. Zahl</strong> sehen Sie in dieser Farbtafel?</p>";

    // Instructions
    // ishihara_instructions = ;

    for (let i = 0; i < 10; i++) {
        if (double_digit_items.includes(i)) {
            for (let j = 0; j < 2; j++) {
                var ishihara_trial = {
                    type: imageButtonResponse,
                    stimulus: 'assets/ishihara_JPEG/' + ishihara_filenames[i],
                    choices: ishihara_choices,
                    prompt: j == 0 ? prompt_double_digit_first : prompt_double_digit_second,
                    button_layout: 'grid',
                    grid_rows: 3
                };
                ishihara_line.push(ishihara_trial);
            }
        } else {
            var ishihara_trial = {
                type: imageButtonResponse,
                stimulus: 'assets/ishihara_JPEG/' + ishihara_filenames[i],
                choices: ishihara_choices,
                prompt: prompt_single_digit,
                button_layout: 'grid',
                grid_rows: 3
            };
            ishihara_line.push(ishihara_trial);
        }
    }


    return ishihara_line
};