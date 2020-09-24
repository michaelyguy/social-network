import React from "react";
import Register from "./register";
import Login from "./login";
import ResetPassword from "./resetPassword";
import { HashRouter, Route } from "react-router-dom";

export default function Welcome() {
    return (
        <>
            <img src="logo.png" className="new-logo" alt="Logo" />
            <img
                src="profile-pic.png"
                className="new-profile-pic"
                alt="Profile-pic"
            />
            <img src="main.png" className="main-new" alt="main" />

            {/* <div className="welcome-container"> */}
            {/* <h1 className="logo">anti-social</h1> */}

            {/* <h3>Join the anti-social!</h3> */}
            <HashRouter>
                <Route exact path="/" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/password/reset/start" component={ResetPassword} />
            </HashRouter>
            {/* </div> */}
        </>
    );
}
