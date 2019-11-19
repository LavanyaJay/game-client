import React, { Component } from "react";
import UserForm from "./UserForm";
import Lobby from "./Lobby";
import GameContainer from "./GameContainer";

class Main extends Component {
  render() {
    return (
      <div>
        <UserForm />
        <Lobby />
      </div>
    );
  }
}

export default Main;
