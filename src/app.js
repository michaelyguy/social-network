import React, { useState } from "react";
// import About from "./About";
import { useSpring, animated } from "react-spring";
// import Nav from "./Nav";
import Welcome from "./Welcome";
// import Toggle from "./Toggle";
// import Routes from "./Routes";
// import Modal from "./Modal";
import Accordion from "./Accordion";
// import Projects from "./Projects";
// import Gesture from "./Gesture";
// import Boxes from "./boxes";
import Ticker from "./Ticker";
import Flier from "./Flier";
import Petition from "./Petition";
import ImageBoard from "./ImageBoard";
import SocialNetwork from "./SocialNetwork";

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

    return (
        <animated.div style={fadeHeader}>
            <Ticker />
            <Accordion />
            <iframe
                className="clock"
                src="http://free.timeanddate.com/clock/i7dvxyp2/n37/fs48/tct/pct/th1"
                frameBorder="0"
                width="189"
                height="57"
                allowtransparency="true"
            ></iframe>

            {/* <Modal /> */}
            {/* <animated.header style={fadeHeader}>
                <h1>Guy Michaely</h1>
                <h1 onClick={() => setShowAbout(!showAbout)}>About</h1>
                <h3 className="menu-btn" onClick={() => setNavOpen(!isNavOpen)}>
                    Mav
                </h3>
            </animated.header> */}
            <header>
                {isNavOpen && (
                    <h3
                        className="menu-btn"
                        onClick={() => setNavOpen(!isNavOpen)}
                    >
                        {`->`} Please let me in
                    </h3>
                )}
            </header>
            <main>
                {/* <Projects /> */}
                <Petition />
                <ImageBoard />
                <SocialNetwork />

                {/* <Routes /> */}

                {/* <Toggle /> */}

                {/* <Nav style={navAnimation} /> */}

                {/* <Gesture /> */}

                {/* <Boxes /> */}

                {/* <div className="flier">
                    <img src="smile.png" />
                </div> */}

                <Welcome isOpen={isNavOpen} />

                <Flier />

                {/* <animated.div style={slideAbout}>
                    <About />
                </animated.div> */}
            </main>
        </animated.div>
    );
}
