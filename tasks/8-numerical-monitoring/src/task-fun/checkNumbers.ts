/**
 * Checks if any row, column, or diagonal has matching last digits.
 * @param gridNumbers
 * @returns {boolean}
 */
export function checkForSameLastDigit(gridNumbers) {
    let numberObjects = gridNumbers.filter(obj => obj.obj_type === 'text');
    let grid = numberObjects.map(obj => parseInt(obj.text.slice(-1)));
  
    // Check rows, columns, and diagonals
    return checkRows(grid) || checkColumns(grid) || checkDiagonals(grid);
  }
  
  function checkRows(grid) {
    for (let i = 0; i < 3; i++) {
      if (grid[i * 3] === grid[i * 3 + 1] && grid[i * 3] === grid[i * 3 + 2]) {
        return true;
      }
    }
    return false;
  }
  
  function checkColumns(grid) {
    for (let i = 0; i < 3; i++) {
      if (grid[i] === grid[i + 3] && grid[i] === grid[i + 6]) {
        return true;
      }
    }
    return false;
  }
  
  function checkDiagonals(grid) {
    return (
      (grid[0] === grid[4] && grid[0] === grid[8]) ||
      (grid[2] === grid[4] && grid[2] === grid[6])
    );
  }