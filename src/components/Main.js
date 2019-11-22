import React, { Component } from "react";
import Lobby from "./Lobby";
import LoginFormContainer from './LoginFormContainer'
import Header from './Header'

class Main extends Component {
  render() {
    return (
      <div className='full-content'>
        <Header/>
        <LoginFormContainer/>
        <Lobby/>
      </div>
    );
  }
}

export default Main;
