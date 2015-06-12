'use strict';

// LAB 2: SORTING AND CAMPY SCI-FI

// Welcome to Lab 2 =)

// Be sure to read all the comments!

// All of the instructions are inline with the assignment below.
// Look for the word TODO in comments.  Each TODO will have a
// description of what is required.

// To run this file (in the terminal) use: node lab2.js

//*********************************************************
// SETUP
//*********************************************************

// We're going to use this special assert method again to
// test our code
function assert(expression, failureMessage) {
  if (!expression) {
    console.log('assertion failure: ', failureMessage);
  }
}

//*********************************************************
// PROBLEM 1: The Blob. 20 points
//*********************************************************

/* Dowington, PA had 1000 citizens on the night the blob escaped
 its meteorite. At first, the blob could only find and consume
 Pennsylvanians at a rate of 1/hour. However, each time it digested
 someone, it became faster and stronger: adding to its consumption
 rate by 1 person/hour.

    for the...      | starting rate of | persons consumed |
                    |  consumption     |    that hour     |
--------------------|------------------|------------------|
    first hour      |    1/hour        |        1         |
    second hour     |    2/hour        |        2         |
    third hour      |    3/hour        |        3         |
    fourth hour     |    4/hour        |        4         |

 TODO: First, make a constructor function, called Blob, that makes blobs.

 TODO: Next, create an instance of Blob named blob.

 TODO: Then, use a loop to calculate how long it took the blob to finish
 with Dowington.
*/

var people = 1000;

function Blob(people) {
  this.people = people;
  this.eatpeople = function() {
    var i = 0;
    var count = 0;
    while (i < people) {
      count += i;
      if (count >= 1000) {
        break;
      }
      i++;
    }
    return i;
  };
}

var blob = new Blob(people);
console.log('The blob takes ' + blob.eatpeople() + ' hours to eat all of Downington.');

var hoursSpentInDowington; // TODO: assign me the value of the
                           // above calculation (how long it took
                           // the blob to eat Dowington)
hoursSpentInDowington = blob.eatpeople();
// Now, write a method that takes a population for an arbitrary
// town, and the starting consumption rate, and returns the number
// of hours the blob needs to ooze its way through that town.

//function hoursToOoze
Blob.prototype.hoursToOoze = function(population, peoplePerHour) {
  // TODO: implement me based on the instructions above.
  // Be sure to then assign me to the Blob's prototype.
  this.population = population;
  this.peoplePerHour = peoplePerHour;
  var i = 0;
  var count = 0;
  while (i < population) {
    count += i * peoplePerHour;
    if (count >= 1000) {
      break;
    }
    i++;
  }
  return i;
};

assert(blob.hoursToOoze(0, 1) === 0, 'no people means no time needed.');
assert(blob.hoursToOoze(1000, 1) === hoursSpentInDowington,
  'hoursSpentInDowington should match hoursToOoze\'s result for 1000');

// TODO: write three more assertions like the two above, testing out
// the hoursToOoze method.

//*********************************************************
// PROBLEM 2: Universal Translator. 20 points
//*********************************************************

var hello = {
  klingon: 'nuqneH',  // home planet is Qo'noS
  romulan: 'Jolan\'tru', // home planet is Romulus
  'federation standard': 'hello' // home planet is Earth
};

// TODO: define a constructor that creates objects to represent
// sentient beings. They have a home planet, a language that they
// speak, and method (that you'll place on the prototype) called
// sayHello.

function SentientBeing(speak, planet) {
  // TODO: specify a home planet and a language
  // you'll need to add parameters to this constructor
  this.speak = speak;
  this.planet = planet;
}

// sb is a SentientBeing object
SentientBeing.prototype.sayHello = function(sb) {
  // TODO: say hello prints out (console.log's) hello in the
  // language of the speaker, but returns it in the language
  // of the listener (the sb parameter above).
  // use the 'hello' object at the beginning of this exercise
  // to do the translating
  console.log(this.speak);
  console.log(sb);
  return sb.speak;
  //TODO: put this on the SentientBeing prototype
};

// TODO: create three subclasses of SentientBeing, one for each
// species above (Klingon, Human, Romulan).
function Klingon() {}
function Human() {}
function Romulan() {}

Klingon.prototype = new SentientBeing('nuqneH', 'Qo\'noS');
Human.prototype = new SentientBeing('hello', 'Earth');
Romulan.prototype = new SentientBeing('Jolan\'tru', 'Romulus');

