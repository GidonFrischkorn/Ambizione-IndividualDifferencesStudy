export const demographics = function (language: string = "de") {
  if (language == "de") {
    var instruction =
      "<h1>Demografische Angaben</h1>" +
      "<p>Bitte beantworten Sie die folgenden Fragen zu Ihrer Person.</p>";

    var first_name_question = "Wie lautet Ihr Vorname?";
    var last_name_question = "Wie lautete Ihr Nachname?";
    var birthdate_question = "Wann sind Sie geboren?";
    var age_question = "Wie alt sind Sie?";

    var gender_question = "Was ist Ihr Geschlecht?";
    var gender_options = [
      "weiblich",
      "männlich",
      "nicht-binär/ genderqueer",
      "kein Geschlecht",
      "keine Angabe",
      "eigene Angabe",
    ];

    var education_question = "Was ist Ihr höchster Bildungsabschluss?";
    var education_options = [
      "Eidg. Berufsattest",
      "Eidg. Fähigkeitszeugnis",
      "Berufsmaturität",
      "Fachmaturität",
      "Gymnasiale Maturität",
      "Eidg. Diplom",
      "Diplom HF",
      "Fach- oder Pädag. Hochschule",
      "Universität / ETH",
    ];
  } else if (language == "en") {
    var instruction =
      "<h1>Demographic Information</h1>" +
      "<p>Please answer the following questions about yourself.</p>";

    var first_name_question = "What is your first name?";
    var last_name_question = "What is your last name?";
    var birthdate_question = "When were you born?";
    var age_question = "How old are you?";

    var gender_question = "What gender do you identify with?";
    var gender_options = [
      "female",
      "male",
      "non-binary / genderqueer",
      "no gender",
      "prefer not to say",
      "other",
    ];

    var education_question = "Was ist Ihr höchster Bildungsabschluss?";
    var education_options = [
      "Eidg. Berufsattest",
      "Eidg. Fähigkeitszeugnis",
      "Berufsmaturität",
      "Fachmaturität",
      "Gymnasiale Maturität",
      "Eidg. Diplom",
      "Diplom HF",
      "Fach- oder Pädag. Hochschule",
      "Universität / ETH",
    ];
  } else {
    throw new Error("Language not supported");
  }

  // Name item
  const name_item = {
    type: "multipletext",
    name: "name",
    title: "Bitte geben Sie Ihren Vor- und Nachnamen an.",
    isRequired: true,
    items: [
      {
        name: "first_name",
        title: "Vorname",
        inputType: "text",
        isRequired: true,
        requiredErrorText: "Bitte beantworten Sie alle Fragen.",
      },
      {
        name: "last_name",
        title: "Nachname",
        inputType: "text",
        isRequired: true,
        requiredErrorText: "Bitte beantworten Sie alle Fragen.",
      },
    ]
  };

  const contact_item = {
    type: "multipletext",
    name: "contact",
    title: "Bitte geben Sie Ihre Kontaktdaten an, damit wir Sie für die Teilnahme an der Studie kontaktieren können.",
    isRequired: true,
    items: [
      {
        name: "email",
        title: "E-Mail",
        inputType: "email",
        isRequired: true,
        requiredErrorText: "Bitte beantworten Sie alle Fragen.",
      }
    ],
  };

  const birthdate_item = {
    type: "text",
    inputType: "date",
    name: "birthdate",
    title: birthdate_question,
    isRequired: true,
    requiredErrorText: "Bitte beantworten Sie alle Fragen.",
  };
  
  const age_item = {
    type: "text",
    name: "age",
    title: age_question,
    isRequired: true,
    requiredErrorText: "Bitte beantworten Sie alle Fragen.",
    inputType: "number",
    validators: [
      {
        type: "numeric",
        minValue: 18,
        maxValue: 99,
        text: "Bitte geben Sie ein gültiges Alter ein.",
      },
    ],
  };

  const language_item = {
    "type": "dropdown",
    "name": "language",
    "title": "Was ist Ihre Muttersprache?",
    "isRequired": true,
    "showOtherItem": true,
    "choices": [ "(Schweizer)-Deutsch", "Französisch", "Englisch", "Räto-Romanisch"]
  }

  const german_level = {
    "type": "dropdown",
    "name": "german_level",
    "title": "Auf welchem Niveau sprechen Sie Deutsch?",
    "isRequired": true,
    "choices": [ "Muttersprache", "Verhandlungssicher", "Fliessend", "Grundkenntnisse"]
  }

  // Gender drop-down
  const gender_item = {
    type: "dropdown",
    name: "gender",
    title: gender_question,
    isRequired: true,
    requiredErrorText: "Bitte beantworten Sie alle Fragen.",
    showNoneItem: true,
    showOtherItem: true,
    choices: gender_options,
    startWithNewLine: false,
  };

  // Education drop-down
  const education_item = {
    type: "dropdown",
    name: "education",
    title: education_question,
    isRequired: true,
    requiredErrorText: "Bitte beantworten Sie alle Fragen.",
    choices: education_options,
  };

  // combine everything into a single survey page
  var demographics_page1 = {
    title: "Kontaktdaten",
    description: "Diese Daten werden nur zur Kontaktaufnahme verwendet und seperat von allen anderen Informationen gespeichert.",
    elements: [
      name_item,
      contact_item,
    ],
  };

  var demographics_page2 = {
    title: "Demografische Angaben",
    elements: [
      age_item,
      language_item,
      german_level,
      // birthdate_item,
      gender_item,
      education_item,
    ],
  };

  const demographics_pages = [
    demographics_page1,
    demographics_page2
  ]

  return demographics_pages;
};
