import React, { useState } from "react";
import { useTransition, animated } from "react-spring";

const Toggle = () => {
    const [items, setItems] = useState([
        {
            letter: "S",
            key: 1,
        },
        {
            letter: "C",
            key: 2,
        },
        {
            letter: "O",
            key: 3,
        },
        {
            letter: "O",
            key: 4,
        },
        {
            letter: "T",
            key: 5,
        },
    ]);

    const transition = useTransition(items, (item) => item.key, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });

    return (
        <div>
            {transition.map(({ item, key, props }) => (
                <animated.h1 style={props} key={key}>
                    {item.letter}
                </animated.h1>
            ))}
            <button
                onClick={() =>
                    setItems([
                        {
                            letter: "S",
                            key: 1,
                        },
                    ])
                }
            >
                Toggle
            </button>
        </div>
    );
};

export default Toggle;

///// EXAPLE OF TOGGELING BETWEEN TWO WORDS ////////

// const Toggle = () => {
//     const [isToggled, setToggle] = useState(false);

//     const transition = useTransition(isToggled, null, {
//         from: { opacity: 0 },
//         enter: { opacity: 1 },
//         leave: { opacity: 0 },
//     });

//     return (
//         <div>
//             {transition.map(({ item, key, props }) =>
//                 item ? (
//                     <animated.h1 style={props}>Hello</animated.h1>
//                 ) : (
//                     <animated.h1 style={props}>Bye</animated.h1>
//                 )
//             )}
//             <button onClick={() => setToggle(!isToggled)}>Toggle</button>
//         </div>
//     );
// };

// export default Toggle;

////TOGGLE BTN EXAMPLE /////

// const Toggle = () => {
//     const [isToggled, setToggle] = useState(false);

//     const { color, y } = useSpring({
//         // opacity: isToggled ? 1 : 0,
//         color: isToggled ? "tomato" : "green",
//         y: isToggled ? 0 : 1,
//     });
//     return (
//         <div>
//             <animated.h1
//                 style={{
//                     transform: y
//                         .interpolate({
//                             range: [0, 0.25, 0.5, 0.75, 1],
//                             output: [0, -25, -50, -100, 0],
//                         })
//                         .interpolate((y) => `translate3d(0, ${y}px, 0)`),
//                     color,
//                 }}
//             >
//                 Hello
//             </animated.h1>
//             <button onClick={() => setToggle(!isToggled)}>Toggle</button>
//         </div>
//     );
// };

// export default Toggle;
