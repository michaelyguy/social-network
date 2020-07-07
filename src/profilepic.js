import React from "react";

export default function ProfilePic(props) {
    console.log("-------PROPS IN PROFILEPIC------");
    console.log(props);
    /// how can we render default profilepic for them? ///
    /// hint: don't over think this ///
    return (
        <div>
            <p onClick={() => props.toggleModal()}>first name, last name</p>
            <img />
        </div>
    );
}
