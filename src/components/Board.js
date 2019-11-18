import React, { Component } from "react";
import { Table } from "react-bootstrap";
import "../App.css";

export default class Game extends Component {
  render() {
    return (
      <Table bordered hover className="game-board">
        <tbody>
          <tr>
            <td className="box">B</td>
            <td className="box">O</td>
            <td className="box">R</td>
            <td className="box">D</td>
            <td className="box">E</td>
            <td className="box">R</td>
          </tr>
          <tr>
            <td className="box"></td>
            <td className="box"></td>
            <td className="box"></td>
            <td className="box"></td>
            <td className="box"></td>
            <td className="box"></td>
          </tr>
          <tr>
            <td className="box"></td>
            <td className="box"></td>
            <td className="box"></td>
            <td className="box"></td>
            <td className="box"></td>
            <td className="box"></td>
          </tr>
          <tr>
            <td className="box"></td>
            <td className="box"></td>
            <td className="box"></td>
            <td className="box"></td>
            <td className="box"></td>
            <td className="box"></td>
          </tr>
          <tr>
            <td className="box"></td>
            <td className="box"></td>
            <td className="box"></td>
            <td className="box"></td>
            <td className="box"></td>
            <td className="box"></td>
          </tr>
          <tr>
            <td className="box"></td>
            <td className="box"></td>
            <td className="box"></td>
            <td className="box"></td>
            <td className="box"></td>
            <td className="box"></td>
          </tr>
        </tbody>
      </Table>
    );
  }
}



