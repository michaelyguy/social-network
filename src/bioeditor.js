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
        console.log("----PROPS IN BIOEDITOR----");
        console.log(props);
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        // console.log("-----THIS-----");
        // console.log(this);

        axios
            .post("/bio/editor", this.state)
            .then((response) => {
                console.log("----RESPONSE IN POST/BIO EDITOR----");
                console.log(response);
                this.props.setBio(response.data.bio);
                // location.replace("/");
            })
            .catch(function (err) {
                console.log("ERROR IN /BIO/EDITOR: ", err);
            });
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
                            name="bioText"
                            defaultValue={this.props.officialBio}
                            onChange={(e) => this.handleChange(e)}
                        />
                        <button onClick={(e) => this.handleSubmit(e)}>
                            Save
                        </button>
                    </div>
                )}
                {this.props.bio ? (
                    <div>
                        <button onClick={(e) => this.showBioArea(e)}>
                            Edit
                        </button>
                    </div>
                ) : (
                    <div>
                        <p onClick={(e) => this.showBioArea(e)}>Add bio</p>
                    </div>
                )}
                ;
            </div>
        );
    }
}
