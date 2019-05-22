const forEach = (array, fn) => {
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

const unless = (predict,fn) => {
	// takes a prediction, and if false, calls the fn
    if(!predict)
    	fn()
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

export {forEach, forEachObject, unless, times, every, some, sortBy}