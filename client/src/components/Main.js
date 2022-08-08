import React, { useState, useEffect } from 'react';
import LeagueTable from './LeagueTable';

export default function Main() {

    return (
        <div className='mx-auto text-white main-container'>
            <LeagueTable />
        </div>
    )
}