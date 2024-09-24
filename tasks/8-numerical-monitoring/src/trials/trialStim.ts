// Purpose: Generates a stimulus array based on the specified condition.

import { random } from "@coglabuzh/webpsy.js"
import psychophysics from "@kurokida/jspsych-psychophysics";
import { expInfo } from "../settings";


/**
 * Generates a stimulus array based on the specified condition.
 * @param XY
 */
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


