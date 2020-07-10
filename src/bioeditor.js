import React from "react";
import axios from "./axios";
// import { Link } from "react-router-dom";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isTextEdited: false,
            bioText: "",
        };
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
        console.log("----THIS.STATE IN BIOEDIROR----");
        console.log(this.state);
    }
    handleSubmit(e) {
        e.preventDefault();
        // console.log("-----THIS-----");
        // console.log(this);
        if (this.state.bioText != "") {
            axios
                .post("/bio/editor", this.state)
                .then((response) => {
                    console.log("----RESPONSE IN POST/BIO EDITOR----");
                    console.log(response);

                    //////////// WHAT THE FUCK //////////////
                    this.props.setBio(response.data.bio);
                    location.replace("/");
                })
                .catch(function (err) {
                    console.log("ERROR IN /BIO/EDITOR: ", err);
                });
        }
    }
    showBioArea(e) {
        e.preventDefault();
        this.setState({
            isTextEdited: true,
        });
    }
    render() {
        return (
            <div>
                {this.state.isTextEdited && (
                    <div>
                        <textarea
                            onChange={(e) => this.handleChange(e)}
                            name="bioText"
                        />
                        <button onClick={(e) => this.handleSubmit(e)}>
                            Save
                        </button>
                    </div>
                )}

                {this.props.bio && (
                    <div>
                        <p>{this.props.bio}</p>
                        <button onClick={(e) => this.showBioArea(e)}>
                            Edit
                        </button>
                    </div>
                )}

                {!this.state.isTextEdited && (
                    <div>
                        <p onClick={(e) => this.showBioArea(e)}>Add bio</p>
                    </div>
                )}
            </div>
        );
    }
}
