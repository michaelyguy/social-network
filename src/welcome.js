import React from "react";
import Register from "./register";

export default function Welcome() {
    return (
        <div className="welcome">
            <img src="logo.png" className="logo" />
            <h3>You are rly welcome</h3>
            <Register />
        </div>
    );
}
