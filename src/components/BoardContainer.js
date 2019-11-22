import React, { Component } from "react";
import Board from "./Board.js";
import { connect } from "react-redux";
import { startGame, addPoints } from "../actions/login";
import { url } from "../constants";
import superagent from "superagent";
import { updateBoard, updatePlayer } from "../actions/board";
import ScoreboardContainer from "./ScoreboardContainer";
import Popup from "./Popup";

class BoardContainer extends Component {
  state = {
    guess: "",
    currentGuess: "",
    allGuesses: "",
    showPopup: false,
    showPopupeog: false,
    score: 0,
    submitFail: false
  };

  componentDidMount() {}

  onSubmit = (event, userId, roomUsersIds, board) => {
    event.preventDefault();

    if (!this.canBeSubmitted()) {
      this.setState({ submitFail: true });
    }

    this.setState({ submitFail: false });

    //const y = this.state.allGuesses + this.state.currentGuess;
    const y = board.guesses + this.state.currentGuess;
    //this.setState({ allGuesses: y });
    const futurePlayer = roomUsersIds.filter(
      userId => userId !== this.props.user.userId
    );
    this.props.updateBoard(this.props.name, y, futurePlayer[0]);
    console.log(
      "FUTURE PLAYER IS",
      futurePlayer,
      roomUsersIds,
      this.props.user.userId
    );
    //this.validateWinner(userId, y, futurePlayer[0]);

    const game = this.validateWinner(userId, y, futurePlayer[0], board);
    console.log("gameon-------->", game);
    if (game === undefined) {
      this.validateEndOfGame(userId, y, futurePlayer[0], board);
    }

    //this.validateEndOfGame(userId, y, futurePlayer[0], board);
    this.setState({ currentGuess: "" });

    //this.props.addPoints(userId, this.state.score);
  };

  validateWinner = (userId, y, futurePlayer, board) => {
    const expectedWord = board.wordToGuess.replace(" ", "");
    console.log("userid in Validate Winner: ", expectedWord);
    if (this.state.currentGuess === expectedWord) {
      this.props.addPoints(userId, 10);
      const gameOn = false;
      this.props.updateBoard(this.props.name, y, futurePlayer[0], gameOn);
      this.togglePopup();
      return gameOn;
    }
  };

  validateEndOfGame = (userId, y, futurePlayer, board) => {
    console.log("userid in Validate EndOfGame: ", userId);
    if (board.guesses.length >= 36) {
      const gameOn = false;
      this.props.updateBoard(this.props.name, y, futurePlayer[0], gameOn);
      this.togglePopupeog();
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

  togglePopupeog = () => {
    this.setState({
      showPopupeog: !this.state.showPopupeog
    });
  };

  onChange = event => {
    const message = event.target.value.slice(0, 6);
    this.setState({
      [event.target.name]: message.toUpperCase()
    });
  };

  joinGame = async () => {
    const { jwt } = this.props.user;
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

  canBeSubmitted() {
    const { currentGuess } = this.state;
    return currentGuess.length === 6;
  }

  render() {
    const isEnabled = this.canBeSubmitted();
    const name = this.props.name;
    console.log("PROPS from boardcontainer", this.props);
    const { rooms } = this.props;
    const room = rooms.find(room => room.name === name);

    if (!room) {
      return "This room does not exist";
    } else {
      const roomId = room.id;
      const roomName = room.name;
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
    let isGameOn = false;
    let currentPlayer = "";
    const roomUsersIds = users.map(user => user.id);
    const isUserInRoom = roomUsersIds.includes(this.props.user.userId);
    const has2Players = users.length === 2;
    const currentBoard = this.props.rooms.find(room => room.id === id).board;
    if (currentBoard) {
      isGameOn = currentBoard.gameOn;
      currentPlayer = currentBoard.currentPlayer;
    }
    const isItMyTurn = currentPlayer === this.props.user.userId;

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
      ) : /* Only one player in the room ? Display ‘waiting for another player’ */
      isItMyTurn ? (
        <form
          className="submitGuess"
          onSubmit={event =>
            this.onSubmit(event, this.props.user.userId, roomUsersIds, board)
          }
        >
          <input
            type="text"
            name="currentGuess"
            onChange={this.onChange}
            value={this.state.currentGuess}
            maxLength="6"
          ></input>

          <button disabled={!isEnabled}>Submit</button>
          {/* <button>Submit</button> */}
          <p className="hint">
            <em>Please enter a 6 letter guess</em>
          </p>

          
          <button
            onClick={() => this.startGame(id, this.props.user.userId)} className='restartBtn'
          >
            Cancel and start new game
          </button>

        </form>
      ) : (
        <div>
        <p>Waiting for your opponent to play...</p>
        <button
            onClick={() => this.startGame(id, this.props.user.userId)} className='restartBtn'
          >
          Cancel and start new game
          </button>
          </div>
      )
    ) : (
      <p>Please login to play</p>
    );

    return (
      <div className="gameContent">

        {this.state.submitFail && <Popup>You need exactly 6 characters</Popup>}

        {room ? <p>You are in room <strong>{room.name}</strong></p> : <p>This room doesn't exist</p>}

        <Board
          board={board}
          name={this.props.name}
          currentGuess={this.state.currentGuess}
          allGuesses={this.state.allGuesses}
          togglePopup={this.togglePopup}
          showPopup={this.state.showPopup}
          togglePopupeog={this.togglePopupeog}
          showPopupeog={this.state.showPopupeog}
          roomId={id}
          scores={this.state.score}
          calculateScore={this.calculateScore}
        />
        {/* {list} */}
        <div className="gameControls">{userContent}</div>
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
  startGame,
  updateBoard,
  updatePlayer,
  addPoints
})(BoardContainer);
