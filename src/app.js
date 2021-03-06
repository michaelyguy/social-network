import React from "react";
import axios from "./axios";
import Uploader from "./uploader";
import Profile from "./profile";
import { BrowserRouter, Route } from "react-router-dom";
import OtherProfile from "./otherprofile";
import ProfilePic from "./profilepic";
import FindPeople from "./findpeople";
import Friends from "./friends";
import { Link } from "react-router-dom";
import Chat from "./chat";
// import WindowBox from "./Window-box";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false,
        };
        this.toggleModal = this.toggleModal.bind(this);
        // console.log("----THIS.STATE IN APP-----");
        // console.log(this.state);
    }

    /// lifecyrcle methods - read! ///
    componentDidMount() {
        axios.get("/user").then((response) => {
            // console.log("----RESPONSE IN GET/USER---");
            // console.log(response.data);
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

        // var boxes = document.querySelectorAll(".card-header");
        // console.log(boxes, "box");
        // boxes[0].addEventListener("mousemove", function (event) {
        //     boxes.style.left = event.clientX - 50 + "px";
        //     boxes.style.top = event.clientY - 50 + "px";
        // });
    }

    setImage(newProfilePic) {
        this.setState({
            profilePic: newProfilePic,
        });
    }

    toggleModal() {
        console.log("this is running!");
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
                <div className="container">
                    <div className="card-wrapper-logo">
                        <div id="card-header" className="card-header">
                            <div className="card-close">
                                <div className="minimize"></div>
                            </div>{" "}
                            <div className="card-title">Logo</div>
                            <div className="card-move">
                                <img className="move-png" src="move.png" />
                            </div>
                        </div>
                        <div className="card-content">
                            <h1 className="logo">Anti Social</h1>
                        </div>
                    </div>

                    <div className="card-wrapper-main">
                        <div id="card-header" className="card-header">
                            <div className="card-close">
                                <div className="minimize"></div>
                            </div>{" "}
                            <div className="card-title">Main</div>
                            <div className="card-move">
                                <img className="move-png" src="move.png" />
                            </div>
                        </div>
                        <div className="card-content">
                            <img className="main" src="main.png" />
                        </div>
                    </div>

                    <ProfilePic
                        first={this.state.first}
                        last={this.state.last}
                        profilePic={this.state.profilePic}
                        uploaderIsVisible={this.state.uploaderIsVisible}
                        toggleModal={this.toggleModal}
                        newProfilePic={this.state.newProfilePic}
                    />

                    {this.state.uploaderIsVisible && (
                        <Uploader setImage={() => this.setImage()} />
                    )}

                    <Link className="chat-link" to="/chat">
                        <img src="window.png" /> <p>Chat</p>
                    </Link>
                    <Link className="users-link " to="/users">
                        <img className="comp-png" src="compp.png" />
                        <p>Find people</p>
                    </Link>
                    <Link className="friends-link" to="/friends">
                        <img src="fold.png" /> <p>Friends</p>
                    </Link>
                    <Link className="profile-link" to="/">
                        <img src="comp.png" /> <p>My profile</p>
                    </Link>

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

                    <Route path="/friends" render={() => <Friends />} />
                    <Route exact path="/users" render={() => <FindPeople />} />
                    <Route path="/chat" component={Chat} />
                </div>
            </BrowserRouter>
        );
    }
}
