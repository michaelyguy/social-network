// hooks/useAuthSubmit.js
//// only for login and register routes ////
import React, { useState } from "react";
import axios from "../axios";

export function useAuthSubmit(url, values) {
    const [error, setError] = useState(false);

    const handleClick = () => {
        axios
            .post(url, values)
            .then(({ data }) => {
                if (data.success) {
                    location.replace("/");
                } else {
                    setError(true);
                }
            })
            .catch((err) => {
                console.log("ERROR IN HANDLE CLICK", err);
                setError(true);
            });
    };

    return [error, handleClick];
}
