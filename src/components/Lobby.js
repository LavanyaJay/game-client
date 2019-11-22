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

  onSubmit = async event => {
    event.preventDefault();
    const value = this.state.value;

    const postUrl = `${url}/room`;
    const newRoomId = await superagent
      .post(postUrl)
      .send({ name: value })
      .then(res => res.body.id);

    const response = await superagent.post(`${url}/${newRoomId}/board`);
    console.log("response test:", response);
  };

  render() {
    const list = this.props.rooms.map((room, index) => (
      <Link to={`/room/${room.name}`} style={{ textDecoration: 'none' }}><div key={index} className='room'>
        {room.name}
      </div></Link>
    ));
    return (
      <div>

        <form className='newRoomForm' onSubmit={this.onSubmit}>
          <label>Create a new room :</label>
          <input
            type="text"
            onChange={this.onChange}
            value={this.state.value}
          />
          <button>Submit</button>
          <button onClick={this.reset}>Reset</button>
        </form>
        <div className='roomGallery'>{list}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { rooms: state.rooms, user: state.user };
}

export default connect(mapStateToProps, { loadLobby })(Lobby);
