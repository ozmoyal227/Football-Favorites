import React, { useState, useEffect } from 'react';
import BackHeader from './BackHeader';
import UserCircle from './UserCircle';

export default function Header() {

    return (

        <div className='header d-flex justify-content-center sticky-top'>
            <UserCircle />
            <BackHeader />
        </div>
    )
}

