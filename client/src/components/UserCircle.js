import React, { useState, useEffect } from 'react';
import UserInterface from './UserInterface';
export default function UserCircle() {

    return (
        <div className='user-circle text-center'>
            <div className="dropdown-center d-flex align-items-end justify-content-center h-100">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                </button>
                <div className="dropdown-menu" >
                    <UserInterface />
                </div>
            </div>
        </div>
    )
}

