import React from "react";
import axios from "axios";

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first: "",
            last: "",
            email: "",
            password: "",
        };
    }
    handleChange(e) {
        this.setState({
            first: e.target.value,
            last: e.target.value,
            email: e.target.value,
            password: e.target.value,
        });
        // console.log("----THIS----");
        // console.log(this);
        // console.log("----THIS.STATE----");
        // console.log(this.state);
    }
    submitRegister() {
        axios
            .post("/register", this.state)
            .then((response) => {
                console.log("----RESPONSE IN POST AXIOS----");
                console.log(response);
            })
            .catch(function (err) {
                console.log("error ins POST /upload: ", err);
            });
    }
    render() {
        return (
            <div className="register">
                <form method="POST">
                    <input
                        name="first"
                        type="text"
                        placeholder="first"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <input
                        name="last"
                        type="text"
                        placeholder="last"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <input
                        name="email"
                        type="text"
                        placeholder="email"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="password"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <button onSubmit={this.submitRegister} type="submit">
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}
