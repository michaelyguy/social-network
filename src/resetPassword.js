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
                <div className="inputs-fields">
                    {this.state.error && <p>email don't match</p>}
                    <h3>Reset Password</h3>
                    <p>Please enter your email address</p>
                    <input
                        name="email"
                        type="text"
                        key="email"
                        placeholder="email"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <button onClick={(e) => this.handleSubmit(e)}>
                        Submit
                    </button>
                </div>
            );
        } else if (this.state.currentDisplay == 1) {
            return (
                <div className="inputs-fields">
                    <h3>Reset Password</h3>
                    <p>Please enter the code you received</p>
                    <input
                        name="code"
                        type="text"
                        placeholder="code"
                        onChange={(e) => this.handleChange(e)}
                    />

                    <p>Please enter a new password</p>
                    <input
                        name="newPassword"
                        type="password"
                        key="password"
                        placeholder="new password"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <button onClick={(e) => this.handleSubmit(e)}>
                        Submit
                    </button>
                </div>
            );
        } else {
            return (
                <div className="inputs-fields">
                    <h3>Success</h3>
                    <Link to="/login">
                        You can now log in with your new password!
                    </Link>
                </div>
            );
        }
    }

    render() {
        return <div>{this.getCurrentDisplay()}</div>;
    }
}
