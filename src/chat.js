import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export default function Chat() {
    const elemRef = useRef();
    const chatMessages = useSelector((state) => {
        console.log("here are my last 10 msgs", state.chatmsgs);
        return state && state.chatmsgs;
    });

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
    console.log("----chatMessages---");
    console.log(chatMessages);
    return (
        <div>
            <h2 className="chat-title'">Chat</h2>
            <div className="chat-messages-container" ref={elemRef}>
                {chatMessages &&
                    chatMessages.map((msg) => {
                        console.log("--msg---");
                        console.log(msg);
                        return <p key={msg.id}>{msg.message}</p>;
                    })}

                <textarea
                    placeholder="add text here"
                    onKeyDown={keyCheck}
                ></textarea>
            </div>
        </div>
    );
}
