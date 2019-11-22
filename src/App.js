import React, {Component} from "react";
import { Fragment } from "react";
import { Route } from "react-router";
import "./App.css";
import Main from "./components/Main";
import LoginFormContainer from "./components/LoginFormContainer";
import GameContainer from "./components/GameContainer";
import { connect } from 'react-redux';
import {url} from './constants'

class App extends Component {

  stream = new EventSource(`${url}/stream`);

  componentDidMount(){
    this.stream.onmessage = (event) => {
      const { data } = event;
      //Convert serialize string to JSON string
      const parsed = JSON.parse(data);
      console.log('parsed', parsed)
      this.props.dispatch(parsed); 
    }
  }

  render() {
    return (
        <Fragment>
          <Route path="/" component={Main} exact></Route>
          <Route path="/room/:name" component={GameContainer}></Route>
        </Fragment>
    );
  }
}

export default connect()(App);
