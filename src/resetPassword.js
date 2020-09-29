import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class ResetPassword extends React.Component {
    constructor() {
        super();
        this.state = {
            currentDisplay: 0,
            error: false,
            ///// TO ASK ABT THAT - NOT SURE I NEED THIS ////
            newPassword: "",
            code: "",
        };
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });

        // console.log("----THIS.STATE----");
        // console.log(this.state);
    }
    handleSubmit(e) {
        e.preventDefault();
        // console.log("---THIS---");
        // console.log(this);
        if (this.state.currentDisplay == 0) {
            axios
                .post("/password/reset/start", this.state)
                .then((response) => {
                    // console.log("----RESPONSE IN POST AXIOS----");
                    // console.log(response);
                    // console.log(response.data);
                    if (response.data.error == true) {
                        this.setState({
                            error: true,
                        });
                    } else {
                        this.setState({
                            currentDisplay: 1,
                        });
                    }
                })
                .catch(function (err) {
                    console.log("ERROR IN CATCH POST /RESET PASSWORD: ", err);
                });
        } else if (this.state.currentDisplay == 1) {
            console.log("---THIS.STATE DISPLAY1----");
            console.log(this.state);
            axios
                .post("/password/reset/verify", this.state)
                .then((response) => {
                    // console.log("----RESPONSE IN POST AXIOS----");
                    // console.log(response);
                    // console.log(response.data);
                    if (response.data.error == true) {
                        this.setState({
                            error: true,
                        });
                    } else {
                        this.setState({
                            currentDisplay: 2,
                        });
                    }
                });
        } else {
            return (
                <div>
                    <h3>Password reset</h3>
                    <Link to="/login">
                        You can now log in with your new password!
                    </Link>
                </div>
            );
        }
    }

    getCurrentDisplay() {
        if (this.state.currentDisplay == 0) {
            return (
                <div className="card-wrapper-welcome">
                    <div id="card-header" className="card-header">
                        <div className="card-close">
                            <div className="minimize"></div>
                        </div>{" "}
                        <div className="card-title">Reset password</div>
                        <div className="card-move">
                            <img className="move-png" src="move.png" />
                        </div>{" "}
                    </div>
                    <div className="card-content"></div>

                    <div className="inputs-fields">
                        {this.state.error && <p>email don't match</p>}
                        <p className="reset-line">
                            Please enter your email address
                        </p>
                        <input
                            name="email"
                            type="text"
                            key="email"
                            placeholder="Email address"
                            onChange={(e) => this.handleChange(e)}
                        />
                        <button
                            id="reset-btn"
                            onClick={(e) => this.handleSubmit(e)}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            );
        } else if (this.state.currentDisplay == 1) {
            return (
                <div className="card-wrapper-welcome">
                    <div id="card-header" className="card-header">
                        <div className="card-close">
                            <div className="minimize"></div>
                        </div>{" "}
                        <div className="card-title">Reset password</div>
                        <div className="card-move">
                            <img className="move-png" src="move.png" />
                        </div>{" "}
                    </div>
                    <div className="card-content"></div>

                    <div className="inputs-fields">
                        <p p className="reset-line-one">
                            Please enter the code you received
                        </p>
                        <input
                            name="Code"
                            type="text"
                            placeholder="code"
                            onChange={(e) => this.handleChange(e)}
                        />

                        <p p className="reset-line-two">
                            Please enter a new password
                        </p>
                        <input
                            name="newPassword"
                            type="password"
                            key="password"
                            placeholder="New password"
                            onChange={(e) => this.handleChange(e)}
                        />
                        <button
                            id="reset-btn"
                            onClick={(e) => this.handleSubmit(e)}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="card-wrapper-welcome">
                    <div id="card-header" className="card-header">
                        <div className="card-close">
                            <div className="minimize"></div>
                        </div>{" "}
                        <div className="card-title">Reset password</div>
                        <div className="card-move">
                            <img className="move-png" src="move.png" />
                        </div>{" "}
                    </div>
                    <div className="card-content"></div>

                    <div className="inputs-fields">
                        <p className="reset-line">Reset success</p>
                        <Link to="/login">
                            You can now log in with your new password!
                        </Link>
                    </div>
                </div>
            );
        }
    }

    render() {
        return <div>{this.getCurrentDisplay()}</div>;
    }
}
