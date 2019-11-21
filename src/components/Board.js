import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { updateBoard } from "../actions/board";
import { connect } from "react-redux";
import Popup from "./Popup";
import "../App.css";

class Board extends Component {
  render() {
    /* if (this.props.gameStarted === true) {
      this.resetGuess();
    } */
    let targetWord;
    let targetWordLen;

    //Get expected word from DB

    this.props.wordToGuess !== null
      ? (targetWord = this.props.board.wordToGuess)
      : (targetWord = "");

    if (targetWord === undefined) {
      targetWordLen = 0;
    } else {
      targetWordLen = targetWord.length;
    }

    //Set the expectedGrid Array
    let expectedGrid = "";
    for (let i = 0; i < targetWordLen; i++) {
      expectedGrid += targetWord;
    }
    expectedGrid = Array.from(expectedGrid);

    console.log(expectedGrid);

    //Get the actual grid from DB (convert the string to array)

    const fetchactualGrid = () => {
      if (!this.props.board.guesses && targetWord) {
        const firstWord = targetWord.slice(0, 1);
        let actualGrid = Array.from(firstWord);

        return actualGrid;
      }

      let actualGrid = this.props.board.guesses;
      return actualGrid;
    };

    //First time the actual Grid is empty

    let actualGrid = fetchactualGrid();
    console.log("actualgrid:", actualGrid);
    //let actualGrid = Array.from("REACTY");

    let gridState = [];
    let objMap = {};

    //populate teh gridState with each cell's state
    for (let i = 0; i < expectedGrid.length; i++) {
      //populate the objMap if we are on a new row
      if (i % targetWordLen === 0) {
        console.log("in new row " + i + " ..len = " + (i % targetWordLen));
        objMap = {};
        for (let i = 0; i < targetWord.length; i++) {
          if (objMap[targetWord[i]]) {
            objMap[targetWord[i]] += 1;
          } else {
            objMap[targetWord[i]] = 1;
          }
        } //for
      } //if

      gridState.push(-1); //assign initially as 'not found'
      if (objMap[actualGrid[i]] && objMap[actualGrid[i]] > 0) {
        gridState[i] = 1; //found the letter
        if (actualGrid[i] === expectedGrid[i]) {
          gridState[i] = 2; //found the letter; its in place
        }
        objMap[actualGrid[i]] -= 1; //
      }
    } //outermost for
    console.log(gridState);

    let rows = [];
    for (let i = 0; i < targetWordLen; i++) {
      let rowID = `row${i}`;
      let cell = [];
      for (var idx = 0; idx < 6; idx++) {
        let cellID = `cell${i}-${idx}`;
        let finalIndex = i * targetWordLen + idx;
        if (gridState[finalIndex] === -1) {
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
    }

    return (
      <div>
        <Table bordered className="game-board">
          <tbody>{rows}</tbody>
        </Table>
        {/*  <form onSubmit={event => this.onSubmit(event)}>
          <label>Enter your guesses:</label>
          <input
            name="currentGuess"
            onChange={this.onChange}
            value={this.state.guess}
          />
          <input type="submit" value="Submit" />
        </form> */}
        {this.props.showPopup ? (
          <Popup
            text="Congrats! You Win!!"
            closePopup={this.props.togglePopup}
          />
        ) : null}
      </div>
    );
  }
}

export default connect(null, { updateBoard })(Board);
