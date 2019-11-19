import React, { Component } from "react";
import ScoreboardContainer from "./ScoreboardContainer";
import BoardContainer from "./BoardContainer";

class GameContainer extends Component {
  render() {
    return (
      <div>
        <ScoreboardContainer />
        <BoardContainer roomId={this.props.match.params.roomId} />
      </div>
    );
  }
}

export default GameContainer;
