// import React, { useState } from "react";
// import { Waypoint } from "react-waypoint";
// import { animated, useSpring, config } from "react-spring";

// export default function Waypoints() {
//     const [on, toggle] = useState(false);
//     const animation = useSpring({
//         opacity: on ? 1 : 0,
//         transform: on ? "translate3d(0,0,0)" : "translate3d(0,50%,0)",
//         config: config.molasses,
//     });

//     return (
//         <div>
//             <animated.div style={animation} id="projects-container">
//                 <div className="project">
//                     <h1>project1</h1>
//                     <p>few words</p>
//                 </div>
//                 <div className="project">
//                     <h1>project2</h1>
//                     <p>few words</p>
//                 </div>
//                 <div className="project">
//                     <h1>project3</h1>
//                     <p>few words</p>
//                 </div>
//                 <div className="project">
//                     <h1>project4</h1>
//                     <p>few words</p>
//                 </div>

//                 <Waypoint
//                     // bottomOffset="80%"
//                     onEnter={() => {
//                         if (!on) toggle(true);
//                     }}
//                 />
//             </animated.div>
//         </div>
//     );
// }

//////// shotting project end ////////

import React, { useState } from "react";
import { Waypoint } from "react-waypoint";
import { animated, useSpring, config } from "react-spring";

const Waypoints = () => {
    const [one, toggleOne] = useState(false);
    const animation = useSpring({
        opacity: one ? 1 : 0,
        transform: one ? "translate3d(0,0,0)" : "translate3d(50%,0,0)",
        config: config.wobbly,
    });

    const [two, toggleTwo] = useState(false);
    const animationTwo = useSpring({
        opacity: two ? 1 : 0,
        transform: two ? "translate3d(0,0,0)" : "translate3d(-50%,0,0)",
        config: config.wobbly,
    });

    const [three, toggleThree] = useState(false);
    const animationThree = useSpring({
        opacity: three ? 1 : 0,
        transform: three ? "translate3d(0,0,0)" : "translate3d(50%,0,0)",
        config: config.wobbly,
    });

    return (
        <div className="waypoints">
            <Waypoint
                bottomOffset="30%"
                onEnter={() => {
                    if (!one) toggleOne(true);
                }}
            />
            <animated.div style={animation} className="project-wrapper-one">
                <div className="project-box">
                    <div className="img-project" />
                    <div className="project-text">
                        <h1>Project One</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Nullam euismod felis quis ultrices eleifend.
                            Quisque placerat vehicula purus, at dapibus mi
                            dignissim at. In mi ex, consectetur quis vulputate
                            id, blandit quis nisi. Mauris nec urna vel nisl
                            fringilla iaculis. Nullam feugiat interdum ante
                            vitae lobortis. Aenean fringilla leo a purus egestas
                        </p>
                    </div>
                </div>
            </animated.div>
            <Waypoint
                bottomOffset="40%"
                onEnter={() => {
                    if (!two) toggleTwo(true);
                }}
            />

            <animated.div style={animationTwo} className="project-wrapper-two">
                <div className="project-box">
                    <div className="img-project" />
                    <div className="project-text">
                        <h1>Project Two</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Nullam euismod felis quis ultrices eleifend.
                            Quisque placerat vehicula purus, at dapibus mi
                            dignissim at. In mi ex, consectetur quis vulputate
                            id, blandit quis nisi. Mauris nec urna vel nisl
                            fringilla iaculis. Nullam feugiat interdum ante
                            vitae lobortis. Aenean fringilla leo a purus egestas
                        </p>
                    </div>
                </div>
            </animated.div>

            <Waypoint
                bottomOffset="30%"
                onEnter={() => {
                    if (!three) toggleThree(true);
                }}
            />

            <animated.div
                style={animationThree}
                className="project-wrapper-three"
            >
                <div className="project-box">
                    <div className="img-project" />
                    <div className="project-text">
                        <h1>Project Three</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Nullam euismod felis quis ultrices eleifend.
                            Quisque placerat vehicula purus, at dapibus mi
                            dignissim at. In mi ex, consectetur quis vulputate
                            id, blandit quis nisi. Mauris nec urna vel nisl
                            fringilla iaculis. Nullam feugiat interdum ante
                            vitae lobortis. Aenean fringilla leo a purus egestas
                        </p>
                    </div>
                </div>
            </animated.div>
        </div>
    );
};

export default Waypoints;
