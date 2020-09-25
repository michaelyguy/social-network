import React from "react";

export default function ProfilePic(props) {
    console.log("---props in prifilepic---");
    console.log(props);
    return (
        <>
            <img
                src="profile-pic.png"
                className="new-profile-pic"
                alt="Profile-pic"
            />
            <img
                className="small-userpic"
                onClick={() => props.toggleModal()}
                src={props.profilePic || "defaultpic.jpg"}
                alt={`${props.first} ${props.last}`}
            />
        </>
    );
}
