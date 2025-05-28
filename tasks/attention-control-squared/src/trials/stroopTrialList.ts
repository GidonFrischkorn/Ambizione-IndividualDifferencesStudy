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

const COLORS = ["RED", "GREEN", "BLUE"];
function getRandomColor(exclude:string): string {
    const options = COLORS.filter(color => color!== exclude);
    return options[Math.floor(Math.random() * options.length)]
}
function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
export function createStroopTrials(): StroopTrial[] {
    const trials: StroopTrial[] = [];
    const congruencies: ("congruent" | "incongruent")[] = ["congruent", "incongruent"];
    
    for (const word of COLORS) {
        for (const targetCongruency of congruencies) {
            for (const responseCongruency of congruencies) {
                for (let i = 0; i < 10; i++) {
                    const textColor = targetCongruency === "congruent" ? word: getRandomColor(word);
                    const correctMeaning = textColor;
                    const correctAnswer = Math.random() < 0.5 ? "left" : "right";
                    const correctOption = correctMeaning;
                    const incorrectOption = getRandomColor(correctMeaning);
                    const leftOption = correctAnswer === "left" ? correctOption: incorrectOption;
                    const rightOption = correctAnswer === "right" ? correctOption: incorrectOption;
                    const leftColor = getRandomColor("");
                    const rightColor = getRandomColor(leftColor);
                    trials.push({
                        targetWord: word,
                        textColor,
                        targetCongruency,
                        responseCongruency,
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
    return shuffleArray(trials)
};