var human = new Human();
var klingon = new Klingon();
var romulan = new Romulan();

console.log('HUMAN says:');
human.sayHello(hello.klingon);
human.sayHello(hello.romulan);
console.log('KLINGON says:');
klingon.sayHello(hello['federation standard']);
klingon.sayHello(hello.romulan);
console.log('ROMULAN says:');
romulan.sayHello(hello['federation standard']);
romulan.sayHello(hello.klingon);

assert((new Human()).sayHello(new Klingon()) === 'nuqneH',
  'the klingon should hear nuqneH');
// TODO: write five more assertions, to complete all the possible
// greetings between the three types of sentient beings you created above.
assert((new Human()).sayHello(new Romulan()) === 'Jolan\'tru',
  'the romulan should hear Jolan\'tru');
assert((new Klingon()).sayHello(new Human()) === 'hello',
  'the human should hear hello');
assert((new Klingon()).sayHello(new Romulan()) === 'Jolan\'tru',
  'the romulan should hear Jolan\'tru');
assert((new Romulan()).sayHello(new Klingon()) === 'nuqneH',
  'the klingon should hear nuqneH');
assert((new Romulan()).sayHello(new Human()) === 'hello',
  'the human should hear hello');

//*********************************************************
// PROBLEM 3: Sorting. 20 points.
//
// Implement the following functions. Write at least 2
// assertions for each one (the assertions are how you
// will test your code)
//*********************************************************
var rKelly = ['i', 'believe', 'fly', 'can'];
var hallOats = ['she\'s', 'a', 'man', 'eater'];

function lastLetterSort(stringArray) {

  function byLastLetter(a, b) {
    return a.charAt(a.length - 1) > b.charAt(b.length - 1);
    //TODO: implement me. sort the strings in alphabetical
    // order using their last letter
    // Read this about how the sort function works:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    // this byLastLetter function is a 'compare function'
    // And check out the 'comparing strings' section  here:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
  }
  return stringArray.sort(byLastLetter);
}

var nums = [7, 5, 8];
var numsTest = [9, 9, 30];

function sumArray(numberArray) {
  var sum = 0;
  // TODO: implement me using forEach
  numberArray.forEach(function(value) {
    sum += value;
  });
  return sum;
}

var sumArr = [[1, 2, 2], [3, 6], [100, 1]];
var sumArrTest = [[5, 4, 2], [1, 9, 43], [67, 2], [5, 11, 13]];

function sumSort(arrayOfArrays) {
  arrayOfArrays.sort(function(item1, item2) {
    // TODO: implement me using sumArray
    //  order the arrays based on the sum of the numbers
    //  inside each array
    return sumArray(item2) - sumArray(item1);
  });
  return arrayOfArrays;
}

console.log('SORT STRING BY LAST LETTER: ' + lastLetterSort(rKelly));
lastLetterSort(rKelly);
console.log('SORT STRING BY LAST LETTER TEST: ' + lastLetterSort(hallOats));

console.log('SUMARRAY FOREACH: ' + sumArray(nums));
sumArray(nums);
console.log('SUMARRAY FOREACH: ' + sumArray(nums));

console.log('SUMSORT PROBLEM: ' + sumSort(sumArr));
sumSort(sumArr);
console.log('SUMSORT PROBLEM TEST: ' + sumSort(sumArrTest));

assert(lastLetterSort(rKelly).toString() === 'believe,i,can,fly',
  'your string should print: believe,i,can,fly');
assert(lastLetterSort(rKelly).toString() !== 'fly,i,can,believe',
  'your string should NOT print: fly,i,can,believe and should print: believe,i,can,fly');
assert(lastLetterSort(hallOats).toString() === 'a,man,eater,she\'s',
  'your string should print: a,man,eater,she\'s');

assert(sumArray(nums) === 20, 'nums should equal 20');
assert(sumArray(numsTest) === 48, 'numsTest should equal 48');

assert(sumSort(sumArr).toString() === '100,1,3,6,1,2,2', 'sumArr = 100,1,3,6,1,2,2');
assert(sumSort(sumArrTest).toString() === '67,2,1,9,43,5,11,13,5,4,2', 'sumArrTest = 67,2,1,9,43,5,11,13,5,4,2');

//*********************************************************
// PROBLEM 4: Cleanup: 10 points
// Makes sure this file passes jshint and jscs
//
// ./node_modules/.bin/grunt jshint
// ./node_modules/.bin/grunt jscs
//*********************************************************
