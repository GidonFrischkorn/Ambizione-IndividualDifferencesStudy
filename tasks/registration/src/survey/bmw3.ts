// Import plugin
import surveyLikert from "@jspsych/plugin-survey-likert";

// Define survey function for BMW-3 questionnaire
export const bmw3 = function (language: string) {
  if (language == "DE") {
    var likert_scale = [
      "trifft gar nicht zu",
      "trifft eher nicht zu",
      "weder noch",
      "trifft eher zu",
      "trifft voll zu",
    ];

    var instruction =
      "<h1>Skala zur Erfassung gedanklichen Abschweifens (BMW-3)</h1>" +
      "<p>Sie werden eine Reihe von Aussagen lesen, die ganz allgemein beschreiben, wo Menschen im Alltag mit ihren Gedanken sind.</p>" +
      "<p>Bitte kennzeichnen Sie auf der Antwortskala, inwieweit diese Aussagen im Allgemeinen auf Sie zutreffen.</p>" +
      "<p>Es gibt dabei keine richtigen oder falschen Antworten, beantworten Sie die Fragen also einfach aus dem Bauch heraus.</p>";

    var items = [
      "Während ich einen Vortrag höre, wandern meine Gedanken ohne mein Zutun zu anderen Dingen.",
      "Wenn ich Fernsehen schaue, gehen mir dabei ungewollt andere Dinge durch den Kopf.",
      "Ich bin oft nicht voll bei der Sache.",
      "Wenn ich einer Tätigkeit nachgehe, schweifen meine Gedanken wie von selbst zu anderen Dingen.",
      "Es dauert sehr lange, bis ich merke, dass meine Gedanken abgeschweift sind.",
      "Mir fällt schnell auf, wenn ich jemandem nicht aufmerksam zuhöre.",
      "Es dauert eine Weile, bis mir auffällt, dass ich gedanklich nicht mehr bei der Sache bin.",
      "Ich bemerke sofort, wenn meine Gedanken nicht im Hier und Jetzt sind.",
      "Ich lasse meine Gedanken treiben, damit die Zeit schneller vergeht.",
      "Ich schweife gezielt gedanklich ab, um dem Alltagstrott zu entfliehen.",
      "Ich lenke mich in eintönigen Situationen ab, indem ich meinen Gedanken freien Lauf lasse.",
      "Ich nutze Routinetätigkeiten, um mir währenddessen Gedanken über andere Dinge zu machen.",
    ];

    var label_button = "Weiter";
  } else if (language == "EN") {
    var likert_scale = [
      "fully disagree",
      "somewhat disagree",
      "neutral",
      "somewhat agree",
      "fully agree",
    ];

    var instruction =
      "<h1>Brief Mind Wandering Three Factor Scale (BMW-3)</h1>" +
      "<p>You will see a couple of statements that generally describe where people may be with their thoughts in everyday life.</p>" +
      "<p>Please read each statement and decide how much you agree or disagree with that statement.</p>" +
      "<p>There are no right or wrong answers, just answer intuitively.</p>";

    var items = [
      "While listening to a presentation, my thoughts start to trail off unintentionally. ",
      "When watching TV, other things inadvertently cross my mind.",
      "I am often absentminded.",
      "When I am engaged in an activity, my thoughts wander to other things all by themselves.",
      "It takes a very long time for me to notice thatmy thoughts have wandered off.",
      "I quickly catch myself when  I am not listening attentively.",
      "It takes me a while before I realize that I zoned out.",
      "I immediately notice when my thoughts are not in the here and now.",
      "I make my thoughts wander so that time passes faster.",
      "I deliberately allow my mind to wanderto escape the daily grind. ",
      "I distract myself in monotonous situations  by letting my thoughts run free.",
      "I actively use the time during routine tasks  to mull over other things in the meanwhile. ",
    ];

    var label_button = "Continue";
  } else {
    throw new Error("Language not supported");
  }

  const item_labels: string[] = [
    "MW-UI1",
    "MW-UI2",
    "MW-UI3",
    "MW-UI4",
    "MW-MA1r",
    "MW-MA2",
    "MW-MA3r",
    "MW-MA4",
    "MW-I1",
    "MW-I2",
    "MW-I3",
    "MW-I4",
  ];

  var scale_items: any[] = [];
  for (let i = 0; i < items.length; i++) {
    var single_item = {
      prompt: items[i],
      name: item_labels[i],
      labels: likert_scale,
    };

    scale_items.push(single_item);
  }

  var bmw_3 = {
    type: surveyLikert,
    preamble: instruction,
    questions: scale_items,
    randomize_question_order: true,
    scale_width: 600,
    button_label: label_button,
  };

  return bmw_3;
};
