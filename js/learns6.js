const forEach = (array, fn) => {
	// traverses an array	
   	let i;
	for(i=0; i<array.length; i++)
	   fn(array[i]) 
}

const forEachObject = (obj,fn) => {
	// traverses object using an algorithm
	for(var property in obj) {
    	if(obj.hasOwnProperty(property)) {
        	// calls the fn with key and value as its argument
        	fn(property, obj[property])
    	}
	}
}

const times = (times, fn) => {
	// takes a number and calls the passed function 
	// as many times as the caller stated
	for (var i = 0; i < times; i++)
        fn(i);
}

/*
ES5 implementation
const every = (arr,fn) => {
    let result = true;
    for(let i=0;i<arr.length;i++)
       result = result && fn(arr[i])
    return result
}
*/

const every = (arr, fn) => {
	// checks if all array elements 
	// evaluate to true by the passed function
	let result = true;
	for(const value of arr)
		// ES6 'for-of' loop iterates array elements
		// It abstracts the traversing of the array
		result = result && fn(value)
	return result
}

const some = (arr,fn) => {
	// the opposite of the every function
	// checks if 'any' of the array elements 
	// evaluates to true by the passed function	
	let result = false;
	for(const value of arr)
		result = result || fn(value)
	return result
}

const sortBy = (property) => {
	// sorts an array of objects based on a property
	return (a,b) => {
		var result = (a[property] < b[property]) ? -1 :
			(a[property] > b[property]) ? 1 : 0;
		return result;
	}
}

const tap = (value) => {
	// takes a value and returns a function having a closure over value
    (fn) => (
		// execute these two arguments, and return the second expression
		typeof(fn) === 'function' && fn(value), console.log(value)
	)
}

const unary = (fn) => {
	// takes a function with n arguments
	// and converts into a single argument
	fn.length === 1 
		? fn 
		: (arg) => fn(arg)
	
}

const once = (fn) => {
	// takes an argument fn, and returns the result of it
	// by calling it with the apply method
	let done = false;
	return function () {
		return done ? undefined : ((done = true), fn.apply(this, arguments))
	}
}

const memorize = (fn) => {
	// for functions that take up one argument
	// to keep remembering their outputs
	const lookupTable = {};
	return (arg) => lookupTable[arg] || (lookupTable[arg] = fn(arg));
}

const map = (array,fn) => {
	// This is a projecting/transforming function
	// It returns a transformed value of an argument
	let results = []
	for(const value of array)
		results.push(fn(value))	
	return results;
}

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

const arrayUtils = {
	// To use arrayUtils within another file,
	// statement - import arrayUtils from 'lib'
	// to use map(), just call `arrayUtils.map` 
	// or  declare `const map = arrayUtils.map`, then call `map`	
	map : map,
	filter : filter,
	concatAll : concatAll,
	flatten : concatAll,
	reduce : reduce,
	zip : zip

}

export {forEach, forEachObject, unless, times, every, some, sortBy, tap, unary, once, memorize, arrayUtils }
