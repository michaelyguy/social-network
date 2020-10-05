import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import About from "./about";
import Welcome from "./Welcome";
import Ticker from "./Ticker";
import Flier from "./Flier";
import Petition from "./Petition";
import ImageBoard from "./ImageBoard";
import SocialNetwork from "./SocialNetwork";

export default function App() {
    useEffect(() => {
        document.body.classList.add("unscroll");
    }, []);
    //////ABOUT/////////
    const [isAboutOpen, setAbout] = useState(false);
    const [windowHeight, setHeight] = useState(0);

    // const [isAboutTransitionEnd, setAboutTransition] = useState(true);

    function openAbout() {
        setAbout(!isAboutOpen);
        document.body.classList.add("unscroll");
        setHeight(window.scrollY);
        console.log("windowfddsfdsf", windowHeight);
    }

    function closeAbout() {
        setAbout(!isAboutOpen);
        document.body.classList.remove("unscroll");
    }

    const aboutAnimation = useSpring({
        transform: isAboutOpen ? `translate3d(0,0,0)` : `translate3d(0,100%,0)`,
    });

    /////animation on the btn/////
    const [click, setClick] = useState(true);
    const { x } = useSpring({
        from: { x: 0 },
        x: click ? 1 : 0,
        config: { duration: 1000 },
    });

    return (
        <>
            <div>
                <Ticker />
                <iframe src="https://free.timeanddate.com/clock/i7dvxyp2/n37/fs48/tct/pct/th1"></iframe>

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
                        <>
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
                            <animated.h1>
                                <a
                                    className="lets-talk"
                                    href="mailto: michaelyguy@gmail.com"
                                >
                                    Let's talk!
                                </a>
                            </animated.h1>
                        </>
                    )}
                </div>
                <div
                    style={{ top: -windowHeight }}
                    className={isAboutOpen ? "stuck" : ""}
                >
                    <Petition />
                    <ImageBoard />
                    <SocialNetwork />
                </div>
                <Welcome />
                <Flier />
            </div>
            <About style={aboutAnimation} />
        </>
    );
}
