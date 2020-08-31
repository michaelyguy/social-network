import React, { useState } from "react";
import { useTransition, animated } from "react-spring";

const Modal = ({ closeModal, animation, pointerEvents }) => {
    return (
        <div className="modal" style={{ pointerEvents }}>
            <animated.div
                className="className="
                about-wrapper
                style={animation}
            >
                <button onClick={closeModal}>Close</button>
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
                            first. I believe that websites and web apps should
                            not only be functional but also pleasing to look at.
                            My approach is UI/UX-driven. For me, to make sure
                            that the user gets results with ease and comfort is
                            as important as getting the correct results.
                        </p>
                        <br />
                        <p>
                            I code because I want my designs to have life.
                            Printed brochures, magazines, or posters will never
                            be interactive unlike websites or apps. Coding gives
                            me the perfect canvas for my art. The possibilities
                            of creating interactive designs in coding are
                            endless. I enjoy all aspects of web development—from
                            planning to deployment. I love art and I love to
                            code.
                        </p>
                        <br />
                        <h1>
                            <a
                                className="lets-talk"
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
            </animated.div>
            <img src="me.png" className="my-pic" />
        </div>
    );
};

export default function ModalWrapper(style) {
    const [on, toggle] = useState(false);
    // function aboutClicked() {
    //     toggle(true);
    //     document.body.classList.remove("unscroll");
    // }

    const transition = useTransition(on, null, {
        from: { opacity: 0, transform: "translate3d(0, -40px, 0)" },
        enter: { opacity: 1, transform: "translate3d(0, 0, 0)" },
        leave: { opacity: 0, transform: "translate3d(0, -40px, 0)" },
    });
    const pointerEvents = on ? "all" : "none";

    return (
        <div>
            {transition.map(
                ({ item, key, props: animation }) =>
                    item && (
                        <Modal
                            pointerEvents={pointerEvents}
                            animation={animation}
                            closeModal={() => toggle(false)}
                        />
                    )
            )}
            <h3 className="abt-btn" onClick={() => toggle(!on)}>
                About
            </h3>
        </div>
    );
}
