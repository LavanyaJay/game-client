import React from "react";

export default function LoginForm(props) {
  return (
    <div>
      <form onSubmit={event => props.onSubmit(event)}>
        <label>Username:</label>
        <input
          name="email"
          onChange={props.onChange}
          value={props.values.email}
        />
        <label>Password:</label>
        <input
          name="password"
          onChange={props.onChange}
          value={props.values.password}
        />

        <input type="submit" value="Login" />
      </form>
    </div>
  );
}
