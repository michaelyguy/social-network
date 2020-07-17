import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export default function Chat() {
    const elemRef = useRef();
    const ChatMessages = useSelector((state) => state && state.ChatMessages);
    //// this will be undefined at the moment ///
    // console.log("here are my last 10 msgs", ChatMessages);

    //// we want this to run everytime you get a new chat msg ////
    useEffect(() => {
        console.log("elemnt Ref: ", elemRef);
        console.log("scroll top: ", elemRef.current.scrollTop);
        console.log("client height: ", elemRef.current.clientHeight);
        console.log("scroll height: ", elemRef.current.scrollHeight);

        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, []);

    const keyCheck = (e) => {
        // console.log("value: ", e.target.value);
        // console.log("key pressed: ", e.key);
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("our msg: ", e.target.value);
            socket.emit("My amazing chat message", e.target.value);
            e.target.value = "";
        }
    };

    return (
        <div>
            <p classNAme="chat-title'">Welcome to chat</p>

            <div className="chat-messages-container" ref={elemRef}>
                <p>Chat messages will go here</p>
                <p>Chat messages will go here</p>
                <p>Chat messages will go here</p>
                <p>Chat messages will go here</p>
            </div>
            <textarea
                placeholder="add text here"
                onKeyDown={keyCheck}
            ></textarea>
        </div>
    );
}
