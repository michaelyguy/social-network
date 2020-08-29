import React, { useState } from "react";
import { Waypoint } from "react-waypoint";
import { animated, useSpring, config } from "react-spring";

export default function SocialNetwork() {
    ////CARD ON HOVER/////
    const calc = (x, y) => [
        -(y - window.innerHeight / 2) / 20,
        (x - window.innerWidth / 2) / 20,
        1.1,
    ];
    const trans = (x, y, s) =>
        `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

    const [Hover, setHover] = useSpring(() => ({
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
    const [three, toggleThree] = useState(false);
    const animationThree = useSpring({
        opacity: three ? 1 : 0,
        transform: three ? "translate3d(0,0,0)" : "translate3d(50%,0,0)",
        config: config.slow,
    });

    const mobile = window.innerWidth < 900 ? true : false;

    return (
        <div className="project-container-three">
            <Waypoint
                bottomOffset="30%"
                onEnter={() => {
                    if (!three) toggleThree(true);
                }}
            />

            <animated.div
                style={animationThree}
                onClick={() => (mobile ? "" : setFlipped((state) => !state))}
                className="flip"
            >
                <animated.div
                    style={{
                        opacity,
                        transform: transform.interpolate(
                            (t) => `${t} rotateX(180deg)`
                        ),
                    }}
                    className="project-wrapper-three front"
                >
                    <div className="project-box">
                        <video
                            autoPlay="autoplay"
                            muted
                            loop
                            className="gif-project"
                        >
                            <source src="social-network.mp4" type="video/mp4" />
                        </video>
                    </div>
                </animated.div>

                <animated.div
                    className="project-wrapper-three back"
                    style={{
                        opacity: opacity.interpolate((o) => 1 - o),
                        transform,
                    }}
                >
                    <div className="project-box">
                        <animated.img
                            src="social-network.png"
                            className="img-project"
                            onMouseMove={({ clientX: x, clientY: y }) =>
                                setHover({ xys: calc(x, y) })
                            }
                            onMouseLeave={() => setHover({ xys: [0, 0, 1] })}
                            style={{
                                transform: Hover.xys.interpolate(trans),
                                config: config.slow,
                            }}
                        />
                        <div className="project-text">
                            <h1>Social Network</h1>
                            <p className="text">
                                The Social Network is a single-page web
                                application designed to bring people together.
                                It enables the user to create a personal
                                profile, upload a profile picture and connect
                                with other users by friend requests as well as a
                                chat room.
                            </p>
                            <p className="technologies">
                                Technologies used - JavaScript, AWS S3, Node,
                                PostgreSQL, Socket.IO, React and Redux
                            </p>
                        </div>
                    </div>
                </animated.div>
            </animated.div>
        </div>
    );
}
