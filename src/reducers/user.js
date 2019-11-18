export default function(state = "", action = {}) {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        state,
        isAuthenticating: true
      };
    case "LOGIN_FAILURE":
      return {
        state,
        isAuthenticating: false,
        errorMessage: action.errorMessage
      };
    case "LOGIN_SUCCESS":
      console.log("reducer", action.JWT);
      return action.JWT;

    case "LOGOUT":
      return {
        isAuthenticating: false,
        currentUser: null,
        errorMessage: null
      };
    default:
      return state;
  }
}
