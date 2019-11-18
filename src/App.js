import React from "react";
import { Fragment } from "react";
import { Route } from "react-router";
import "./App.css";
import store from "./store";
import { Provider } from "react-redux";
import UserForm from "./components/UserForm";
import LoginFormContainer from "./components/LoginFormContainer";
function App() {
  return (
    <Provider store={store}>
      <Fragment>
        <Route path="/" component={UserForm} exact></Route>
        <Route path="/signup/:id" component={LoginFormContainer}></Route>
        <Route path="/login/:id" component={LoginFormContainer}></Route>
      </Fragment>
    </Provider>
  );
}

export default App;
