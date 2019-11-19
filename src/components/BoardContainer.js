import React, { Component } from "react";
import Board from "./Board.js";
import { connect } from "react-redux";
import { joinGame } from "../actions/login";
import {url} from '../constants';
import superagent from 'superagent'

class BoardContainer extends Component {
  state = { gameStarted: false, guess: "" };

  onChange = event => {
    const { value } = event.target;
    this.setState({ value });
  };

  onSubmit = event => {
    // Submit word guess
  };

  startGame = async () => {
    const { jwt } = this.props;
    const name = this.props.name;
    const joinUrl = `${url}/join/${name}`;
    const response = await superagent
    .patch(joinUrl)
    .set({authorization: `Bearer ${jwt}`})
    
  };

  render() {

    const name = this.props.name;
    const { rooms} = this.props;
    const room = rooms.find(room => room.name === name);

    if (!room) { return 'This room does not exist' }
    console.log('FOUND ROOM', room)

    const { users } = room;

    console.log('FOUND USERS', users)
    const list = users && users.length ? 
        users.map(user=> {
        return <p key={user.username}>{user.username}</p>
      })
    : <p>'This room has no users'</p>;

    return (
      <div>
        <Board />
        <div className="gameControls">
          {list}
          {/* Display 'Start game' button, or guess input field */}
          {!this.state.gameStarted ? (
            <button onClick={this.startGame}>Join game</button>
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

export default connect(mapStateToProps, { joinGame })(BoardContainer);
