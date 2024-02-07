

import React from 'react'
const Leaderboard = ({ leaderboard }) => {


    return (

        <div className="leaderboard">
            <h2 className='leaderboard__header'>High score-lista</h2>

            <p>
                <table className='leaderboard__content'>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nickname</th>
                            <th>Tid</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            leaderboard?.sort((a, b) => a.time - b.time).map((player, index) => {
                                // if (index >= 15) return null // Only show top 10
                                return (
                                    <tr key={index} className='leaderboard-row'>
                                        <td className='leaderboard-row__placement'><span>{ index + 1 }</span></td>
                                        <td className='leaderboard-row__nick'>{ player.nick }</td>
                                        <td className='leaderboard-row__score'>{ (player.time / 1000).toFixed(2).replace(".", ":")} sek</td>
                                    </tr>
                                )
                            }
                        )}
                    </tbody>
                </table>
            </p>
        </div>
    )
}





export default Leaderboard