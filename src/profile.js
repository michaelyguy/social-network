import React from "react";
import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";

export default function Profile(props) {
    return (
        <div className="user-info">
            {/* <h1>YOU SEE PROFILE COMPONENT</h1> */}
            <img className="userpic" src={props.profilePic} />
            <h2>
                {props.first} {props.last}
            </h2>

            <ProfilePic
                first={props.first}
                last={props.last}
                profilePic={props.profilePic}
                uploaderIsVisible={props.uploaderIsVisible}
                toggleModal={props.toggleModal}
                newProfilePic={props.newProfilePic}
            />
            <BioEditor setBio={props.setBio} bio={props.bio} />
        </div>
    );
}
