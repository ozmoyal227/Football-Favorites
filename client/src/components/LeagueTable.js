import React, { useState, useEffect } from 'react';


export default function LeagueTable() {

    const [teams, setTeams] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch('https://www.thesportsdb.com/api/v1/json/2/lookuptable.php?l=4328&s=2021-2022');
                const data = await res.json();
                await setTeams(data.table);
            } catch (error) {
                console.log(error);
            }
        })()

    }, []);
    const tableRows = teams && teams.map((team) => {
        return (
            <tr key={team.idTeam}>
                <th scope="row">{team.intRank}</th>
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

    })



    return (
        <div className="w-75 mx-auto">
            <div className="table-responsive rounded">
                <table className="table table-sm table-dark table-striped rounded">
                    <thead className="border-bottom-0">
                        <tr>
                            <th colSpan="10">League Name</th>
                        </tr>
                    </thead>
                    <thead>
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