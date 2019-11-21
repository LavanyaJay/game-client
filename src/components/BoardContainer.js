import React, { Component } from "react";
import Board from "./Board.js";
import { connect } from "react-redux";
import { joinGame, startGame } from "../actions/login";
import { url } from "../constants";
import superagent from "superagent";
import { updateBoard } from "../actions/board";
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
    this.setState({
      [event.target.name]: event.target.value.toUpperCase()
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

  startGame = roomId => {
    this.setState({ gameStarted: true, allGuesses: "" });

    console.log("DOES IT GET AN ID ?", roomId);
    this.props.startGame(roomId);
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

    const { users } = room;
    const { id } = room;

    console.log("FOUND USERS AND ID ", users, id);
    const list =
      users && users.length ? (
        users.map(user => {
          return <p key={user.username}>{user.username}</p>;
        })
      ) : (
        <p>'This room has no users'</p>
      );

    return (
      <div>
        <Board
          board={this.props.board}
          name={this.props.name}
          gameStarted={this.state.gameStarted}
          currentGuess={this.state.currentGuess}
          allGuesses={this.state.allGuesses}
          togglePopup={this.togglePopup}
          showPopup={this.state.showPopup}
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
              ></input>
              <button>Submit</button>
            </form>
          )}
          <button onClick={() => this.startGame(id)} className="gameBtn">
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
    board: state.board
  };
}

export default connect(mapStateToProps, { joinGame, startGame, updateBoard })(
  BoardContainer
);
