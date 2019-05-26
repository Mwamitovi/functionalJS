import {
    forEach, forEachObject, unless, times, every, some, sortBy, tap, unary, 
    once, memorize, arrayUtils, curry, curryN, partial, composeN, pipe,
    Container, Some, Nothing
} from '../js/learns6'

var array = [1,2,3]
//print the console
forEach(array, (data) => console.log(data))
//double the contents
forEach(array, (data) => console.log(2 * data))


let object = {a:1, b:2}
//Print the object key and value
forEachObject(object, (k,v) => console.log(k + ":" + v))

//finding even number of the given array
forEach([1,2,3,4,5,6,7], (number) => {
	unless((number % 2), () => {
		console.log(number, " is even")
	})
})

//finding the first 100 even numbers
times(100, function(n) {
  unless(n % 2, function() {
    console.log(n, "is even");
  });
});

console.log(every([NaN, NaN, NaN], isNaN))
console.log(every([NaN, NaN, 1], isNaN))

console.log(some([NaN,NaN, 4], isNaN))
console.log(some([3,4, 4], isNaN))


var people = [
    {firstname: "aaFirstName", lastname: "cclastName"},
    {firstname: "ccFirstName", lastname: "aalastName"},
    {firstname: "bbFirstName", lastname: "bblastName"}
];

//sorting with respect to firstname
console.log("FirstName sort manually", people.sort((a,b) => { return (a.firstname < b.firstname) ? -1 : (a.firstname > b.firstname) ? 1 : 0 }))

//sorting with respect to lastname
console.log("LastName sort manually", people.sort((a,b) => { return (a.lastname < b.lastname) ? -1 : (a.lastname > b.lastname) ? 1 : 0 }))

//sorting with respect to firstname using sortBy
console.log("Firstname using sortBy hoc", people.sort(sortBy("firstname")))

//sorting with respect to firstname using sortBy
console.log("lastName using sortBy hoc", people.sort(sortBy("lastname")))


forEach([1,2,3],(a) => 
   tap(a)(() => 
     { 
       console.log(a) 
     }
   )
)

//parseInt doesnt work in node
//http://stackoverflow.com/questions/16880327/why-am-i-getting-weird-result-using-parseint-in-node-js-different-result-from
//['1', '2', '3'].map(unary(parseInt))

var doPayment = once(() => {
   console.log("Payment is done")
})

//this should work
doPayment()

//oops bad, we are doing second time!
doPayment()

//slow factorial
var factorial = (n) => {
  if (n === 0) { return 1; }  
  // This is it! Recursion!!
  return n * factorial(n - 1);
}

console.log("Factorial of 2 is",factorial(2))
console.log("Factorial of 3 is",factorial(3))

//memoize factorial
let fastFactorial = memorize((n) => {
  if (n === 0) { return 1; }  
  // This is it! Recursion!!
  return n * fastFactorial(n - 1);
})

console.log("Fast Factorial of 2 is",fastFactorial(2))
console.log("Fast Factorial of 3 is",fastFactorial(3))
console.log("Fast Factorial of 7 is",fastFactorial(7))


const map = arrayUtils.map;
const filter = arrayUtils.filter;
const concatAll = arrayUtils.concatAll;
const reduce = arrayUtils.reduce;
const zip = arrayUtils.zip;


let squaredArray = map([1,2,3], (x) => x * x)
console.log(squaredArray)


// data structure
let bugandaBooks = [
    {
        "id": 11,
        "title": "Omusomi",
        "author": "Mukasa Kaggwa",
        "rating": [3.0],
        "reviews": [{good : 4 , excellent : 12}]
    },
    {
        "id": 22,
        "title": "Amaka",
        "author": "Ssekigozi Mulongo",
        "rating": [4.5],
        "reviews": []
    },
    {
        "id": 33,
        "title": "Ensi ne byayo",
        "author": "Kivumbi Gonzaga",
        "rating": [4.0],
        "reviews": []
    },
    {
        "id": 44,
        "title": "Ebyafayo bya Uganda",
        "author": "Mulumba Omusomesa",
        "rating": [4.2],
        "reviews": [{good : 14 , excellent : 12}]
    }
];


