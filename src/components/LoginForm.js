import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../App.css";

export default function LoginForm(props) {
  console.log(props.id);
  return (
    <div className="loginForm">
      <Form onSubmit={props.onSubmitLogin}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>UserName</Form.Label>
          <Form.Control
            className="input"
            type="text"
            placeholder="Enter username"
            name="username"
            onChange={props.onChange}
            value={props.values.username}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            className="input"
            type="password"
            placeholder="Enter password"
            name="password"
            onChange={props.onChange}
            value={props.values.password}
          />
        </Form.Group>
        <div className='formBtns'>
          <div>
              <Button variant="primary" type="submit">
                Login
              </Button>
          </div>
          <div>
              <Button variant="primary" onClick={props.onSubmitSignup}>
                Sign Up
              </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
