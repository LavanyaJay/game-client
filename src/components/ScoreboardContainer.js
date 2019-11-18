import React, { Component } from 'react';
import Scoreboard from './Scoreboard';

class ScoreboardContainer extends Component {
    render() {
        return (
            <div>
                <Scoreboard scorePlayer1="0" scorePlayer2="5"/>
            </div>
        );
    }
}

export default ScoreboardContainer;