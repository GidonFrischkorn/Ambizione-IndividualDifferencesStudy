// Import plugin
import survey from "@jspsych/plugin-survey";
import "@jspsych/plugin-survey/css/survey.css";

// Define survey function for BMW-3 questionnaire
export const nfc = function (language: string) {
  if (language == "de") {
    var likert_scale = [
      "stimmt gar nicht",
      "stimmt kaum",
      "stimmt teilweise",
      "stimmt überwiegend",
      "stimmt genau",
    ];

    var title = "Need for Cognition Skala";
    var instruction =
      "Im Folgenden findest du mehrere Aussagen rund ums Thema Denken. Jede dieser Aussagen kann auf dich mehr oder weniger zutreffen." +
      "Da Personen sehr verschieden sein können, wird jeder etwas anderes ankreuzen. Es gibt also keine richtigen und falschen Antworten." +
      "Bitte lasse keine Aussage aus und kreuze zu jeder Aussage nur ein Kästchen an, je nachdem wie sehr die Aussage auf dich zutrifft.";

    var items = [
      "Es macht mir viel Spaß, mir Lösungen für Probleme auszudenken.",
      "Ich würde lieber eine wichtige Aufgabe lösen, die schwierig ist und Nachdenken erfordert, als eine Aufgabe, die zwar irgendwie wichtig ist, aber nicht viel Nachdenken erfordert.",
      "Ich mag Situationen, in denen ich mit gründlichem Nachdenken etwas erreichen kann.",
      "Ich mag keine Situationen, in denen ich mich auf mein Denken verlassen muss, um etwas zu erreichen.",
      "Für mich ist es besonders schön, wenn ich eine wichtige Aufgabe erledigt habe, die viel Nachdenken erfordert hat.",
      "Ich würde lieber etwas tun, bei dem ich wenig nachdenken muss, als etwas, bei dem ich viel nachdenken muss.",
      "Ich mag es nicht, angestrengt und stundenlang nachzudenken.",
      "Ich denke nur nach, wenn ich muss.",
      "Nachdenken macht mir keinen Spaß.",
      "Ich mag keine Situationen, in denen ich intensiv über etwas nachdenken muss.",

      "Ich habe es gern, wenn mein Leben voller kniffliger Aufgaben ist, die ich lösen muss.",
      "Ich mag komplizierte Probleme lieber als einfache Probleme.",
      "Gibt es ein Problem, dann genügt es mir, einfach die Lösung zu kennen; mir ist es nicht wichtig, die Gründe für die Lösung des Problems zu verstehen.",
      "Mir genügt, dass etwas funktioniert und mir ist es egal, wie oder warum es funktioniert.",
      "Ich sage mir oft, dass man gut und lange nachdenken muss, um die beste Lösung für ein Problem zu finden.",
      "Ich erledige gerne Aufgaben, bei denen man viel nachdenken muss.",
      "Ich bin jemand, der sehr gerne nachdenkt.",
      "Ich denke gerne über ein Problem nach, selbst wenn ich weiß, dass mein Nachdenken an dem Problem nichts ändern wird.",
      "Wenn ich mir in den Kopf setze, die Lösung für ein schwieriges Problem zu finden, schaffe ich das auch oft.",
    ];

    var label_button = "Weiter";
  } else {
    throw new Error("Language not supported");
  }

  const item_labels: string[] = [
    "NFC-1",
    "NFC-2",
    "NFC-3",
    "NFC-4r",
    "NFC-5",
    "NFC-6r",
    "NFC-7r",
    "NFC-8r",
    "NFC-9r",
    "NFC-10r",

    "NFC-11",
    "NFC-12",
    "NFC-13r",
    "NFC-14r",
    "NFC-15",
    "NFC-16",
    "NFC-17",
    "NFC-18",
    "NFC-19",
  ];

  // Create array of items
  var scale_items: any[] = [];
  for (let i = 0; i < items.length; i++) {
    var single_item = {
      text: items[i],
      value: item_labels[i],
    };

    scale_items.push(single_item);
  }

  // create array of response colums
  var likert_columns: any[] = [];
  for (let i = 0; i < likert_scale.length; i++) {
    var single_column = {
      value: i + 1,
      text: likert_scale[i],
    };

    likert_columns.push(single_column);
  }

  // combine everything into a single survey page
  var nfc_page = {
    elements: [
      {
        type: "matrix",
        name: "nfc-matrix",
        title: title,
        description: instruction,
        alternateRows: true,
        isAllRowRequired: true,
        rows: scale_items,
        rowsOrder: "random",
        columns: likert_columns,
        rowTitleWidth: "50%",
      },
    ],
  };

  return nfc_page;
};
