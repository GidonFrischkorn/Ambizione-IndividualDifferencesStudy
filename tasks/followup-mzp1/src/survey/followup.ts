export const followup = function (language: string = "de", timepoint: number = 1) {
  if (language == "de") {
    var instruction =
      "<h1>Nachbefragung MZP " + timepoint.toString() + "</h1>" +
      "<p>Bitte beantworten Sie die folgenden Fragen zu dem 1. Messzeitpunk an dem sie gerade teilgenommen haben.</p>";


    var duration_question = "Wie haben sie die Dauer des Messzeitpunkts empfunden?";
    var break_question1 = "Wie angemessen fanden Sie die Staffelung/Häufigkeit der Pausen?";
    var break_question2 = "Wie angemessen fanden Sie die Dauer der Pausen?";
    var duration_comment_question = "Haben Sie noch Anmerkungen zur Dauer des Messzeitpunkts oder den Pausen?";
    
    var variety_question = "Wie abwechslungsreich fanden Sie die Aufgaben?";
    var strain_question = "Wie anstrengend fanden Sie die Aufgaben?";
    var notice_binding_question = "Ist Ihnen bei den Binding Aufgaben (Zahlen - Figuren, Objekte - Antworten, oder Wörter - Vornamen Paare merken) irgendetwas besonderes aufgefallen?";
    var notice_task_question = "Ist Ihnen bei den anderen Aufgaben irgendetwas besonderes aufgefallen?";
    var comment_task_question = "Haben Sie sonst noch Anmerkungen zu den Aufgaben?";
    
    // sleep questions
    var sleep_quality = "Wie würden sie die Qualität Ihres Schlafes letzte Nacht beurteilen?";
    var sleep_return = "Wie gut konnten Sie letzte Nacht nach dem nächtlichen Aufwachen wieder einschlafen?";
    var sleep_awake = "Wie häufig sind Sie letzte Nacht aufgewacht?";
    var sleep_latency = "Wie lange haben Sie gestern Abend gebraucht um einzuschlafen?";
    var sleep_depth = "Wie tief haben Sie letzte Nacht geschlafen?";
    var sleep_duration = "Wie lange haben Sie letzte Nacht geschlafen?";
    
    var sleep_start_question = "Wie müde waren Sie zu Beginn des Messzeitpunkts?";
    var sleep_end_question = "Wie müde waren Sie am Ende des Messzeitpunkts?";

  }  else {
    throw new Error("Language not supported");
  }

  // Rating items
  const duration_item = {
    type: "rating",
    name: "duration",
    title: duration_question,
    isRequired: true,
    requiredErrorText: "Bitte beantworten Sie alle Fragen.",
    rateType: "smileys",
    scaleColorMode: "colored",
    rateCount: 9,
    rateMax: 9,
    displayMode: "buttons",
    minRateDescription: "überhaupt nicht gut",
    maxRateDescription: "genau richtig",
  };

  const break_item = {
    type: "rating",
    name: "break_frequency",
    title: break_question1,
    isRequired: true,
    requiredErrorText: "Bitte beantworten Sie alle Fragen.",
    rateType: "smileys",
    scaleColorMode: "colored",
    rateCount: 9,
    rateMax: 9,
    displayMode: "buttons",
    minRateDescription: "überhautp nicht gut",
    maxRateDescription: "genau richtig",
  };

  const break_item2 = {
    type: "rating",
    name: "break_duration",
    title: break_question2,
    isRequired: true,
    requiredErrorText: "Bitte beantworten Sie alle Fragen.",
    rateType: "smileys",
    scaleColorMode: "colored",
    rateCount: 9,
    rateMax: 9,
    displayMode: "buttons",
    minRateDescription: "überhautp nicht gut",
    maxRateDescription: "genau richtig",
  };

  const duration_comment_item = {
    type: "comment",
    name: "duration_comment",
    title: duration_comment_question,
    isRequired: false,
    requiredErrorText: "Bitte beantworten Sie alle Fragen.",
  };

  const variety_item = {
    type: "rating",
    name: "variety",
    title: variety_question,
    isRequired: true,
    requiredErrorText: "Bitte beantworten Sie alle Fragen.",
    rateType: "smileys",
    scaleColorMode: "colored",
    rateCount: 9,
    rateMax: 9,
    displayMode: "buttons",
    minRateDescription: "überhautp nicht gut",
    maxRateDescription: "genau richtig",
  };

  const strain_item = {
    type: "rating",
    name: "strain",
    title: strain_question,
    isRequired: true,
    requiredErrorText: "Bitte beantworten Sie alle Fragen.",
    rateType: "smileys",
    scaleColorMode: "colored",
    rateCount: 9,
    rateMax: 9,
    displayMode: "buttons",
    minRateDescription: "überhautp nicht gut",
    maxRateDescription: "genau richtig",
  };

  const comment_task_item = {
    type: "comment",
    name: "comment_task",
    title: comment_task_question,
    isRequired: false,
    requiredErrorText: "Bitte beantworten Sie alle Fragen.",
  };

  const notice_binding_item = {
    type: "comment",
    name: "notice_task",
    title: notice_binding_question,
    isRequired: false,
    requiredErrorText: "Bitte beantworten Sie alle Fragen.",
  };

  const notice_task_item = {
    type: "comment",
    name: "notice_task",
    title: notice_task_question,
    isRequired: false,
    requiredErrorText: "Bitte beantworten Sie alle Fragen.",
  };

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

  // Create the survey pages
  const followup_page1 = {
    title: "Dauer & Pausen",
    description: "",
    elements: [
      duration_item,
      break_item,
      break_item2,
      duration_comment_item
    ],
  };

  const followup_page2 = {
    title: "Aufgaben",
    description: "",
    elements: [
      variety_item,
      strain_item,
      notice_binding_item,
      notice_task_item,
      comment_task_item,
    ],
  };

  const followup_page3 = {
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
    followup_page1,
    followup_page2,
    followup_page3
  ]

  return followup_pages;
};
