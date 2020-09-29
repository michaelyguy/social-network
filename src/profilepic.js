import React from "react";
import Draggable from "react-draggable";

export default function ProfilePic(props) {
    console.log("---props in prifilepic---");
    console.log(props);
    return (
        <Draggable>
            <div className="card-wrapper-pic">
                <div id="card-header" className="card-header">
                    <div className="card-close">
                        <div className="minimize"></div>
                    </div>{" "}
                    <div className="card-title">User</div>
                    <div className="card-move">
                        <img className="move-png" src="move.png" />
                    </div>{" "}
                </div>
                <div className="card-content">
                    <img
                        className="small-userpic"
                        onClick={() => props.toggleModal()}
                        src={props.profilePic || "defaultpic.jpg"}
                        alt={`${props.first} ${props.last}`}
                    />
                </div>
            </div>
        </Draggable>
    );
}
