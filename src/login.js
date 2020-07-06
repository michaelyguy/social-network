import React from "react";
import axios from "./axios";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
        console.log("----THIS.STATE----");
        console.log(this.state);
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log("---THIS---");
        console.log(this);
        axios
            .post("/login", this.state)
            .then((response) => {
                // console.log("----RESPONSE IN POST AXIOS----");
                // console.log(response);
                // console.log(response.data);
                location.replace("/");
            })
            .catch(function (err) {
                console.log("ERROR IN CATCH POST /LOGIN: ", err);
            });
    }
    render() {
        return (
            <div className="login">
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
                <button onClick={(e) => this.handleSubmit(e)}>Login</button>
            </div>
        );
    }
}
