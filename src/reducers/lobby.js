export default function(state = [], action = {}) {
  switch (action.type) {
    case "CREATE_LOBBY":
      console.log("in lobby: ", action.lobby);
      return [...state, action.lobby.name];

    default:
      return state;
  }
}
