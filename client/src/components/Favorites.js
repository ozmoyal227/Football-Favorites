import React, { useState, useEffect, useContext } from 'react';
import constants from '../constants';
import UserContext from './context/UserProvider';
import LeaguesSelect from './LeaguesSelect';


export default function Favorites() {
    const { user, setUser } = useContext(UserContext);
    const [leagues, setLeagues] = useState(null);
    const [removingLeague, setRemovingLeague] = useState(false);
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
        })();
        if (removingLeague) {
            (async () => {
                try {
                    const reqOptions = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        body: JSON.stringify({ "id": `${removingLeague}` })
                    };
                    const res = await fetch(`${constants.API_BASE_URL}rmvLeague/${user.id}`, reqOptions);
                    const updatedFav = await res.json();
                    if (res.ok) {
                        setUser(prevUser => {
                            return {
                                ...prevUser,
                                favLeagues: updatedFav
                            }
                        })
                        setRemovingLeague(false);
                    }
                } catch (error) {
                    console.log(error)
                }
            })();

        }
    }, [removingLeague]);


    const rmvLeague = (e) => {
        if (e.target.tagName === 'I')
            setRemovingLeague(e.currentTarget.id);
    }

    const userLeagues = leagues && leagues.filter(league => {
        return user.favLeagues && user.favLeagues.includes(league.idLeague);
    }).map(league => {
        return <li key={league.idLeague} id={league.idLeague} onClick={rmvLeague} className="d-flex justify-content-between">
            {league.strLeague}
            <i className="bi bi-dash-circle-dotted text-danger " ></i>
        </li>
    });

    return (
        <div className="text-center">
            <div className="d-flex mb-3 justify-content-center rounded justify-content-center align-items-center logged-in-container">
                <div className="user-guide ">
                    <h1>Welcome!</h1>
                    <p className=" fw-bold me-2">
                        Here you can edit and choose your favorites leagues! <br />
                        <span className="color-font"> First:</span> Select or search for country. <br />
                        <span className="color-font">Second:</span> Choose league and click on the 'plus' button. <br />
                        Done!
                    </p>
                </div>
                <div className="fav-leagues rounded text-white">
                    <h5 className="border-bottom border-2 mb-0">Favorites Leagues</h5>
                    <div className="border-bottom border-2">
                        <LeaguesSelect />
                    </div>
                    <ul className="leagues-list overflow-auto container px-4">
                        {userLeagues}
                    </ul>
                </div>
            </div>
            <button onClick={handleLogout} className="btn auth-btn mb-3 ">Logout</button>
        </div>
    )
}