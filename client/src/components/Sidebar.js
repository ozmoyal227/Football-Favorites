import React, { useState, useEffect } from 'react';
import UserInterface from './UserInterface'
export default function Sidebar() {
    return (
        <div className="sidebar bg-dark">
            <UserInterface />
        </div>
    )
}