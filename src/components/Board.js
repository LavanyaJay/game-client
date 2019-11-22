import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { updateBoard } from "../actions/board";
import { connect } from "react-redux";
import Popup from "./Popup";
import "../App.css";
import ScoreboardContainer from "../components/ScoreboardContainer";

class Board extends Component {
  render() {
    let board = this.props.board;
    let boardLen = 6;

    if (!board || !board.wordToGuess) {
      let rows = [];
      for (let i = 0; i < boardLen; i++) {
        let rowID = `row${i}`;
        let cell = [];
        for (let idx = 0; idx < boardLen; idx++) {
          let cellID = `cell${i}-${idx}`;
          cell.push(<td className="box blueSqr" key={cellID} id={cellID}></td>);
        } //for
        rows.push(
          <tr key={i} id={rowID} className="box">
            {cell}
          </tr>
        );
      }
      return (
        <div>
          <ScoreboardContainer roomId={this.props.roomId} />
          <Table bordered className="game-board">
            <tbody>{rows}</tbody>
          </Table>
        </div>
      );
    }

    //Get expected word from DB
    let targetWord = "";
    if (board.wordToGuess) {
      targetWord = board.wordToGuess;
    }

    //Set the expectedGrid Array
    let expectedGrid = "";
    for (let i = 0; i < boardLen; i++) {
      expectedGrid += targetWord;
    }
    expectedGrid = Array.from(expectedGrid);

    //Get the actual grid from DB (convert the string to array)
    let actualGrid = expectedGrid[0];
    if (board.guesses) {
      actualGrid = Array.from(board.guesses);
    }
    console.log("actual grid = " + actualGrid);

    let gridState = [];
    let objMap = {};
    let scores = this.props.scores;

    //populate teh gridState with each cell's state
    for (let i = 0; i < boardLen * boardLen; i++) {
      //populate the objMap if we are on a new row
      if (i % boardLen === 0) {
        objMap = {};
        for (let i = 0; i < targetWord.length; i++) {
          if (objMap[targetWord[i]]) {
            objMap[targetWord[i]] += 1;
          } else {
            objMap[targetWord[i]] = 1;
          }
        } //for
      } //if

      gridState.push(0); //assign initially as 'not found'
      if (objMap[actualGrid[i]] && objMap[actualGrid[i]] > 0) {
        gridState[i] = 1; //found the letter
        if (actualGrid[i] === expectedGrid[i]) {
          gridState[i] = 2; //found the letter; its in place
        }
        objMap[actualGrid[i]] -= 1; //
      }
    } //outermost for

    //calculate scores; use gridState to score
    let score = 0;
    for (
      let i = actualGrid.length - 1;
      i >= actualGrid.length - boardLen;
      i--
    ) {
      score += gridState[i];
    } //for
    console.log("---------------> score = " + score);
    this.props.calculateScore(score);

    //build the grid with all values that we have now
    let rows = [];
    for (let i = 0; i < boardLen; i++) {
      let rowID = `row${i}`;
      let cell = [];
      for (let idx = 0; idx < boardLen; idx++) {
        let cellID = `cell${i}-${idx}`;
        let finalIndex = i * boardLen + idx;
        if (gridState[finalIndex] === 0) {
          cell.push(
            <td className="box blueSqr" key={cellID} id={cellID}>
              {actualGrid[finalIndex]}
            </td>
          );
        }
        if (gridState[finalIndex] === 1) {
          cell.push(
            <td className="box yellowSqr" key={cellID} id={cellID}>
              {actualGrid[finalIndex]}
            </td>
          );
        }
        if (gridState[finalIndex] === 2) {
          cell.push(
            <td className="box redSqr" key={cellID} id={cellID}>
              {actualGrid[finalIndex]}
            </td>
          );
        }
      } //for

      rows.push(
        <tr key={i} id={rowID} className="box">
          {cell}
        </tr>
      );
    } //main for

    return (
      <div>
        <ScoreboardContainer roomId={this.props.roomId} />
        <Table bordered className="game-board">
          <tbody>{rows}</tbody>
        </Table>

        {this.props.showPopup ? (
          board.guesses.length >= 36 ? (
            <Popup
              text="Sorry, End Of game!"
              closePopup={this.props.togglePopup}
            />
          ) : (
            <Popup
              text="Congrats! You Win!!"
              closePopup={this.props.togglePopup}
            />
          )
        ) : null}
      </div>
    );
  }
}

export default connect(null, { updateBoard })(Board);
