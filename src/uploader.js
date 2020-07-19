import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgurl: "",
        };
    }

    handleChange(e) {
        this.setState({
            imgurl: e.target.files[0],
        });
        console.log("----THIS.STATE----");
        console.log(this.state);
    }
    handleSubmit(e) {
        e.preventDefault();
        var formData = new FormData();
        formData.append("imgurl", this.state.imgurl);
        console.log("---THIS---");
        console.log(this);
        axios
            .post("/upload", formData)
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
            <div className="uploader-container">
                <div className="uploader-text">
                    <h3>Want to change your image?</h3>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        className="inputfile"
                        id="file"
                        type="file"
                        name="file"
                        accept="image/*"
                    />
                    <button onClick={(e) => this.handleSubmit(e)}>
                        Submit
                    </button>{" "}
                </div>
            </div>
        );
    }
}
