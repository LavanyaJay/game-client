import React from 'react';

const Scoreboard = (props) => {
    return (
        <div>
            <p>Score {props.player1.username} : {props.player1.points} </p>
            <p>Score {props.player2.username} : {props.player2.points} </p>
        </div>
    );
};

export default Scoreboard;