import React from "react";
import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";

export default function Profile(props) {
    console.log("props in profile: ", props);
    return (
        <div className="container">
            <h1>this is the Profile component</h1>
            <h2>Hey {props.first}</h2>

            <ProfilePic
                first={props.first}
                last={props.last}
                profilePic={props.profilePic}
                toggleModal={() => this.toggleModal()}
            />
            <BioEditor />
        </div>
    );
}
