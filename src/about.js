import React from "react";
import { animated } from "react-spring";
import Draggable from "react-draggable";

export default function About({ style }) {
    return (
        <animated.div className="about-wrapper" style={style}>
            <div className="about-container">
                <div className="about-position">
                    <p>
                        Berlin-based web-developer and graphic designer,
                        Combining the best out of both worlds, I focus on
                        functional and interactive code writing while having a
                        well-designed user experience in mind. I believe that
                        websites and web apps should not only be functional but
                        also pleasing to look at.
                    </p>
                    <br />
                    <p>
                        I grew up in Tel-Aviv and studied graphic design in the
                        Department of Visual Communication at Shenkar College of
                        Engineering and Design, specializing in UX / UI design.
                        During this experience, I fell in love with code as the
                        enabler of creation and with the process of transforming
                        my ideas into reality using it. This is what excites me.
                        To deepen my knowledge and professionalize in code, I
                        decided to participate in a coding Bootcamp at SPICED
                        Academy in Berlin, in which I earned my certificate as a
                        full stack web developer.
                    </p>
                    <br />
                    <a
                        className="designer-link"
                        href="https://www.linkedin.com/in/guymichaely/"
                        target="_blank"
                    >
                        linkedin
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

            <Draggable>
                <img src="me.png" className="my-pic" />
            </Draggable>
        </animated.div>
    );
}
