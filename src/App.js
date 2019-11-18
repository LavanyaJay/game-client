import React from "react";
import { Fragment } from "react";
import { Route } from "react-router";
import "./App.css";
import store from "./store";
import { Provider } from "react-redux";
import LoginFormContainer from "./components/LoginFormContainer";
function App() {
  return (
    <Provider store={store}>
      <Fragment>
        <Route path="/" component={LoginFormContainer} exact></Route>
      </Fragment>
    </Provider>
  );
}

export default App;
