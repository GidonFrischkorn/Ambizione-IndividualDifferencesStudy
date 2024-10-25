/**
 * find all index which match the condition
 *
 * @param {Array} arr the array to search elements
 * @param {number|string} item detected item.
 * @param {boolean} match boolean; if true, return matched index; if false, return unmatched index.
 * @returns
 */
export const getIndex = function (
  arr: any[],
  item: number | string,
  match: boolean = true
) {
  var indexes: number[] = [],
    i = -1;
  if (match) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === item) indexes.push(i);
    }
  } else {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] !== item) indexes.push(i);
    }
  }
  return indexes;
};

export const removeItems = (array, itemsToRemove) => { 
  return array.filter(v => { 
        return !itemsToRemove.includes(v); 
    });
}

// changed the original function to only remove one item 

/*export const removeItem = (array, itemToRemove) => {
  return array.filter(v => {
    return JSON.stringify(v) !== JSON.stringify(itemToRemove)
  });
}*/

export const removeItem = (array, wordToRemove) => {
  return array.filter(v => v.Word !== wordToRemove);
}

/*export const removeItem = (array, itemToRemove) => {
  const index = array.findIndex(v => v.Word === itemToRemove.Word && v.Animacy === itemToRemove.Animacy && v.Wordlength === itemToRemove.Wordlength);

  if (index !== -1) {
    array.splice(index, 1); // Directly remove the item from the array
  } else {
  }
};*/
