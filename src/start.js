import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";

//// for redux ////
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";
import * as io from "socket.io-client";

const socket = io.connect();

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);
//// for redux ////

let elem;
if (location.pathname === "/welcome") {
    /// runs id the user is not logged in ///
    elem = <Welcome />;
} else {
    /// runs if the user is logged in ///

    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(elem, document.querySelector("main"));
