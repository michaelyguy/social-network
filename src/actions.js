// src/actions.js
//will contain all of our action creator function
//action creator - just a function that return an object with a property called TYPE
// object that return is called an action
import axios from "axios";

export async function receiveFriendsWannabes() {
    try {
        const { data } = await axios.get("/friends-wannabes");
        // console.log("----data in action friends----");
        // console.log(data);
        return {
            type: "RECEIVE_FRIENDS_WANNABES",
            friendsWannabes: data.rows,
        };
    } catch (err) {
        console.log("ERROR IN ACTIONS - /friends-wannabes", err);
    }
}

// export function acceptFriendRequest() {
//     return {
//         type: "ACCEPT_FRIEND_REQUEST",
//     };
// }

// export function unfriend() {
//     return {
//         type: "UNFRIEND",
//     };
// }
