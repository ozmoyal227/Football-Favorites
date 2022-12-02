import React, { useContext, createContext, useState, useEffect } from "react";
import constants from "../../constants";
// import jwt_decode from "jwt-decode";

const UserContext = createContext({});

export function UserProvider({ children }) {
    // const [isExpired, setIsExpired] = useState(true);
    const currUser = JSON.parse(localStorage.getItem('user'));


    // useEffect(() => {
    //     const tokenExpirationTime = currUser && jwt_decode(currUser.token.split(" ")[1]).exp * 1000;
    //     if (Date.now() >= tokenExpirationTime)
    //         setIsExpired(true);
    //     else
    //         setIsExpired(false);


    // }, [])


    const [user, setUser] = useState(
        currUser ?
            currUser :
            constants.DEFAULT_USER
    );


    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )

}

export default UserContext;


