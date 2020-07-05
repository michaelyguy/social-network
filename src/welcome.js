import React from "react";
import Register from "./register";

export default function Welcome() {
    return (
        <div className="welcome">
            <img src="logo.png" className="logo" />
            <h3>Welcome to McDonald's</h3>
            <Register />
        </div>
    );
}
