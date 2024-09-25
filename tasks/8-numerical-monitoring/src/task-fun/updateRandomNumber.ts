/**
 * Updates a random number in the grid.
 * @param gridNumbers
 */
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
  

 
  