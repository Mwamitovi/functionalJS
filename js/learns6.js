const forEach = (array, fn) => {
	// traverses an array	
   	let i;
	for(i=0; i<array.length; i++)
	   fn(array[i]) 
}

export default forEach


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

const memoize = (fn) => {
	// for functions that take up one argument
	// to keep remembering their outputs
	const lookupTable = {};
	return (arg) => lookupTable[arg] || (lookupTable[arg] = fn(arg));
}
