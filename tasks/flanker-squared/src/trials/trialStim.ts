import { jsPsych } from "../jsp";
import { expInfo } from "../settings";

export interface flankerTrial {
  target: string;
  responseOptions: string[];
  correctChoice: string;
  stimCong: boolean;
  responseFlankCong: boolean;
  flankDirection: 'left' | 'right';
}

// Mischt den Array dauerhaft
function shuffleArray<T>(array: T[]): T[] {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// 1) Generiert Trials basierend auf totaler Anzahl (brauchbar für practice)
function generateFlankerTrialsTotal(nTrials: number): flankerTrial[] {
  const trials: flankerTrial[] = [];
  const { ARROW_LEFT, ARROW_RIGHT, CHOICES, CONGRUENCY_CONDITIONS } = expInfo.DESIGN;
  const [CHOICE_LEFT, CHOICE_RIGHT] = CHOICES;

  // gleiche Verteilung über die 4 Congruencies
  const nConds = CONGRUENCY_CONDITIONS.length;
  const baseCount = Math.floor(nTrials / nConds);
  let remainder = nTrials - baseCount * nConds;

  for (const cond of CONGRUENCY_CONDITIONS) {
    const count = baseCount + (remainder > 0 ? 1 : 0);
    if (remainder > 0) remainder--;

    for (let i = 0; i < count; i++) {
      // Flankerpfeil zufällig
      const flankLeft = Math.random() < 0.5;
      const flankArrow = flankLeft ? ARROW_LEFT : ARROW_RIGHT;
      const oppositeArrow = flankLeft ? ARROW_RIGHT : ARROW_LEFT;

      // Target mit stimCong
      const centerArrow = cond.stimCong ? flankArrow : oppositeArrow;
      const target = `${flankArrow}${flankArrow}${centerArrow}${flankArrow}${flankArrow}`;

      // Response mit zufälliger flankenkongruenz
      const correctCenter = flankArrow;
      const incorrectCenter = oppositeArrow;
      const useCongruentFlanks = Math.random() < 0.5;
      const corrFlankSides = useCongruentFlanks ? flankArrow : oppositeArrow;
      const incFlankSides = useCongruentFlanks ? oppositeArrow : flankArrow;

      const correctStim = `${corrFlankSides}${corrFlankSides}${correctCenter}${corrFlankSides}${corrFlankSides}`;
      const incorrectStim = `${incFlankSides}${incFlankSides}${incorrectCenter}${incFlankSides}${incFlankSides}`;

      const correctOnLeft = Math.random() < 0.5;
      const responseOptions = correctOnLeft ? [correctStim, incorrectStim] : [incorrectStim, correctStim];
      const correctChoice = correctOnLeft ? CHOICE_LEFT : CHOICE_RIGHT;

      trials.push({
        target,
        responseOptions,
        correctChoice,
        stimCong: cond.stimCong,
        responseFlankCong: useCongruentFlanks,
        flankDirection: flankLeft ? 'left' : 'right'
      });
    }
  }

  return shuffleArray(trials);
}

// 2) Generiert Trials mit exakt countsPerCell je Zelle (brauchbar für experiment)
function generateFlankerTrialsByCell(countsPerCell: number): flankerTrial[] {
  const trials: flankerTrial[] = [];
  const { ARROW_LEFT, ARROW_RIGHT, CHOICES } = expInfo.DESIGN;
  const [CHOICE_LEFT, CHOICE_RIGHT] = CHOICES;
  const stimCongValues = [true, false];
  const respFlankCongValues = [true, false];

  for (const stimCong of stimCongValues) {
    for (const responseFlankCong of respFlankCongValues) {
      for (let i = 0; i < countsPerCell; i++) {
        const flankLeft = Math.random() < 0.5;
        const flankArrow = flankLeft ? ARROW_LEFT : ARROW_RIGHT;
        const oppositeArrow = flankLeft ? ARROW_RIGHT : ARROW_LEFT;

        const centerArrow = stimCong ? flankArrow : oppositeArrow;
        const target = `${flankArrow}${flankArrow}${centerArrow}${flankArrow}${flankArrow}`;

        const correctCenter = flankArrow;
        const incorrectCenter = oppositeArrow;

        const corrFlankSides = responseFlankCong ? flankArrow : oppositeArrow;
        const incFlankSides = responseFlankCong ? oppositeArrow : flankArrow;

        const correctStim = `${corrFlankSides}${corrFlankSides}${correctCenter}${corrFlankSides}${corrFlankSides}`;
        const incorrectStim = `${incFlankSides}${incFlankSides}${incorrectCenter}${incFlankSides}${incFlankSides}`;

        const correctOnLeft = Math.random() < 0.5;
        const responseOptions = correctOnLeft ? [correctStim, incorrectStim] : [incorrectStim, correctStim];
        const correctChoice = correctOnLeft ? CHOICE_LEFT : CHOICE_RIGHT;

        trials.push({
          target,
          responseOptions,
          correctChoice,
          stimCong,
          responseFlankCong,
          flankDirection: flankLeft ? 'left' : 'right'
        });
      }
    }
  }

  return shuffleArray(trials);
}

export const practiceTrials = generateFlankerTrialsTotal(expInfo.DESIGN.nPRACTICE);
export const experimentTrials = generateFlankerTrialsByCell(
  expInfo.DESIGN.nTRIALS / expInfo.DESIGN.CONGRUENCY_CONDITIONS.length
);
