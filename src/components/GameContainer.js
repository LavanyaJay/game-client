import React, { Component } from "react";
import ScoreboardContainer from "./ScoreboardContainer";
import BoardContainer from "./BoardContainer";
import { connect } from 'react-redux'

class GameContainer extends Component {

  render() {
    const roomId = this.props.match.params.roomId;
    return (
      <div>
        <p>Hello, {roomId}</p>
        <ScoreboardContainer />
        <BoardContainer roomId={this.props.match.params.roomId} />
      </div>
    );
  }
}

export default connect()(GameContainer);
