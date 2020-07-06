import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

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
            .post("/register", this.state)
            .then((response) => {
                console.log("----RESPONSE IN POST AXIOS----");
                console.log(response);
                console.log(response.data);
                location.replace("/");
            })
            .catch(function (err) {
                console.log("error ins POST /upload: ", err);
            });
    }
    render() {
        return (
            <div className="inputs-container">
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
                <button onClick={(e) => this.handleSubmit(e)}>Submit</button>
                <Link to="/login">Click here to Log in!</Link>
            </div>
        );
    }
}
