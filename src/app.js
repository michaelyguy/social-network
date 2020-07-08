import React from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
// import Profile from "./profile";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false,
            first: "",
            last: "",
            profilePic: "",
            toggleModal: "",
        };
    }

    /// lifecyrcle methods - read! ///
    componentDidMount() {
        axios.get("/user").then((response) => {
            console.log("----RESPONSE IN GET/USER---");
            console.log(response.data);
            this.setState({
                first: response.data.first,
                last: response.data.last,
                profilePic: response.data.imgurl,
            });
            console.log("-----THIS.STATE----");
            console.log(this.state);
        });
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
            <div className="container">
                <img src="logo.png" className="logo-small" />
                <h1>Hello from App</h1>
                {/* <Profile
                first={this.state.first}
                last={this.state.last}
                profilePic={this.state.profilePic}
                /> */}

                <ProfilePic
                    first={this.state.first}
                    last={this.state.last}
                    profilePic={this.state.profilePic}
                    toggleModal={() => this.toggleModal()}
                />
                {this.state.uploaderIsVisible && (
                    <Uploader setImage={() => this.setImage()} />
                )}
            </div>
        );
    }
}
