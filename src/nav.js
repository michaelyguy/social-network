import React from "react";
import { animated } from "react-spring";

export default function Nav({ style }) {
    return (
        <animated.div className="nav-wrapper" style={style}>
            <nav>
                <a href="#">Here I will write abot myself</a>
            </nav>
        </animated.div>
    );
}
