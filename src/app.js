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

export default function App() {
    //////ABOUT/////////
    const [isAboutOpen, setAbout] = useState(false);

    const aboutAnimation = useSpring({
        transform: isAboutOpen ? `translate3d(0,0,0)` : `translate3d(0,100%,0)`,
    });

    useEffect(() => {
        document.body.classList.add("unscroll");
    }, []);

    function openAbout() {
        console.log("open clicked");
        setAbout(!isAboutOpen);
        document.body.classList.add("unscroll");
    }

    function closeAbout() {
        console.log("closed clicked");
        setAbout(!isAboutOpen);
        document.body.classList.remove("unscroll");
    }

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
            <iframe
                className="clock"
                src="https://free.timeanddate.com/clock/i7dvxyp2/n37/fs48/tct/pct/th1"
                frameBorder="0"
                width="189"
                height="57"
                allowtransparency="true"
            ></iframe>

            <div onClick={() => setClick(!click)}>
                {!isAboutOpen && (
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
                                    output: [
                                        1,
                                        0.97,
                                        0.9,
                                        1.1,
                                        0.9,
                                        1.1,
                                        1.03,
                                        1,
                                    ],
                                })
                                .interpolate((x) => `scale(${x})`),
                        }}
                        className="abt-btn"
                        onClick={openAbout}
                    >
                        About
                    </animated.h3>
                )}
                {isAboutOpen && (
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
                                    output: [
                                        1,
                                        0.97,
                                        0.9,
                                        1.1,
                                        0.9,
                                        1.1,
                                        1.03,
                                        1,
                                    ],
                                })
                                .interpolate((x) => `scale(${x})`),
                        }}
                        className="abt-btn"
                        onClick={closeAbout}
                    >
                        Close
                    </animated.h3>
                )}
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
