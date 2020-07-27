import React, { useState } from "react";
import { useTransition, animated } from "react-spring";

export default function Flier() {
    const [whatMood, setWhatMood] = useState(false);
    const transition = useTransition(whatMood, null, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });

    return (
        <div>
            {transition.map(({ item, key, props }) =>
                item ? (
                    <animated.div key={key} style={props} className="flier">
                        <img src="smile.png" />
                    </animated.div>
                ) : (
                    <animated.div key={key} style={props} className="flier">
                        <img src="smile2.png" />
                    </animated.div>
                )
            )}
            <button className="mood" onClick={() => setWhatMood(!whatMood)}>
                Change Mood
            </button>
        </div>
    );
}
