import request from "superagent";
const baseUrl = "http://localhost:4000";

export const login = (username, userpw) => dispatch => {
  const data = { username: username, password: userpw };
  console.log("login action:", data);
  /* dispatch({ type: "LOGIN_REQUEST " }); */
  request
    .post(`${baseUrl}/login`)
    .send(data)
    .then(response => {
      console.log("inresponse", response.body.jwt);
      dispatch(jwt(response.body.jwt, username));
    })
    .catch(res => {
      console.log("error", res);
      /* dispatch({
				type: "LOGIN_FAILURE"
			}); */
    });
};

export const AUTHENTICATION_JWT = 'AUTHENTICATION_JWT';

export function jwt(jwt, username) {
	return {
		type: AUTHENTICATION_JWT,
		payload: { jwt: jwt, username: username }
	};
}