//get only title and author fields
let resultOfTitleName = map(bugandaBooks, (book) => {
    return {title: book.title, author:book.author}
})

console.log(resultOfTitleName)


//get only book with above rating 4.5s
let filteredArray = filter(bugandaBooks, (book) => book.rating[0] > 4.5)

console.log(filteredArray)


//get title and author whose rating is above 4.5
let goodRatingBooks = filter(bugandaBooks, (book) => book.rating[0] > 4.5)

console.log("Good Rated books", map(goodRatingBooks, (book) => {
    return {title: book.title, author:book.author}
}))

console.log("Query result", map(filter(bugandaBooks, (book) => book.rating[0] > 4.5), (book) => {
    return {title: book.title, author:book.author}
}))


//util functions
let filterOutStandingBooks = (book) => book.rating[0] === 5;
let filterGoodBooks = (book) =>  book.rating[0] > 4.5;
let filterBadBooks = (book) => book.rating[0] < 3.5;

let projectTitleAndAuthor = (book) => { return {title: book.title, author: book.author} }
let projectAuthor = (book) => { return {author: book.author}  }
let projectTitle = (book) => { return {title: book.title} }

//compose new function. 
let queryGoodBooks = partial(filter, undefined, filterGoodBooks);
let mapTitleAndAuthor = partial(map, undefined, projectTitleAndAuthor)

let titleAndAuthorForGoodBooks = compose(mapTitleAndAuthor, queryGoodBooks)

console.log("Good book title and author via compose", titleAndAuthorForGoodBooks(bugandaBooks))

//compose other new functions
let mapTitle = partial(map, undefined, projectTitle)
let titleForGoodBooks = compose(mapTitle, queryGoodBooks)

console.log("Good book title", titleForGoodBooks(bugandaBooks))


// modified data structure with more details
let bugandaBooks2 = [
    {
        name: "beginners",
        bookDetails: [
            {
                "id": 11,
                "title": "Omusomi",
                "author": "Mukasa Kaggwa",
                "rating": [3.0],
                "reviews": [{good : 4 , excellent : 12}]
            },
            {
                "id": 22,
                "title": "Amaka",
                "author": "Ssekigozi Mulongo",
                "rating": [4.5],
                "reviews": []
            }
        ]
    },
    {
        name: "advanced",
        bookDetails: [
            {
                "id": 33,
                "title": "Ensi ne byayo",
                "author": "Kivumbi Gonzaga",
                "rating": [4.0],
                "reviews": []
            },
            {
                "id": 44,
                "title": "Ebyafayo bya Uganda",
                "author": "Mulumba Omusomesa",
                "rating": [4.2],
                "reviews": [{good : 14 , excellent : 12}]
            }
        ]
    }
];


console.log('Mapped new data structure',
map(bugandaBooks2, (book) => {
    return book.bookDetails
}))


console.log('Flattend Array',
concatAll(
    map(bugandaBooks2, (book) => {
        return book.bookDetails
    })
))


//result of our problem
let goodRatingCriteria = (book) => book.rating[0] > 4.5;

console.log("Result using map, filter, concatAll",
    filter(
        concatAll(
            map(apressBooks2, (book) => {
                return book.bookDetails
            })
        ), goodRatingCriteria)
)


console.log("Sum of the array", reduce([1,2,3,4,5], (acc, val) => acc + val, 0))

console.log("Product of the array", reduce([1,2,3,4,5], (acc, val) => acc * val, 1))


let bookDetails = concatAll(
    map(bugandaBooks2, (book) => {
        return book.bookDetails
    })
)

let resultOfCountReviews = reduce(bookDetails, (acc, bookData) => {
    let goodReviews = bookData.reviews[0] != undefined ? bookData.reviews[0].good : 0
    let excellentReviews = bookData.reviews[0] != undefined ? bookData.reviews[0].excellent : 0
    return {good: acc.good + goodReviews, excellent : acc.excellent + excellentReviews}
}, {good:0, excellent:0})

console.log("Good and Excellent count",resultOfCountReviews)

