// Polyfills should be imported before EVERYTHING
import "root/shared/polyfills";
import React from "react";
import ReactDOM from "react-dom";

import App from "root/components/App";
import setupCsrfToken from "root/api/setupCsrfToken";

import "./styles/reset.css";

window.addEventListener("DOMContentLoaded", () => {
  setupCsrfToken();

  ReactDOM.render(<App />, document.getElementById("root"));
});
