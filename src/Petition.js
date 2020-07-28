import React, { useState } from "react";
import { Waypoint } from "react-waypoint";
import { animated, useSpring, config } from "react-spring";

export default function Petition() {
    ////CARD ON HOVER/////
    const calc = (x, y) => [
        -(y - window.innerHeight / 2) / 20,
        (x - window.innerWidth / 2) / 20,
        1.1,
    ];
    const trans = (x, y, s) =>
        `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

    const [hover, setHover] = useSpring(() => ({
        xys: [0, 0, 1],
        config: config.slow,
    }));

    ///////CARD ON HOVER END//////

    //////FLIP PROJECT///////
    const [flipped, setFlipped] = useState(false);
    const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
        config: config.slow,
    });

    ////////FLIP PROJECT END////////

    const [one, toggleOne] = useState(false);
    const animation = useSpring({
        opacity: one ? 1 : 0,
        transform: one ? "translate3d(0,0,0)" : "translate3d(50%,0,0)",
        config: config.slow,
    });

    return (
        <div className="project-container">
            <Waypoint
                bottomOffset="30%"
                onEnter={() => {
                    if (!one) toggleOne(true);
                }}
            />

            <div
                style={animation}
                onClick={() => setFlipped((state) => !state)}
                className="flip"
            >
                <animated.div
                    style={{
                        opacity,
                        transform: transform.interpolate(
                            (t) => `${t} rotateX(180deg)`
                        ),
                    }}
                    className="project-wrapper-one front"
                >
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
                </animated.div>

                <animated.div
                    className="project-wrapper-one back"
                    style={{
                        opacity: opacity.interpolate((o) => 1 - o),
                        transform,
                    }}
                >
                    <div className="project-box">
                        <animated.img
                            src="petition.png"
                            className="img-project"
                            onMouseMove={({ clientX: x, clientY: y }) =>
                                setHover({ xys: calc(x, y) })
                            }
                            onMouseLeave={() => setHover({ xys: [0, 0, 1] })}
                            style={{
                                transform: hover.xys.interpolate(trans),
                                config: config.slow,
                            }}
                        />
                        <div className="project-text">
                            <h1>Petition</h1>
                            <p>
                                An online petition - at the time created in
                                support of the Black Lives Matters movement -
                                which enables the supporters of the cause to
                                register on the site, sign up with their log in
                                details and submit their signature to give their
                                support for the cause. As soon as they have
                                signed, they can view other supporters based in
                                their city, or any other city showing up in the
                                list of supporters. They can update their
                                personal details, or withdraw their support by
                                deleting their signature.
                            </p>
                            <p className="technologies">
                                technologies used - jQuery, Handlebars, Node,
                                Express and PostgreSQL
                            </p>
                        </div>
                    </div>
                </animated.div>
            </div>
        </div>
    );
}
