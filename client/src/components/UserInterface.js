import React, { useState, useEffect } from 'react';
import Login from './Login';
import Register from './Register';
export default function UserInterface() {


    return (
        <div className="d-md-flex">
            <Login />
            <hr></hr>
            <Register />
        </div>

    )


}