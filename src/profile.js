import React from "react";
import BioEditor from "./bioeditor";
import Draggable from "react-draggable";

export default function Profile(props) {
    console.log("----PROPS IN PROFILE-----");

    console.log(props);

    return (
        <>
            <Draggable>
                <div className="card-wrapper-profile">
                    <div id="card-header" className="card-header">
                        <div className="card-close">
                            <div className="minimize"></div>
                        </div>{" "}
                        <div className="card-title">User card</div>
                        <div className="card-move">
                            <img className="move-png" src="move.png" />
                        </div>
                    </div>
                    <div className="card-content">
                        <img className="my-userpic" src={props.profilePic} />
                        <p className="user-line">User</p>
                        <p className="info">
                            {props.first} {props.last}
                        </p>
                        <p className="user-line">About</p>

                        <BioEditor
                            setBio={props.setBio}
                            officialBio={props.officialBio}
                        />
                    </div>
                </div>
            </Draggable>
        </>
    );
}

{
    /* <div className="my-user-container">
    <div className="my-user-info">
        <h2 className="name">
            {props.first} {props.last}
        </h2>
        <img className="my-userpic" src={props.profilePic} />
        <div className="user-info-text">
            <BioEditor setBio={props.setBio} officialBio={props.officialBio} />
        </div>
    </div>
</div>; */
}
