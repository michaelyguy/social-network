import React from "react";
import axios from "./axios";
import Uploader from "./uploader";
import Profile from "./profile";
import { BrowserRouter, Route } from "react-router-dom";
import OtherProfile from "./otherprofile";

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
            // console.log("-----THIS.STATE----");
            // console.log(this.state);
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
    setBio(newBio) {
        this.setState({
            bio: newBio,
        });
    }

    render() {
        // console.log("------THIS.STATE IN APP------");
        // console.log(this.state);
        return (
            <BrowserRouter>
                <div className="app-container">
                    <img src="logo.png" className="logo-small" />
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
                    <Route
                        path="/user/:id"
                        component={(props) => (
                            <OtherProfile
                                id={this.state.id}
                                first={this.state.firt}
                                last={this.state.last}
                                profilePic={this.state.profilePic}
                                bio={this.state.bio}
                            />
                        )}
                    />
                </div>
            </BrowserRouter>
        );
    }
}
