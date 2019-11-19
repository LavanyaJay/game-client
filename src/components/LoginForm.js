import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../App.css";

export default function LoginForm(props) {
  console.log(props.id);
  return (
    <div className="loginForm">
      <Form onSubmit={event => props.onSubmit(event)}>
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
            placeholder="Password"
            name="password"
            onChange={props.onChange}
            value={props.values.password}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Link to="/">Back to home</Link>
    </div>
  );
}
