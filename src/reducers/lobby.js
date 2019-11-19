export default function(state = [], action = {}) {
  switch (action.type) {
    case "CREATE_LOBBY":
      return action.lobby;
    default:
      return state;
  }
}
