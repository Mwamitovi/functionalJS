const forEach = (array, fn) => {
	// traverses an array	
	for(const value of array)
	   fn(value) 
}

export default forEach

const curry = (binaryFn) => {
	// converts a function with 'two' args into a nested unary()
	return function (firstArg) {
	  return function (secondArg) {
		return binaryFn(firstArg, secondArg);
	  };
	};
  };

const curryN = (fn) => {
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


const match = curryN(function(expr, str) {
	// A curried function that matches given args
	return str.match(expr);
});

const filter = curryN(function(f, ary) {
	// A curried function that filters args
	return ary.filter(f);
});

// find if args have numbers
const hasNumber = match(/[0-9]+/)

// find numbers in an array
const findNumbersInArray = filter(hasNumber)

let map = curryN(function(f, ary) {
	// A curried function that returns transformed array
	return ary.map(f);
});

// A curried function to square all array elements
const squareAll = map((x) => x * x)

// 
const partial = function (fn,...partialArgs){
	// to apply the function args partially
	let args = partialArgs.slice(0);
	return function(...fullArguments) {
	  let arg = 0;
	  for (let i = 0; i < args.length && arg < fullArguments.length; i++) {
		if (args[i] === undefined) {
		  args[i] = fullArguments[arg++];
		  }
		}
		return fn.apply(this, args);
	};
  };
