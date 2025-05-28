export const participant_code = function (language: string = "de") {
    if (language == "de") {
        var instructions = "Bitte generieren Sie Ihren Teilnehmercode aus den folgenden Informationen:"
        
        var prompts = [
            "Dem letzten Buchstaben ihres eigenen Vornamens",
            "Dem letzten Buchstaben ihres eigenen Nachnamens",
            "Dem zweiten Buchstaben des Vornamens ihrer Mutter",
            "Dem zweiten Buchstaben des Vornames ihres Vaters",
            "Der zweiten Ziffer ihres Geburtstages (bei einstelligen Tagen die Ziffer selbst, z. Bsp. 5. Januar = 5, 12 . Juni = 2)",
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
            requiredErrorText: "Bitte beantworten Sie alle Fragen.",
            maxLength: 1,

        };

        id_items.push(single_item);
    }

    // combine everything into a single survey page
    var id_page = {
        elements: id_items,
        title: "Teilnehmercode",
        description: instructions,
        showQuestionNumbers: "off",
    };

    return id_page;
};


export const extract_code = function (responses: { [key: string]: any }) {
    // Extract the participant code from the survey responses
    const code_responses = responses
    console.log(code_responses);

    const participant_code_characters = code_responses["letter-firstname"] + code_responses["letter-lastname"] + code_responses["letter-mother"] + code_responses["letter-father"];
    console.log(participant_code_characters);
    var digit_birthdate = code_responses["digit-birthdate"];
    var digit_birthyear = code_responses["digit-birthyear"];
    const participant_code = participant_code_characters.toUpperCase() + digit_birthdate.toString() + digit_birthyear.toString();
    return participant_code;
}