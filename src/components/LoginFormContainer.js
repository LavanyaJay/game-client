import React from "react";
import LoginForm from "./LoginForm";
import { connect } from "react-redux";
import { login } from "../actions/login";

class LoginFormContainer extends React.Component {
  state = { username: "", password: "" };

  onSubmit = event => {
    event.preventDefault();
    this.props.login(this.state.username, this.state.password);
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
      { user ? 
        <p>Welcome back, {this.props.user.username}</p>
      :  
        <LoginForm
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          values={this.state}
        />
      }
        </div> 
    );
  }
}


function mapStateToProps(state) {
	return { user: state.user };
}

export default connect(mapStateToProps, { login })(LoginFormContainer);
