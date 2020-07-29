import React, { useState } from "react";
import { Waypoint } from "react-waypoint";
import { animated, useSpring, config } from "react-spring";

export default function ImageBoard() {
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
    const [two, toggleTwo] = useState(false);
    const animationTwo = useSpring({
        opacity: two ? 1 : 0,
        transform: two ? "translate3d(0,0,0)" : "translate3d(-50%,0,0)",
        config: config.slow,
    });

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
                    className="project-wrapper-two front"
                >
                    <div className="project-box">
                        <video
                            autoPlay="autoplay"
                            muted
                            loop
                            className="gif-project"
                        >
                            <source src="image-board.mp4" type="video/mp4" />
                        </video>
                    </div>
                </animated.div>

                <animated.div
                    className="project-wrapper-two back"
                    style={{
                        opacity: opacity.interpolate((o) => 1 - o),
                        transform,
                    }}
                >
                    <div className="project-box">
                        <animated.img
                            src="image-board.png"
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
                            <h1>Image Board</h1>
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
            </animated.div>
        </div>
    );
}
