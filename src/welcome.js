import React from "react";
import Register from "./register";
import Login from "./login";
import ResetPassword from "./resetPassword";
// import axios from "./axios;";
import { HashRouter, Route } from "react-router-dom";

export default function Welcome() {
    return (
        <div className="welcome">
            <img src="logo.png" className="logo" />
            <h3>Welcome to McDonald's</h3>
            <HashRouter>
                <div>
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
