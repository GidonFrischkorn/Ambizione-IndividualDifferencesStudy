export const demographics = function (language: string = "DE") {
  if (language == "DE") {
    var instruction =
      "<h1>Demografische Angaben</h1>" +
      "<p>Bitte beantworten Sie die folgenden Fragen zu Ihrer Person.</p>";

    var first_name_question = "Wie lautet Ihr Vorname?";
    var last_name_question = "Wie lautete Ihr Nachname?";
    var birthdate_question = "Wann sind Sie geboren?";

    var gender_question = "Was ist Ihr Geschlecht?";
    var gender_options = [
      "weiblich",
      "männlich",
      "nicht-binär/ genderqueer",
      "kein Geschlecht",
      "keine Angabe",
      "eigene Angabe",
    ];

    var education_question = "Was ist ihr höchster Bildungsabschluss?";
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
  } else if (language == "EN") {
    var instruction =
      "<h1>Demographic Information</h1>" +
      "<p>Please answer the following questions about yourself.</p>";

    var first_name_question = "What is your first name?";
    var last_name_question = "What is your last name?";
    var birthdate_question = "When were you born?";

    var gender_question = "What gender do you identify with?";
    var gender_options = [
      "female",
      "male",
      "non-binary / genderqueer",
      "no gender",
      "prefer not to say",
      "other",
    ];

    var education_question = "Was ist ihr höchster Bildungsabschluss?";
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
    title: "Bitte geben Sie ihren Vor- und Nachnamen an.",
    isRequired: true,
    items: [
      {
        name: "first_name",
        title: "Vorname",
        inputType: "text",
        isRequired: true,
      },
      {
        name: "last_name",
        title: "Nachname",
        inputType: "text",
        isRequired: true,
      },
    ]
  };

  const contact_item = {
    type: "multipletext",
    name: "contact",
    title: "Bitte geben Sie ihre Kontaktdaten an, damit wir Sie für die Teilnahme an der Studie kontaktieren können.",
    isRequired: true,
    items: [
      {
        name: "email",
        title: "E-Mail",
        inputType: "email",
        isRequired: true,
      },
      {
        name: "phone",
        title: "Telefonnummer",
        inputType: "tel",
        isRequired: true,
      },
    ],
  };

  // Demographics Item: age, race, and sex, employment, education, income
  const demographics_item = {

  };

  // First name
  const first_name_item = {
    type: "text",
    name: "first_name",
    title: first_name_question,
    isRequired: true,
  };

  // Last name
  const last_name_item = {
    type: "text",
    name: "last_name",
    title: last_name_question,
    isRequired: true,
    startWithNewLine: false,
  };

  const birthdate_item = {
    type: "text",
    inputType: "date",
    name: "birthdate",
    title: birthdate_question,
    isRequired: true,
  };

  // Gender drop-down
  const gender_item = {
    type: "dropdown",
    name: "gender",
    title: gender_question,
    isRequired: true,
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
    choices: education_options,
  };

  // combine everything into a single survey page
  var demographics_page = {
    elements: [
      name_item,
      contact_item,
      birthdate_item,
      gender_item,
      education_item,
    ],
  };

  return demographics_page;
};
