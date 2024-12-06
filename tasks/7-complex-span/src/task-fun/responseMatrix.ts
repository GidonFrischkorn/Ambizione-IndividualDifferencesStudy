import jss from "jss-browserify";
import { expInfo } from "../settings";

/**
 * 
 * @param nRow The number of rows in the matrix
 * @param nCol The number of columns in the matrix
 * @param matrixW The width of the matrix
 * @param matrixH The height of the matrix
 * @param fontSize The size of the font is determined by the ratio of the matrix height.
 * @returns {Array}
 */
/*export function createButtonMatrix(
    nRow: number,
    nCol: number,
    matrixW: number,
    matrixH: number,
    center: number[],
    imageWidth: number,
    fillColor:string,
    index: string
  ): Array<any> {
    const nTotal = nRow * nCol;
    const intervalW = nCol === 1 ? 0 : matrixW / (nCol - 1);
    const intervalH = nRow === 1 ? 0 : matrixH / (nRow - 1);
  
    let buttonCSS: string[] = [];

    let bg_width = imageWidth;
  
    for (let i = 0; i < nTotal; i++) {
      let buttonName = `.alter-button${i}-${index}`;
      let className = `alter-button${i}-${index}`;
  
      let buttonX = center[0] + intervalW * (Math.floor(i % nCol) - (nCol-1)/2);
      let buttonY = center[1] + intervalH * (Math.floor(i / nCol) - (nRow-1)/2);
  
      jss.set(buttonName, {
        position: "absolute",
        top: `${buttonY}px`,
        left: `${buttonX}px`,
        "-webkit-transform": "translate(-50%,-50%)",
        "-moz-transform": "translate(-50%,-50%)",
        transform: "translate(-50%,-50%)",
        "font-family": "Arial",
        "text-align": "center",
        "background-color": fillColor,
        "justify-content": "center",
      });
  
      buttonCSS.push(
        `<img class=${className} src=%choice% width=${imageWidth}px></img>`
      );
    }
  
    return buttonCSS;
  }*/

  export function createNumberButtonMatrix(
    nRow: number,
    nCol: number,
    matrixW: number,
    matrixH: number,
    center: number[],
    buttonSize: number,
    backgroundColor: string,
    index: string,
    numbers: number[]
  ): Array<any> {
    const nTotal = nRow * nCol;
    const totalButtons = Math.min(nTotal, numbers.length);
    const intervalW = nCol === 1 ? 0 : matrixW / (nCol - 1);
    const intervalH = nRow === 1 ? 0 : matrixH / (nRow - 1);
  
    let buttonHTML: string[] = [];
  
    for (let i = 0; i < totalButtons; i++) {
      let buttonName = `.number-button${i}-${index}`;
      let className = `number-button${i}-${index}`;
  
      let colIndex = i % nCol;
      let rowIndex = Math.floor(i / nCol);
  
      let buttonX = center[0] + intervalW * (colIndex - (nCol - 1) / 2);
      let buttonY = center[1] + intervalH * (rowIndex - (nRow - 1) / 2);
  
      jss.set(buttonName, {
        position: "absolute",
        top: `${buttonY}px`,
        left: `${buttonX}px`,
        "-webkit-transform": "translate(-50%, -50%)",
        "-moz-transform": "translate(-50%, -50%)",
        transform: "translate(-50%, -50%)",
        width: `${buttonSize}px`,
        height: `${buttonSize}px`,
        "font-family": "Arial",
        "font-size": `${buttonSize * 0.4}px`,
        "text-align": "center",
        "background-color": backgroundColor,
        "line-height": `${buttonSize}px`,
        "border": "0px solid #000",
        "border-radius": "5px",
        "box-sizing": "border-box",
        "margin": "0",
        "padding": "0",
        "cursor": "pointer",
      });
  
      buttonHTML.push(`<button class="${className}">%choice%</button>`);
    }
  
    return buttonHTML;
  }


  /*export function createAlterButtons(
    left_numberObj: object,
    right_numberObj: object,
    index: any,
  ) {
    let buttonCSS: any[] = [];
  
    const numbers = {
      left: Object.assign({}, left_numberObj),
      right: Object.assign({}, right_numberObj),
    };
  
    for (let side of Object.keys(numbers)) {
      let numObj = numbers[side];
  
      let className = `button-${side}-${index}`;
  
      jss.set(`.${className}`, {
        position: "absolute",
        top: `${numObj.position[1]}px`,
        left: `${numObj.position[0]}px`,
        "-webkit-transform": "translate(-50%,-50%)",
        "-moz-transform": "translate(-50%,-50%)",
        transform: "translate(-50%,-50%)",
        "font-family": "Arial",
        "font-size": `${numObj.width * 0.4}px`,
        "text-align": "center",
        "background-color": numObj.pair,
        "justify-content": "center",
        "width": `${numObj.width}px`,
        "height": `${numObj.width}px`,
        "line-height": `${numObj.width}px`,
        "border": "1px solid #000",
        "border-radius": "5px",
        "cursor": "pointer",
      });
  
      // Crea l'HTML del pulsante con il numero come contenuto
      buttonCSS.push(`<button class="${className}">%choice%</button>`);
    }
  
    return buttonCSS;
  }*/
  

  export function createAlterButtons(
    left_numberObj: any,
    right_numberObj: any,
    index: any,
  ) {
    let buttonHTML: string[] = [];
  
    const numbers = {
      left: left_numberObj,
      right: right_numberObj,
    };
  
    for (let side of Object.keys(numbers)) {
      let numObj = numbers[side];
  
      // Define the inline CSS styles for the button
      let buttonStyle = `
        position: absolute;
        top: ${numObj.position[1]}px;
        left: ${numObj.position[0]}px;
        transform: translate(-50%, -50%);
        font-family: Arial;
        font-size: ${numObj.width * 0.4}px;
        text-align: center;
        background-color: white; /* Set to white as per your requirement */
        color: black; /* Set text color to black for contrast */
        width: ${numObj.width}px;
        height: ${numObj.width}px;
        line-height: ${numObj.width}px;
        border: none; /* Remove border */
        cursor: pointer;
      `;
  
      // Create the button HTML with inline styles
      buttonHTML.push(`<button style="${buttonStyle}">%choice%</button>`);
    }
  
    return buttonHTML;
  }
  