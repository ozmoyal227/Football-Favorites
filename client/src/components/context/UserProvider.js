import React, { useContext, createContext, useState } from "react";
import constants from "../../constants";

const UserContext = createContext({});

export function UserProvider({ children }) {


    const [user, setUser] = useState(constants.DEFAULT_USER);


    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )

}

export default UserContext;


