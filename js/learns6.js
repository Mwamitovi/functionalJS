const forEach = (array, fn) => {
	// traverses an array	
	for(const value of array)
	   fn(value) 
}

export default forEach
import {arrayUtils} from '..js/arrayES6'

/**
 * @see Functor
 * Is a plain object/class that implements the map() function while running
 * over each value in the object to produce a new object.
 */
const Container = function(val){
	// simple function to hold any value passed into it
	this.value = val;
};

// utility method to abstract (saves us) writing the 'new' keyword
// whenever we create a new Container.
Container.of = function(value){
	return new Container(value);
};

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
};

// of() method, a pointer functor, returns instance of object
MayBe.of = function(val) {
	return new MayBe(val);
};

// isNothing() method, returns boolean true/false
MayBe.prototype.isNothing = function() {
	return (this.value === null || this.value === undefined);
};

// map() method, returns 
MayBe.prototype.map = function(fn) {
	return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this.value));
};

/**
 * Real world application of MayBe()
 * Since MayBe() is a type of container() that can hold any values,
 * it can also hold values of type "Array"
 * 
 * Imagine you have written an API to get the top 10 news posts based on types like "top", "latest", "hot"
 */
let getTopPosts = (type) => {
	let response;
	try {
		response = JSON.parse(
			request('GET',"https://www.dailymonitor.co.ug/news/" + type + ".json?limit=10").getBody('utf8')
		)
	} catch(err) {
		response = { message: "Something went wrong", errorCode: err['statusCode']}
	}
	return response;
};

// Using MayBe() to get the Top 10 posts
let getTopTenPosts = (type) => {
	let response = getTopPosts(type);
	return MayBe.of(
		response).map((arr) => arr['data'])
				 .map((arr) => arr['children'])
				 .map((arr) => arrayUtils.map(arr,	// imported, from previous
					(x) => {
						return {
							title: x['data'].title,
							url: x['data'].url
						}
					}
				 ))
				 
};

// We can call our function with a valid daily monitor name like "latest"
getTopTenPosts('latest')


/**
 * @see Either(), a supertype of Some() and Nothing()
 * A functor that helps us preserve our "error message" while branching out
 */
// defining Either()
const Either = {
	Some: Some,
	Nothing: Nothing
};

// declaring the parts of the Either() functor object

// Some()
const Some = function(val) {
	this.value = val;
};

Some.of = function(val) {
	return new Some(val);
};

Some.prototype.map = function(fn){
	return Some.of(fn(this.value));
};

// Nothing()
const Nothing = function(val) {
	this.value = val;
};

Nothing.of = function(val) {
	return new Nothing(val);
};

Some.prototype.map = function(f){
	return this;
};

/**
 * Real world application of Either()
 * 
 * The API example, using Either(), to get the "top", "latest", "hot" news.
 */
let getTopPostsEither = (type) => {
	let response;
	try {
		response = Some.of(JSON.parse(
			request('GET',"https://www.dailymonitor.co.ug/news/" + type + ".json?limit=10").getBody('utf8')
		))
	} catch(err) {
		response = Nothing.of(
			{ message: "Something went wrong", errorCode: err['statusCode'] }
		)
	}
	return response;
}

let getTopTenPostsEither = (type) => {
	let response = getTopPostsEither(type);
	return response.map((arr) => arr['data'])
				   .map((arr) => arr['children'])	
				   .map((arr) => arrayUtils.map(arr,
						(x) => {
							return {
								title: x['data'].title,
								url: x['data'].url
							}
						}
					))	
}

// Calling the Either() functor
getTopTenPostsEither('hot')
