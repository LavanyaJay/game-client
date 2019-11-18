import React from 'react';

const Scoreboard = (props) => {
    return (
        <div>
            <p>Score Player 1 : {props.scorePlayer1}</p>
            <p>Score Player 2 : {props.scorePlayer2}</p>
        </div>
    );
};

export default Scoreboard;