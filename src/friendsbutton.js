import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendsButton(props) {
    console.log("----props.id in friendsbutton----");
    console.log(props.id);
    const [buttonText, setButtonText] = useState("");

    useEffect(() => {
        axios.get(`/get-initial-status/${props.id}`).then(({ data }) => {
            console.log("----data in axios friendsbutton----");
            console.log(data);
            if (data.rows.length <= 0) {
                setButtonText("Make Friend Request");
            } else if (data.rows.length > 0 && data.rows[0].accepted == true) {
                setButtonText("End Friendship");
            } else if (
                data.rows.length > 0 &&
                data.rows[0].accepted == false &&
                data.rows[0].sender_id == props.myId
            ) {
                setButtonText("Cancel Friend Request");
            } else if (
                data.rows.length > 0 &&
                data.rows[0].accepted == false &&
                data.rows[0].receiver_id == props.myId
            ) {
                setButtonText("Accept Friend Request");
            }
        });
    }, [props]);

    async function handleClick() {
        if (buttonText == "Make Friend Request") {
            const data = await axios.post(`/make-friend-request/${props.id}`);
            // console.log("----data in /make-friend-request/${props.id}----");
            // console.log(data);
            setButtonText("Cancel Friend Request");
        } else if (buttonText == "Cancel Friend Request") {
            const data = await axios.post(`/end-friendship/${props.id}`);
            setButtonText("Make Friend Request");
        } else if (buttonText == "Accept Friend Request") {
            const data = await axios.post(`/accept-friend-request/${props.id}`);
            setButtonText("End Friendship");
        }
    }
    return (
        <button className="status-btn" onClick={handleClick}>
            {buttonText}
        </button>
    );
}
