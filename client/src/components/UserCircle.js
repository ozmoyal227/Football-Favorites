import React, { useState, useEffect } from 'react';
import UserInterface from './UserInterface';
export default function UserCircle() {

    return (
        <div className='user-circle text-center text-white'>
            <div className="user-img mx-auto mt-1">

            </div>
            <div className="">
                <h5 className="m-0 username">Username</h5>
                <p className="m-0 state-msg">Your favorites</p>
            </div>
            <div className="dropdown-center">
                <button className="btn btn-secondary dropdown-toggle p-0" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false" >
                </button>
                <div className="dropdown-menu" >
                    <UserInterface />
                </div>
            </div>
        </div>
    )
}

