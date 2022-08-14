import React, { useState, useEffect, useContext } from 'react';
import constants from '../constants';
import UserContext from './context/UserProvider';
import LeaguesSelect from './LeaguesSelect';


export default function Favorites() {
    const { user, setUser } = useContext(UserContext);
    const [leagues, setLeagues] = useState(null);

    const handleLogout = () => {
        setUser(constants.DEFAULT_USER);
        localStorage.removeItem('user');
    }

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch('https://www.thesportsdb.com/api/v1/json/2/all_leagues.php')
                const data = await res.json();
                setLeagues(data.leagues);
            } catch (error) {
                console.log(error);
            }
        })()
    }, [])



    const userLeagues = leagues && leagues.filter(league => {
        return user.favLeagues && user.favLeagues.includes(league.idLeague);
    }).map(league => {
        return <li key={league.idLeague}> {league.strLeague}</li>
    });

    return (
        <div className="text-center">
            <div className="d-flex mb-3 justify-content-center rounded justify-content-center align-items-center">
                <div className="user-guide ">
                    <h1>Welcome!</h1>
                    <p className=" fw-bold me-2">
                        Here you can edit and choose your favorites leagues! <br />
                        <span className="color-font"> First:</span> Select or search for country. <br />
                        <span className="color-font">Second:</span> Add leagues from result. <br />
                        Done!
                    </p>
                </div>
                <div className="fav-leagues rounded text-white">
                    <h5 className="border-bottom border-2 mb-0">Favorites Leagues</h5>
                    <div className="border-bottom border-2">
                        <LeaguesSelect />
                    </div>
                    <ul className="leagues-list overflow-auto">
                        {userLeagues}
                    </ul>

                </div>
            </div>
            <button onClick={handleLogout} className="btn auth-btn mb-3 ">Logout</button>
        </div>
    )
}