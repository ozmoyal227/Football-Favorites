import React, { useState, useEffect, useContext } from 'react';
import UserContext from './context/UserProvider';
import LeagueTable from './LeagueTable';

export default function Main() {
    const { user } = useContext(UserContext);

    const tables = user.favLeagues && user.favLeagues.map(leagueId => {
        return <LeagueTable key={leagueId} leagueName={leagueId} />
    })
    return (
        <div className='mx-auto text-white main-container'>
            {tables}
        </div>
    )
}