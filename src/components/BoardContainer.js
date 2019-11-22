import React, { Component } from "react";
import Board from "./Board.js";
import { connect } from "react-redux";
import { joinGame, startGame, addPoints } from "../actions/login";
import { url } from "../constants";
import superagent from "superagent";
import { updateBoard, updatePlayer } from "../actions/board";
import ScoreboardContainer from "./ScoreboardContainer";

class BoardContainer extends Component {
  state = {
    guess: "",
    currentGuess: "",
    allGuesses: "",
    showPopup: false,
    score: 0
  };

  componentDidMount() {}

  onSubmit = (event, userId, roomUsersIds) => {
    event.preventDefault();
    const y = this.state.allGuesses + this.state.currentGuess;
    this.setState({ allGuesses: y });
    const futurePlayer = roomUsersIds.filter(userId=>userId !== this.props.user.userId);
    this.props.updateBoard(this.props.name, y, futurePlayer[0]);
    console.log('FUTURE PLAYER IS', futurePlayer, roomUsersIds, this.props.user.userId);
    this.validateWinner(this.state.currentGuess, userId);
    this.setState({ currentGuess: "" });
    this.props.addPoints(userId, this.state.score);
  };

  validateWinner = (currentGuess, userId) => {
    console.log("userid in Validate Winner: ", userId);
    if (this.state.currentGuess === this.props.board.wordToGuess) {
      //this.props.addPoints(userId, 10);
      this.togglePopup();
    }
  };

  calculateScore = score => {
    this.setState({ score: score });
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
      const roomId = room.id;
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
        <p>This room has no users</p>
      );

    const board = this.fetchBoard(id);

    const roomUsersIds = users.map(user => user.id);
    const isUserInRoom = roomUsersIds.includes(this.props.userId);
    const has2Players = users.length === 2;
    const currentBoard = this.props.rooms.find(room => room.id === id).board;
    const isGameOn = currentBoard.gameOn;
    const currentPlayer = currentBoard.currentPlayer;
    const isItMyTurn = currentPlayer === this.props.userId;

    console.log("THIS PROPS USER", this.props.user);
    const userContent = this.props.user ? (
      !isGameOn ? (
        !isUserInRoom ? (
          <button onClick={this.joinGame}>Join game</button>
        ) : has2Players ? (
          /* Are there two players in the room ? If so, display ’Start game */ <button
            onClick={() => this.startGame(id, this.props.user.userId)}
          >
            Start game
          </button>
        ) : (
          <p>Waiting for another player to join...</p>
        ) 
        /* Only one player in the room ? Display ‘waiting for another player’ */
      ) : isItMyTurn ? (
        <form onSubmit={(event) => this.onSubmit(event, this.props.user.userId, roomUsersIds)}>
          <input
            type="text"
            name="currentGuess"
            onChange={this.onChange}
            value={this.state.currentGuess}
            maxLength="6"
          ></input>
          <button>Submit</button>
        </form>
      ) : (
        <p>Waiting for your opponent to play...</p>
      )
    ) : (
      <p>Please login to play</p>
    );

    return (
      <div>
        <Board
          board={board}
          name={this.props.name}
          currentGuess={this.state.currentGuess}
          allGuesses={this.state.allGuesses}
          togglePopup={this.togglePopup}
          showPopup={this.state.showPopup}
          roomId={id}
          scores={this.state.score}
          calculateScore={this.calculateScore}
        />
        {list}
        <div className="gameControls">
          {userContent}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("redux-board", state.board);
  return {
    rooms: state.rooms,
    board: state.board,
    user: state.user
  };
}

export default connect(mapStateToProps, {
  joinGame,
  startGame,
  updateBoard,
  updatePlayer,
  addPoints
})(BoardContainer);
