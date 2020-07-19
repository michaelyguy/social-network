import React, { useEffect } from "react";
import {
    receiveFriendsWannabes,
    acceptFriendRequest,
    unfriend,
} from "./actions";
import { useSelector, useDispatch } from "react-redux";

export default function Friends() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(receiveFriendsWannabes());
    }, []);

    const friends = useSelector(
        (state) =>
            state.friendsWannabes &&
            state.friendsWannabes.filter((friend) => {
                return friend.accepted == true;
            })
    );
    // console.log("----friends----");
    // console.log(friends);

    const wannabes = useSelector((state) => {
        console.log("----state----");
        console.log(state);
        return (
            state.friendsWannabes &&
            state.friendsWannabes.filter((wannabe) => {
                return wannabe.accepted == false;
            })
        );
    });

    return (
        <div className="friends-container">
            <h2>Friends</h2>
            <div className="friends">
                {friends &&
                    friends.map((friend) => (
                        <div className="each-friend" key={friend.id}>
                            <img className="userpic" src={friend.imgurl} />
                            <h3>
                                {friend.first} {friend.last}
                            </h3>
                            <button
                                onClick={() => {
                                    dispatch(unfriend(friend.id));
                                }}
                            >
                                cancel friendship
                            </button>
                        </div>
                    ))}
            </div>

            <h2>Waiting to become friends</h2>
            <div className="wannabes">
                {wannabes &&
                    wannabes.map((wannabe) => (
                        <div className="each-friend" key={wannabe.id}>
                            <img className="userpic" src={wannabe.imgurl} />
                            <h3>
                                {wannabe.first} {wannabe.last}
                            </h3>
                            <button
                                onClick={() => {
                                    dispatch(acceptFriendRequest(wannabe.id));
                                }}
                            >
                                accept friendship
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    );
}
