/**
 * Updates a random number in the grid.
 * @param gridNumbers
 */
/*
export function updateRandomNumber(gridNumbers) {

    let gridNumbersCopy = JSON.parse(JSON.stringify(gridNumbers));
    let numberObjects = gridNumbers.filter((obj) => obj.obj_type === 'text');
    let randomIndex = Math.floor(Math.random() * numberObjects.length);
    let randomNumber = Math.floor(Math.random() * 90) + 10;
    
    // Update the selected number object
    const selectedObject = numberObjects[randomIndex];
    
    // Find the index of the selected object in the original gridNumbers
    const originalIndex = gridNumbers.findIndex(obj => obj === selectedObject);
    
    // Update the content of the selected number object in the original gridNumbers array
    gridNumbersCopy[originalIndex].content = randomNumber.toString();

    //numberObjects[randomIndex].content = randomNumber.toString();
    return gridNumbersCopy;
  }
  
  // New version of the function that generate a unique number 
  import { expInfo } from "../settings";
  */

// Create a queue to track the last 6 changed indices
let lastChangedIndices: number[] = [];

/**
 * Updates a random number in the grid ensuring the new number is unique and not changing the same index frequently.
 * @param gridNumbers - The current grid of numbers.
 * @returns The updated grid of numbers.
 */
export function updateRandomNumber(gridNumbers: any[]): any[] {
  // Create a deep copy of the grid numbers to avoid direct modifications
  let gridNumbersCopy = JSON.parse(JSON.stringify(gridNumbers));

  // Extract current numbers from the grid
  const currentNumbers = gridNumbers
    .filter((stim) => stim.obj_type === 'text')
    .map((stim) => parseInt(stim.content));

  // Filter text elements only
  const numberObjects = gridNumbers.filter((stim) => stim.obj_type === 'text');

  // Find a random index that is not in the last changed indices
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * numberObjects.length);
  } while (lastChangedIndices.includes(randomIndex));

  // Find a unique new number not present in the current grid
  let newNumber;
  do {
    newNumber = Math.floor(Math.random() * 90) + 10;
  } while (currentNumbers.includes(newNumber));

  // Select the object to update based on the chosen index
  const selectedObject = numberObjects[randomIndex];

  // Find the index of the selected object in the original gridNumbers
  const originalIndex = gridNumbers.findIndex((obj) => obj === selectedObject);

  // Update the content of the selected number object in the copy of the gridNumbers array
  gridNumbersCopy[originalIndex].content = newNumber.toString();

  // Update the index tracking queue
  lastChangedIndices.push(randomIndex);
  // Keep only the last 6 indices in the queue
  if (lastChangedIndices.length > 6) {
    lastChangedIndices.shift();
  }

  return gridNumbersCopy;
}