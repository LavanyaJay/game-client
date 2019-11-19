import React, { Component } from "react";
import Board from "./Board.js";
import { connect } from "react-redux";
import { joinGame } from "../actions/login";

class BoardContainer extends Component {
  state = { gameStarted: false, guess: "" };

  onChange = event => {
    const { value } = event.target;
    this.setState({ value });
  };

  onSubmit = event => {
    // Submit word guess
  };

  startGame = () => {
    const roomId = this.props.roomId;
    console.log({ roomId });
    this.props.joinGame(parseInt(roomId));
  };

  render() {
    return (
      <div>
        <Board />
        <div className="gameControls">
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

export default connect(null, { joinGame })(BoardContainer);
