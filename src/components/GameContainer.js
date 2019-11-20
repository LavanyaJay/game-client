import React, { Component } from "react";
import ScoreboardContainer from "./ScoreboardContainer";
import BoardContainer from "./BoardContainer";
import { loadBoard } from "../actions/board";
import { connect } from "react-redux";

class GameContainer extends Component {
  /* componentDidMount() {
    const roomName = this.props.match.params.name;
    console.log("did Mount");
    console.log(roomName);

    this.props.loadBoard(roomName);
  } */
  render() {
    const roomId = this.props.match.params.roomId;
    return (
      <div>
        <ScoreboardContainer />
        <BoardContainer name={this.props.match.params.name} />
      </div>
    );
  }
}
/* function mapStateToProps(state) {
  return {
    board: state.board
  };
} */

export default connect(null, {})(GameContainer);
