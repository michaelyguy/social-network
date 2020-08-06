import React from "react";
import { animated } from "react-spring";

export default function About({ style }) {
    return (
        <animated.div className="about-wrapper" style={style}>
            <div className="about-container">
                <div className="about-position">
                    <p>
                        I am a developer who is a{" "}
                        <a
                            className="designer-link"
                            href="https://guymichaely.com/"
                            target="_blank"
                        >
                            designer
                        </a>{" "}
                        first. I believe that websites and web apps should not
                        only be functional but also pleasing to look at. My
                        approach is UI/UX-driven. For me, to make sure that the
                        user gets results with ease and comfort is as important
                        as getting the correct results.
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
                    <br />
                    <h1>
                        <a
                            className="say-hey"
                            href="mailto: michaelyguy@gmail.com"
                        >
                            Let's talk!
                        </a>
                    </h1>
                    <a
                        className="designer-link"
                        href="https://www.linkedin.com/in/guymichaely/"
                        target="_blank"
                    >
                        linkdin
                    </a>{" "}
                    <a
                        className="designer-link"
                        href="https://github.com/michaelyguy"
                        target="_blank"
                    >
                        {" "}
                        github
                    </a>
                </div>
            </div>
            <img src="me.png" className="my-pic" />
        </animated.div>
    );
}
