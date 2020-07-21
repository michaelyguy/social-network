import React from "react";
import { animated } from "react-spring";

export default function Nav({ style }) {
    return (
        <animated.div className="nav-wrapper" style={style}>
            <nav>
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Store</a>
            </nav>
        </animated.div>
    );
}
