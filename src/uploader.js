import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    /// when the user selects an image, store this img in state ///
    /// REFERENCE TO MAGE BOARD CODE HERE - /upload /// molter, s3, uidsafepath ///
    //// store the file in FormData -> then we can send the file off to the server.

    //// SEE FUNCTION FROM CLASS DEMO /////

    render() {
        return <div>uploader</div>;
    }
}
