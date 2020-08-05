import React, { useState } from "react";
import { Waypoint } from "react-waypoint";
import { animated, useSpring, config } from "react-spring";

export default function Try() {
    return (
        <div className="project-container-one1">
            <div className="flip1">
                {/* <div className="project-wrapper-one front">
                    <div className="project-box">
                        <video
                            autoPlay="autoplay"
                            muted
                            loop
                            className="gif-project"
                        >
                            <source src="petition.mp4" type="video/mp4" />
                        </video>
                    </div>
                </div> */}

                <div className="project-wrapper-one back1">
                    <div className="project-box1">
                        <img src="petition.png" className="img-project1" />
                        <div className="project-text1">
                            <h1>Petition</h1>
                            <p className="text1">
                                An online petition - created in support of the
                                Black Lives Matters movement - which enables the
                                supporters of the cause to register on the site,
                                log in and submit their signature to give their
                                support for the cause. The users can find other
                                supporters based in their city, or any other
                                city around the world. They can update their
                                personal details, or withdraw their support by
                                deleting their signature.
                            </p>

                            <p className="technologies">
                                Technologies used - jQuery, Handlebars, Node,
                                Express and PostgreSQL
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
