const forEach = (array, fn) => {
	// traverses an array	
	for(const value of array)
	   fn(value) 
}

export default forEach

/**
 * @see Functor
 * Is a plain object/class that implements the map() function while running
 * over each value in the object to produce a new object.
 */
const Container = function(val){
	// simple function to hold any value passed into it
	this.value = val;
}

// utility method to abstract (saves us) writing the 'new' keyword
// whenever we create a new Container.
Container.of = function(value){
	return new Container(value);
}

// method allows us to call any function 
// on the value being held within the Container
Container.prototype.map = function(fn){
	return Container.of(fn(this.value));
};


/**
 * @see MayBe()
 * A functor that allows us to handle errors in our code in a more functional way.
 */
// declaring the functor object
const MayBe = function(val) {
	this.value = val;
}

// of() method, a pointer functor, returns instance of object
MayBe.of = function(val) {
	return new MayBe(val);
}

// isNothing() method, returns boolean true/false
MayBe.prototype.isNothing = function() {
	return (this.value === null || this.value === undefined);
};

// map() method, returns 
MayBe.prototype.map = function(fn) {
	return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this.value));
};

