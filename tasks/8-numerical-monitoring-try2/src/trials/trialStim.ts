// Purpose: Generates a stimulus array based on the specified condition.

import { random } from "@coglabuzh/webpsy.js"
import { expInfo } from "../settings";
import { jsPsych } from "../jsp";

/*
export const generateStims = function (itsAMatch: boolean, currentGrid: number[]) {
  // Initialize the number pool from 10 to 99
  let numberPool: number[] = Array.from({ length: 90 }, (v, k) => k + 10);

  // Function to get row, column, and diagonals for a given position
  const getRowColDiag = (pos: number) => {
    let row = Math.floor(pos / 3);
    let col = pos % 3;

    // Get the row, column, and diagonals that the position belongs to
    let rowNumbers = [currentGrid[row * 3], currentGrid[row * 3 + 1], currentGrid[row * 3 + 2]];
    let colNumbers = [currentGrid[col], currentGrid[col + 3], currentGrid[col + 6]];
    let diag1 = (pos % 4 === 0) ? [currentGrid[0], currentGrid[4], currentGrid[8]] : [];
    let diag2 = (pos % 2 === 0 && pos !== 4) ? [currentGrid[2], currentGrid[4], currentGrid[6]] : [];

    return { rowNumbers, colNumbers, diag1, diag2 };
  };

  // Function to check if all numbers have the same last digit
  const hasSameLastDigit = (nums: number[]) => nums.every(num => num % 10 === nums[0] % 10);

  // Randomly select a position in the grid
  let randPos = Math.floor(Math.random() * currentGrid.length);

  // Get numbers not currently in the grid
  let notGridNumbers = numberPool.filter(num => !currentGrid.includes(num));

  // Get the current row, column, and diagonals for the position
  const { rowNumbers, colNumbers, diag1, diag2 } = getRowColDiag(randPos);

  // Generate a new number based on the itsAMatch condition
  let newNumber: number;
  if (itsAMatch) {
    // We need to find a number with the same last digit as the row, column, or diagonal
    let possibleMatches = notGridNumbers.filter(num =>
      num % 10 === rowNumbers[0] % 10 ||
      num % 10 === colNumbers[0] % 10 ||
      (diag1.length > 0 && num % 10 === diag1[0] % 10) ||
      (diag2.length > 0 && num % 10 === diag2[0] % 10)
    );
    newNumber = possibleMatches[Math.floor(Math.random() * possibleMatches.length)];
  } else {
    // We need to find a number that doesn't have the same last digit as the row, column, or diagonal
    let possibleMismatches = notGridNumbers.filter(num =>
      num % 10 !== rowNumbers[0] % 10 &&
      num % 10 !== colNumbers[0] % 10 &&
      (diag1.length === 0 || num % 10 !== diag1[0] % 10) &&
      (diag2.length === 0 || num % 10 !== diag2[0] % 10)
    );
    newNumber = possibleMismatches[Math.floor(Math.random() * possibleMismatches.length)];
  }

  // Replace the number at the random position with the new number
  currentGrid[randPos] = newNumber;

  // Return the updated grid
  return currentGrid;
};

export const createTrialList = function () {
  let targetConditions = {
    condition: expInfo.DESIGN.CONDITIONS,
  };

  let block_conditions = jsPsych.randomization.factorial(targetConditions, expInfo.DESIGN.nTRIALS, false);
  console.log("Block Conditions: ", block_conditions);

  // Initialize the grid once - ensure it's initialized correctly
  let initialGrid = Array.from({ length: 9 }, () => Math.floor(Math.random() * 90) + 10);

  block_conditions.forEach((trial, i) => {
    if (trial.condition === "match") {
      // Pass the grid to generateStims and receive the updated grid
      initialGrid = generateStims(true, initialGrid);
    } else if (trial.condition === "nomatch") {
      initialGrid = generateStims(false, initialGrid);
    }

    // Store the updated grid in the trial object
    trial.numbers = [...initialGrid]; // Store a copy of the grid for each trial
    trial.trial_number = i + 1;
  });
  console.log("Block Conditions: ", block_conditions);

  return block_conditions;
};
*/