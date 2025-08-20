import { expInfo } from "../settings";

export interface StroopTrial {
  targetWord: string;
  textColor: string;
  targetCongruency: "congruent" | "incongruent";
  responseCongruency: "congruent" | "incongruent";
  correctAnswer: string;
  leftOption: string;
  rightOption: string;
  leftColor: string;
  rightColor: string;
}

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getRandomColor(exclude: string): string {
  const options = expInfo.STROOP.targetWords.filter(c => c !== exclude);
  return options[Math.floor(Math.random() * options.length)];
}

function getRandomDifferentColor(excludes: string[]): string {
  const options = expInfo.STROOP.targetWords.filter(c => !excludes.includes(c));
  return options[Math.floor(Math.random() * options.length)];
}

export function createStroopTrials(): StroopTrial[] {
  const trials: StroopTrial[] = [];

  // Parameter aus settings.ts
  const colors = expInfo.STROOP.targetWords;
  const targetCongruencies = expInfo.STROOP.targetCongruencies;
  const responseCongruencies = expInfo.STROOP.responseCongruencies;
  const nReps = expInfo.STROOP.nRepsPerCondition;

  for (const word of colors) {
    for (const tCong of targetCongruencies) {
      for (const rCong of responseCongruencies) {
        for (let rep = 0; rep < nReps; rep++) {
          // 1) Target-Textfarbe
          const textColor = tCong === "congruent"
            ? word
            : getRandomColor(word);

          // 2) alternatives Farb-Wort für Antworten
          const altColorWord = tCong === "congruent"
            ? getRandomDifferentColor([word])
            : word;

          // 3) Position der korrekten Antwort
          const correctAnswer = Math.random() < 0.5 ? "left" : "right";

          // 4) Antwort-Wörter
          const leftOption = correctAnswer === "left" ? textColor : altColorWord;
          const rightOption = correctAnswer === "right" ? textColor : altColorWord;

          // 5) Response-Farben je nach rCong
          let leftColor: string;
          let rightColor: string;
          if (rCong === "congruent") {
            leftColor = leftOption;
            rightColor = rightOption;
          } else {
            leftColor = leftOption === textColor ? altColorWord : textColor;
            rightColor = rightOption === textColor ? altColorWord : textColor;
          }

          // 6) Trial-Objekt erstellen
          trials.push({
            targetWord: word,
            textColor,
            targetCongruency: tCong,
            responseCongruency: rCong,
            correctAnswer,
            leftOption,
            rightOption,
            leftColor,
            rightColor
          });
        }
      }
    }
  }

  return shuffleArray(trials);
}