console.log("Addition of two arrays using zip", zip([1,2,3], [4,5,6], (x,y) => x+y))

// Split data structure with separate array
let bugandaBooks3 = [
    {
        name: "beginners",
        bookDetails: [
            {
                "id": 11,
                "title": "Omusomi",
                "author": "Mukasa Kaggwa",
                "rating": [3.0],
                // no review
            },
            {
                "id": 22,
                "title": "Amaka",
                "author": "Ssekigozi Mulongo",
                "rating": [4.5],
                "reviews": []
            }
        ]
    },
    {
        name: "advanced",
        bookDetails: [
            {
                "id": 33,
                "title": "Ensi ne byayo",
                "author": "Kivumbi Gonzaga",
                "rating": [4.0],
                "reviews": []
            },
            {
                "id": 44,
                "title": "Ebyafayo bya Uganda",
                "author": "Mulumba Omusomesa",
                "rating": [4.2],
                // no review
            }
        ]
    }
];

// data structure contains separate "Review" details
let reviewDetails = [
    {
        "id": 111,
        "reviews": [{good : 4 , excellent : 12}]
    },
    {
        "id" : 222,
        "reviews" : []
    },
    {
        "id" : 333,
        "reviews" : []
    },
    {
        "id" : 444,
        "reviews": [{good : 14 , excellent : 12}]
    }
]


let bookDetails3 = concatAll(
    map(bugandaBooks3, (book) => {
        return book.bookDetails
    })
)


let mergedBookDetails = zip(bookDetails3, reviewDetails, (book, review) => {
    if(book.id === review.id) {
        let clone = Object.assign({}, book)
        clone.ratings = review
        return clone
    }
})

console.log("Merged details", mergedBookDetails)


const add = (x,y) => x + y;

let autoCurriedAdd = curry(add)

console.log("Curried summation", autoCurriedAdd(2)(2))

const genericTable = (x,y) => x * y

const tableOf2 = curry(genericTable)(2)
const tableOf3 = curry(genericTable)(3)
const tableOf4 = curry(genericTable)(4)

console.log("Table via currying")
console.log("2 * 2 =", tableOf2(2))
console.log("2 * 3 =", tableOf2(3))
console.log("2 * 4 =", tableOf2(4))

console.log("3 * 2 =", tableOf3(2))
console.log("3 * 3 =", tableOf3(3))
console.log("3 * 4 =", tableOf3(4))

console.log("4 * 2 =", tableOf4(2))
console.log("4 * 3 =", tableOf4(3))
console.log("4 * 4 =", tableOf4(4))


/**
 * There is no console.log in node world :)
 * So you can run the code by copying paste in browser!
 * 
 * const loggerHelper = (mode,initialMessage,errorMessage,lineNo) => {
 *    if(mode === "DEBUG") console.debug(initialMessage,errorMessage + "at line: " + lineNo)
 *    else if(mode === "ERROR") console.error(initialMessage,errorMessage + "at line: " + lineNo)
 *    else if(mode === "WARN") console.warn(initialMessage,errorMessage + "at line: " + lineNo)
 *    else  throw "Wrong mode"
 * }
 * 
 * let errorLogger = curryN(loggerHelper)("ERROR")("Error At Stats.js");
 * let debugLogger = curryN(loggerHelper)("DEBUG")("Debug At Stats.js");
 * let warnLogger = curryN(loggerHelper)("WARN")("Warn At Stats.js");
 * 
 * //for error
 * errorLogger("Error message",21)
 * 
 * //for debug
 * debugLogger("Debug message",233)
 * 
 * //for warn
 * warnLogger("Warn message",34)
 * 
 */

const match = curryN(function(expr, str) {
	// A curried function that matches given args
	return str.match(expr);
});

// find if args have numbers
const hasNumber = match(/[0-9]+/)

const filter = curryN(function(f, ary) {
	// A curried function that filters args
	return ary.filter(f);
});

// find numbers in an array
const findNumbersInArray = filter(hasNumber)

console.log("Finding numbers via curry", findNumbersInArray(["js", "number1"]))

