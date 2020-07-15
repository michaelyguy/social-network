// src/actions.js
//will contain all of our action creator function
//action creator - just a function that return an object with a property called TYPE
// object that return is called an action

export function changingState() {
    return {
        type: "CHANGE_STATE",
    };
}
