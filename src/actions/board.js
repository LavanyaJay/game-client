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

//Update Board
export const updateBoard = (id, guesses) => (dispatch, getState) => {
  const data = { id, guesses };
  request
    .patch(`${url}/board`)
    .send(data)
    .then(response => {
      console.log("inresponse", response.body);
    })
    .catch(res => {
      console.log("error", res);
    });
};
