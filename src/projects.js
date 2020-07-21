import React, { useState } from "react";
// import ProjectOne from "./projectone";

export default function Projects(props) {
    console.log("props: ", props);

    return (
        <div id="projects-container">
            <div onClick={props.toggleModal} className="project">
                <h1>project1</h1>
                <p>few words</p>
            </div>
            <div className="project">
                <h1>project2</h1>
                <p>few words</p>
            </div>
            <div className="project">
                <h1>project3</h1>
                <p>few words</p>
            </div>
            <div className="project">
                <h1>project4</h1>
                <p>few words</p>
            </div>
        </div>
    );
}
