// Create a collection of functions to simplify common operations:
export const helpers = {
	//create a random integer in a  specified area
	randomNumber: function(start = 0, end = 1){
		return Math.floor(Math.random()*(end-start+1)) + start;
	},

	//create an array of numbers with specified steps in a specific range
	sequence: function(from: number, to: number, by: number = 1){
		let array: number[] = [];
		for(let i = from; i <= to; i = i+by){
			array.push(i);
		}
		return array;
	},

	//create array by repeating the same element n times
	rep: function(element: any, n: number, flat = true){

		if(flat){
			var new_array = new Array(n).fill(element).flat();
			return new_array;
		}

		if(!flat){
			var new_array = new Array(n).fill(element);
			return new_array;
		}
	},

	remove: function(array: any[], elements_to_remove: any[]){
		if(elements_to_remove == null) {
			return array;
		}

		if(elements_to_remove.length == 0){
			return array;
		}
		else{
			var filtered_array = array.filter( (element) => !elements_to_remove.includes(element));
			return filtered_array;
		}
	},

	circle_wrap: function(x: number, radians: boolean) {
		if(radians){
			return (x + Math.PI) % (2 * Math.PI) - Math.PI;
		} else {
			return (x + 180) % 360 - 180;
		}
	}
};


// Create Collectio of Functions to perform mathematical operations with arrays:
export const arrayMath = {

	//get the min out of a numeric array;
	minArray: function(array){
		//check if all elements of the array are numeric
		if(array.some(element => typeof element !== 'number')){
			return console.error('Not all elements of the array are numeric')
		}
		else {
			//specify the reduce function:
			function getMin(accumulator, currentValue){
				return Math.min(accumulator, currentValue);
			}
			//compute the reduced value
			return array.reduce(getMin);
		}
	},


	//get the max out of a numeric array
	maxArray: function(array){
		//check if all elements of the array are numeric
		if(array.some(element => typeof element !== 'number')){
			return console.error('Not all elements of the array are numeric')
		}
		else {
			//specify the reduce function:
			function getMax(accumulator, currentValue){
				return Math.max(accumulator, currentValue);
			}
			//compute the reduced value
			return array.reduce(getMax);
		}
	},


	//compute the sum of a numeric array
	sumArray: function(array){
		//check if all elements of the array are numeric
		if(array.some(element => typeof element !== 'number')){
			return console.error('Not all elements of the array are numeric')
		}
		else {
			//specify the reduce function:
			function getSum(accumulator, currentValue){
				return accumulator + currentValue;
			}
			//compute the reduced value
			return array.reduce(getSum);
		}
	},


	//compute the diff of a numeric array
	diffArray: function(array){
		//check if all elements of the array are numeric
		if(array.some(element => typeof element !== 'number')){
			return console.error('Not all elements of the array are numeric')
		}
		else {
			//specify the reduce function:
			function getDiff(accumulator, currentValue){
				return accumulator - currentValue;
			}
			//compute the reduced value
			return array.reduce(getDiff);
		}
	},


	//get the mean of a numeric Array
	meanArray: function(array){
		//check if all elements of the array are numeric
		if(array.some(element => typeof element !== 'number')){
			return console.error('Not all elements of the array are numeric')
		}
		else {
			return this.sumArray(array)/array.length;
		}
	},


	//get the variance of a numeric Array
	varArray: function (array, populationLevel = true){
		//check if all elements of the array are numeric
		if(array.some(element => typeof element !== 'number')){
			return console.error('Not all elements of the array are numeric')
		}
		else {
			const mean = this.meanArray(array);
			const SumSquares = this.sumArray(array.map(element => (element-mean)**2));
		
			if(populationLevel){
				return SumSquares/(array.length);
			} 
			else {
				return SumSquares/(array.length-1);
			}
		}
	},


	//get the standard deviation of a numeric Array
	sdArray: function (array, populationLevel = true){
		//check if all elements of the array are numeric
		if(array.some(element => typeof element !== 'number')){
			return console.error('Not all elements of the array are numeric')
		}
		else {
			if(populationLevel){
				return Math.sqrt(this.varArray(array, populationLevel = true));
			}
			else {
				return Math.sqrt(this.varArray(array, populationLevel = false));
			}
		}
	},


	//subtract two arrays valuevise
	subArrays: function(array1, array2){
		if(array1.some(element => typeof element !== 'number') ||
		array2.some(element => typeof element !== 'number')){
			return console.error('At least one array contains non numeric values')
		}
		else{
			let subArray: any[] = [];
			for(let i = 0; i < array1.length; i++){
				subArray[i] = array1[i] - array2[i];
			}
			return subArray;
		}
	},


	//add two array valuevise
	addArrays: function(array1, array2){
		if(array1.some(element => typeof element !== 'number') ||
		array2.some(element => typeof element !== 'number')){
			return console.error('At least one array contains non numeric values')
		}
		else{
			let addedArray: any[] = [];
			for(let i = 0; i < array1.length; i++){
				addedArray[i] = array1[i] + array2[i];
			}
			return addedArray;
		}
	},


	//devide array into chunks of a given size
	chunkArray: function(array, chunk_size) {
		if(array.length % chunk_size !== 0){
			return console.error('cannot chunk this array by the given chunk-size. Please make sure that the array-length is a multiple of the chunk-size.')
		}
		else{
			let chunked_array: any[] = []; 
			let counter = 0;
			while (counter < array.length) {
		  		chunked_array.push(array.slice(counter, counter += chunk_size));
			}
				return chunked_array;
		}
	},
};


