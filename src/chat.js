import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import Draggable from "react-draggable";

export default function Chat() {
    const elemRef = useRef();
    const chatMessages = useSelector((state) => {
        return state && state.chatmsgs;
    });

    //// we want this to run everytime you get a new chat msg ////
    useEffect(() => {
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, []);

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("our msg: ", e.target.value);
            socket.emit("My amazing chat message", e.target.value);
            e.target.value = "";
        }
    };

    return (
        <Draggable>
            <div className="card-wrapper-chat">
                <div id="card-header" className="card-header">
                    <div className="card-close">
                        <div className="minimize"></div>
                    </div>{" "}
                    <div className="card-title">Chat</div>
                    <div className="card-move">
                        <img className="move-png" src="move.png" />
                    </div>
                </div>
                <div className="card-content">
                    <div className="chat-messages-container" ref={elemRef}>
                        {chatMessages &&
                            chatMessages.map((msg) => (
                                <div className="each-msg" key={msg.id}>
                                    <img
                                        className="chat-userpic"
                                        src={msg.imgurl}
                                    />
                                    <p className="user-line">User</p>
                                    <p className="info">
                                        {msg.first} {msg.last}
                                    </p>
                                    <p className="user-line">Comment</p>
                                    <p className="info">{msg.message}</p>
                                </div>
                            ))}
                    </div>
                    <textarea
                        className="chat-area"
                        placeholder="Add comment.."
                        onKeyDown={keyCheck}
                    ></textarea>
                </div>
            </div>
        </Draggable>
    );
}
