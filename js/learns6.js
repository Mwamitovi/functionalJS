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

// Returns if the total word count is even or odd
const oddOrEvenWords = composeN(oddOrEven, count, splitIntoSpaces)
