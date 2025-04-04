// Define survey function for BFI-2 questionnaire
export const bfi2 = function (
  language: string = "de",
  version: string = "full",
  single_page: boolean = false
) {
  if (language == "de") {
    var likert_scale = [
      "stimme überhaupt nicht zu",
      "stimme eher nicht zu",
      "teils, teils",
      "stimme eher zu",
      "stimme voll und ganz zu",
    ];

    var title = "Big Five Inventory - 2";
    var instruction =
      "Nachstehend finden Sie eine Reihe von Eigenschaften, die auf Sie zutreffen könnten. " +
      "Würden Sie über sich z. B. sagen, dass Sie gerne Zeit mit anderen Menschen verbringen? " +
      "Bitte geben Sie für jede der folgenden Aussagen an, inwieweit Sie zustimmen.";

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
      "Es macht mir Spass, gründlich über komplexe Dinge nachzudenken und sie zu verstehen.",

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
  } else if (language == "en") {
    var likert_scale = [
      "disagree strongly",
      "Disagree a little",
      "Neutral; no opinion",
      "Agree a little",
      "Agree strongly",
    ];

    var title = "The Big Five Inventory - 2";
    var instruction =
      "Here are a number of characteristics that may or may not apply to you." +
      "For example, do you agree that you are someone who likes to spend time with others?" +
      "Please indicate for each statement the extent to which you agree or disagree with that statement.";

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

  // Define item labels
  const item_labels: string[] = [
    "BFI-E-1",
    "BFI-V-2",
    "BFI-G-3R",
    "BFI-NE-4R",
    "BFI-O-5R",
    "BFI-E-6",
    "BFI-V-7",
    "BFI-G-8R",
    "BFI-NE-9R",
    "BFI-O-10",
    "BFI-E-11R",
    "BFI-V-12R",
    "BFI-G-13",
    "BFI-NE-14",
    "BFI-O-15",
    "BFI-E-16R",
    "BFI-V-17R",
    "BFI-G-18",
    "BFI-NE-19",
    "BFI-O-20",
    "BFI-E-21",
    "BFI-V-22R",
    "BFI-G-23R",
    "BFI-NE-24R",
    "BFI-O-25R",
    "BFI-E-26R",
    "BFI-V-27",
    "BFI-G-28R",
    "BFI-NE-29R",
    "BFI-O-30R",
    "BFI-E-31R",
    "BFI-V-32",
    "BFI-G-33",
    "BFI-NE-34",
    "BFI-O-35",
    "BFI-E-36R",
    "BFI-V-37R",
    "BFI-G-38",
    "BFI-NE-39",
    "BFI-O-40",
    "BFI-E-41",
    "BFI-V-42R",
    "BFI-G-43",
    "BFI-NE-44R",
    "BFI-O-45R",
    "BFI-E-46",
    "BFI-V-47R",
    "BFI-G-48R",
    "BFI-NE-49R",
    "BFI-O-50R",
    "BFI-E-51R",
    "BFI-V-52",
    "BFI-G-53",
    "BFI-NE-54",
    "BFI-O-55R",
    "BFI-E-56",
    "BFI-V-57",
    "BFI-G-58R",
    "BFI-NE-59",
    "BFI-O-60",
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

  // Define final items based on test version; default is full version
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

  // Code Items to dimensions & facets
  const item_assignments = {
    // Dimensions
    extraversion: [1, 6, 11, 16, 21, 26, 31, 36, 41, 46, 51, 56],
    agreeableness: [2, 7, 12, 17, 22, 27, 32, 37, 42, 47, 52, 57],
    conscientiousness: [3, 8, 13, 18, 23, 28, 33, 38, 43, 48, 53, 58],
    emotional_stability: [4, 9, 14, 19, 24, 29, 34, 39, 44, 49, 54, 59],
    openness: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
    // Facets: only calculate for full & short versions
    sociability: [1, 16, 31, 46],
    assertiveness: [6, 21, 36, 51],
    energy_level: [11, 26, 41, 56],
    compassion: [2, 17, 32, 47],
    respectfulness: [7, 22, 37, 52],
    trust: [12, 27, 42, 57],
    organization: [3, 18, 33, 48],
    productiveness: [8, 23, 38, 53],
    responsibility: [13, 28, 43, 58],
    anxiety: [4, 19, 34, 49],
    depression: [9, 24, 39, 54],
    emotional_volatility: [14, 29, 44, 59],
    intellectual_curiosity: [5, 20, 35, 50],
    aesthetic_sensitivity: [10, 25, 40, 55],
    creative_imagination: [15, 30, 45, 60],
  };

  // create array of response colums
  var likert_columns: any[] = [];
  for (let i = 0; i < likert_scale.length; i++) {
    var single_column = {
      value: i + 1,
      text: likert_scale[i],
    };

    likert_columns.push(single_column);
  }

  // combine everything into a single or multiple survey pages
  var bfi2_line: any[] = [];
  if (single_page) {
    var header_repeat: number = 10;
    var num_elements = Math.ceil(final_items.length / header_repeat);

    var element_array: any[] = [];
    for (let i = 0; i < num_elements; i++) {
      var element_title = title;
      var element_description = i == 0 ? instruction : "";

      var matrix_title = "bfi2-matrix-" + i;

      var bfi2_element = {
        type: "matrix",
        name: matrix_title,    
        title: element_title,
        description: element_description,
        alternateRows: true,
        isAllRowRequired: true,
        rows: final_items.slice(i * header_repeat, (i + 1) * header_repeat),
        rowsOrder: "random",
        columns: likert_columns,
        rowTitleWidth: "50%",
      };

      element_array.push(bfi2_element);
    }

    bfi2_line = [{
      elements: element_array,  
      
    }];
  } else {
    var item_per_page = 60;
    var num_pages = Math.ceil(final_items.length / item_per_page);

    for(let i = 0; i < num_pages; i++) {
      var matrix_title = "bfi2-matrix-" + i;

      var bfi2_page = {
        elements: [
          {
            type: "matrix",
            name: matrix_title,
            title: title,
            description: instruction,
            alternateRows: true,
            isAllRowRequired: true,
            rows: final_items.slice(i * item_per_page, (i + 1) * item_per_page),
            rowsOrder: "random",
            columns: likert_columns,
            rowTitleWidth: "50%",
          },
        ],
      };

      bfi2_line.push(bfi2_page);
    }
  }
  
  return bfi2_line;
};
