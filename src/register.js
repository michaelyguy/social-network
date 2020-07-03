import React from "react";

// import Greetee from "./welcome";

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Kitty",
        };
    }
    render() {
        return (
            <div className="register">
                <input
                    name="first"
                    placeholder="first"
                    onChange={(e) => this.handleChange(e)}
                />
                <input
                    name="last"
                    placeholder="last"
                    onChange={(e) => this.handleChange(e)}
                />
                <input
                    name="email"
                    placeholder="email"
                    onChange={(e) => this.handleChange(e)}
                />
                <input
                    name="password"
                    placeholder="password"
                    onChange={(e) => this.handleChange(e)}
                />
                <button type="submit">Submit</button>
            </div>
        );
    }
}

// export default class Hello extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             name: "Kitty",
//         };
//     }
//     handleChange(e) {
//         this.setState({
//             name: e.target.value,
//         });
//     }
//     render() {
//         return (
//             <div
//                 className="awesome"
//                 style={{
//                     color: "tomato",
//                     textDecoration: "underline",
//                 }}
//             >
//                 Hello, <Greetee name={this.state.name} />!
//                 <p>Today is {this.props.day}</p>
//                 <input name="name" onChange={(e) => this.handleChange(e)} />
//                 <small>{this.state.name}</small>
//             </div>
//         );
//     }
// }
