import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

import { useStatefulFields } from "./hooks/useStatefulFields";
import { useAuthSubmit } from "./hooks/useAuthSubmit";

export default function Login() {
    const [values, handleChange] = useStatefulFields();
    const [error, handleClick] = useAuthSubmit("/login", values);

    return (
        <div className="inputs-fields">
            {error && <p>somthing broke</p>}
            <input name="email" placeholder="email" onChange={handleChange} />
            <input
                name="password"
                type="password"
                placeholder="password"
                onChange={handleChange}
            />
            <button onClick={handleClick}>Submit</button>
            <Link to="/password/reset/start">Forgot your password?</Link>
        </div>
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
