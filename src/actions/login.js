import request from "superagent";
import {url} from '../constants';

export const login = (username, userpw) => dispatch => {
  const data = { username: username, password: userpw };
  console.log("login action:", data);
  /* dispatch({ type: "LOGIN_REQUEST " }); */
  request
    .post(`${url}/login`)
    .send(data)
    .then(response => {
      console.log("inresponse", response.body);
      dispatch(jwt(response.body.jwt, username, response.body.userId));
    })
    .catch(res => {
      console.log("error", res);
    });
};

export const AUTHENTICATION_JWT = "AUTHENTICATION_JWT";

export function jwt(jwt, username, userId) {
  return {
    type: AUTHENTICATION_JWT,
    payload: { jwt: jwt, username: username, userId: userId }
  };
}
export const signup = (username, userpw) => dispatch => {
  const data = { username: username, password: userpw };
  console.log("signup action:", data);

  request
    .post(`${url}/user`)
    .send(data)
    .then(response => {
      console.log("inresponse", response.body);
      dispatch(login(username, userpw));
    })
    .catch(res => {
      console.log("error", res);
    });
};

//Joining Game
export const joinGame = roomId => (dispatch, getState) => {
  const state = getState();
  const { userId, jwt } = state.user;
  const data = { userId: userId, roomId: roomId };
  request
    .patch(`${url}/join`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(data)
    .then(response => {
      console.log("inresponse", response.body);
    })
    .catch(res => {
      console.log("error", res);
    });
};
