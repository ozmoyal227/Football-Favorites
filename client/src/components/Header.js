import React, { useState, useEffect } from 'react';
import RightSideHeader from './RightSideHeader';
import UserCircle from './UserCircle';

export default function Header() {

    return (

        <div className='header d-flex sticky-top'>
            <UserCircle />
            <RightSideHeader />
        </div>
    )
}

