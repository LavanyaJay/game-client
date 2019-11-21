import request from "superagent";
import { url } from "../constants";

export const BOARD_FETCHED = "BOARD_FETCHED";
const fetchBoard = board => ({
  type: BOARD_FETCHED,
  board
});

//Load Board
export const loadBoard = roomName => (dispatch, getState) => {
  console.log("action: ", roomName);
  request(`${url}/room/${roomName}`)
    .then(response => {
      console.log(response.body);

      const roomId = response.body.id;
      getBoard(roomId);
    })

    .catch(res => {
      console.log("error", res);
    });

  const getBoard = id => {
    request(`${url}/${id}/board`)
      .then(response => {
        console.log("in get board", response.body);
        dispatch(fetchBoard(response.body.board));
      })
      .catch(res => {
        console.log("error", res);
      });
  };
};
export const BOARD_UPDATE = "BOARD_UPDATE";
const boardUpdate = board => ({
  type: BOARD_UPDATE,
  board
});
//Update Board
export const updateBoard = (name, guesses) => (dispatch, getState) => {
  console.log("in action for update huess");
  const user = request
    .get(`${url}/room/${name}`)
    .then(response => {
      console.log("in get board", response.body);
      const id = response.body.id;
      updateGuess(id, guesses, dispatch);
    })
    .catch(res => {
      console.log("error", res);
    });

  //Fetching board from the db
};

const updateGuess = (id, guesses, dispatch) => {
  request
    .put(`${url}/board/${id}`)
    .send({
      guesses: guesses
    })
    .then(response => {
      dispatch(boardUpdate(response.body));
    })
    .catch(console.error);
};

export const updatePlayer = userId => {
  request
    .put(`${url}/board/${userId}`)
    .send({
      currentPlayer: userId
    })
    .then(response => {
      console.log("updated player: ", response.body);
    })
    .catch(console.error);
};
