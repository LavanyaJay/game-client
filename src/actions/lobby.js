export const loadLobby = stream => dispatch => {
  stream.onmessage = event => {
    const { data } = event;

    console.log("data in action ", data);

    //Convert serilaize string to JSON string
    const parsed = JSON.parse(data);
    dispatch(createLobby(parsed));
  };
};

export const CREATE_LOBBY = "CREATE_LOBBY";

export function createLobby(lobby) {
  console.log("action create lobby trigger");
  return {
    type: CREATE_LOBBY,
    lobby
  };
}
