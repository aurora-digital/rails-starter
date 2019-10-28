import { hot } from "react-hot-loader/root";
import React, { Component } from "react";
import { login } from "root/api/auth";

import styles from "./index.css";

class Login extends Component {
  handleInputChange = event => {
    const {
      target: { name, value }
    } = event;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    const { email, password } = this.state;

    try {
      await login(email, password);
    } catch (error) {
      console.error(error); // eslint-disable-line
    }
  };

  render() {
    return (
      <div className={styles.root}>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">
            Emails
            <input
              id="email"
              name="email"
              type="text"
              onChange={this.handleInputChange}
            />
          </label>

          <label htmlFor="password">
            Password
            <input
              id="password"
              name="password"
              type="password"
              onChange={this.handleInputChange}
            />
          </label>

          <button type="submit">Sign In</button>
        </form>
      </div>
    );
  }
}

export default hot(Login);