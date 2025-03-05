export const participant_code = function (language: string = "de") {
    if (language == "de") {
        var instructions = "Bitte generieren Sie Ihren Teilnehmercode aus den folgenden Informationen:"
        
        var prompts = [
            "Dem letzten Buchstaben ihres eigenen Vornamens",
            "Dem letzten Buchstaben ihres eigenen Nachnamens",
            "Dem zweiten Buchstaben des Vornamens ihrer Mutter",
            "Dem zweiten Buchstaben des Vornames ihres Vaters",
            "Der zweiten Ziffer ihres Geburtstages (bei einstelligen Tagen die Ziffer selbst)",
            "Der letzten Ziffer ihres Geburtsjahres",
        ]
    } else {
        throw new Error("Language not supported");
    }

    const item_labels: string[] = [
        "letter-firstname",
        "letter-lastname",
        "letter-mother",
        "letter-father",
        "digit-birthdate",
        "digit-birthyear",
    ];

    // Create array of items
    var id_items: any[] = [];
    for (let i = 0; i < prompts.length; i++) {
        var single_item = {
            name: item_labels[i],
            title: prompts[i],
            type: "text",
            inputType: item_labels[i].includes("letter") ? "text" : "number",
            isRequired: true,
            maxLength: 1,

        };

        id_items.push(single_item);
    }

    // combine everything into a single survey page
    var id_page = {
        elements: id_items,
        title: instructions,
        showQuestionNumbers: "off",
    };

    return id_page;
};


export const extract_code = function (responses: { [key: string]: any }) {
    // Extract the participant code from the survey responses
    const code_responses = responses
    console.log(code_responses);

    const participant_code_characters = code_responses.letter_firstname + code_responses.letter_lastname + code_responses.letter_mother + code_responses.letter_father;
    console.log(participant_code_characters);
    const participant_code_digits = code_responses.digit_birthdate + code_responses.digit_birthyear.toString();
    const participant_code = participant_code_characters.toUpperCase() + participant_code_digits;
    return participant_code;
}