import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isTextEdited: false,
            user: [],
            userInput: "",
        };
        console.log("----PROPS IN BIOEDITOR----");
        console.log(props);
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        axios
            .post("/bio/editor", this.state)
            .then((response) => {
                console.log("----RESPONSE IN POST/BIO EDITOR----");
                console.log(response);
                this.props.setBio(response.data.bio);
                location.replace("/");
            })
            .catch(function (err) {
                console.log("ERROR IN /BIO/EDITOR: ", err);
            });
    }

    showBioArea(e) {
        e.preventDefault();
        this.setState({
            isTextEdited: true,
        });
    }
    render() {
        if (this.state.isTextEdited) {
            return (
                <div className="bio-box">
                    <textarea
                        name="bioText"
                        defaultValue={this.props.officialBio}
                        onChange={(e) => this.handleChange(e)}
                    />
                    <button
                        className="bio-btn"
                        onClick={(e) => this.handleSubmit(e)}
                    >
                        Save
                    </button>
                </div>
            );
        } else {
            if (this.props.officialBio) {
                return (
                    <>
                        <div className="user-info-text info">
                            <p>{this.props.officialBio}</p>
                        </div>
                        <button
                            className="bio-btn"
                            onClick={(e) => this.showBioArea(e)}
                        >
                            Edit bio
                        </button>
                    </>
                );
            } else {
                return (
                    <div>
                        <button
                            className="bio-btn"
                            onClick={(e) => this.showBioArea(e)}
                        >
                            Add bio
                        </button>
                    </div>
                );
            }
        }
    }
}

// JUST IN CASE

// import React from "react";
// import axios from "./axios";

// export default class BioEditor extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isTextEdited: false,
//             user: [],
//             userInput: "",
//         };
//         console.log("----PROPS IN BIOEDITOR----");
//         console.log(props);
//     }
//     handleChange(e) {
//         this.setState({
//             [e.target.name]: e.target.value,
//         });
//     }
//     handleSubmit(e) {
//         e.preventDefault();
//         axios
//             .post("/bio/editor", this.state)
//             .then((response) => {
//                 console.log("----RESPONSE IN POST/BIO EDITOR----");
//                 console.log(response);
//                 this.props.setBio(response.data.bio);
//                 location.replace("/");
//             })
//             .catch(function (err) {
//                 console.log("ERROR IN /BIO/EDITOR: ", err);
//             });
//     }

//     showBioArea(e) {
//         e.preventDefault();
//         this.setState({
//             isTextEdited: true,
//         });
//     }
//     render() {
//         if (this.state.isTextEdited) {
//             return (
//                 <div>
//                     <textarea
//                         name="bioText"
//                         defaultValue={this.props.officialBio}
//                         onChange={(e) => this.handleChange(e)}
//                     />
//                     <button
//                         className="bio-btn"
//                         onClick={(e) => this.handleSubmit(e)}
//                     >
//                         Save
//                     </button>
//                 </div>
//             );
//         } else {
//             if (this.props.officialBio) {
//                 return (
//                     <div>
//                         <p>{this.props.officialBio}</p>
//                         <button
//                             className="bio-btn"
//                             onClick={(e) => this.showBioArea(e)}
//                         >
//                             Edit bio
//                         </button>
//                     </div>
//                 );
//             } else {
//                 return (
//                     <div>
//                         <p onClick={(e) => this.showBioArea(e)}>Add bio</p>
//                     </div>
//                 );
//             }
//         }
//     }
// }
