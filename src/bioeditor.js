import React from "react";
import axios from "./axios";
// import { Link } from "react-router-dom";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textArea: false,
        };
    }
    render() {
        return (
            <div className="inputs-container">
                <textarea
                    onChange={(e) => this.handleChange(e)}
                    name="draft-bio"
                />

                <button onClick={(e) => this.handleSubmit(e)}>Login</button>
            </div>
        );
    }
}
