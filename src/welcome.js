import React from "react";
import Register from "./register";
import Login from "./login";
import ResetPassword from "./resetPassword";
import { HashRouter, Route } from "react-router-dom";

export default function Welcome() {
    return (
        <div className="welcome-container">
            <img src="glitch2.gif" />
            <h1 className="logo">anti-social</h1>

            {/* <img src="logo.png" className="logo" /> */}
            <h3>Join the anti-social!</h3>
            <HashRouter>
                <Route exact path="/" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/password/reset/start" component={ResetPassword} />
            </HashRouter>
        </div>
    );
}
