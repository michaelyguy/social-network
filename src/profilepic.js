import React from "react";

export default function ProfilePic(props) {
    console.log("-------PROPS IN PROFILEPIC------");
    console.log(props);

    return (
        <div>
            <img
                className="small-userpic"
                onClick={() => props.toggleModal()}
                src="defaultpic.jpg"
                alt="{props.first} heree {props.last}"
            />
        </div>
    );
}
