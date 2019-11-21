import React, { Component } from 'react';
import Scoreboard from './Scoreboard';
import { connect } from "react-redux";

class ScoreboardContainer extends Component {
    render() {

        const room = this.props.rooms.find(room=>room.id === this.props.roomId)
        const { users } = room;
        const userIds = users.map(user=>user.id);
        const has2Players = users.length === 2;     
        const player1 = users.find(user=> user.id === userIds[0]) || null;
        const player2 = users.find(user=> user.id === userIds[1]) || null;
        return (
                <div>
                    {has2Players ? 
                    <Scoreboard player1={player1} player2={player2}/> 
                    : 
                    player1 ? <p>1/2 players joined : {player1.username}</p> 
                    :
                    <p><em>Waiting for players to join...</em></p>}
                </div>
        );
    }
}

function mapStateToProps(state) {
    return {
      rooms: state.rooms,
    };
  }
  
  export default connect(mapStateToProps)(
    ScoreboardContainer
  );
  