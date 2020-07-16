import React, { useEffect } from "react";
import { receiveFriendsWannabes } from "./actions";
import { useSelector, useDispatch } from "react-redux";

export default function Friends(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(receiveFriendsWannabes);
    });

    const friends = useSelector((state) => state.friendsWannabes);

    return (
        <div>
            <h3>Friends</h3>
            {/* map here */}

            <h3>Waiting to become friends</h3>
            {/* map here */}
        </div>
    );
}
