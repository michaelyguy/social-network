import React from "react";

export default function ProfilePic(props) {
    return (
        <div>
            <img
                className="small-userpic"
                onClick={() => props.toggleModal()}
                src={props.profilePic || "defaultpic.jpg"}
                alt={`${props.first} ${props.last}`}
            />
        </div>
    );
}
