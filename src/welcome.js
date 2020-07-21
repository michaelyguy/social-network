import React, { useState } from "react";
import About from "./about";
// import Toggle from "./toggle";
import { useSpring, animated } from "react-spring";

export default function Welcome() {
    const [isToggled, setToggle] = useState(false);

    const fadeHeader = useSpring({
        opacity: 1,
        from: { opacity: 0 },
    });

    // const show = useSpring({
    //     opacity: isToggled ? 1 : 0,
    // });

    // const AnimatedAbout = animated(About);

    return (
        <div>
            <animated.header style={fadeHeader}>
                <h1>Guy Michaely</h1>
                <h1 onClick={() => setToggle(!isToggled)}>About</h1>
            </animated.header>
            <div className="flier">
                <img src="smile.png" />
            </div>
            <About setToggle={setToggle} toggle={isToggled} />
        </div>
    );
}
