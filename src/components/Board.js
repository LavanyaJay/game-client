import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { loadBoard, updateBoard } from "../actions/board";
import { connect } from "react-redux";
import "../App.css";

class Board extends Component {
  state = { guess: "", actuals: [] };
  onSubmit = event => {
    event.preventDefault();
    const x = this.state.guess.split("");
    console.log("x: ", x);
    const y = this.state.actuals.concat(x);
    this.setState({ actuals: y });
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    let targetWord;
    let targetWordLen;
    console.log("in board:", this.props.board);
    //Get expected word from DB
    console.log(this.props.board.wordToGuess);
    this.props.wordToGuess !== null
      ? (targetWord = this.props.board.wordToGuess)
      : (targetWord = "");

    if (targetWord === undefined) {
      targetWordLen = 0;
    } else {
      console.log(targetWord);
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
    console.log(this.state.actuals);
    const fetchactualGrid = () => {
      console.log("tergetword", targetWord);
      if (this.state.actuals.length === 0 && targetWord !== undefined) {
        const firstWord = targetWord.slice(0, 1);
        let actualGrid = Array.from(firstWord);
        return actualGrid;
      }
      console.log("Actuals:", this.state.actuals);
      let actualGrid = this.state.actuals;

      return actualGrid;
    };
    //First time the actual Grid is empty
    //if (actualGrid.length === 0) ? populate the first letter from the expected word : use the actualgrid with guesses
    let actualGrid = fetchactualGrid();
    console.log(actualGrid);
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
    //Push to DB and stream
    /* const boardId = 1;

    const guessesGrid = actualGrid.join("");
    console.log("String: ", guessesGrid);
    updateBoard(boardId, guessesGrid);
 */
    return (
      <div>
        <Table bordered className="game-board">
          <tbody>{rows}</tbody>
        </Table>
        <form onSubmit={event => this.onSubmit(event)}>
          <label>Enter your guess:</label>
          <input
            name="guess"
            onChange={this.onChange}
            value={this.state.guess}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default connect()(Board);
