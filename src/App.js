import React from "react";
import { Fragment } from "react";
import { Route } from "react-router";
import "./App.css";
import store from "./store";
import { Provider } from "react-redux";
import Main from "./components/Main";
import LoginFormContainer from "./components/LoginFormContainer";
import GameContainer from "./components/GameContainer";

function App() {
  return (
    <Provider store={store}>
      <Fragment>
        <Route path="/" component={Main} exact></Route>
        <Route path="/signup/:id" component={LoginFormContainer}></Route>
        <Route path="/login/:id" component={LoginFormContainer}></Route>
        <Route path="/room/:roomId" component={GameContainer}></Route>
      </Fragment>
    </Provider>
  );
}

export default App;
