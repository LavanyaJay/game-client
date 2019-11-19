import { combineReducers } from "redux";
import lobby from "./lobby";
import user from "./user";

export default combineReducers({
  user,
  lobby
});
