import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import { useStatefulFields } from "./hooks/useStatefulFields";
import { useAuthSubmit } from "./hooks/useAuthSubmit";

export default function Register() {
    const [values, handleChange] = useStatefulFields();
    const [error, handleClick] = useAuthSubmit("/register", values);

    return (
        <div className="inputs-fields">
            <img src="register.png" className="new-regsiter" alt="register" />
            {/* {error && <p>Somthing went wrong. Please try again!</p>}
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
            <input name="email" placeholder="Email" onChange={handleChange} />
            <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
            />
            <button onClick={handleClick}>Submit</button>
            <p>
                {" "}
                already registered? <Link to="/login">click here</Link>
            </p> */}

            {/* DRAG
            <div id="mydiv">
                <div id="mydivheader">Click here to move</div>
                <p>Move</p>
                <p>this</p>
                <p>DIV</p>
            </div> */}
        </div>
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
