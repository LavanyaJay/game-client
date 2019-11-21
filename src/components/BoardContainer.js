import React, { Component } from "react";
import Board from "./Board.js";
import { connect } from "react-redux";
import { joinGame, startGame } from "../actions/login";
import { url } from "../constants";
import superagent from "superagent";
import { updateBoard, updatePlayer } from "../actions/board";
import ScoreboardContainer from "./ScoreboardContainer";

class BoardContainer extends Component {
  state = {
    gameStarted: false,
    guess: "",
    currentGuess: "",
    allGuesses: "",
    showPopup: false
  };

  componentDidMount() {}

  onSubmit = event => {
    event.preventDefault();
    const y = this.state.allGuesses + this.state.currentGuess;
    this.setState({ allGuesses: y });
    this.props.updateBoard(this.props.name, y);
    this.validateWinner(this.state.currentGuess);
    this.setState({ currentGuess: "" });
  };

  validateWinner = currentGuess => {
    if (this.state.currentGuess === this.props.board.wordToGuess) {
      this.togglePopup();
    }
  };

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  };

  onChange = event => {
    const message = event.target.value.slice(0, 6);
    this.setState({
      [event.target.name]: message.toUpperCase()
    });
  };

  joinGame = async () => {
    const { jwt } = this.props;
    const name = this.props.name;
    const joinUrl = `${url}/join/${name}`;
    const response = await superagent
      .patch(joinUrl)
      .set({ authorization: `Bearer ${jwt}` });
  };

  startGame = (roomId, userId) => {
    this.props.startGame(roomId, userId);
    this.setState({ allGuesses: "" });
  };
  fetchBoard = id => {
    const room = this.props.rooms.find(room => room.id === id);
    console.log("this is the board: ", room.board);
    return room.board;
  };
  render() {
    const name = this.props.name;
    console.log("PROPS from boardcontainer", this.props);
    const { rooms } = this.props;
    const room = rooms.find(room => room.name === name);

    if (!room) {
      return "This room does not exist";
    } else {
      console.log("hello from the else");
      const roomId = room.id;
      console.log("ROOM ID", roomId);
    }
    console.log("FOUND ROOM", room);

    //Fetch User id
    if (!this.props.user) {
      return "User does not exist";
    } else {
      var userId = this.props.user.userId;
    }

    const { users } = room;
    const { id } = room;

    console.log("FOUND USERS AND ID ", users, id);
    const list =
      users && users.length ? (
        users.map(user => {
          return <p key={user.username}>{user.username}</p>;
        })
      ) : (
        <p>This room has no users</p>
      );

    const board = this.fetchBoard(id);

    return (
      <div>
        <Board
          board={board}
          name={this.props.name}
          gameStarted={this.state.gameStarted}
          currentGuess={this.state.currentGuess}
          allGuesses={this.state.allGuesses}
          togglePopup={this.togglePopup}
          showPopup={this.state.showPopup}
          roomId={id}
        />
        {list}
        <div className="gameControls">
          {/* Display 'Start game' button, or guess input field */}
          {!this.state.gameStarted ? (
            <button onClick={this.joinGame} className="gameBtn">
              Join game
            </button>
          ) : (
            <form onSubmit={this.onSubmit}>
              <input
                type="text"
                name="currentGuess"
                onChange={this.onChange}
                value={this.state.currentGuess}
                maxLength="6"
              ></input>
              <button>Submit</button>
            </form>
          )}
          <button
            onClick={() => this.startGame(id, userId)}
            className="gameBtn"
          >
            Start game
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("redux-board", state.board);
  return {
    jwt: state.user.jwt,
    rooms: state.rooms,
    board: state.board,
    user: state.user
  };
}

export default connect(mapStateToProps, {
  joinGame,
  startGame,
  updateBoard,
  updatePlayer
})(BoardContainer);
