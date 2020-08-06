import React from "react";
import { useSpring, animated, config } from "react-spring";

export default function Welcome({ isOpen }) {
    const { x } = useSpring({
        x: isOpen ? 0 : 100,
        config: config.slow,
    });
    return (
        <div
            className="welcome-container"
            style={{ pointerEvents: isOpen ? "all" : "none" }}
        >
            <animated.div
                style={{
                    transform: x.interpolate(
                        (x) => `translate3d(${x * -1}%,0,0)`
                    ),
                }}
                className="welcome-left"
            >
                <h1 id="open">he</h1>
            </animated.div>
            <animated.div
                style={{
                    transform: x.interpolate((x) => `translate3d(${x}%,0,0)`),
                }}
                className="welcome-right"
            >
                <h1 id="open">llo</h1>
            </animated.div>
        </div>
    );
}
