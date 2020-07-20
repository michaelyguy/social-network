import React, { useState, useRef } from "react";
import About from "./about";
import Toggle from "./toggle";
import { useSpring, animated } from "react-spring";

export default function Welcome() {
    const [isToggled, setToggle] = useState(false);

    const fade = useSpring({
        opacity: 1,
        from: { opacity: 0 },
    });

    // const hideShow = useSpring({
    //     opacity: isToggled ? 1 : 0,
    // });

    return (
        <div>
            <animated.header style={fade}>
                <h1>Guy Michaely</h1>
                <h1 onClick={() => setToggle(!isToggled)} id="about">
                    About
                </h1>
            </animated.header>
            <Toggle />
            <div className="flier">
                <img src="smile.png" />
            </div>
            <About toggle={isToggled} />
        </div>
    );
}

// export default function Welcome() {
//     const [isToggled, setToggle] = useState(false);
//     const aboutRef = useRef();

//     const handleClick = () => {
//         aboutRef.current.style.visibility = "visible";
//     };

//     const fade = useSpring({
//         opacity: 1,
//         from: { opacity: 0 },
//     });

//     const hideShow = useSpring({
//         opacity: isToggled ? 1 : 0,
//     });

//     return (
//         <div>
//             <animated.header style={fade}>
//                 <h1>Guy Michaely</h1>
//                 <h1 onClick={handleClick} id="about">
//                     About
//                 </h1>
//             </animated.header>
//             {/* <Toggle /> */}
//             <div className="flier">
//                 <img src="smile.png" />
//             </div>
//             {/* <About /> */}
//             <About style={fade} elemRef={aboutRef} />
//         </div>
//     );
// }
