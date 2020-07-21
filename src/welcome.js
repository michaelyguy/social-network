import React, { useState } from "react";
import About from "./about";
// import Toggle from "./toggle";
import { useSpring, animated } from "react-spring";
import Projects from "./projects";
import ProjectOne from "./projectone";
import Nav from "./nav";

export default function Welcome() {
    const [isNavOpen, setNavOpen] = useState(false);
    const navAnimation = useSpring({
        transform: isNavOpen
            ? `translate3d(0,0,0) scale(1)`
            : `translate3d(100%,0,0) scale(0.6)`,
    });

    const [showAbout, setShowAbout] = useState(false);
    const [projectIsVisible, setProjectIsVisible] = useState(false);

    const fadeHeader = useSpring({
        opacity: 1,
        from: { opacity: 0 },
    });

    const slideAbout = useSpring({
        opacity: showAbout ? 1 : 0,
        // color: showAbout ? "tomato" : "green",
        // transform: showAbout
        //     ? "translate3d(0,200px,0)"
        //     : "translate3d(0,-1050px,0)",
    });

    const toggleModal = () => {
        console.log("this is running!");
        setProjectIsVisible(true);
    };

    return (
        <div>
            <animated.header style={fadeHeader}>
                <h1>Guy Michaely</h1>
                <h1 onClick={() => setShowAbout(!showAbout)}>About</h1>
                <h1 className="menu-btn" onClick={() => setNavOpen(!isNavOpen)}>
                    Menu
                </h1>
            </animated.header>

            <Nav style={navAnimation} />
            <div className="flier">
                <img src="smile.png" />
            </div>
            <Projects toggleModal={toggleModal} />
            {projectIsVisible && <ProjectOne />}
            <animated.div style={slideAbout}>
                {/* <About setToggle={setToggle} toggle={isToggled} /> */}
                <About />
            </animated.div>
        </div>
    );
}
