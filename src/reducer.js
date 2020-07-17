// src/reducer.js
// this is one big funtion with a bunch of conditionals = if action = x, change state to this.

export function reducer(state = {}, action) {
    if (action.type == "RECEIVE_FRIENDS_WANNABES") {
        return {
            ...state,
            friendsWannabes: action.friendsWannabes,
        };
    }

    if (action.type == "ACCEPT_FRIEND_REQUEST") {
        return {
            ...state,
            friendsWannabes: state.friendsWannabes.map((user) => {
                if (user.id == action.acceptedUserId) {
                    user.accepted = true;
                }

                return user;
            }),
        };
    }

    if (action.type == "UNFRIEND") {
        return {
            ...state,
        };
    }

    return state;
}

///// 3 useful methods you can use for making copies of objects and arrays
// var obj = {
//     name: "Andrea",
// };
//#1 spread operator (works for obj and array)
// create a clone/copy
// var newObj = {
//     ...obj,
// };
//add properties to the clone
// var newObj = {
//     ...obj,
//     last: "Arias",
// };

// var arr = [1, 2, 3];
// var newArr = [...arr]; // make clone
// var newArr = [...arr, 4]; // add

//#2 map
// works only on arrays -it's a loop! useful for cloning, looping and changing each element in the array.
// syntx example in find friends //

//#3 filter - an array method
// great for removing things from an array
// it's also a loop that creat a copy of the array you're looping on and then removes things from the copie.
