import React, { useState, useEffect, useContext } from 'react';
import UserContext from './context/UserProvider';
import LeagueTable from './LeagueTable';

export default function Main() {
    const { user } = useContext(UserContext);
    const [leagues, setLeagues] = useState(null);

    useEffect(() => {
        (async () => {
            const res = await fetch('https://www.thesportsdb.com/api/v1/json/2/all_leagues.php');
            const data = await res.json();
            setLeagues(data.leagues);
        })()
    }, [])



    const tables = user.favLeagues && user.favLeagues.map(leagueId => {
        const leagueName = leagues && leagues.find(league => league.idLeague === leagueId).strLeague;
        return <LeagueTable key={leagueId} leagueId={leagueId} leagueName={leagueName} />
    })

    return (
        <div className='mx-auto text-white main-container'>
            {tables}
        </div>
    )
}