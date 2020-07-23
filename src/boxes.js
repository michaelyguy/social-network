import React, { useState } from "react";
import { useSprings, animated, config } from "react-spring";
// import { useGesture } from "react-with-gesture";

const items = [0.5, 0.3, 0.2, 0.7, 1];

export default function Boxes() {
    const springs = useSprings(
        items.length,
        items.map((item) => ({
            from: {
                opacity: 0,
            },
            to: { opacity: item },
        }))
    );

    return (
        <div className="boxes-grid">
            {springs.map((animation) => (
                <animated.div className="box" style={animation} />
            ))}
        </div>
    );
}
