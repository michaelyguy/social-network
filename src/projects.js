import React, { useState } from "react";
import { Waypoint } from "react-waypoint";
import { animated, useSpring, config } from "react-spring";

export default function Projects() {
    ////CARD/////
    const calc = (x, y) => [
        -(y - window.innerHeight / 2) / 20,
        (x - window.innerWidth / 2) / 20,
        1.1,
    ];
    const trans = (x, y, s) =>
        `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

    const [props, set] = useSpring(() => ({
        xys: [0, 0, 1],
        config: config.slow,
    }));

    const [propsTwo, setTwo] = useSpring(() => ({
        xys: [0, 0, 1],
        config: config.slow,
    }));

    ///////CARD//////

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

            <animated.div style={animation} className="project-wrapper-one">
                <div className="project-box">
                    <animated.div
                        className="img-project"
                        onMouseMove={({ clientX: x, clientY: y }) =>
                            set({ xys: calc(x, y) })
                        }
                        onMouseLeave={() => set({ xys: [0, 0, 1] })}
                        style={{
                            transform: props.xys.interpolate(trans),
                            config: config.slow,
                        }}
                    />
                    <div className="project-text">
                        <h1>Project One</h1>
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
                bottomOffset="40%"
                onEnter={() => {
                    if (!two) toggleTwo(true);
                }}
            />
            <animated.div style={animationTwo} className="project-wrapper-two">
                <div className="project-box">
                    {/* <div className="img-project" /> */}
                    <animated.div
                        className="img-project"
                        onMouseMove={({ clientX: x, clientY: y }) =>
                            setTwo({ xys: calc(x, y) })
                        }
                        onMouseLeave={() => setTwo({ xys: [0, 0, 1] })}
                        style={{
                            transform: propsTwo.xys.interpolate(trans),
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
