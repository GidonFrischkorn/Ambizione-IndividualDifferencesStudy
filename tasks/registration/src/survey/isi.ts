// Define survey function for BMW-3 questionnaire
export const isi_questionnaire = function (language: string) {
  if (language == "DE") {
    var scale_anchors = [
      "sehr niedrige Intelligenz",
      "niedrige Intelligenz",
      "durchschnittliche Intelligenz",
      "hohe Intelligenz",
      "hochbegabt",
    ];

    var title = "Inventar zur selbsteingeschätzten Intelligenz";
    var instruction =
      "Dieser Fragebogen enthält einige verschiedene Intelligenzaspekte. " +
      "Zu jedem Aspekt finden Sie einen Satz, der zu verstehen gibt, welche Bereiche dieser Intelligenzaspekt umfasst. " +
      "Auf der Skala hinter jedem Satz bitten wir Sie, durch Setzen des Schiebereglers das Ausmaß Ihrer entsprechenden Intelligenz einzuschätzen. " +
      "Wàhlen Sie den für Sie zutreffenden Bereich der Skala mit Hilfe des Schiebereglers aus, an der Sie Ihre Intelligenz einordnen würden. " +
      "Die Markierungen dienen nur zur Orientierung.";

    var items = [
      "Verbales Verständnis: Kenntnis von Wörtern und ihrer Bedeutung sowie deren angemessene Verwendung im Gespräch.",
      "Wortflüssigkeit: Rasches und angemessenes Formulieren von Wörtern.",
      "Mathematische Intelligenz: Schnelles und richtiges Lösen von einfachen Rechenaufgaben.",
      "Räumliche Intelligenz: Räumliche Vorstellungskraft (z.B. Verfolgen von mechanischen Bewegungen, Vergleich von Würfeln aus verschiedener Perspektive).",
      "Gedächtnisleistung: Unmittelbares Behalten von Sachverhalten",
      "Wahrnehmungsgeschwindigkeit: Rasches Erkennen von Details.",
      "Logisches und schlussfolgerndes Denken: Erkennen und Übertragen von Regeln.",
      "Musikalische Intelligenz: Die Begabung zu singen, ein Musikinstrument zu spielen oder ein Musikstück zu komponieren.",
      "Körperlich-kinästhetische Intelligenz: Geschicklichkeit, Kontrolle der Körperbewegungen. Z. B. sportliche, tänzerische oder schauspielerische Begabung.",
      "Interpersonale Intelligenz: Fähigkeit, Unterschiede bei anderen Individuen insbesondere bzgl. ihrer Stimmungen, ihres Wesens, ihrer Motivationen und ihrer Absichten zu erkennen.",
      "Intrapersonale Intelligenz: Fähigkeit, verschiedene Gefühle bei sich selbst zu unterscheiden und zum Verständnis des eigenen Verhaltens zu nutzen.",
    ];
  } else {
    throw new Error("Language not supported");
  }

  const item_labels: string[] = [
    "ISI-Verbal",
    "ISI-WordFluency",
    "ISI-Math",
    "ISI-Spatial",
    "ISI_Memory",
    "ISI-Perception",
    "ISI-Logic",
    "ISI-Music",
    "ISI-Kinesthetic",
    "ISI-Interpersonal",
    "ISI-Intrapersonal",
  ];

  // Create array of items
  var scale_items: any[] = [];
  for (let i = 0; i < items.length; i++) {
    var single_item = {
      name: item_labels[i],
      type: "text",
      title: items[i],
      description:
        "sehr niedrige Intelligenz   -   niedrige Intelligenz - durchschnittliche Intelligenz - hohe Intelligenz - hochbegabt",
      inputType: "range",
      min: -3,
      max: 3,
      step: 0.1,
      defaultValue: 0,
      valueLabels: scale_anchors,
    };

    scale_items.push(single_item);
  }

  // combine everything into a single survey page
  var isi_page = {
    title: title,
    description: instruction,
    elements: scale_items,
  };

  return isi_page;
};
