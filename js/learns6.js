const forEach = (array, fn) => {
	// traverses an array	
	for(const value of array)
	   fn(value) 
}

export default forEach

const compose = (a,b) =>
	// Takes output from a function, and then feeds
	// that output as an argument to another function
	// Works with two functions only, from right to left
	(c) => {
		return a(b(c));
	}

// Split words into an array, along the spaces
let splitIntoSpaces = (str) => str.split(" ")

// Returns the total no. of array elements
let count = (array) => array.length

// A composite function that counts
// the number of words in a string
const countWords = compose(count, splitIntoSpaces)

const composeN = (...fns) =>
	// Mutates from the compose() and handles 'n' functions
	// Feeding output as 'argument' to the next function
	(value) => {
		reduce(fns.reverse(), (acc,fn) => fn(acc), value)
	}

// Returns if argument is even(true) or odd(false)
let oddOrEven = (ip) => ip % 2 == 0 ? "even" : "odd"

// Returns 'even' or 'odd' after evaluating total word count
// Using composeN(), evaluates from right -> left
const oddOrEvenWords = composeN(oddOrEven, count, splitIntoSpaces)

const pipe = (...fns) =>
	// Works just like composeN() but with opposite direction
	// data flow is from left to right (sequential)
	(value) => {
		reduce(fns, (acc,fn) => fn(acc), value);
	}

// Returns 'even' or 'odd' after evalutaing total word count
// Using the pipe(), evaluates from left -> right
const oddOrEvenWords2 = pipe(splitIntoSpaces, count, oddOrEven)

const identity = (it) => {
	// prints it's input argument
	// Helpful in debugging compose functions
	console.log(it);
	return it
}

// An example showing the use of identity()
// - compose(oddOrEven, count, identity, splitIntoSpaces)("Test string");
// Here, identity() prints the input argument that the count() receives.
