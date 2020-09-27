import React from "react";
// import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";

export default function Profile(props) {
    console.log("----PROPS IN PROFILE-----");

    console.log(props);

    return (
        <>
            <div className="my-user-container">
                <div className="my-user-info">
                    <h2 className="name">
                        {props.first} {props.last}
                    </h2>
                    <img className="my-userpic" src={props.profilePic} />
                    <div className="user-info-text">
                        <BioEditor
                            setBio={props.setBio}
                            officialBio={props.officialBio}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
