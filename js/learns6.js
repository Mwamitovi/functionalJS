const forEach = (array, fn) => {
	// traverses an array	
   	let i;
	for(i=0; i<array.length; i++)
	   fn(array[i]) 
}

export default forEach

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



