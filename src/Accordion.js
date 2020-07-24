import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import useMeasure from "./useMeasure";

export default function Accordion() {
    const [on, toggle] = useState(false);
    const [bind, { height, top }] = useMeasure();
    const animation = useSpring({
        overflow: "hidden",
        height: on ? height + top * 2 : 0,
    });

    return (
        <div>
            <h1>
                <button onClick={() => toggle(!on)}>I can do better..</button>
            </h1>

            {/* try */}

            <div class="box-2">
                <div class="btn btn-two">
                    <span>HOVER ME</span>
                </div>
            </div>

            {/* try */}

            <animated.div style={animation}>
                <div {...bind} className="accordion">
                    <p>
                        In case you were wondering, I am also a
                        <a
                            className="grapic-link"
                            target="_blank"
                            href="https://guymichaely.com/"
                        >
                            graphic designer
                        </a>
                    </p>
                </div>
            </animated.div>
        </div>
    );
}
