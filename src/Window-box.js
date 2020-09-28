import React from "react";

export default function WindowBox() {
    return (
        <div className="card-wrapper">
            <div className="card-header">
                <div className="card-close">
                    <div className="minimize"></div>
                </div>{" "}
                <div className="card-title">test</div>
                <div className="card-move"></div>
            </div>

            <div className="card-content">text here</div>
        </div>
    );
}
