import React, { useState } from "react";
import { useSpring, animated, config } from "react-spring";
import { useGesture } from "react-with-gesture";

export default function Gesture() {
    const [{ x }, set] = useSpring(() => ({ x: 0 }));

    const bind = useGesture(({ down, delta }) => {
        set({ x: down ? delta[0] : 0 });
    });
    return (
        <animated.div
            style={{
                opacity: x.interpolate({
                    map: Math.abs,
                    range: [0, 400],
                    output: [1, 0],
                }),
                transform: x.interpolate((x) => `translate3d(${x}px, 0, 0)`),
            }}
            {...bind()}
            className="box"
        />
    );
}
