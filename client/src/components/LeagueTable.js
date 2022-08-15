import React, { useState, useEffect } from 'react';
import constants from '../constants';

export default function LeagueTable(props) {

    const [teams, setTeams] = useState(null);
    const [season, setSeason] = useState({
        start: constants.SEASON[0],
        end: constants.SEASON[1]
    })
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`https://www.thesportsdb.com/api/v1/json/2/lookuptable.php?l=${props.leagueId}&s=${season.start}-${season.end}`);
                const data = await res.json();
                if (data.table) {
                    await setTeams(data.table);
                }
            } catch (error) {
                console.log(error);
                setTeams(null);
            }
        })()

    }, [season]);


    const tableRows = teams ? teams.map((team) => {
        return (
            <tr key={team.idStanding}>
                <th className="text-center" scope="row">{team.intRank}</th>
                <td><img src={team.strTeamBadge} className="team-badge" /> {team.strTeam}</td>
                <td className="text-center">{team.intPlayed}</td>
                <td className="text-center">{team.intWin}</td>
                <td className="text-center">{team.intDraw}</td>
                <td className="text-center">{team.intLoss}</td>
                <td className="text-center">{team.intGoalsFor}:{team.intGoalsAgainst}</td>
                <td className="text-center">{team.intGoalDifference}</td>
                <th className="text-center">{team.intPoints}</th>
            </tr>
        )
    }) : null;


    const decrease = () => {
        if (season.start > 2013)
            setSeason(prevSeason => {
                return {
                    start: prevSeason.start - 1,
                    end: prevSeason.end - 1
                }
            })
    }
    const increase = () => {
        if (season.end < constants.SEASON[1])
            setSeason(prevSeason => {
                return {
                    start: prevSeason.start + 1,
                    end: prevSeason.end + 1
                }
            })
    }

    return (
        <div className="w-75 mx-auto">
            <div className="table-responsive rounded">
                <table className="table table-sm table-dark table-striped rounded">
                    <thead>
                        <tr className="border-bottom-0">
                            <th colSpan="9">
                                <div className="d-flex justify-content-between">
                                    <span>{tableRows ? props.leagueName : `No result for ${props.leagueName} in this season`}</span>
                                    <span>
                                        <i onClick={decrease} className="bi bi-chevron-left"></i>
                                        {season.start}-{season.end}
                                        <i onClick={increase} className="bi bi-chevron-right"></i>
                                    </span>
                                </div>


                            </th>
                        </tr>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Team</th>
                            <th className="text-center" scope="col">P</th>
                            <th className="text-center" scope="col">W</th>
                            <th className="text-center" scope="col">D</th>
                            <th className="text-center" scope="col">L</th>
                            <th className="text-center" scope="col">F:A</th>
                            <th className="text-center" scope="col">GD</th>
                            <th className="text-center" scope="col">PTS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows}
                    </tbody>
                </table>
            </div>
        </div>
    )
}