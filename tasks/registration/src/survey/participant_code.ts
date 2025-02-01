export const participant_code = function (language: string = "de") {
    if (language == "de") {
        var prompts = [
            "dem letzten Buchstaben ihres eigenen Vornamens",
            "dem letzten Buchstaben ihres eigenen Nachnamens",
            "dem zweiten Buchstaben des Vornamens ihrer Mutter",
            "dem zweiten Buchstaben des Vornames ihres Vaters",
            "der zweiten Ziffer ihres Geburtstages (bei einstelligen Tagen die Ziffer selbst)",
            "der letzten Ziffer ihres Geburtsjahres",
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
            cellType: "text",
            inputType: "text",
            isRequired: true,
        };

        id_items.push(single_item);
    }

    // combine everything into a single survey page
    var id_page = {
        elements: [
            {
                type: "matrixdynamic",
                name: "participant-code",
                title: "Bitte generieren Sie Ihren Teilnehmercode",
                description: "Bitte geben Sie die folgenden Informationen ein",
                transposeData: true,
                rows: [{
                    text: "Bitte geben Sie die folgenden Informationen ein",
                    name: "participant-code"
                }],
                columns: id_items,
                confirmDelete: true,
                minRowCount: 1,
                rowCount: 1,
                maxRowCount: 1,
                rowTitleWidth: "50%",
                isRequired: true,
            }
        ],
        showQuestionNumbers: "off",
    };

    return id_page;
};


export const extract_code = function (responses: { [key: string]: any }) {
    // Extract the participant code from the survey responses
    const code_responses = responses["participant-code"]

    var participant_code = code_responses.letter_firstname + code_responses.letter_lastname + code_responses.letter_mother + code_responses.letter_father + code_responses.digit_birthdate + code_responses.digit_birthyear;
    return participant_code;
}