import React from "react";

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first: "",
            last: "",
            email: "",
            password: "",
        };
    }
    handleChange(e) {
        this.setState({
            first: e.target.value,
            last: e.target.value,
            email: e.target.value,
            password: e.target.value,
        });
    }
    submitRegister() {
        /// axios req. here ///
    }
    render() {
        return (
            <div className="register">
                <form method="POST">
                    <input
                        name="first"
                        type="text"
                        placeholder="first"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <input
                        name="last"
                        type="text"
                        placeholder="last"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <input
                        name="email"
                        type="text"
                        placeholder="email"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="password"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <button onClick={this.submitRegister} type="submit">
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}
