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
    elem = <img src="/logo.jpg" />;
}

ReactDOM.render(elem, document.querySelector("main"));
