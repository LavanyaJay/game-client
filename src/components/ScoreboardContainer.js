import React, { Component } from 'react';
import Scoreboard from './Scoreboard';

class ScoreboardContainer extends Component {
    
    has2Players = this.props.users.length === 2;     
    player1 = this.props.users[0] || null;
    player2 = this.props.users[1] || null;
    
    render() {
        console.log('HAS 2 PLAYERS', this.player1, this.player2)
        return (
            <div>
            {this.has2Players ? <Scoreboard player1={this.player1} player2={this.player2}/> : <p><em>Waiting for players to join...</em></p>}
            {this.player1 ? <p>1/2 players online : {this.player1.username}</p> : null}
            </div>
            
        );
    }
}

export default ScoreboardContainer;