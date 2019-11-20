import { combineReducers } from "redux";
import board from "./board";
import user from "./user";
import rooms from "./rooms";

export default combineReducers({
  user,
  board,
  rooms
});
