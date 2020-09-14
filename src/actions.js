// src/actions.js
//will contain all of our action creator function
//action creator - just a function that return an object with a property called TYPE
// object that return is called an action
import axios from "./axios";

export async function receiveFriendsWannabes() {
    try {
        const { data } = await axios.get("/friends-wannabes");
        return {
            type: "RECEIVE_FRIENDS_WANNABES",
            friendsWannabes: data.rows,
        };
    } catch (err) {
        console.log("ERROR IN ACTIONS - /friends-wannabes", err);
    }
}

export async function acceptFriendRequest(id) {
    try {
        const { data } = await axios.post(`/accept-friend-request/${id}`);
        return {
            type: "ACCEPT_FRIEND_REQUEST",
            acceptedUserId: id,
        };
    } catch (err) {
        console.log("ERROR IN ACTION - /acceptFriendRequest: ", err);
    }
}

export async function unfriend(id) {
    try {
        const { data } = await axios.post(`/end-friendship/${id}`);
        return {
            type: "UNFRIEND",
            cancelledUserId: id,
        };
    } catch (err) {
        console.log("ERROR IN ACTION - unfriend: ", err);
    }
}

export async function chatMessages(msgs) {
    try {
        // console.log("this is ourrr msgs in action", msgs);
        return {
            type: "LAST_MSGS",
            chatmsgs: msgs,
        };
    } catch (err) {
        console.log("ERROR IN ACTION - /chatMessages: ", err);
    }
}
