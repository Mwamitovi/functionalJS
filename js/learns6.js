const forEach = (array, fn) => {
   let i;
   for(i=0; i<array.length; i++)
        fn(array[i]) 
}

export default forEach

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