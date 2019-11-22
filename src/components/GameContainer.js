import React, { Component } from "react";
import BoardContainer from "./BoardContainer";
import { loadBoard } from "../actions/board";
import { connect } from "react-redux";
import Header from './Header'

class GameContainer extends Component {

  render() {
    const roomId = this.props.match.params.roomId;
    return (
      <div className='gamePage'>
        <Header/>
        <BoardContainer name={this.props.match.params.name} />
      </div>
    );
  }
}

export default connect(null, {})(GameContainer);
