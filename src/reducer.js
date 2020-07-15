// src/reducer.js
// this is one big funtion with a bunch of conditionals = if action = x, change state to this.

export default function reducer(state = {}, action) {
    return state;
}

///// 3 useful methods you can use for making copies of objects and arrays
var obj = {
    name: "Andrea",
};
//#1 spread operator (works for obj and array)
// create a clone/copy
var newObj = {
    ...obj,
};
//add properties to the clone
var newObj = {
    ...obj,
    last: "Arias",
};

var arr = [1, 2, 3];
var newArr = [...arr]; // make clone
var newArr = [...arr, 4]; // add

//#2 map
// works only on arrays -it's a loop! useful for cloning, looping and changing each element in the array.
// syntx example in find friends //

//#3 filter - an array method
// great for removing things from an array
// it's also a loop that creat a copy of the array you're looping on and then removes things from the copie.
