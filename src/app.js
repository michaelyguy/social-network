import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import About from "./about";
import Welcome from "./Welcome";
import Ticker from "./Ticker";
import Flier from "./Flier";
import Petition from "./Petition";
import ImageBoard from "./ImageBoard";
import SocialNetwork from "./SocialNetwork";
// import Modal from "./Modal";
// import Accordion from "./Accordion";

export default function App() {
    // const [isWelcomeOpen, setWelcome] = useState(true);
    // const navAnimation = useSpring({
    //     transform: isNavOpen
    //         ? `translate3d(0,0,0) scale(1)`
    //         : `translate3d(100%,0,0) scale(0.6)`,
    // });

    //////ABOUT/////////
    const [isAboutOpen, setAbout] = useState(false);
    const aboutAnimation = useSpring({
        transform: isAboutOpen ? `translate3d(0,0,0)` : `translate3d(0,100%,0)`,
    });

    const fade = useSpring({
        opacity: 1,
        from: { opacity: 0 },
    });

    useEffect(() => {
        console.log("heyyy");
        document.body.classList.add("unscroll");
    });

    // const [showAbout, setShowAbout] = useState(false);
    // const slideAbout = useSpring({
    //     opacity: showAbout ? 1 : 0,
    // color: showAbout ? "tomato" : "green",
    // transform: showAbout
    //     ? "translate3d(0,200px,0)"
    //     : "translate3d(0,-1050px,0)",
    // });

    /////animation on the btn/////
    const [click, setClick] = useState(true);
    const { x } = useSpring({
        from: { x: 0 },
        x: click ? 1 : 0,
        config: { duration: 1000 },
    });

    return (
        <div>
            <Ticker />
            {/* <Accordion /> */}
            <iframe
                className="clock"
                src="https://free.timeanddate.com/clock/i7dvxyp2/n37/fs48/tct/pct/th1"
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

            {/* {isWelcomeOpen && (
                <animated.h3
                    style={fade}
                    className="let-me-in"
                    onClick={() => setWelcome(!isWelcomeOpen)}
                >
                    {`->`} Please let me in
                </animated.h3>
            )} */}

            <div onClick={() => setClick(!click)}>
                <animated.h3
                    style={{
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
                    className="abt-btn"
                    onClick={() => setAbout(!isAboutOpen)}
                >
                    About
                </animated.h3>
            </div>
            <Petition />
            <ImageBoard />
            <SocialNetwork />

            <About style={aboutAnimation} />
            <Welcome />
            <Flier />
        </div>
    );
}
