import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendsButton(props) {
    // console.log("----props.id in friendsbutton----");
    // console.log(props.id);
    const [buttonText, setButtonText] = useState("");

    useEffect(() => {
        axios.get(`/get-initial-status/${props.id}`).then(({ data }) => {
            console.log("----data in axios friendsbutton----");
            console.log(data);
            setButtonText(data);
        });
    }, []);

    return <button>HEYYY</button>;
}
