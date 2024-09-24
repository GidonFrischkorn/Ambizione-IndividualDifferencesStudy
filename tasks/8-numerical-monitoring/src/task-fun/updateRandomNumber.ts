/**
 * Updates a random number in the grid.
 * @param gridNumbers
 */
export function updateRandomNumber(gridNumbers) {
    let numberObjects = gridNumbers.filter((obj) => obj.obj_type === 'text');
    let randomIndex = Math.floor(Math.random() * numberObjects.length);
    let randomNumber = Math.floor(Math.random() * 90) + 10;
    // Update the selected number object
    numberObjects[randomIndex].content = randomNumber.toString();
  }
  

 
  