import request from "superagent";
const baseUrl = "http://localhost:3001";

export const login = (useremail, userpw) => dispatch => {
  const data = { email: useremail, password: userpw };
  console.log("login action:", data);
  /* dispatch({ type: "LOGIN_REQUEST " }); */
  request
    .post(`${baseUrl}/login`)
    .send(data)
    .then(response => {
      console.log("inresponse", response.body.jwt);
      dispatch({
        type: "LOGIN_SUCCESS",
        JWT: response.body.jwt
      });
    })
    .catch(res => {
      console.log("error", res);
      /* dispatch({
				type: "LOGIN_FAILURE"
			}); */
    });
};
