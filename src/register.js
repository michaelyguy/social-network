import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import { useStatefulFields } from "./hooks/useStatefulFields";
import { useAuthSubmit } from "./hooks/useAuthSubmit";
import Draggable, { DraggableCore } from "react-draggable";

export default function Register() {
    const [values, handleChange] = useStatefulFields();
    const [error, handleClick] = useAuthSubmit("/register", values);

    return (
        <>
            <Draggable>
                <div className="card-wrapper-welcome">
                    <div id="card-header" className="card-header">
                        <div className="card-close">
                            <div className="minimize"></div>
                        </div>
                        <div className="card-title">Register</div>
                        <div className="card-move">
                            <img className="move-png" src="move.png" />
                        </div>{" "}
                    </div>
                    <div className="card-content">
                        {/* <img
                        src="register.png"
                        className="new-regsiter"
                        alt="register"
                    /> */}

                        <div className="inputs-fields">
                            {error && (
                                <p>Somthing went wrong. Please try again!</p>
                            )}
                            <input
                                name="first"
                                placeholder="First name"
                                onChange={handleChange}
                            />
                            <input
                                name="last"
                                placeholder="Last name"
                                onChange={handleChange}
                            />
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
                            <p className="login-link">
                                {" "}
                                already registered?{" "}
                                <Link to="/login">click here</Link>
                            </p>{" "}
                        </div>
                    </div>
                </div>
            </Draggable>
        </>
    );
}

// export default class Register extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {};
//     }
//     handleChange(e) {
//         this.setState({
//             [e.target.name]: e.target.value,
//         });
//         console.log("----THIS.STATE----");
//         console.log(this.state);
//     }
//     handleSubmit(e) {
//         e.preventDefault();
//         console.log("---THIS---");
//         console.log(this);
//         axios
//             .post("/register", this.state)
//             .then((response) => {
//                 console.log("----RESPONSE IN POST AXIOS----");
//                 console.log(response);
//                 console.log(response.data);
//                 location.replace("/");
//             })
//             .catch(function (err) {
//                 console.log("error ins POST /upload: ", err);
//             });
//     }
//     render() {
//         return (
//             <div className="inputs-fields">
//                 <input
//                     name="first"
//                     type="text"
//                     placeholder="first"
//                     onChange={(e) => this.handleChange(e)}
//                 />
//                 <input
//                     name="last"
//                     type="text"
//                     placeholder="last"
//                     onChange={(e) => this.handleChange(e)}
//                 />
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
//                 <button onClick={(e) => this.handleSubmit(e)}>Submit</button>
//                 <Link to="/login">Click here to Log in!</Link>
//             </div>
//         );
//     }
// }
