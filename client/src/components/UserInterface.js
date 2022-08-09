import React, { useState, useEffect, useContext } from 'react';
import Login from './Login';
import Register from './Register';
import Favorites from './Favorites'
import UserContext from './context/UserProvider';


export default function UserInterface() {

    const { user } = useContext(UserContext);

    return (
        <div className="user-interface">
            {
                user.token ?
                    < div className="d-flex">
                        <Favorites />
                    </div > :
                    < div className="d-flex user-container" >
                        <Login />
                        <hr></hr>
                        <Register />
                    </div >
            }
        </div>
    )


}