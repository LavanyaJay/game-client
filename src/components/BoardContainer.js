import React, { Component } from "react";
import Board from "./Board.js";
import { connect } from "react-redux";
import { joinGame, startGame } from "../actions/login";
import {url} from '../constants';
import superagent from 'superagent'
import ScoreboardContainer from "./ScoreboardContainer";

class BoardContainer extends Component {
  state = { gameStarted: false, guess: "" };

  componentDidMount() {

  }

  onChange = event => {
    const { value } = event.target;
    this.setState({ value });
  };

  onSubmit = event => {
    // Submit word guess
  };

  joinGame = async () => {
    const { jwt } = this.props;
    const name = this.props.name;
    const joinUrl = `${url}/join/${name}`;
    const response = await superagent
    .patch(joinUrl)
    .set({authorization: `Bearer ${jwt}`})
    
  };

  startGame = (roomId) => {
    console.log('DOES IT GET AN ID ?', roomId);
    this.props.startGame(roomId);
  }
  render() {

    const name = this.props.name;
    console.log('PROPS from boardcontainer', this.props);
    const { rooms} = this.props;
    const room = rooms.find(room => room.name === name);

    if (!room) { return 'This room does not exist' }
    else {
      console.log('hello from the else')
      const roomId = room.id
      console.log('ROOM ID', roomId)
    }
    console.log('FOUND ROOM', room)

    const { users } = room;
    const { id } = room;

    console.log('FOUND USERS AND ID ', users, id)
    const list = users && users.length ? 
        users.map(user=> {
        return <p key={user.username}>{user.username}</p>
      })
    : <p>This room has no users</p>;

    return (
      <div>
        <ScoreboardContainer users={users}/>
        <Board />
        {list}
        <div className="gameControls">
          {/* Display 'Start game' button, or guess input field */}
          {!this.state.gameStarted ? (
            <button onClick={this.joinGame} className="gameBtn">Join game</button>
          ) : (
            <form onSubmit={this.onSubmit}>
              <input
                type="text"
                onChange={this.onChange}
                value={this.state.value}
              ></input>
              <button>Submit</button>
            </form>
          )}
          <button onClick={()=>this.startGame(id)} className="gameBtn">Start game</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    jwt: state.user.jwt, rooms: state.rooms
  }
}

export default connect(mapStateToProps, { joinGame, startGame })(BoardContainer);
