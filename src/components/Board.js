import React, { Component } from "react";
import { Table } from "react-bootstrap";
import "../App.css";

export default class Game extends Component {
  render() {
    return (
      <Table bordered className="game-board">
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
      </Table>
    );
  }
}
