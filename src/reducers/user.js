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
    case "AUTHENTICATION_JWT":
      console.log("reducer AUTH_JWT", action.payload);
      return action.payload;

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
