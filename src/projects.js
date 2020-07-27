import React, { useState } from "react";
import { Waypoint } from "react-waypoint";
import { animated, useSpring, config } from "react-spring";

export default function Projects() {
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

    const [HoverTwo, setHoverTwo] = useSpring(() => ({
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

    const [flippedTWO, setFlippedTWO] = useState(false);

    ////////FLIP PROJECT END////////

    const [one, toggleOne] = useState(false);
    const animation = useSpring({
        opacity: one ? 1 : 0,
        transform: one ? "translate3d(0,0,0)" : "translate3d(50%,0,0)",
        config: config.slow,
    });

    const [two, toggleTwo] = useState(false);
    const animationTwo = useSpring({
        opacity: two ? 1 : 0,
        transform: two ? "translate3d(0,0,0)" : "translate3d(-50%,0,0)",
        config: config.slow,
    });

    const [three, toggleThree] = useState(false);
    const animationThree = useSpring({
        opacity: three ? 1 : 0,
        transform: three ? "translate3d(0,0,0)" : "translate3d(50%,0,0)",
        config: config.slow,
    });

    return (
        <div className="waypoints">
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
                        <img src="petition.png" className="gif-project" />
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
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Nullam euismod felis quis
                                ultrices eleifend. Quisque placerat vehicula
                                purus, at dapibus mi dignissim at. In mi ex,
                                consectetur quis vulputate id, blandit quis
                                nisi. Mauris nec urna vel nisl fringilla
                                iaculis. Nullam feugiat interdum ante vitae
                                lobortis. Aenean fringilla leo a purus egestas
                            </p>
                        </div>
                    </div>
                </animated.div>
            </div>

            <Waypoint
                bottomOffset="40%"
                onEnter={() => {
                    if (!two) toggleTwo(true);
                }}
            />

            <div
                style={animation}
                onClick={() => setFlipped((state) => !state)}
                className="flip"
            ></div>

            <animated.div style={animationTwo} className="project-wrapper-two">
                <div className="project-box">
                    {/* <div className="img-project" /> */}
                    <animated.div
                        className="img-project"
                        onMouseMove={({ clientX: x, clientY: y }) =>
                            setHoverTwo({ xys: calc(x, y) })
                        }
                        onMouseLeave={() => setHoverTwo({ xys: [0, 0, 1] })}
                        style={{
                            transform: HoverTwo.xys.interpolate(trans),
                            config: config.slow,
                        }}
                    />
                    <div className="project-text">
                        <h1>Project Two</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Nullam euismod felis quis ultrices eleifend.
                            Quisque placerat vehicula purus, at dapibus mi
                            dignissim at. In mi ex, consectetur quis vulputate
                            id, blandit quis nisi. Mauris nec urna vel nisl
                            fringilla iaculis. Nullam feugiat interdum ante
                            vitae lobortis. Aenean fringilla leo a purus egestas
                        </p>
                    </div>
                </div>
            </animated.div>
            <Waypoint
                bottomOffset="30%"
                onEnter={() => {
                    if (!three) toggleThree(true);
                }}
            />
            <animated.div
                style={animationThree}
                className="project-wrapper-three"
            >
                <div className="project-box">
                    <div className="img-project" />
                    <div className="project-text">
                        <h1>Project Three</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Nullam euismod felis quis ultrices eleifend.
                            Quisque placerat vehicula purus, at dapibus mi
                            dignissim at. In mi ex, consectetur quis vulputate
                            id, blandit quis nisi. Mauris nec urna vel nisl
                            fringilla iaculis. Nullam feugiat interdum ante
                            vitae lobortis. Aenean fringilla leo a purus egestas
                        </p>
                    </div>
                </div>
            </animated.div>
        </div>
    );
}
