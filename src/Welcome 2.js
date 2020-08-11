import React from "react";
import { useSpring, animated, config } from "react-spring";

export default function Welcome({ isOpen }) {
    const { x } = useSpring({
        x: isOpen ? 0 : 100,
        config: config.slow,
    });

    const fade = useSpring({
        opacity: 1,
        from: { opacity: 0 },
    });

    return (
        <div
            className="welcome-container"
            style={{
                pointerEvents: isOpen ? "all" : "none",
            }}
        >
            <animated.div
                style={{
                    transform: x.interpolate(
                        (x) => `translate3d(${x * -1}%,0,0)`
                    ),
                }}
                className="welcome-left"
            >
                <animated.h1 style={fade} id="open">
                    he
                </animated.h1>
            </animated.div>
            <animated.div
                style={{
                    transform: x.interpolate((x) => `translate3d(${x}%,0,0)`),
                }}
                className="welcome-right"
            >
                <animated.h1 style={fade} id="open">
                    llo
                </animated.h1>
            </animated.div>
        </div>
    );
}
