import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class ResetPassword extends React.Component {
    constructor() {
        super();
        this.state = { currentDisplay: 0, error: false };
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
        console.log("----THIS.STATE----");
        console.log(this.state);
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log("---THIS---");
        console.log(this);
        axios
            .post("/password/reset/start", this.state)
            .then((response) => {
                console.log("----RESPONSE IN POST AXIOS----");
                console.log(response);
                console.log(response.data);
                if (response.data.error == true) {
                    this.setState({
                        error: true,
                    });
                }
                location.replace("/");
            })
            .catch(function (err) {
                console.log("ERROR IN CATCH POST /RESET PASSWORD: ", err);
            });
    }
    getCurrentDisplay() {
        if (this.state.currentDisplay == 0) {
            return (
                <div>
                    {this.state.error && <h3>error sorry</h3>}
                    <input
                        name="email"
                        type="text"
                        placeholder="email"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <button onClick={(e) => this.handleSubmit(e)}>
                        Submit
                    </button>
                </div>
            );
        }
    }

    render() {
        return <div>{this.getCurrentDisplay()}</div>;
    }
}
//   constructor() {
//           super();
//           this.state = {
//               currentDisplay: displayOne

//           };
//       }
//       handleChange(e) {
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

//   getCurrentDisplay() {
// we want to put something in state that indicates which display we want to show
// we'll have to update this property in state whenever we want to show the next display. where in our code should we update this property in state???
//   if (displayOne) {
//       return (
//           <div>
//               <input
//             name="email"
//             type="text"
//             placeholder="email"
//             onChange={(e) => this.handleChange(e)}
//         />
//               <button onClick={(e) => this.handleSubmit(e)}>Submit</button>
//           </div>
//       )
//   } else if () {
//       return (
//           <div>
//               <input
//             name="code"
//             type="text"
//             placeholder="code"
//             onChange={(e) => this.handleChange(e)}
//         />
//                <input
//             name="newPassword"
//             type="text"
//             placeholder="new password"
//             onChange={(e) => this.handleChange(e)}
//         />
//               <button onClick={(e) => this.handleSubmit(e)}>Submit</button>
//           </div>
//       )

//   } else {
//       return (
//           <div>
//             <h3>Password reset</h3>
//           </div>
//       )

//   }
//   }
