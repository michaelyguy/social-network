import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation,
} from "react-router-dom";
import { animated, useTransition } from "react-spring";
import One from "./One";
import Two from "./Two";
import Three from "./Three";

export default function Routes() {
    return (
        <Router>
            <ul className="router-nav">
                <NavLink to="/">One</NavLink>
                <NavLink to="/two">Two</NavLink>
                <NavLink to="/three">Three</NavLink>
            </ul>
            <Main />
        </Router>
    );
}

const Main = () => {
    const location = useLocation();
    // console.log("location: ", location);

    const transitions = useTransition(location, (location) => location.key, {
        from: {
            opacity: 0,
            position: "absolute",
            width: "100%",
            transform: "translate3d(100%,0,0)",
        },
        enter: { opacity: 1, transform: "translate3d(0,0,0)" },
        leave: { opacity: 0, transform: "translate3d(-50%,0,0)" },
    });

    return transitions.map(({ item, props: transition, key }) => (
        <animated.div key={key} style={transition}>
            <Switch location={item}>
                <Route exact path="/" component={One} />
                <Route exact path="/two" component={Two} />
                <Route exact path="/three" component={Three} />
            </Switch>
        </animated.div>
    ));
};

function NavLink(props) {
    return (
        <li>
            <Link {...props} />
        </li>
    );
}
