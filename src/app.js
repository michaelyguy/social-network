import React from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false,
        };
    }

    /// lifecyrcle methods - read! ///
    componentDidMount() {
        /// get info abt the logged in user ///
        /// (first, last, profile pic) ///
        /// modigy "users" table to have a profilePic ///
        axios.get("/user").then((response) => {});
        /// store response from server in state - log -> (this.state) and see the info ///
    }

    setImage(newProfilePic) {
        this.setState({
            profilePic: newProfilePic,
        });
    }

    toggleModal() {
        this.setState({
            uploaderIsVisible: true,
        });
    }

    render() {
        console.log("------THIS.STATE -> HAVE TO BE DEFINE------");
        console.log(this.state);
        return (
            <div>
                <h1>App</h1>
                <ProfilePic
                    first={this.state.first}
                    last={this.state.last}
                    profilePic={this.state.profilePic}
                    toggleModal={() => this.toggleModal()}
                />
                <p onClick={() => this.toggleModal()}>
                    Click me to toggle the modal!
                </p>
                {this.state.uploaderIsVisible && (
                    <Uploader setImage={() => this.setImage()} />
                )}
            </div>
        );
    }
}
