import React, { useEffect } from "react";
import { receiveFriendsWannabes, acceptFriendRequest } from "./actions";
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
        <div>
            <h3>Friends</h3>

            {friends &&
                friends.map((friend) => (
                    <div key={friend.id}>
                        <img className="userpic" src={friend.imgurl} />
                        <h2>
                            {friend.first} {friend.last}
                        </h2>
                    </div>
                ))}

            <h3>Waiting to become friends</h3>

            {wannabes &&
                wannabes.map((wannabe) => (
                    <div key={wannabe.id}>
                        <img className="userpic" src={wannabe.imgurl} />
                        <h2>
                            {wannabe.first} {wannabe.last}
                        </h2>
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
    );
}
