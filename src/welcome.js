import React from "react";
import Register from "./register";
import Login from "./login";
import ResetPassword from "./resetPassword";
import { HashRouter, Route } from "react-router-dom";
import Draggable, { DraggableCore } from "react-draggable";

export default function Welcome() {
    return (
        <>
            <Draggable>
                <div className="card-wrapper-logo">
                    <div id="card-header" className="card-header">
                        <div className="card-close">
                            <div className="minimize"></div>
                        </div>{" "}
                        <div className="card-title">Logo</div>
                        <div className="card-move">
                            <img className="move-png" src="move.png" />
                        </div>
                    </div>
                    <div className="card-content">
                        <h1 className="logo">Anti Social</h1>
                    </div>
                </div>
            </Draggable>

            <Draggable>
                <div className="card-wrapper-main">
                    <div id="card-header" className="card-header">
                        <div className="card-close">
                            <div className="minimize"></div>
                        </div>{" "}
                        <div className="card-title">Main</div>
                        <div className="card-move">
                            <img className="move-png" src="move.png" />
                        </div>
                    </div>
                    <div className="card-content">
                        <img className="main" src="main.png" />
                    </div>
                </div>
            </Draggable>

            <Draggable>
                <div className="card-wrapper-pic">
                    <div id="card-header" className="card-header">
                        <div className="card-close">
                            <div className="minimize"></div>
                        </div>{" "}
                        <div className="card-title">User</div>
                        <div className="card-move">
                            <img className="move-png" src="move.png" />
                        </div>
                    </div>
                    <div className="card-content">
                        <img className="small-userpic" src="defaultpic.jpg" />
                    </div>
                </div>
            </Draggable>

            <HashRouter>
                <Route exact path="/" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/password/reset/start" component={ResetPassword} />
            </HashRouter>
        </>
    );
}
