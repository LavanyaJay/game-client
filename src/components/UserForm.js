import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function UserForm(props) {
  return (
    <div>
      <div>
        <Link to="/signup/1">
          <Button variant="primary" type="submit">
            SignUp
          </Button>
        </Link>
      </div>

      <br></br>

      <div>
        <Link to="/login/2">
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
}
