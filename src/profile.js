import React from "react";
import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";

export default function Profile(props) {
    console.log("----PROPS IN PROFILE-----");

    console.log(props);

    return (
        <div className="my-user-container">
            <div className="my-user-info">
                <img className="my-userpic" src={props.profilePic} />
                <div className="user-info-text">
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
                    <BioEditor
                        setBio={props.setBio}
                        officialBio={props.officialBio}
                    />
                </div>
            </div>
        </div>
    );
}
