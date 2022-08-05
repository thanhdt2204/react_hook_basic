import { useState } from 'react';
import UserContext from "./UserContext";

const UserContextProvider = (props) => {

    const [isSaveSuccess, setSaveSuccess] = useState(false);

    return (
        <UserContext.Provider value={
            {
                isSaveSuccess: isSaveSuccess,
                setSaveSuccess: (value) => setSaveSuccess(value)
            }
        }>
            {props.children}
        </UserContext.Provider>
    )

}

export default UserContextProvider;