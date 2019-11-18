import React, { Component } from 'react';
import ScoreboardContainer from './ScoreboardContainer';
import BoardContainer from './BoardContainer';

class GameContainer extends Component {
    render() {
        return (
            <div>
                <ScoreboardContainer/>
                <BoardContainer/>
            </div>
        );
    }
}

export default GameContainer;