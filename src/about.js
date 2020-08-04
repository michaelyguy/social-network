import React from "react";
import { animated } from "react-spring";

export default function About({ style }) {
    return (
        <animated.div className="about-wrapper" style={style}>
            <div className="about-container">
                <div className="about-position">
                    {/* <h1 className="nice-to-meet">nice to meet you!</h1> */}

                    <p>
                        I am a developer who is a designer first. I believe that
                        websites and web apps should not only be functional but
                        also pleasing to look at. My approach is UI/UX-driven.
                        For me, to make sure that the user gets results with
                        ease and comfort is as important as getting the correct
                        results.
                    </p>
                    <br />
                    <p>
                        I code because I want my designs to have life. Printed
                        brochures, magazines, or posters will never be
                        interactive unlike websites or apps. Coding gives me the
                        perfect canvas for my art. The possibilities of creating
                        interactive designs in coding are endless. I enjoy all
                        aspects of web development—from planning to deployment.
                        I love art and I love to code.
                    </p>
                </div>
            </div>
            <img src="me.png" className="my-pic" />
        </animated.div>
    );
}
