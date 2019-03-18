const forEach = (array, fn) => {
	// traverses an array	
	for(const value of array)
	   fn(value) 
}

export default forEach

const map = (array,fn) => {
	// This is a projecting/transforming function
	// It returns a transformed value of an argument
	let results = []
	for(const value of array)
		results.push(fn(value))
	
	return results;
}

const arrayUtils = {
	map : map
}

export {arrayUtils}
// To use arrayUtils within another file,
// statement - import arrayUtils from 'lib'
// to use map(), just call `arrayUtils.map` 
// or  declare `const map = arrayUtils.map`, then call `map`

const filter = (array,fn) => {
	// returns an array of values that pass a condition
	let results = []
	for(const value of array)
		(fn(value)) ? results.push(value) : undefined
	return results;
}

const concatAll = (array,fn) => {
	// concatenates all nested arrays into a single array
	let results = []
	for(const value of array)
		results.push.apply(results, value);
	return results;
}

const reduce = (array,fn,initialValue) => {
	// implements the power of reducing functions
    let accumulator;
    if(initialValue != undefined)
        accumulator = initialValue;
    else
        accumulator = array[0];

	if(initialValue === undefined)
		// if initialValue is undefined,
		// we start looping the array from the second element, array[1], 
		// because array[0] becomes the initialValue for accumulator
        for(let i=1; i<array.length; i++)
            accumulator = fn(accumulator,array[i])
	else
		// If the initialValue is passed by the caller, 
		// then we start to iterate the full array.
        for(const value of array)
            accumulator = fn(accumulator,value)
    return [accumulator]
}

const zip = (leftArr,rightArr,fn) => {
	// merge two arrays
	let index, results = [];
	for(index = 0; index < Math.min(leftArr.length, rightArr.length); index++)
		results.push(fn(leftArr[index], rightArr[index]));
	return results;
}
