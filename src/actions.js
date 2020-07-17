// src/actions.js
//will contain all of our action creator function
//action creator - just a function that return an object with a property called TYPE
// object that return is called an action
import axios from "./axios";

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

export async function acceptFriendRequest(id) {
    try {
        const { data } = await axios.post(`/accept-friend-request/${id}`);
        // console.log("----data in action acceptfriendrequest----");
        // console.log(data);
        return {
            type: "ACCEPT_FRIEND_REQUEST",
            acceptedUserId: id,
        };
    } catch (err) {
        console.log("ERROR IN action acceptFriendRequest");
    }
}

export async function unfriend(id) {
    try {
        const { data } = await axios.post(`/end-friendship/"${id}`);
        console.log("----data in action unfriend----");
        console.log(data);
        return {
            type: "UNFRIEND",
        };
    } catch (err) {
        console.log("ERROR IN action unfriend", err);
    }
}
