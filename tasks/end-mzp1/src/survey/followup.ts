export const end_questionnaire = function (language: string = "de", timepoint: number = 1) {
  if (language == "de") {
    var instruction =
      "<h1>Schlussfragebogen MZP " + timepoint.toString() + "</h1>" +
      "<p>Bitte beantworten Sie die folgenden Fragen zu dem 1. Messzeitpunk an dem sie gerade teilgenommen haben.</p>";

    // sleep questions
    var sleep_quality = "Wie würden sie die Qualität Ihres Schlafes letzte Nacht beurteilen?";
    var sleep_return = "Wie gut konnten Sie letzte Nacht nach dem nächtlichen Aufwachen wieder einschlafen?";
    var sleep_awake = "Wie häufig sind Sie letzte Nacht aufgewacht?";
    var sleep_latency = "Wie lange haben Sie gestern Abend gebraucht um einzuschlafen?";
    var sleep_depth = "Wie tief haben Sie letzte Nacht geschlafen?";
    var sleep_duration = "Wie lange haben Sie letzte Nacht geschlafen?";
    
    var sleep_start_question = "Wie müde waren Sie zu Beginn des Messzeitpunkts?";
    var sleep_end_question = "Wie müde waren Sie am Ende des Messzeitpunkts?";


    // handedness questions
    var hand_questions = [
      "Mit welcher Hand schreiben Sie?",
      "In welcher Hand halten Sie den Löffel wenn Sie Suppe essen?",
      "In welcher Hand halten Sie die Zahnbürste beim Zähneputzen?",
      "In welcher Hand halten Sie das Streichholz beim Anzünden?",
      "Mit welcher Hand benutzen Sie einen Radiergummi?",
      "In welcher Hand halten Sie das Messer beim Bestreichen eines Brotes?",
      "Mit welcher Hand benutzen Sie einen Hammer?",
      "In welcher Hand halten Sie einen Schäler beim Schälen eines Apfels?",
      "Mit welcher Hand zeichnen Sie?",
      "Mit welcher Hand benutzen Sie eine Schere?"
    ];
  

    var hand_scale = [
      "links",
      "beide",
      "rechts",
    ];

    var hand_title = "Fragebogen zur Erfassung der Händigkeit";
    var hand_instruction =
      "Die zehn untenstehenden Fragen erfassen mit welcher Hand sie bestimmte" +
      "Tätigkeiten bevorzugt ausführen. Bitte kreuzen Sie für jede der Fragen an, ob Sie" +
      "die “linke Hand”, “beide Hände gleichermaßen“ oder die “rechte Hand“ zum" +
      "Ausführen der jeweiligen Tätigkeit bevorzugen. Wählen Sie “beide Hände” nur wenn" +
      "Sie die Tätigkeiten mit der linken und rechten Hand gleichermaßen gut ausführen" +
      "können. Bitte beantworten Sie alle Fragen, selbst dann wenn Sie gewisse" +
      "Tätigkeiten nie oder nur selten ausführen. Stellen Sie sich vor wie Sie die" +
      "entsprechende Tätigkeit ausführen und wählen Sie die entsprechende Antwort.";
  }  else {
    throw new Error("Language not supported");
  }

  const hand_labels: string[] = [
    "hand_write",
    "hand_spoon",
    "hand_brush",
    "hand_match",
    "hand_eraser",
    "hand_knife",
    "hand_hammer",
    "hand_peeler",
    "hand_draw",
    "hand_scissors"
  ];

  // Create array of items
  var hand_items: any[] = [];
  for (let i = 0; i < hand_questions.length; i++) {
    var single_item = {
      text: hand_questions[i],
      value: hand_labels[i],
    };

    hand_items.push(single_item);
  }

  // create array of response colums
  var hand_columns: any[] = [];
  for (let i = 0; i < hand_scale.length; i++) {
    var single_column = {
      value: i + 1,
      text: hand_scale[i],
    };

    hand_columns.push(single_column);
  }

  // combine everything into a single survey page
  var hand_page = {
    title: "Händigkeit",
    elements: [
      {
        type: "matrix",
        name: "hand-matrix",
        title: hand_title,
        description: hand_instruction,
        alternateRows: true,
        isAllRowRequired: true,
        requiredMark: "Bitte beantworten Sie alle Fragen.",
        requiredErrorText: "Bitte beantworten Sie alle Fragen.",
        requiredText: "Bitte beantworten Sie alle Fragen.", 
        rows: hand_items,
        rowsOrder: "random",
        columns: hand_columns,
        rowTitleWidth: "50%",
      },
    ],
    requiredErrorText: "Bitte beantworten Sie alle Fragen.",
    requiredMark: "Bitte beantworten Sie alle Fragen.",
    requiredText: "Bitte beantworten Sie alle Fragen.", 
  };

  // Sleep items
  const sleep_quality_item = {
    type: "rating",
    name: "sleep_qualtiy",
    title: sleep_quality,
    isRequired: true,
    requiredErrorText: "Bitte beantworten Sie alle Fragen.",
    rateType: "smileys",
    scaleColorMode: "colored",
    rateCount: 9,
    rateMax: 9,
    displayMode: "buttons",
    minRateDescription: "sehr schlecht",
    maxRateDescription: "sehr gut",
  };

  const sleep_awake_item = {
    type: "rating",
    name: "sleep_awake",
    title: sleep_awake,
    isRequired: true,
    requiredErrorText: "Bitte beantworten Sie alle Fragen.",
    rateType: "smileys",
    scaleColorMode: "colored",
    rateCount: 9,
    rateMax: 9,
    displayMode: "buttons",
    minRateDescription: "sehr häufig",
    maxRateDescription: "gar nicht",
  };

  const sleep_return_item = {
    type: "rating",
    name: "sleep_return",
    title: sleep_return,
    isRequired: true,
    requiredErrorText: "Bitte beantworten Sie alle Fragen.",
    rateType: "smileys",
    scaleColorMode: "colored",
    rateCount: 9,
    rateMax: 9,
    displayMode: "buttons",
    minRateDescription: "sehr schlecht",
    maxRateDescription: "sofort",
  };

  const sleep_latency_item = {
    type: "rating",
    name: "sleep_latency",
    title: sleep_latency,
    isRequired: true,
    requiredErrorText: "Bitte beantworten Sie alle Fragen.",
    rateType: "smileys",
    scaleColorMode: "colored",
    rateCount: 9,
    rateMax: 9,
    displayMode: "buttons",
    minRateDescription: "sehr lange",
    maxRateDescription: "sofort eingeschlafen",
  };

  const sleep_depth_item = {
    type: "rating",
    name: "sleep_depth",
    title: sleep_depth,
    isRequired: true,
    requiredErrorText: "Bitte beantworten Sie alle Fragen.",
    rateType: "smileys",
    scaleColorMode: "colored",
    rateCount: 9,
    rateMax: 9,
    displayMode: "buttons",
    minRateDescription: "Tiefschlaf",
    maxRateDescription: "Leichter Schlaf",
  };

  const sleep_duration_item = {
    type: "rating",
    name: "sleep_duration",
    title: sleep_duration,
    isRequired: true,
    requiredErrorText: "Bitte beantworten Sie alle Fragen.",
    rateType: "smileys",
    scaleColorMode: "colored",
    rateCount: 9,
    rateMax: 9,
    displayMode: "buttons",
    minRateDescription: "viel zu kurz",
    maxRateDescription: "sehr lang",
  };

  const sleep_start_item = {
    type: "rating",
    name: "sleep_start",
    title: sleep_start_question,
    isRequired: true,
    requiredErrorText: "Bitte beantworten Sie alle Fragen.",
    rateType: "smileys",
    scaleColorMode: "colored",
    rateCount: 9,
    rateMax: 9,
    displayMode: "buttons",
    minRateDescription: "sehr müde",
    maxRateDescription: "überhaupt nicht müde",
  };

  const sleep_end_item = {
    type: "rating",
    name: "sleep_end",
    title: sleep_end_question,
    isRequired: true,
    requiredErrorText: "Bitte beantworten Sie alle Fragen.",
    rateType: "smileys",
    scaleColorMode: "colored",
    rateCount: 9,
    rateMax: 9,
    displayMode: "buttons",
    minRateDescription: "sehr müde",
    maxRateDescription: "überhaupt nicht müde",
  };  

  // Handedness items

  const end_page1 = {
    title: "Schlaf & Müdigkeit",
    description: "",
    elements: [
      sleep_quality_item,
      sleep_latency_item,
      sleep_depth_item,
      sleep_awake_item,
      sleep_return_item,
      sleep_duration_item,
      sleep_start_item,
      sleep_end_item,
    ],
  };

  const followup_pages = [
    end_page1,
    hand_page,
  ]

  return followup_pages;
};
