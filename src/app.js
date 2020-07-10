import React from "react";
import axios from "./axios";
import Uploader from "./uploader";
import Profile from "./profile";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false,
            id: "",
            first: "",
            last: "",
            profilePic: "",
            bio: "",
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
                id: response.data.id,
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
    ///// DO SOMETHING HERE //////
    setBio(newBio) {
        this.setState({
            bio: newBio,
        });
    }
    ///// DO SOMETHING HERE //////

    render() {
        console.log("------THIS.STATE -> HAVE TO BE DEFINE------");
        console.log(this.state);
        return (
            <div className="app-container">
                <img src="logo.png" className="logo-small" />
                {/* <h1>YOU SEE APP COMPONENT</h1> */}
                <Profile
                    id={this.state.id}
                    first={this.state.first}
                    last={this.state.last}
                    profilePic={this.state.profilePic}
                    uploaderIsVisible={this.state.uploaderIsVisible}
                    bio={this.state.bio}
                    toggleModal={() => this.toggleModal()}
                    setImage={() => this.setImage()}
                    setBio={() => this.setBio()}
                />

                {this.state.uploaderIsVisible && (
                    <Uploader setImage={() => this.setImage()} />
                )}
            </div>
        );
    }
}
