/// hooks/useStatefulFields ///
import React, { useState } from "react";

//THE FUNCTION NAME HAVE TO START WITH THE WORD USER//
export function useStatefulFields() {
    const [values, setValues] = useState({});

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    return [values, handleChange];

    // function handleChange(e) {
    //     setValues({
    //         [e.target.name]: e.target.value,
    //     });
    // }
}
