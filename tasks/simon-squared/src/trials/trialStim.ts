// src/trials/simonStim.ts
import { expInfo } from "../settings";

export interface SimonTrial {
  target: string;                  // "<" oder ">"
  responseOptions: string[];       // [leftWord, rightWord]
  correctChoice: string;           // "d" oder "j" je nach Position des korrekten Wortes
  direction: "left" | "right";     // Pfeilinhalt
  arrowSide: "left" | "right";     // Position des Pfeils (oben links/rechts)
  stimCong: boolean;               // kongruent: arrowSide === direction
  respCong: boolean;               // kongruent: links="links", rechts="rechts"
}

const opp = (s: "left" | "right") => (s === "left" ? "right" : "left");

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// baut ein einzelnes Trial gemäß vorgegebenen Kongruenzen
function buildTrial(stimCong: boolean, respCong: boolean): SimonTrial {
  const { ARROW_LEFT, ARROW_RIGHT, CHOICES, RESPONSE_WORDS } = expInfo.DESIGN;
  const [CHOICE_LEFT, CHOICE_RIGHT] = CHOICES;
  const [WORD_LEFT, WORD_RIGHT] = RESPONSE_WORDS as [string, string];

  // Pfeilrichtung frei randomisieren
  const direction: "left" | "right" = Math.random() < 0.5 ? "left" : "right";
  const target = direction === "left" ? ARROW_LEFT : ARROW_RIGHT;

  // Pfeilposition so setzen, dass stimCong erfüllt ist
  const arrowSide: "left" | "right" = stimCong ? direction : opp(direction);

  // Wort-Positionen so setzen, dass respCong erfüllt ist
  const leftWord  = respCong ? WORD_LEFT  : WORD_RIGHT;
  const rightWord = respCong ? WORD_RIGHT : WORD_LEFT;

  // Korrekte Taste: wo steht das inhaltlich richtige Wort?
  const correctLabel = direction === "left" ? WORD_LEFT : WORD_RIGHT;
  const correctChoice = (leftWord === correctLabel) ? CHOICE_LEFT : CHOICE_RIGHT;

  return {
    target,
    responseOptions: [leftWord, rightWord],
    correctChoice,
    direction,
    arrowSide,
    stimCong,
    respCong,
    // spatialCong: stimCong, // optional
  };
}

// exakt countPerCell Trials pro Zelle (stimCong × respCong)
function generateSimonTrialsByCell(countPerCell: number): SimonTrial[] {
  const cells = [
    { stimCong: true,  respCong: true  },
    { stimCong: true,  respCong: false },
    { stimCong: false, respCong: true  },
    { stimCong: false, respCong: false },
  ];
  const trials: SimonTrial[] = [];
  for (const cell of cells) {
    for (let i = 0; i < countPerCell; i++) {
      trials.push(buildTrial(cell.stimCong, cell.respCong));
    }
  }
  return shuffle(trials);
}

// verteilt nTrials so gleichmäßig wie möglich über die 4 Zellen (für Practice)
function generateSimonTrialsTotal(nTrials: number): SimonTrial[] {
  const cells = [
    { stimCong: true,  respCong: true  },
    { stimCong: true,  respCong: false },
    { stimCong: false, respCong: true  },
    { stimCong: false, respCong: false },
  ];
  const base = Math.floor(nTrials / cells.length);
  let rem = nTrials - base * cells.length;

  const trials: SimonTrial[] = [];
  for (const c of cells) {
    const count = base + (rem > 0 ? 1 : 0);
    if (rem > 0) rem--;
    for (let i = 0; i < count; i++) {
      trials.push(buildTrial(c.stimCong, c.respCong));
    }
  }
  return shuffle(trials);
}

export const practiceTrialsSimon   = generateSimonTrialsTotal(expInfo.DESIGN.nPRACTICE);     // z.B. 10
export const experimentTrialsSimon = generateSimonTrialsByCell(expInfo.DESIGN.nTRIALS / 4);  // z.B. 30/Zelle bei 120