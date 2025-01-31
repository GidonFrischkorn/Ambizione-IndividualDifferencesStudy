export const participant_code = function (language: string = "DE") {
    if (language == "DE") {
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
                    name: "participant-cod"
                }],
                columns: id_items,
                confirmDelete: true,
                minRowCount: 1,
                rowCount: 1,
                maxRowCount: 1,
                rowTitleWidth: "50%",
            }
        ],
        showQuestionNumbers: "off",
    };

    return id_page;
};