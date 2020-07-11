import React from "react";
import axios from "./axios";
// import { Link } from "react-router-dom";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // currentUserId: "",
        };
    }

    componentDidMount() {
        axios
            .get(`/api/user/${this.props.match.params.id}`)
            .then((response) => {
                console.log("----RESPONSE IN GET/USER---");
                console.log(response.data);
                this.setState({
                    first: response.data[0].first,
                    last: response.data[0].last,
                    profilePic: response[0].data.imgurl,
                    officialBio: response.data[0].bio,
                });
                // console.log("-----THIS.STATE----");
                // console.log(this.state);
            });
    }

    // handleChange(e) {
    //     this.setState({
    //         [e.target.name]: e.target.value,
    //     });
    //     console.log("----THIS.STATE----");
    //     console.log(this.state);
    // }
    // handleSubmit(e) {
    //     e.preventDefault();
    //     console.log("---THIS---");
    //     console.log(this);
    //     axios
    //         .post("/register", this.state)
    //         .then((response) => {
    //             console.log("----RESPONSE IN POST AXIOS----");
    //             console.log(response);
    //             console.log(response.data);
    //             location.replace("/");
    //         })
    //         .catch(function (err) {
    //             console.log("error ins POST /upload: ", err);
    //         });
    // }
    render() {
        return (
            <div className="user-info">
                <img className="userpic" src={this.state.imgurl} />
                <div className="user-info-text">
                    <h1>
                        {this.state.first} {this.state.last}
                    </h1>
                    <p>{this.state.bio}</p>
                </div>
            </div>
        );
    }
}
