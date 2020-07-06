import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";

let elem;
if (location.pathname === "/welcome") {
    /// runs id the user is not logged in ///
    elem = <Welcome />;
} else {
    /// runs if the user is logged in ///
    /// put logo image inside public to render here ///
    elem = (
        <div>
            <img className="logo" src="/logo.png" />
            <h3>Welcome back</h3>
        </div>
    );
}

ReactDOM.render(elem, document.querySelector("main"));
