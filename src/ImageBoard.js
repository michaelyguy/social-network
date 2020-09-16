import React, { useState, useRef } from "react";
import { Waypoint } from "react-waypoint";
import { animated, useSpring, config } from "react-spring";

export default function ImageBoard() {
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

    const [two, toggleTwo] = useState(false);
    const animationTwo = useSpring({
        opacity: two ? 1 : 0,
        transform: two ? "translate3d(0,0,0)" : "translate3d(-50%,0,0)",
        config: config.slow,
    });

    const mobile = window.innerWidth < 900 ? true : false;

    return (
        <div className="project-container">
            <Waypoint
                bottomOffset="40%"
                onEnter={() => {
                    if (!two) toggleTwo(true);
                }}
            />

            <animated.div
                style={animationTwo}
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
                        className="project-wrapper-two front"
                    >
                        <div className="project-box">
                            <video
                                ref={vidRef}
                                muted
                                loop
                                className="gif-project"
                            >
                                <source
                                    src="image-board.mp4"
                                    type="video/mp4"
                                />
                            </video>
                        </div>
                    </animated.div>
                )}

                <animated.div
                    className="project-wrapper-two back"
                    style={{
                        opacity: opacity.interpolate((o) => 1 - o),
                        transform,
                    }}
                >
                    <div className="project-box">
                        {!mobile && (
                            <animated.img
                                src="img-board.jpg"
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
                                <source
                                    src="image-board.mp4"
                                    type="video/mp4"
                                />
                            </video>
                        )}

                        <div className="project-text">
                            <h1>Image Board</h1>
                            <p className="text">
                                Photo Diary is a collection of memories about
                                Berlin's nightlife. Users can upload images with
                                a title and description, for others to see and
                                comment on. All brought together in a clean yet
                                unconventional design.
                            </p>

                            <p className="technologies">
                                Handlebars, Vue.js, AWS S3, Node.js, Express.js
                                and PostgreSQL
                            </p>
                        </div>
                    </div>
                </animated.div>
            </animated.div>
        </div>
    );
}
