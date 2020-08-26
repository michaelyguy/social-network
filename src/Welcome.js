import React, { useState } from "react";
import { useSpring, animated, config } from "react-spring";

export default function Welcome() {
    const [isWelcomeOpen, setWelcome] = useState(true);

    function helloClicked() {
        setWelcome(!isWelcomeOpen);
        console.log("heyyyyyy");
        document.body.classList.remove("unscroll");
    }

    const { x } = useSpring({
        x: isWelcomeOpen ? 0 : 100,
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
                pointerEvents: isWelcomeOpen ? "all" : "none",
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
                <animated.h1 onClick={helloClicked} style={fade} id="open">
                    he
                </animated.h1>
            </animated.div>
            <animated.div
                style={{
                    transform: x.interpolate((x) => `translate3d(${x}%,0,0)`),
                }}
                className="welcome-right"
            >
                <animated.h1 onClick={helloClicked} style={fade} id="open">
                    llo
                </animated.h1>
            </animated.div>
        </div>
    );
}
