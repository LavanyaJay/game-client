import React, { Component } from 'react';
import Scoreboard from './Scoreboard';

class ScoreboardContainer extends Component {
    render() {
        const player1 = this.props.users[0];
        const player2 = this.props.users[1];
        console.log('PLAYERS :', player1, player2)
        return (
            <div>
                <Scoreboard player1={player1} player2={player2}/>
            </div>
        );
    }
}

export default ScoreboardContainer;