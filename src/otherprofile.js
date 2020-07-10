import React from "react";
import axios from "./axios";
// import { Link } from "react-router-dom";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUserId: "",
        };
        // console.log("----PROPS IN OTHERPROFILE----");
        // console.log(props);
    }

    componentDidMount() {
        axios.get("/api/user/:id").then((response) => {
            console.log("----RESPONSE IN GET/USER---");
            console.log(response.data);
            // this.setState({
            //     first: response.data.first,
            //     last: response.data.last,
            //     profilePic: response.data.imgurl,
            //     id: response.data.id,
            // });
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
            <div>
                <h1>HEYYYY</h1>
            </div>
        );
    }
}
