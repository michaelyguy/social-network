import React, { useEffect } from "react";
import {
    receiveFriendsWannabes,
    acceptFriendRequest,
    unfriend,
} from "./actions";
import { useSelector, useDispatch } from "react-redux";
import Draggable from "react-draggable";

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
        <>
            <Draggable>
                <div className="card-wrapper-friends">
                    <div id="card-header" className="card-header">
                        <div className="card-close">
                            <div className="minimize"></div>
                        </div>{" "}
                        <div className="card-title">My friends</div>
                        <div className="card-move">
                            <img className="move-png" src="move.png" />
                        </div>
                    </div>
                    <div className="card-content">
                        <div className="friends">
                            {friends &&
                                friends.map((friend) => (
                                    <div
                                        className="each-friend"
                                        key={friend.id}
                                    >
                                        <img
                                            className="userpic"
                                            src={friend.imgurl}
                                        />
                                        <p className="user-line">User</p>
                                        <p className="info">
                                            {friend.first} {friend.last}
                                        </p>

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
                    </div>
                </div>
            </Draggable>

            <Draggable>
                <div className="card-wrapper-wannabe">
                    <div id="card-header" className="card-header">
                        <div className="card-close">
                            <div className="minimize"></div>
                        </div>{" "}
                        <div className="card-title">
                            Waiting to become friends
                        </div>
                        <div className="card-move">
                            <img className="move-png" src="move.png" />
                        </div>
                    </div>
                    <div className="card-content">
                        <div className="wannabes">
                            {wannabes &&
                                wannabes.map((wannabe) => (
                                    <div
                                        className="each-friend"
                                        key={wannabe.id}
                                    >
                                        <img
                                            className="userpic"
                                            src={wannabe.imgurl}
                                        />
                                        <p className="user-line">User</p>
                                        <p className="info">
                                            {" "}
                                            {wannabe.first} {wannabe.last}
                                        </p>

                                        <button
                                            onClick={() => {
                                                dispatch(
                                                    acceptFriendRequest(
                                                        wannabe.id
                                                    )
                                                );
                                            }}
                                        >
                                            accept friendship
                                        </button>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </Draggable>
        </>
    );
}
