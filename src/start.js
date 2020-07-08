import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";

let elem;
if (location.pathname === "/welcome") {
    /// runs id the user is not logged in ///
    elem = <Welcome />;
} else {
    /// runs if the user is logged in ///
    elem = <App />;
}

ReactDOM.render(elem, document.querySelector("main"));
