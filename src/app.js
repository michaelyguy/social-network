import React from "react";
import axios from "./axios";
import Uploader from "./uploader";
import Profile from "./profile";
import { BrowserRouter, Route } from "react-router-dom";
import OtherProfile from "./otherprofile";
import ProfilePic from "./profilepic";
import FindPeople from "./findpeople";
import { Link } from "react-router-dom";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false,
        };
        // console.log("----THIS.STATE IN APP-----");
        // console.log(this.state);
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
                officialBio: response.data.bio,
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
        console.log("new bio incoming: ", newBio);
        this.setState({
            officialBio: newBio,
        });
    }

    render() {
        return (
            <BrowserRouter>
                <div className="app-container">
                    <div className="header">
                        <img src="/logo.png" className="logo-small" />
                        <ProfilePic
                            first={this.state.first}
                            last={this.state.last}
                            profilePic={this.state.profilePic}
                            uploaderIsVisible={this.state.uploaderIsVisible}
                            toggleModal={this.state.toggleModal}
                            newProfilePic={this.state.newProfilePic}
                        />
                        <Link className="header-link" to="/users">
                            Find ppl!
                        </Link>
                        {this.state.uploaderIsVisible && (
                            <Uploader setImage={() => this.setImage()} />
                        )}
                    </div>

                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Profile
                                id={this.state.id}
                                first={this.state.first}
                                last={this.state.last}
                                profilePic={this.state.profilePic}
                                uploaderIsVisible={this.state.uploaderIsVisible}
                                officialBio={this.state.officialBio}
                                toggleModal={() => this.toggleModal()}
                                setImage={() => this.setImage()}
                                setBio={() => this.setBio()}
                            />
                        )}
                    />

                    <Route
                        path="/user/:id"
                        render={(props) => (
                            <OtherProfile
                                myId={this.state.id}
                                profilePic={this.state.profilePic}
                                key={props.match.url}
                                match={props.match}
                                history={props.history}
                            />
                        )}
                    />

                    <Route exact path="/users" render={() => <FindPeople />} />
                </div>
            </BrowserRouter>
        );
    }
}
