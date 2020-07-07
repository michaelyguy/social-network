import React from "react";
import Register from "./register";
import Login from "./login";
import ResetPassword from "./resetPassword";
import { HashRouter, Route } from "react-router-dom";

export default function Welcome() {
    return (
        <div className="container">
            <img src="logo.png" className="logo" />
            <h3>
                I really wants to eat McDonald's right now, so please fill your
                details
            </h3>
            <HashRouter>
                <div className="components">
                    <Route exact path="/" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route
                        path="/password/reset/start"
                        component={ResetPassword}
                    />
                </div>
            </HashRouter>
        </div>
    );
}
