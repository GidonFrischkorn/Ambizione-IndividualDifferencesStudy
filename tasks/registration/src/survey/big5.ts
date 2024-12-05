// Import plugin
import surveyLikert from "@jspsych/plugin-survey-likert";

// Define survey function for BMW-3 questionnaire
export const bfi2 = function (
  language: string = "DE",
  version: string = "full"
) {
  if (language == "DE") {
    var likert_scale = [
      "stimme überhaupt nicht zu",
      "stimme eher nicht zu",
      "teils, teils",
      "stimme eher zu",
      "stimme voll und ganz zu",
    ];

    var instruction =
      "<h1>Big Five Inventory - 2</h1>" +
      "<p>Nachstehend finden Sie eine Reihe von Eigenschaften, die auf Sie zutreffen könnten.</p>" +
      "<p>Würden Sie über sich z. B. sagen, dass Sie gerne Zeit mit anderen Menschen verbringen?</p>" +
      "<p>Bitte geben Sie für jede der folgenden Aussagen an, inwieweit Sie zustimmen.</p>";

    var items = [
      "Ich gehe aus mir heraus, bin gesellig.",
      "Ich bin einfühlsam, warmherzig.",
      "Ich bin eher unordentlich.",
      "Ich bleibe auch in stressigen Situationen gelassen.",
      "Ich bin nicht sonderlich kunstinteressiert.",
      "Ich bin durchsetzungsfähig, energisch.",
      "Ich begegne anderen mit Respekt.",
      "Ich bin bequem, neige zu Faulheit.",
      "Ich bleibe auch bei Rückschlägen zuversichtlich.",
      "Ich bin vielseitig interessiert.",

      "Ich schäume selten vor Begeisterung über.",
      "Ich neige dazu, andere zu kritisieren.",
      "Ich bin stetig, beständig.",
      "Ich kann launisch sein, habe schwankende Stimmungen.",
      "Ich bin erfinderisch, mir fallen raffinierte Lösungen ein.",
      "Ich bin eher ruhig.",
      "Ich habe mit anderen wenig Mitgefühl.",
      "Ich bin systematisch, halte meine Sachen in Ordnung.",
      "Ich reagiere leicht angespannt.",
      "Ich kann mich für Kunst, Musik und Literatur begeistern.",

      "Ich neige dazu, Aufgaben vor mir herzuschieben.",
      "Ich habe oft Streit mit anderen.",
      "Ich neige dazu, die Führung zu übernehmen.",
      "Ich bin selbstsicher, mit mir zufrieden.",
      "Ich meide philosophische Diskussionen.",
      "Ich bin weniger aktiv und unternehmungslustig als andere.",
      "Ich bin nachsichtig, vergebe anderen leicht.",
      "Ich bin manchmal ziemlich nachlässig.",
      "Ich bin ausgeglichen, nicht leicht aus der Ruhe zu bringen.",
      "Ich bin nicht besonders einfallsreich.",

      "Ich bin eher schüchtern.",
      "Ich bin hilfsbereit und selbstlos.",
      "Ich mag es sauber und aufgeräumt.",
      "Ich mache mir oft Sorgen.",
      "Ich weiß Kunst und Schönheit zu schätzen.",
      "Mir fällt es schwer, andere zu beeinflussen.",
      "Ich bin manchmal unhöflich und schroff.",
      "Ich bin effizient, erledige Dinge schnell.",
      "Ich fühle mich oft bedrückt, freudlos.",
      "Es macht mir Spaß, gründlich über komplexe Dinge nachzudenken und sie zu verstehen.",

      "Ich bin voller Energie und Tatendrang.",
      "Ich bin anderen gegenüber misstrauisch.",
      "Ich bin verlässlich, auf mich kann man zählen.",
      "Ich habe meine Gefühle unter Kontrolle, werde selten wütend.",
      "Ich bin nicht sonderlich fantasievoll.",
      "Ich bin gesprächig.",
      "Andere sind mir eher gleichgültig, egal.",
      "Ich bin eher der chaotische Typ, mache selten sauber.",
      "Ich werde selten nervös und unsicher.",
      "Ich finde Gedichte und Theaterstücke langweilig.",

      "In einer Gruppe überlasse ich lieber anderen die Entscheidung.",
      "Ich bin höflich und zuvorkommend.",
      "Ich bleibe an einer Aufgabe dran, bis sie erledigt ist.",
      "Ich bin oft deprimiert, niedergeschlagen.",
      "Mich interessieren abstrakte Überlegungen wenig.",
      "Ich bin begeisterungsfähig und kann andere leicht mitreißen.",
      "Ich schenke anderen leicht Vertrauen, glaube an das Gute im Menschen.",
      "Manchmal verhalte ich mich verantwortungslos, leichtsinnig.",
      "Ich reagiere schnell gereizt oder genervt.",
      "Ich bin originell, entwickle neue Ideen.",
    ];

    var label_button = "Weiter";
  } else if (language == "EN") {
    var likert_scale = [
      "disagree strongly",
      "Disagree a little",
      "Neutral; no opinion",
      "Agree a little",
      "Agree strongly",
    ];

    var instruction =
      "<h1>The Big Five Inventory - 2</h1>" +
      "<p>Here are a number of characteristics that may or may not apply to you.</p>" +
      "<p>For example, do you agree that you are someone who likes to spend time with others?</p>" +
      "<p>Please indicate for each statement the extent to which you agree or disagree with that statement.</p>";

    var items = [
      "I am someone who is outgoing, sociable.", // 1
      "I am someone who is compassionate, has a soft heart.", // 2
      "I am someone who tends to be disorganized.", // 3
      "I am someone who is relaxed, handles stress well.", // 4
      "I am someone who has few artistic interests.", // 5
      "I am someone who has an assertive personality.", // 6
      "I am someone who is respectful, treats others with respect.", // 7
      "I am someone who tends to be lazy.", // 8
      "I am someone who stays optimistic after experiencing a setback.", // 9
      "I am someone who is curious about many different things.", // 10

      "I am someone who rarely feels excited or eager.", // 11
      "I am someone who tends to find fault with others.", // 12
      "I am someone who is dependable, steady.", // 13
      "I am someone who is moody, has up and down mood swings.", // 14
      "I am someone who is inventive, finds clever ways to do things.", // 15
      "I am someone who tends to be quiet.", // 16
      "I am someone who feels little sympathy for others.", // 17
      "I am someone who is systematic, likes to keep things in order.", // 18
      "I am someone who can be tense.", // 19
      "I am someone who is fascinated by art, music, or literature.", // 20

      "I am someone who is dominant, acts as a leader.", // 21
      "I am someone who starts arguments with others.", // 22
      "I am someone who has difficulty getting started on tasks.", // 23
      "I am someone who feels secure, comfortable with self.", // 24
      "I am someone who avoids intellectual, philosophical discussions.", // 25
      "I am someone who is less active than other people.", // 26
      "I am someone who has a forgiving nature.", // 27
      "I am someone who can be somewhat careless.", // 28
      "I am someone who is emotionally stable, not easily upset.", // 29
      "I am someone who has little creativity.", // 30

      "I am someone who is sometimes shy, introverted.", // 31
      "I am someone who is helpful and unselfish with others.", // 32
      "I am someone who keeps things neat and tidy.", // 33
      "I am someone who worries a lot.", // 34
      "I am someone who values art and beauty.", // 35
      "I am someone who finds it hard to influence people.", // 36
      "I am someone who is sometimes rude to others.", // 37
      "I am someone who is efficient, gets things done.", // 38
      "I am someone who often feels sad.", // 39
      "I am someone who is complex, a deep thinker.", // 40

      "I am someone who is full of energy", // 41
      "I am someone who is suspicious of others' intentions.", // 42
      "I am someone who is reliable, can always be counted on.", // 43
      "I am someone who keeps their emotions under control.", // 44
      "I am someone who has difficulty imagining things.", // 45
      "I am someone who is talkative.", // 46
      "I am someone who can be cold and uncaring.", // 47
      "I am someone who leaves a mess, doesn't clean up.", // 48
      "I am someone who rarely feels anxious or afraid.", // 49
      "I am someone who thinks poetry and plays are boring.", // 50

      "I am someone who prefers to have others take charge.", // 51
      "I am someone who is polite, courteous to others.", // 52
      "I am someone who is persistent, works until the task is finished.", // 53
      "I am someone who tends to feel depressed, blue.", // 54
      "I am someone who has little interest in abstract ideas.", // 55
      "I am someone who shows a lot of enthusiasm.", // 56
      "I am someone who assumes the best about people.", // 57
      "I am someone who sometimes behaves irresponsibly.", // 58
      "I am someone who is temperamental, gets emotional easily.", // 59
      "I am someone who is original, comes up with new ideas.", // 60
    ];

    var label_button = "Continue";
  } else {
    throw new Error("Language not supported");
  }

  const item_labels: string[] = [
    "1",
    "2",
    "3R",
    "4R",
    "5R",
    "6",
    "7",
    "8R",
    "9R",
    "10",
    "11R",
    "12R",
    "13",
    "14",
    "15",
    "16R",
    "17R",
    "18",
    "19",
    "20",
    "21",
    "22R",
    "23R",
    "24R",
    "25R",
    "26R",
    "27",
    "28R",
    "29R",
    "30R",
    "31R",
    "32",
    "33",
    "34",
    "35",
    "36R",
    "37R",
    "38",
    "39",
    "40",
    "41",
    "42R",
    "43",
    "44R",
    "45R",
    "46",
    "47R",
    "48R",
    "49R",
    "50R",
    "51R",
    "52",
    "53",
    "54",
    "55R",
    "56",
    "57",
    "58R",
    "59",
    "60",
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

  var final_items: any = [];
  if (version == "full") {
    final_items = scale_items;
  } else if (version == "short") {
    const items_short_versions: number[] = [
      16, 2, 3, 34, 20, 21, 37, 23, 54, 55, 41, 57, 43, 29, 60, 1, 47, 33, 4, 5,
      51, 7, 53, 24, 40, 26, 12, 28, 59, 30,
    ];
    final_items = items_short_versions.map((i) => scale_items[i - 1]);
  } else if (version == "extra-short") {
    const items_extra_short_versions: number[] = [
      16, 2, 3, 34, 20, 21, 37, 23, 54, 55, 41, 57, 43, 29, 60,
    ];
    final_items = items_extra_short_versions.map((i) => scale_items[i - 1]);
  } else {
    throw new Error("Version not supported");
  }

  var bfi2 = {
    type: surveyLikert,
    preamble: instruction,
    questions: final_items,
    randomize_question_order: false,
    scale_width: 600,
    button_label: label_button,
  };

  return bfi2;
};
