import React, { Component } from "react";
import { connect } from "react-redux";
import { url } from "../constants";
import superagent from "superagent";
import { Link } from "react-router-dom";
import { loadLobby } from "../actions/lobby";

class Lobby extends Component {
  stream = new EventSource(`${url}/stream`);
  state = {
    rooms: [],
    value: ""
  };

  onChange = event => {
    const { value } = event.target;
    this.setState({ value });
  };

  onSubmit = event => {
    event.preventDefault();
    const value = this.state.value;

    const postUrl = `${url}/room`;
    superagent
      .post(postUrl)
      .send({ name: value })
      .then(res => {
        console.log("testing response: ", res);
      });
  };

  render() {
    const list = this.props.rooms.map((room, index) => (
      <p key={index}>
        <Link to={`/room/${room.name}`}>{room.name}</Link>
      </p>
    ));
    return (
      <div>
{/* 
      {user ? (<div>
          <p>Welcome back, {this.props.user.username}</p>
          <Link to='/'><p>Go back home</p></Link>
          </div>
        ) : (
          <LoginForm
            onSubmit={this.onSubmit}
            onChange={this.onChange}
            values={this.state}
          />
        )} */}

        <form onSubmit={this.onSubmit}>
          <label>Lobby Name</label>
          <input
            type="text"
            onChange={this.onChange}
            value={this.state.value}
          />
          <button>Submit</button>
          <button onClick={this.reset}>Reset</button>
        </form>
        {list}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { rooms: state.rooms, user: state.user   };
}

export default connect(mapStateToProps, { loadLobby })(Lobby);
