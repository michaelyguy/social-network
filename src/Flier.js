import React, { useState } from "react";
import { useTransition, animated, useSpring } from "react-spring";

export default function Flier() {
    const [whatMood, setWhatMood] = useState(true);
    const transition = useTransition(whatMood, null, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });

    /////animation on the btn/////
    const [click, setClick] = useState(true);
    const { x } = useSpring({
        from: { x: 0 },
        x: click ? 1 : 0,
        config: { duration: 1000 },
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
            <div onClick={() => setClick(!click)}>
                <animated.h1
                    style={{
                        opacity: x.interpolate({
                            range: [0, 1],
                            output: [0.3, 1],
                        }),
                        transform: x
                            .interpolate({
                                range: [
                                    0,
                                    0.25,
                                    0.35,
                                    0.45,
                                    0.55,
                                    0.65,
                                    0.75,
                                    1,
                                ],
                                output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
                            })
                            .interpolate((x) => `scale(${x})`),
                    }}
                    className="mood"
                    onClick={() => setWhatMood(!whatMood)}
                >
                    Change Mood
                </animated.h1>
            </div>
        </div>
    );
}

// import React, { useState } from "react";
// import { useTransition, animated } from "react-spring";

// export default function Flier() {
//     const [whatMood, setWhatMood] = useState(true);
//     const transition = useTransition(whatMood, null, {
//         from: { opacity: 0 },
//         enter: { opacity: 1 },
//         leave: { opacity: 0 },
//     });

//     return (
//         <div>
//             {transition.map(({ item, key, props }) =>
//                 item ? (
//                     <animated.div key={key} style={props} className="flier">
//                         <img src="smile.png" />
//                     </animated.div>
//                 ) : (
//                     <animated.div key={key} style={props} className="flier">
//                         <img src="smile2.png" />
//                     </animated.div>
//                 )
//             )}
//             <h1 className="mood" onClick={() => setWhatMood(!whatMood)}>
//                 Change Mood
//             </h1>
//         </div>
//     );
// }
