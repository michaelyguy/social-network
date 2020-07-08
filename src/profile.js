import React from "react";
import ProfilePic from "./profilepic";

export default function Profile(props) {
    console.log("props in profile: ", props);
    return (
        <div className="container">
            <h1>this is the Profile component</h1>
            <h2>My name is {props.first}</h2>

            <ProfilePic first={this.props.first} />
        </div>
    );
}
