export const end_questionnaire = function (language: string = "de", timepoint: number = 1) {
  if (language == "de") {
    var instruction =
      "<h1>Schlussfragebogen MZP " + timepoint.toString() + "</h1>" +
      "<p>Bitte beantworten Sie die folgenden Fragen zu dem 3. Messzeitpunk an dem sie gerade teilgenommen haben.</p>";

    // sleep questions
    var sleep_quality = "Wie würden sie die Qualität Ihres Schlafes letzte Nacht beurteilen?";
    var sleep_return = "Wie gut konnten Sie letzte Nacht nach dem nächtlichen Aufwachen wieder einschlafen?";
    var sleep_awake = "Wie häufig sind Sie letzte Nacht aufgewacht?";
    var sleep_latency = "Wie lange haben Sie gestern Abend gebraucht um einzuschlafen?";
    var sleep_depth = "Wie tief haben Sie letzte Nacht geschlafen?";
    var sleep_duration = "Wie lange haben Sie letzte Nacht geschlafen?";
    
    var sleep_start_question = "Wie müde waren Sie zu Beginn des Messzeitpunkts?";
    var sleep_end_question = "Wie müde waren Sie am Ende des Messzeitpunkts?";

    // Feedback questions
    var feedback_questions = "Zu welchen Aufgaben möchten Sie gerne eine Rückmeldung zu Ihrer Leistung erhalten?";
    var feedback_options = ["Intelligenztest", "Binding Aufgaben", "Entscheidungsaufgaben", "Gedächtnisaufgaben", "keine Rückmeldung"];
  }  else {
    throw new Error("Language not supported");
  }

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

  // Sleep Page
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

  // Feedback Items
  const feedback_tasks = {
    type: "checkbox",
    name: "feedback_tasks",
    title: feedback_questions,
    description: "Für den Intelligenztest können Sie eine Rückmeldung gemäss der verfügbaren Normen erhalten. Bei den anderen Aufgaben bekommen Sie eine Rückmeldung zu Ihrer Leistung im Vergleich zu anderen Teilnehmern der Studie.",
    choices: feedback_options,
    isRequired: true,
    colCount: 2,
    separateSpecialChoices: true
  };

  const feedback_contact = {
    name: "email",
    type: "text",
    title: "An welche E-Mail-Adresse möchten Sie die Rückmeldung erhalten?",
    inputType: "email",
    placeholder: "foobar@example.com",
    isRequired: true,
    autocomplete: "email"
  };

  // Feedback Page
  const end_page2 = {
    title: "Feedback",
    description: "",
    elements: [
      feedback_tasks,
      feedback_contact,
    ],
  }

  const followup_pages = [
    end_page1,
    end_page2
  ]

  return followup_pages;
};
