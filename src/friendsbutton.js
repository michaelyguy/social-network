import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendButton() {
    const [buttonText, setButtonText] = useState("");

    useEffect(() => {
        axios.get("/get-initial-status/:id").then(({ data }) => {
            setButtonText(data);
            console.log("----data in axios friendsbutton----");
            console.log(data);
        });
    });

    return <button>HEYYY</button>;
}
