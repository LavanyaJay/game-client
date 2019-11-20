import React, { Component } from "react";
import { Table } from "react-bootstrap";
import "../App.css";

export default class Game extends Component {
  render() {
    let targetWord = "ROTARY";
    let targetWordLen = targetWord.length;
    let expectedGrid = "";
    let inputWord = "RADAR";
    for (let i = 0; i < targetWordLen; i++) {
      expectedGrid += targetWord;
    }
    console.log(expectedGrid);
    expectedGrid = Array.from(expectedGrid);
    let actualGrid = Array.from("REACTYRETARYROTARY");
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
      console.log(gridState[i]);
    } //outermost for

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
      //Push to DB and stream
    }
    /* let rows = [];
    for (let i = 0; i < 6; i++) {
      let rowID = `row${i}`;
      let cell = [];
      for (var idx = 0; idx < 6; idx++) {
        let cellID = `cell${i}-${idx}`;
        cell.push(
          <td className="box blueSqr" key={cellID} id={cellID}>
            {inputWord[idx]}
          </td>
        );
      }
      rows.push(
        <tr key={i} id={rowID} className="box">
          {cell}
        </tr>
      );
    } */
    return (
      <div>
        <Table bordered className="game-board">
          <tbody>{rows}</tbody>
        </Table>
      </div>
      /*    <Table bordered className="game-board">
        <tbody>
          <tr className="box">
            <td className="redSqr">B</td>
            <td className="blueSqr"> O</td>
            <td className="blueSqr">R</td>
            <td className="blueSqr">D</td>
            <td className="yellowSqr">E</td>
            <td className="blueSqr">R</td>
          </tr>
          <tr className="box blueSqr">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr className="box blueSqr">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr className="box blueSqr">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr className="box blueSqr">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className="box blueSqr">d</td>
            <td className="box blueSqr"></td>
            <td className="box blueSqr"></td>
            <td className="box blueSqr"></td>
            <td className="box blueSqr"></td>
            <td className="box blueSqr"></td>
          </tr>
        </tbody>
      </Table> */
    );
  }
}