//define function to check City-Block distance by position Index-number in grid
//the function is called every time a new item is added to an array
//the function checks, if the new item is distinct to the existinc items
//distinct means, that all items have to be separated by a given 'minDist'.
export const checkItemSimilarity = function(array, minDist, gridsize){
	let check: boolean;
    let check_array: boolean[] = [];

    //check all items which are already in the array against the new item
    for(let i = 0; i < (array.length -1); i++){
        if(
            //difference in positions must be bigger in more than minDist to every site
            //diff_positions > 1 excludes the same position and the position above and below
            Math.abs(array[i] - array[array.length-1]) > minDist &&
            //diff_positions < 6 OR diff_positions > 8 excludes the three positions to each site
            (Math.abs(array[i] - array[array.length-1]) < (minDist*gridsize)-minDist) ||
            Math.abs(array[i] - array[array.length-1]) > (minDist*gridsize)+minDist){
            check = true;
        } else {
            check = false;
        }
        //in each iteration, add check into an array. 
        //To keep the items, all checks have to evaluate to true
        check_array.push(check);
    }
    //if there is only one item in the array, return true
    if(check_array.length === 0){
        return true;
    //if there are multiple items in the array, check if every item is true
    } else {
        return check_array.every(Boolean);
  }
};

export const createDifference = (arr) => {
	const differenceArray: number[] = [];
	for(let i = 0; i < arr.length; i++){
		for (let j = i + 1; j < arr.length; j++){
			differenceArray.push(helpers.circle_wrap(Math.abs(arr[i] - arr[j]), false));
		}
	};
	return differenceArray;
 }


//create function that checks, if a newly created array is different from the arrays already in the list
//the arrays have to differ in at least 2 locations:
export const checkArraySimilarity = function(position_array, n_diff){

    //check, if there is more than 1 item in the array
    //if not, return true
    if(position_array.length < 2){
        console.log("the array only has 1 element");
        return true;
    }

    //if more than 1 item: start the check
    if(position_array.length >= 2){
        
        //iniate required variables
        let existing_position_array;
        let new_position_array;
        let check;
        let intersection;
        

        //compare every existing array to the newly added array
        for(let i = 0; i < (position_array.length-1); i++){
        
            console.log('entering for-loop. i = ' + i);
            
            //define the existing array for this iteration
            existing_position_array = position_array[i];
            
            //define the new array (always the same in each iteration)
            new_position_array = position_array[position_array.length-1];
    
            //compute the intersection.
            //the intersection returns an array which contains all positions which are
            //contained in both arrays
            intersection = existing_position_array.filter(existing_element => new_position_array.includes(existing_element));

            console.log('existing position array: ' + existing_position_array);
            console.log('new position array: ' + new_position_array);
            console.log('intersection: ' + intersection);
            
            //compare the number of items in the intersection array with the number of items in an array
            //if the difference is at least 2, the arrays differ in at least 2 positions.
            //the check is true and ca continue to the next iteration
            if(existing_position_array.length-intersection.length >= n_diff){
                check = true;
                console.log('at least 2 items have different positions');
                continue;
            //if check fails, the loop is broken and the new array will be removed
            } else {
                check = false;
                console.log('die verglichenen Arrays sind zu ähnlich. Breche Loop ab');
                break;
            }
        }
        
        console.log('Loop beendet');
        return check;
    }
};  
