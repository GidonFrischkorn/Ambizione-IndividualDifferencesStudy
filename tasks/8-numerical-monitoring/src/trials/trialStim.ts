// Purpose: Generates a stimulus array based on the specified condition.


import psychophysics from "@kurokida/jspsych-psychophysics";
import { expInfo } from "../settings";


/** FIRST VERSION
 * Generates a stimulus array based on the specified condition.
 * @param XY
 */
/*
export const generateStims = function () {
  var stim_array: any[] = [];

  // Loop through rows (Y) and columns (X)
  for (let i = 0; i < expInfo.DESIGN.positionY.length; i++) {
    for (let j = 0; j < expInfo.DESIGN.positionX.length; j++) {
      const randomNum = Math.floor(Math.random() * 90) + 10;

      const cell = {
        obj_type: 'rect',
        origin_center: true,
        startX: expInfo.DESIGN.positionX[j],
        startY: expInfo.DESIGN.positionY[i],
        height: expInfo.DESIGN.cellHEIGHT,
        width: expInfo.DESIGN.cellWIDTH,
        line_color: expInfo.DESIGN.lineCOLOR
      };

      const number = {
        obj_type: 'text',
        origin_center: true,
        content: randomNum.toString(),
        startX: expInfo.DESIGN.positionX[j],
        startY: expInfo.DESIGN.positionY[i]
      }

    stim_array.push(cell, number);
    }
    
  }

  return stim_array;
};
*/



/** SECOND VERSION - TRYING TO MAKE ONLY UNIQUE NUMBERS IN THE GRID 
 * Generates a stimulus array based on the specified condition, ensuring each number in the grid is unique.
 * @returns An array of stimulus objects for the grid.
 */
export const generateStims = function () {
  let stim_array: any[] = [];

  // Create a Set to hold unique numbers
  const uniqueNumbers = new Set<number>();

  // Generate 9 unique numbers
  while (uniqueNumbers.size < 9) {
    const randomNum = Math.floor(Math.random() * 90) + 10;
    uniqueNumbers.add(randomNum);
  }

  // Convert Set to an Array
  const numbersArray = Array.from(uniqueNumbers);

  // Loop through rows (Y) and columns (X) and assign unique numbers
  let index = 0;
  for (let i = 0; i < expInfo.DESIGN.positionY.length; i++) {
    for (let j = 0; j < expInfo.DESIGN.positionX.length; j++) {
      const numberValue = numbersArray[index++]; // Get unique number

      const cell = {
        obj_type: 'rect',
        origin_center: true,
        startX: expInfo.DESIGN.positionX[j],
        startY: expInfo.DESIGN.positionY[i],
        height: expInfo.DESIGN.cellHEIGHT,
        width: expInfo.DESIGN.cellWIDTH,
        line_color: expInfo.DESIGN.lineCOLOR
      };

      const number = {
        obj_type: 'text',
        origin_center: true,
        content: numberValue.toString(),
        startX: expInfo.DESIGN.positionX[j],
        startY: expInfo.DESIGN.positionY[i]
      };

      stim_array.push(cell, number);
    }
  }

  return stim_array;
};
