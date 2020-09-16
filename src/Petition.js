import React, { useState, useRef } from "react";
import { Waypoint } from "react-waypoint";
import { animated, useSpring, config } from "react-spring";

export default function Petition() {
    const vidRef = useRef();
    const playVideo = () => {
        vidRef.current.play();
    };

    ////HOVER ON CARD/////
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
    ///////HOVER END//////

    //////FLIP PROJECT///////
    const [flipped, setFlipped] = useState(false);
    const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
        config: config.slow,
    });
    ////////FLIP END////////

    const [one, toggleOne] = useState(false);
    const animation = useSpring({
        opacity: one ? 1 : 0,
        transform: one ? "translate3d(0,0,0)" : "translate3d(50%,0,0)",
        config: config.slow,
    });

    const mobile = window.innerWidth < 900 ? true : false;

    return (
        <div className="project-container-one">
            <Waypoint
                bottomOffset="30%"
                onEnter={() => {
                    if (!one) toggleOne(true);
                }}
            />

            <div
                style={animation}
                onClick={() => {
                    mobile ? "" : setFlipped((state) => !state);
                    playVideo();
                }}
                className="flip"
            >
                {!mobile && (
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
                                ref={vidRef}
                                muted
                                loop
                                className="gif-project"
                            >
                                <source src="petition.mp4" type="video/mp4" />
                            </video>
                        </div>
                    </animated.div>
                )}

                <animated.div
                    className="project-wrapper-one back"
                    style={{
                        opacity: opacity.interpolate((o) => 1 - o),
                        transform,
                    }}
                >
                    <div className="project-box">
                        {!mobile && (
                            <animated.img
                                src="petition.jpg"
                                className="img-project"
                                onMouseMove={({ clientX: x, clientY: y }) =>
                                    setHover({ xys: calc(x, y) })
                                }
                                onMouseLeave={() =>
                                    setHover({ xys: [0, 0, 1] })
                                }
                                style={{
                                    transform: hover.xys.interpolate(trans),
                                    config: config.slow,
                                }}
                            />
                        )}

                        {mobile && (
                            <video
                                autoPlay="autoplay"
                                muted
                                loop
                                className="gif-project"
                            >
                                <source src="petition.mp4" type="video/mp4" />
                            </video>
                        )}

                        <div className="project-text">
                            <h1>Petition</h1>
                            <p className="text">
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
                                jQuery, Handlebars, Node.js, Express.js and
                                PostgreSQL
                            </p>
                        </div>
                    </div>
                </animated.div>
            </div>
        </div>
    );
}
