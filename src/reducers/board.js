export default function(state = [], action = {}) {
  switch (action.type) {
    case "BOARD_FETCHED":
      return action.board;
    case "BOARD_UPDATE":
      return action.board;
    default:
      return state;
  }
}
