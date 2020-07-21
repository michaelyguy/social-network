import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

export default function Checkout({ isOpen }) {
    const { x } = useSpring({
        x: isOpen ? 0 : 100,
        // transform: isOpen ? `translate3d(0,0,0) ` : `translate3d(100%,0,0) `,
    });
    return (
        <div
            className="checkout"
            style={{ PointerEvent: isOpen ? "all" : "none" }}
        >
            <animated.div
                style={{
                    transform: x.interpolate(
                        (x) => `translate3d(${x * -1}%,0,0)`
                    ),
                }}
                className="checkout-left"
            />
            <animated.div
                style={{
                    transform: x.interpolate((x) => `translate3d(${x}%,0,0)`),
                }}
                className="checkout-right"
            />
        </div>
    );
}
