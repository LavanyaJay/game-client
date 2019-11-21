import React from 'react';

const Scoreboard = (props) => {
    console.log('roomID is : ', props.roomId)
    return (
        <div>
            <p>Score {props.player1.username} : {props.player1.points} </p>
            <p>Score {props.player2.username} : {props.player2.points} </p>
        </div>
    );
};

export default Scoreboard;