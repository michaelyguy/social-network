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
        <div className="user-info">
            <h2>Find People</h2>

            {user.map((user) => (
                <div key={user.id}>
                    {" "}
                    {user.first}
                    <img className="userpic" src={user.imgurl} />
                </div>
            ))}

            <input
                placeholder="user name"
                onChange={(e) => setUserInput(e.target.value)}
            />
        </div>
    );
}
