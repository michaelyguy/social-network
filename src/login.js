import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

import { useStatefulFields } from "./hooks/useStatefulFields";
import { useAuthSubmit } from "./hooks/useAuthSubmit";

export default function Login() {
    const [values, handleChange] = useStatefulFields();
    const [error, handleClick] = useAuthSubmit("/login", values);

    return (
        <>
            {/* <img
                src="profile-pic.png"
                className="new-profile-pic"
                alt="Profile-pic"
            /> */}
            {/* <img src="login.png" className="new-regsiter" alt="register" /> */}

            <div className="card-wrapper-welcome">
                <div id="card-header" className="card-header">
                    <div className="card-close">
                        <div className="minimize"></div>
                    </div>{" "}
                    <div className="card-title">Login</div>
                    <div className="card-move">
                        <img className="move-png" src="move.png" />
                    </div>{" "}
                </div>
                <div className="card-content"></div>

                <div className="inputs-fields">
                    {error && <p>Somthing went wrong. Please try again!</p>}
                    <input
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />
                    <button onClick={handleClick}>Submit</button>
                    <p className="password-link">
                        <Link to="/password/reset/start">
                            Forgot your password?
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}

// export default class Login extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             email: "",
//             password: "",
//             error: false,
//         };
//     }
//     handleChange(e) {
//         this.setState({
//             [e.target.name]: e.target.value,
//         });
//         // console.log("----THIS.STATE----");
//         // console.log(this.state);
//     }
//     handleSubmit(e) {
//         e.preventDefault();
//         console.log("---THIS---");
//         console.log(this);
//         axios
//             .post("/login", this.state)
//             .then((response) => {
//                 console.log("----RESPONSE IN POST AXIOS----");
//                 console.log(response);
//                 console.log(response.data);
//                 location.replace("/");
//             })
//             .catch(function (err) {
//                 console.log("ERROR IN CATCH POST /LOGIN: ", err);
//             });
//     }
//     render() {
//         return (
//             <div className="inputs-fields">
//                 <input
//                     name="email"
//                     type="text"
//                     placeholder="email"
//                     onChange={(e) => this.handleChange(e)}
//                 />
//                 <input
//                     name="password"
//                     type="password"
//                     placeholder="password"
//                     onChange={(e) => this.handleChange(e)}
//                 />
//                 <button onClick={(e) => this.handleSubmit(e)}>Login</button>
//                 <Link to="/password/reset/start">Forgot your password?</Link>
//             </div>
//         );
//     }
// }
