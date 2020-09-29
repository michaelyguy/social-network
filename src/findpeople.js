import React, { useState, useEffect } from "react";
import axios from "./axios";
import Draggable from "react-draggable";

export default function FindPeople({ id }) {
    const [user, setUser] = useState([]);
    const [userInput, setUserInput] = useState("");
    useEffect(() => {
        axios.get("/api/users/:id").then(({ data }) => {
            setUser(data);
        });
    }, []);
    useEffect(() => {
        if (!userInput) {
            return;
        }
        axios.get(`/api/match/users?name=${userInput}`).then(({ data }) => {
            console.log("----INPUT DATA IN FINDPPL-----");
            console.log(data);
            setUser(data);
        });
    }, [userInput]);

    return (
        <Draggable>
            <div className="card-wrapper-search">
                <div id="card-header" className="card-header">
                    <div className="card-close">
                        <div className="minimize"></div>
                    </div>{" "}
                    <div className="card-title">Search</div>
                    <div className="card-move">
                        <img className="move-png" src="move.png" />
                    </div>
                </div>
                <div className="card-content">
                    <input
                        placeholder="Search users.."
                        onChange={(e) => setUserInput(e.target.value)}
                    />
                    <div className="user-info">
                        {user
                            .slice(0)
                            .reverse()
                            .map((user) => (
                                <div className="each-user" key={user.id}>
                                    <img
                                        className="userpic"
                                        src={user.imgurl}
                                    />
                                    <p>
                                        {user.first} {user.last}
                                    </p>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </Draggable>
    );
}
