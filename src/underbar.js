(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    return n === undefined ? array[array.length - 1] : array.slice(Math.max(0, array.length - n), array.length);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {

    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      };
    } else {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      };
    };
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var newColl = [];
    for (var i = 0; i <collection.length; i++) {
      if (test(collection[i]) === true) {
        newColl.push(collection[i]);
      }
    };

    return newColl;

  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    var newColl = [];
    for (var i = 0; i <collection.length; i++) {
      if (test(collection[i]) === false) {
        newColl.push(collection[i]);
      }
    };

    return newColl;

  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, iterator) {
    var newArray = [];
    if (isSorted === true) {
      var last = null;
      if (iterator !== undefined) {
        for (var i = 0; i < array.length; i++) {
          if (iterator(array[i]) !== last) {
            newArray.push(array[i]);
            last = iterator(array[i]);
          }
        }
      } else {
        for (var i = 0; i < array.length; i++) {
          if (array[i] !== last) {
            newArray.push(array[i]);
            last = array[i];
          }
        }
      };
    } else {
      var visited = []
      if (iterator !== undefined) {
        for (var i = 0; i < array.length; i++) {
          if (visited.includes(iterator(array[i])) === false) {
            newArray.push(array[i]);
            visited.push(iterator(array[i]));
          }
        }
      } else {
        for (var i = 0; i < array.length; i++) {
          if (visited.includes(array[i]) === false) {
            newArray.push(array[i]);
            visited.push(array[i]);
          }
        }
      };
    }

    return newArray;

  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var result = [];
    for (var i = 0; i < collection.length; i++) {
      result.push(iterator(collection[i]));
    }

    return result;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns an array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    if (accumulator !== undefined) {
      var result = accumulator;
      if (Array.isArray(collection)) {
        for (var i = 0; i < collection.length; i++) {
          result = iterator(result, collection[i]);
        }
      } else {
        for (var key in collection){
          result = iterator(result, collection[key]);
        }
      }

    } else {
      if (Array.isArray(collection)) {
        var result = collection[0];
        for (var i = 1; i < collection.length; i++) {
          result = iterator(result, collection[i]);
        }
      } else {
        var keys = Object.keys(collection);
        var result = collection[keys[0]];
        for (var i = 1; i < keys.length; i++) {
          result = iterator(result, collection[keys[i]]);
        }
      }
    }
    return result;

  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      return item === target || wasFound;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    if (collection.length == 0) {
      return true;
    }
    iterator = iterator || _.identity;
    return _.reduce(collection, function(result, item) {
        return result && !!iterator(item);
    }, true)
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.

    iterator = iterator || _.identity;
    if (collection.length == 0) {
      return false;
    }

    return _.reduce(collection, function(result, item) {
      return result || !!iterator(item);
    }, false)
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    var destination = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        destination[key] = source[key];
      }
    };
    return destination;

  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var destination = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (key in destination) {
          continue;
        } else {
          destination[key] = source[key];
        }
      }
    };
    return destination;

  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {

    var resultObject = {};
    return function() {
      var key = JSON.stringify(arguments);
      if (!(key in resultObject)) {
        resultObject[key] = func.apply(null, arguments);
        //resultObject[key] = func.apply(this, arguments);
      }
      return resultObject[key];
    };

  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {


    var restArg = Array.prototype.slice.call(arguments, 2);
    setTimeout(function(){func.apply(this, restArg)}, wait);

  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var copyArray = array.slice(0);
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * i);
      var temp = copyArray[j];
      copyArray[j] = copyArray[i];
      copyArray[i] = temp;
    }
    return copyArray;
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    if (typeof(functionOrKey) === 'string') {
      return _.map(collection, function(element) {
        return element[functionOrKey].apply(element,args);
        //'apple'.toUpperCase() => 'apple'.toUpperCase.apply('apple') =>
        //'apple'['toUpperCase'].apply('apple') => 'APPLE';
      })
    } else {
      return _.map(collection, function(element) {
        return functionOrKey.apply(element, args);
      })
    }
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    return collection.sort(function(x, y) {
      if (typeof(iterator) === 'string') {
        return x[iterator] - y[iterator];
      } else {
        return iterator(x) - iterator(y);
      }
    })
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var result = [];
    var args = Array.prototype.slice.call(arguments);

    // var maxLength = function(list) {
    //   var length = 0;
    //   for (var l of list) {
    //     if (l.length > length) {
    //       length = l.length;
    //     };
    //   };
    //   return length;
    // }(args);

    var maxLength = Math.max.apply(null, _.map(args, function(element) {
      return element.length;
    }));

    for (var i = 0; i < maxLength; i++) {
      var current = []
      for (var arg of args) {
        current.push(arg[i]);
      };
      result.push(current);
    }
    return result;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    // _.each(nestedArray, function(element) {
    //   if (Array.isArray(element)) {
    //     nestedArray = _.flatten(Array.prototype.concat.apply([], nestedArray));
    //   };
    // });
    // return nestedArray;
    // var result = [];
    // for (var i = 0; i < nestedArray.length; i++) {
    //   if (Array.isArray(nestedArray[i])) {
    //     result.push.apply(result, _.flatten(nestedArray[i]));
    //   } else {
    //     result.push(nestedArray[i]);
    //   }
    // };
    // return result;

    var result = [];
    _.each(nestedArray, function(element) {
      if (Array.isArray(element)) {
        result.push.apply(result, _.flatten(element));
      } else {
        result.push(element);
      }
    });
    return result;

  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var arrays = Array.prototype.slice.call(arguments);
    // return _.filter(arrays[0], function(element) {
    //   return _.reduce(arrays.slice(1), function(result, curArray) {return result && curArray.includes(element)}, true);
    // });
    var sourceArray = arrays[0];
    var remainArrays = arrays.slice(1);
    var result =[]
    for (var i = 0; i < sourceArray.length; i++) {
      var allFound = _.reduce(remainArrays, function(acc, cur){
        return acc && cur.includes(sourceArray[i]);
      }, true);
      if (allFound){
        result.push(sourceArray[i]);
      }
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var arrays = Array.prototype.slice.call(arguments);
    // return _.filter(arrays[0], function(element) {
    //   return _.reduce(arrays.slice(1), function(result, curArray) {return result && !curArray.includes(element)}, true);
    // });

    var sourceArray = arrays[0];
    var remainArrays = arrays.slice(1);
    var result =[]
    for (var i = 0; i < sourceArray.length; i++) {
      var allFound = _.reduce(remainArrays, function(acc, cur){
        return acc || cur.includes(sourceArray[i]);
      }, false);
      if (!allFound){
        result.push(sourceArray[i]);
      }
    }
    return result;
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
    var lastCalled;
    var args = Array.prototype.slice(arguments, 2);
    return function(){
      if (lastCalled == undefined) {
        lastCalled = new Date().getTime();
        return func.apply(this, args);
      } else {
        var elapsed =  new Date().getTime() - lastCalled;
        if (elapsed >= wait) {
          lastCalled = new Date().getTime();
          return func.apply(this, args);
        }
      }
    }
  };
}());
