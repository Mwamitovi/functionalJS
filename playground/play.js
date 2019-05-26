import {
    forEach, forEachObject, unless, times, every, some, sortBy, tap, unary, 
    once, memorize, arrayUtils, curry, curryN, partial
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


console.log("Sum of the array",
reduce([1,2,3,4,5], (acc, val) => acc + val, 0))


console.log("Product of the array",
reduce([1,2,3,4,5], (acc, val) => acc * val, 1))


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
