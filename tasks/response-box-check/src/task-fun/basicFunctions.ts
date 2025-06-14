/**
 * Remove items from an array
 * @param array array from which to remove items
 * @param itemsToRemove items to-be removed from the array
 * @returns array without the items to-be removed
 */
export const removeItems = (array, itemsToRemove) => { 
    return array.filter(v => { 
        return !itemsToRemove.includes(v); 
    });
};

/**
 * Pads a string of a number with a certain amount of digits with zeros
 * @param n number
 * @param length length of strin to determine number of padded zeros
 * @returns string of number with padded zeros
 */

export const padNumbers = function(n, length) {
    var str = "" + n;

    if(str.length < (length + 1)) str = new Array((length + 1) - str.length).join("0") + str;
    return str;
};

/**
 * Calcualte the mod of two numbers
 * @param n dividend
 * @param m divisor
 * @returns remainder of the division
 */
export const calculateMods = function (n, m) {
    var remain = n % m;
    return Math.floor(remain >= 0 ? remain : remain + m);
};