let map = curry(function(f, ary) {
	// A curried function that returns transformed array
	return ary.map(f);
});

// A curried function to square all array elements
let squareAll = map((x) => x * x)

console.log("Squaring the array with currying", squareAll([1,2,3]))


setTimeout(() => console.log("Print after 10 ms."), 10);

const setTimeoutWrapper = (time, fn) => {
    setTimeout(fn, time);
}

//using curring
const delayTenMs = curryN(setTimeoutWrapper)(10)
delayTenMs(() => console.log("Do X task"))
delayTenMs(() => console.log("Do Y task"))

//using partial application
let delayTenMsPartial = partial(setTimeout, undefined, 10);
delayTenMsPartial(() => console.log("Do X. . .  task"))
delayTenMsPartial(() => console.log("Do Y . . . . task"))

let prettyPrintJson = partial(JSON.stringify, undefined, null, 2)
console.log("JSON pretty print via partial", prettyPrintJson({foo: "bar", bar: "foo"}))


const compose = (a, b) =>
	// Takes output from a function, and then feeds
	// that output as an argument to another function
	// Works with two functions only, from right to left
    (c) => { 
        return a(b(c)); 
    }

// round-off
let number = compose(Math.round, parseFloat)

console.log("Number is ", number("3.56"))

// Split words into an array, along the spaces
let splitIntoSpaces = (str) => str.split(" ")

// Returns the total no. of array elements
let count = (array) => array.length

// A composite function that counts
// the number of words in a string
const countWords = compose(count, splitIntoSpaces);

console.log("Counting words for", countWords("hello your reading about composition"));


// Returns if argument is even(true) or odd(false)
let oddOrEven = (ip) => ip % 2 == 0 ? "even" : "odd"

// Returns 'even' or 'odd' after evaluating total word count
// Using composeN(), evaluates from right -> left
const oddOrEvenWords = composeN(oddOrEven, count, splitIntoSpaces)

console.log("Even or odd via compose ?", oddOrEvenWords("hello your reading about composition"))

//using pipes as data flow
// Returns 'even' or 'odd' after evalutaing total word count
// Using the pipe(), evaluates from left -> right
oddOrEvenWords = pipe(splitIntoSpaces, count, oddOrEven);
console.log("Even or odd via pipe ?", oddOrEvenWords("hello your reading about composition"))

let associativeCheckL = composeN(composeN(oddOrEven, count), splitIntoSpaces)
console.log("Associative check L", associativeCheckL("hello your reading about composition"))

let associativeCheckR = composeN(oddOrEven, composeN(count, splitIntoSpaces))
console.log("Associative check R", associativeCheckR("hello your reading about composition"))


const identity = (it) => {
	// prints it's input argument
	// Helpful in debugging compose functions
	console.log(it);
	return it
}

console.log("Debugging", compose(oddOrEven, count, identity, splitIntoSpaces)("Test string"))


var request = require('sync-request');


//using bare new keyword
console.log("Container using bare new keyword")
let testValue = new Container(3)
console.log("Value inside container",testValue)

let testObj = new Container({a:1})
console.log("Object inside container",testObj)

let testArray = new Container([1,2])
console.log("Array inside container",testArray)


//using `of` method
console.log("\n\nContainer using `of` util method")
testValue = Container.of(3)
console.log("Value inside container",testValue)

testObj = Container.of({a:1})
console.log("Object inside container",testObj)

testArray = Container.of([1,2])
console.log("Array inside container",testArray)

console.log("Nested conatiner",Container.of(Container.of(3)))


let double = (x) => x + x;
console.log("Double container",Container.of(3).map(double));

console.log("May Be Example", MayBe.of("string").map((x) => x.toUpperCase()))
console.log("May Be null example", MayBe.of(null).map((x) => x.toUpperCase()))
console.log("MayBe chaining", MayBe.of("George")
     .map((x) => x.toUpperCase())
     .map((x) => "Mr. " + x))

console.log("MayBe chaining null",
    MayBe.of("George")
     .map(() => undefined)
     .map((x) => "Mr. " + x))


