/// hooks/useStatefulFields ///
import React, { useState } from "react";

//THE FUNCTION NAME HAVE TO START WITH THE WORD USE//
export function useStatefulFields() {
    const [values, setValues] = useState({});

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    return [values, handleChange];
}
