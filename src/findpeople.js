import React, { useState, useEffect } from "react";
import axios from "./axios";

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
        <div className="find-ppl">
            <h2>Find People</h2>
            <input
                placeholder="user name"
                onChange={(e) => setUserInput(e.target.value)}
            />
            <div className="user-info">
                {/* <div className="each-user"> */}
                {user
                    .slice(0)
                    .reverse()
                    .map((user) => (
                        <div className="each-user" key={user.id}>
                            <img className="userpic" src={user.imgurl} />
                            <h2>
                                {user.first} {user.last}
                            </h2>
                        </div>
                    ))}
            </div>
            {/* </div> */}
        </div>
    );
}
