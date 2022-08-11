import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';


export default function LeaguesSelect() {
    const [countries, setCountries] = useState(null);
    const [leagues, setLeagues] = useState(null);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        if (!selected)
            (async () => {
                try {
                    const res = await fetch('https://www.thesportsdb.com/api/v1/json/2/all_countries.php');
                    const data = await res.json();
                    await setCountries(data.countries);
                } catch (error) {
                    console.log(error);
                }
            })()
        else {
            (async () => {
                try {
                    const res = await fetch(`https://www.thesportsdb.com/api/v1/json/2/search_all_leagues.php?c=${selected}`);
                    const data = await res.json();
                    console.log(data);
                    setLeagues(data.countries);
                } catch (error) {
                    console.log(error);
                }
            })()
        }
    }, [selected]);


    const countriesOptions = countries && countries.map((country) => {
        return { label: country.name_en, value: country.name_en }
    });
    const leaguesOptions = leagues && leagues.filter(league =>
        (league.strSport === "Soccer" && league.strGender === "Male" && league.strCurrentSeason === "2022-2023" && league.strComplete === "yes")
    ).map((league) => {
        return { label: league.strLeagueAlternate, value: league.idLeague }
    });

    const handleChange = (e) => {
        setSelected(e.value);
    }

    return (
        <span className="d-flex align-items-center justify-content-around px-2">
            <div>Add</div>
            <Select
                options={countriesOptions}
                placeholder="Country"
                onChange={handleChange}
            />
            <Select
                options={leaguesOptions}
                placeholder="League"
            />
            <i className="bi bi-plus"></i>
        </span >
    )
}






