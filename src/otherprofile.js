import React from "react";
import axios from "./axios";
import FriendsButton from "./friendsbutton";
// import { Link } from "react-router-dom";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        axios
            .get(`/api/user/${this.props.match.params.id}`)
            .then((response) => {
                // console.log("----RESPONSE IN GET/USER OTHERPROFILE---");
                // console.log(response.data);
                this.setState(
                    {
                        id: response.data.id,
                        first: response.data.first,
                        last: response.data.last,
                        profilePic: response.data.imgurl,
                        officialBio: response.data.bio,
                    }
                    // () =>
                    //     console.log(
                    //         "------THIS.STATE IN OTHERPROFILE------",
                    //         this.state
                    //     )
                );
            });
    }

    render() {
        return (
            <div className="user-big">
                <div className="user-info">
                    <img className="userpic" src={this.state.profilePic} />
                    <div className="user-info-text">
                        <h2>
                            {this.state.first} {this.state.last}
                        </h2>
                        <p>{this.state.officialBio}</p>
                    </div>
                </div>
                <FriendsButton myId={this.props.myId} id={this.state.id} />
            </div>
        );
    }
}
