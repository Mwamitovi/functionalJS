const forEach = (array, fn) => {
	// traverses an array	
	for(const value of array)
	   fn(value) 
}

export default forEach

let curry = (fn) => {
	// converts a function with 'n' number of args into a nested unary()
	if(typeof fn!=='function'){
		 throw Error('No function provided');
	}
	return function curriedFn(...args){
		if(args.length < fn.length){
			return function(){
				return curriedFn.apply(
					null, args.concat( [].slice.call(arguments) )
				);
			};
		}
		return fn.apply(null, args);
   };
};


let match = curry(function(expr, str) {
	// A curried function that matches given args
	return str.match(expr);
});

let filter = curry(function(f, ary) {
	// A curried function that filters args
	return ary.filter(f);
});

// find if args have numbers
let hasNumber = match(/[0-9]+/)
// find numbers in an array
let findNumbersInArray = filter(hasNumber)

let map = curry(function(f, ary) {
	// A curried function that returns transformed array
	return ary.map(f);
});