import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

export default function About(props) {
    console.log("props", props);

    // const showAbout = useSpring({
    //     opacity: props.isToggled ? 1 : 0,
    // });

    useEffect(() => {
        console.log("About component useEffect");
    });

    return (
        <div className="about-container">
            <span className="close-about">close</span>
            <h2>Hi, I’m Guy, Berlin-based graphic designer.</h2>
            <br />
            <p>
                I grew up in Tel-Aviv and studied graphic design at the
                Department of Visual Communication at Shenkar College of
                Engineering and Design. Through my studies, I have gained a lot
                of knowledge and experience in different fields, and ultimately,
                chose to focus on UX UI and web design. As I see it, a good
                graphic design is the result of deep exploration and
                contemplation and is usually backed by a strong concept. My
                ambition is to work in close collaboration with enthusiastic
                people, artists, publishers, and institutions. I provide
                conceptual solutions for editorials, visual identities for other
                printed matter and web design.
            </p>
        </div>
    );
}
