import React from "react";
import LoginForm from "./LoginForm";
import { connect } from "react-redux";
import { login, signup } from "../actions/login";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

class LoginFormContainer extends React.Component {
  state = { username: "", password: "" };
  onSubmitLogin = event => {
    event.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };

  onSubmitSignup = event => {
    event.preventDefault();
    this.props.signup(this.state.username, this.state.password);
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const user = this.props.user;
    return (
        <div>
          {user ? (
            <div>
              <p>Welcome, <strong>{this.props.user.username}</strong></p>
            </div>
          ) : (
            <LoginForm
              onSubmitLogin={this.onSubmitLogin}
              onSubmitSignup={this.onSubmitSignup}
              onChange={this.onChange}
              values={this.state}
            />
          )}
        </div>
    );
  }
}
function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps, { login, signup })(LoginFormContainer);
