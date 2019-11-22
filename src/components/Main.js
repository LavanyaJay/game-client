import React, { Component } from "react";
import UserForm from "./UserForm";
import Lobby from "./Lobby";
import LoginFormContainer from './LoginFormContainer'

class Main extends Component {
  render() {
    return (
      <div>
        <LoginFormContainer/>
        <Lobby />
      </div>
    );
  }
}

export default Main;
