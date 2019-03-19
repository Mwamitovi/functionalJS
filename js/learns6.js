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
