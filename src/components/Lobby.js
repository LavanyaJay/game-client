import React, { Component } from "react";
import { connect } from "react-redux";
import { url } from "../constants";
import superagent from "superagent";
import { Link } from "react-router-dom";

class Lobby extends Component {
  stream = new EventSource("http://localhost:4000/stream");
  state = {
    rooms: [],
    value: ""
  };

  componentDidMount() {
    console.log("didmount");
    //Destructure data that was passed to stream.send
    this.stream.onmessage = event => {
      const { data } = event;

      console.log("data ", data);

      //Convert serilaize string to JSON string
      const parsed = JSON.parse(data);
      console.log("parsed: ", parsed);
      const rooms = [...this.state.rooms, parsed.name];
      this.setState({ rooms });
      /* if (Array.isArray(parsed)) {
        this.setState({ rooms: parsed });
      } else {
        const rooms = [...this.state.rooms, parsed];
        this.setState({ rooms });
      }
 */
      console.log("data test: ", data);
    };
  }

  onChange = event => {
    const { value } = event.target;
    this.setState({ value });
  };

  onSubmit = event => {
    //stops the form from reloading the page
    /* event.preventDefault();
    const { value } = this.state;
    superagent
      .post(`${url}/room`)
      .set("Authorization", `Bearer ${this.props.user.jwt}`)
      .send({ name: value })
      .then(response => console.log(response));
	this.setState({ value: "" }); */
    event.preventDefault();
    const value = this.state.value;

    const url = "http://localhost:4000/room";
    superagent
      .post(url)
      .send({ name: value })
      .then(res => {
        console.log("testing response: ", res);
      });
  };

  render() {
    const list = this.state.rooms.map((name, index) => (
      <p key={index}>
        <Link to={`/room/${name}`}>{name}</Link>
      </p>
    ));
    return (
      <div>
        This is the lobby. There will be rooms here.
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
  return { user: state.user };
}

export default connect(mapStateToProps)(Lobby);
