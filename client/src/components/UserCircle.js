import React, { useState, useEffect, useContext } from 'react';
import UserContext from './context/UserProvider';
import UserInterface from './UserInterface';
export default function UserCircle() {

    const { user } = useContext(UserContext);
    return (
        <div className='user-circle text-center text-white'>
            <div className="user-img mx-auto mt-1">

            </div>
            <div className="">
                <h5 className="m-0 username">{user.username !== 'default user' ? user.username : 'Not Logged In'}</h5>
                <p className="m-0 state-msg">{user.username !== 'default user' ? 'Your Leagues' : 'click here'}</p>
            </div>
            <div className="dropdown-center">
                <button className="btn btn-secondary dropdown-toggle dropdown-btn  p-0" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false" >
                </button>
                <div className="dropdown-menu user-menu" >
                    <UserInterface />
                </div>
            </div>
        </div>
    )
}