/**
 * Real world application of MayBe()
 * Since MayBe() is a type of container() that can hold any values,
 * it can also hold values of type "Array"
 * 
 * Imagine you have written an API to get the top 10 news posts based on types like "top", "latest", "hot"
 */
let getTopTenPosts = (type) => {
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
let getTopTenPostsData = (type) => {
	let response = getTopTenPosts(type);
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
console.log("Proper 'daily-monitor' type", getTopTenPostsData('latest'))
console.log("Wrong 'daily-monitor' type", getTopTenPostsData('late'))

console.log("\nEither example\n")
console.log("Something example", Some.of("test").map((x) => x.toUpperCase()))
console.log("Nothing example", Nothing.of("test").map((x) => x.toUpperCase()))


/**
 * Real world application of Either (Some or Nothing)
 * 
 * The API example, using Either, to get the "top", "latest", "hot" news.
 */
let getTopTenPostsEither = (type) => {
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

let getTopTenPostsDataEither = (type) => {
	let response = getTopTenPostsEither(type);
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

// Calling the Either (Some or Nothing) functor
console.log("Correct 'daily-monitor' type ",getTopTenPostsDataEither('hot'))
console.log("Wrong 'daily-monitor' type ",getTopTenPoststDataEither('new2'))


let searchMonitor = (search) => {
    let response  
    try{
       response = JSON.parse(request('GET',"https://www.dailymonitor.co.ug/search.json?q=" + encodeURI(search) + "&limit=2").getBody('utf8'))
    }catch(err) {
        response = { message: "Something went wrong" , errorCode: err['statusCode'] }
    }
    return response
}

let getComments = (link) => {
    let response
    try {
        console.log("https://www.dailymonitor.co.ug/" + link)
        response = JSON.parse(request('GET',"https://www.dailymonitor.co.ug/" + link).getBody('utf8'))
    } catch(err) {
        console.log(err)
        response = { message: "Something went wrong" , errorCode: err['statusCode'] }
    }

    return response 
}

let mergeTitleAndComments = (searchMayBe, commentsMayBe) => {
    searchMayBe.map((value) => {
        commentsMayBe.map((commentsValue) => {
            console.log(value)
            console.log(commentsValue)
        })
    })
}

let mergeViaMayBe = (searchText) => {
    let monitorMayBe = MayBe.of(searchMonitor(searchText))
    let ans = monitorMayBe
               .map((arr) => arr['data'])
               .map((arr) => arr['children'])
               .map((arr) => arrayUtils.map(arr,(x) => {
                        return {
                            title : x['data'].title,
                            permalink : x['data'].permalink
                        }
                    } 
                ))
               .map((obj) => arrayUtils.map(obj, (x) => {
                    return {
                        title: x.title,
                       comments: MayBe.of(getComments(x.permalink.replace("?ref=search_posts",".json")))
                    }
               }))
   return ans;
}


let mergeViaJoin = (searchText) => {
    let monitorMayBe = MayBe.of(searchMonitor(searchText))
    let ans = monitorMayBe.map((arr) => arr['data'])
               .map((arr) => arr['children'])
               .map((arr) => arrayUtils.map(arr,(x) => {
                        return {
                            title : x['data'].title,
                            permalink : x['data'].permalink
                        }
                    } 
                ))
               .map((obj) => arrayUtils.map(obj, (x) => {
                    return {
                        title: x.title,
                       comments: MayBe.of(getComments(x.permalink.replace("?ref=search_posts",".json"))).join()
                    }
               }))
               .join()
   return ans;
}

let answer;
answer = mergeViaMayBe("functional programming")

console.log(answer)

// Via MayBe functor 
/* See how deep we map to get the answers
*/
answer.map((result) => {
    arrayUtils.map(result, (mergeResults) => {
        mergeResults.comments.map(comment => {
            console.log(comment)
        })
    }) 
})


//simple examples of join
let joinExample = MayBe.of(MayBe.of(5))
console.log("Without Join Example", joinExample.map((outsideMayBe) => {
    return outsideMayBe.map((x) => x + 4)
}))

console.log("Join Example", joinExample.join().map((v) => v + 4))


//trying our old problem with join
answer = mergeViaJoin("functional programming")

console.log(answer)

arrayUtils.map(answer,a => {
    console.log(a.comments)
})


let mergeViaChain = (searchText) => {
    let monitorMayBe = MayBe.of(searchMonitor(searchText))
    let ans = monitorMayBe.map((arr) => arr['data'])
               .map((arr) => arr['children'])
               .map((arr) => arrayUtils.map(arr,(x) => {
                        return {
                            title : x['data'].title,
                            permalink : x['data'].permalink
                        }
                    } 
                ))
               .chain((obj) => arrayUtils.map(obj, (x) => {
                    return {
                       title: x.title,
                       comments: MayBe.of(getComments(x.permalink.replace("?ref=search_posts",".json"))).chain(x => {
                            return x.length
                       })
                    }
               }))

   return ans;
}

//trying our old problem with chain
answer = mergeViaChain("functional programming")

console.log(answer)


let https = require('https');


function* gen() {
    return 'first generator';
}


let generatorResult = gen()

console.log("For first time", generatorResult.next().value)
console.log("For second time time", generatorResult.next().value)


let generatorResult2 = gen()
generatorResult = gen() //re-create again

console.log("First generator", generatorResult.next().value)
console.log("Second generator", generatorResult2.next().value)


function* generatorSequence() {
    yield 'first';
    yield 'second';
    yield 'third';
}

let generatorSequenceResult = generatorSequence();

console.log("\n\n\n")
console.log('First time sequence value', generatorSequenceResult.next().value)
console.log('Second time sequence value', generatorSequenceResult.next().value)
console.log('thrid time sequence value', generatorSequenceResult.next().value)

generatorSequenceResult = generatorSequence();

console.log("\n\n")
console.log('done value for the first time', generatorSequenceResult.next())
console.log('done value for the second time', generatorSequenceResult.next())
console.log('done value for the third time', generatorSequenceResult.next())
console.log('done value for the fourth time', generatorSequenceResult.next())


console.log("\n\n")
for(let value of generatorSequence())
    console.log("for of value of generatorSequence is", value)


//passing data to generators
function* sayFullName() {
    var firstName = yield 
    var secondName = yield
    console.log(firstName + secondName);
}

let fullName = sayFullName()
fullName.next()
fullName.next('anto')
fullName.next('aravinth')

let getDataOne = (cb) => {
    setTimeout(function(){
        //calling the callback
        cb('dummy data one')
    }, 1000);
}

let getDataTwo = (cb) => {
    setTimeout(function(){
        //calling the callback
        cb('dummy data two')
    }, 1000);
}


getDataOne((data) => console.log("data received", data))
getDataTwo((data) => console.log("data received", data))

//using generator
let generator;
getDataOne = () => {
    setTimeout(function(){
        //call the generator and
        //pass data via `next`
        generator.next('dummy data one')
    }, 1000);
}

getDataTwo = () => {
    setTimeout(function(){
        //call the generator and
        //pass data via `next`
        generator.next('dummy data two')
    }, 1000);
}


function* main() {
    let dataOne = yield getDataOne();
    let dataTwo = yield getDataTwo();
    console.log("data one", dataOne)
    console.log("data two", dataTwo)
}

generator = main()
generator.next()


function httpGetAsync(url, callback) {
    return https.get(url, 
        function(response) {
            var body = '';
            response.on('data', function(d) {
                body += d;
            });
            response.on('end', function() {
                let parsed = JSON.parse(body)
                callback(parsed)
            })
        }
    );

}

httpGetAsync('https://www.reddit.com/r/pics/.json', (picJson)=> {
    httpGetAsync(picJson.data.children[0].data.url + ".json", (firstPicRedditData) => {
        console.log(firstPicRedditData)
    })
})


function request(url) {
    httpGetAsync( url, function(response){
        generator.next( response );
    } );
}

function* main1() {
    let picturesJson = yield request( "https://www.reddit.com/r/pics/.json" );
    let firstPictureData = yield request(picturesJson.data.children[0].data.url+ ".json")
    console.log(firstPictureData)
}

generator = main1()
generator.next()
