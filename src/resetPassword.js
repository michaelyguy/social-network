import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class ResetPassword extends React.Component {
    constructor() {
        super();
        this.state = { currentDisplay: 0, error: false };
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
                </div>
            );
        }
    }

    // }
    getCurrentDisplay() {
        if (this.state.currentDisplay == 0) {
            return (
                <div className="inputs-container">
                    {this.state.error && <h3>error sorry</h3>}
                    <input
                        name="email"
                        type="text"
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
                <div>
                    <input
                        name="code"
                        type="text"
                        placeholder="code"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <input
                        name="newPassword"
                        type="password"
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
                <div>
                    <h3>Password reset</h3>
                </div>
            );
        }
    }

    render() {
        return <div>{this.getCurrentDisplay()}</div>;
    }
}
