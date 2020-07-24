import React, { useState } from "react";
import About from "./About";
import { useSpring, animated } from "react-spring";
import Projects from "./Projects";
import ProjectOne from "./Projectone";
import Nav from "./Nav";
import Checkout from "./Checkout";
// import Toggle from "./Toggle";
import Routes from "./Routes";
import Modal from "./Modal";
import Accordion from "./Accordion";
import Waypoints from "./Waypoints";
import Gesture from "./Gesture";
import Boxes from "./boxes";
import Ticker from "./Ticker";

export default function App() {
    //// NAVIGATION /////
    const [isNavOpen, setNavOpen] = useState(true);
    const navAnimation = useSpring({
        transform: isNavOpen
            ? `translate3d(0,0,0) scale(1)`
            : `translate3d(100%,0,0) scale(0.6)`,
    });

    const fadeHeader = useSpring({
        opacity: 1,
        from: { opacity: 0 },
    });

    ///// ANIMATION FOR ABOUT SLIDE //////
    const [showAbout, setShowAbout] = useState(false);
    const slideAbout = useSpring({
        opacity: showAbout ? 1 : 0,
        // color: showAbout ? "tomato" : "green",
        // transform: showAbout
        //     ? "translate3d(0,200px,0)"
        //     : "translate3d(0,-1050px,0)",
    });

    //// TOGGEL A SINGLE PROJECT PAGE /////
    const [projectIsVisible, setProjectIsVisible] = useState(false);

    const toggleModal = () => {
        console.log("this is running!");
        setProjectIsVisible(true);
    };

    return (
        <div>
            <Ticker />
            <Accordion />

            <iframe
                className="clock"
                src="http://free.timeanddate.com/clock/i7dvxyp2/n37/fs48/tct/pct/th1"
                frameborder="0"
                width="189"
                height="57"
                allowTransparency="true"
            ></iframe>

            {/* <Modal /> */}

            {/* <animated.header style={fadeHeader}>
                <h1>Guy Michaely</h1>
                <h1 onClick={() => setShowAbout(!showAbout)}>About</h1>
                <h3 className="menu-btn" onClick={() => setNavOpen(!isNavOpen)}>
                    Mav
                </h3>
            </animated.header> */}

            <animated.header style={fadeHeader}>
                <h3 className="menu-btn" onClick={() => setNavOpen(!isNavOpen)}>
                    -> Please let me in
                </h3>
            </animated.header>

            <main>
                <Waypoints />

                {/* <Routes /> */}

                {/* <Toggle /> */}

                {/* <Nav style={navAnimation} /> */}

                {/* <Gesture /> */}

                {/* <Boxes /> */}

                <div className="flier">
                    <img src="smile.png" />
                </div>

                {/* <Checkout isOpen={isNavOpen} /> */}

                {/* <Projects toggleModal={toggleModal} /> */}
                {/* {projectIsVisible && <ProjectOne />} */}

                {/* <animated.div style={slideAbout}>
                    <About />
                </animated.div> */}
            </main>
        </div>
    );
}
