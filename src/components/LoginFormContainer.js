import React from "react";
import LoginForm from "./LoginForm";
import { connect } from "react-redux";
import { login, signup } from "../actions/login";
import { Link } from 'react-router-dom';

class LoginFormContainer extends React.Component {
  state = { username: "", password: "" };
  id = this.props.match.params;
  onSubmit = event => {
    console.log("submit: ", this.id.id);
    event.preventDefault();
    if (this.id.id === "1") {
      console.log("inside1: ", this.id);
      this.props.signup(this.state.username, this.state.password);
    }
    if (this.id.id === "2") {
      console.log("inside: ", this.id);
      this.props.login(this.state.username, this.state.password);
    }
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
        {user ? (<div>
          <p>Welcome back, {this.props.user.username}</p>
          <Link to='/'><p>Go back home</p></Link>
          </div>
        ) : (
          <LoginForm
            onSubmit={this.onSubmit}
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
