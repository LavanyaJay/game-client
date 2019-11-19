import { combineReducers } from "redux";
import lobby from "./lobby";
import user from "./user";
import rooms from './rooms';

export default combineReducers({
  user,
  lobby,
  rooms
});
