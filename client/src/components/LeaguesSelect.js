import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import UserContext from './context/UserProvider';
import constants from '../constants';


export default function LeaguesSelect() {
    const [countries, setCountries] = useState(null);
    const [leagues, setLeagues] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedLeague, setSelectedLeague] = useState(null);
    const [addingLeague, setAddingLeague] = useState(null);
    const { user, setUser } = useContext(UserContext);
    useEffect(() => {
        if (!selectedCountry)
            (async () => {
                try {
                    const res = await fetch('https://www.thesportsdb.com/api/v1/json/2/all_countries.php');
                    const data = await res.json();
                    setCountries(data.countries);
                } catch (error) {
                    console.log(error);
                }
            })()
        else
            (async () => {
                try {
                    const res = await fetch(`https://www.thesportsdb.com/api/v1/json/2/search_all_leagues.php?c=${selectedCountry}`);
                    const data = await res.json();
                    setLeagues(data.countries);
                } catch (error) {
                    console.log(error);
                }
            })()
        if (addingLeague) {
            (async () => {
                try {
                    const reqOptions = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        body: JSON.stringify({ "id": `${selectedLeague}` })
                    };
                    const res = await fetch(`${constants.API_BASE_URL}addLeague/${user.id}`, reqOptions);
                    const updatedFav = await res.json();

                    if (res.ok) {
                        setUser(prevUser => {
                            return {
                                ...prevUser,
                                favLeagues: updatedFav
                            }
                        })
                        setAddingLeague(false);
                    }
                } catch (error) {
                    console.log(error)
                }
            })()

        }

    }, [selectedCountry, selectedLeague, addingLeague]);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user])

    const countriesOptions = countries && countries.map((country) => {
        return { label: country.name_en, value: country.name_en }
    });

    const leaguesOptions = leagues ?
        (leagues.filter(league =>
        (
            league.strSport === "Soccer" &&
            league.strGender === "Male" &&
            league.strCurrentSeason === "2022-2023" &&
            league.strComplete !== null
        )
        ).map((league) => {
            return { label: league.strLeague, value: league.idLeague }
        })) : [];

    const handleCountryChange = (e) => {
        setSelectedCountry(e.value);
        setSelectedLeague(null);
        setAddingLeague(false)
    }

    const handleLeagueChange = (e) => {
        setSelectedLeague(e.value);
        setAddingLeague(false)
    }
    const addLeague = () => {
        if (selectedCountry && selectedLeague) {
            setAddingLeague(true);
        }
    }
    return (
        <span className="d-flex align-items-center justify-content-around px-2">
            <div>Add</div>
            <Select
                options={countriesOptions}
                placeholder="Country"
                onChange={handleCountryChange}
            />
            <Select
                key={`my_unique_select_key__${selectedCountry}`}
                options={leaguesOptions}
                placeholder="League"
                onChange={handleLeagueChange}

            />
            <i className="bi bi-plus" onClick={addLeague} ></i>
        </span >
    )
}






