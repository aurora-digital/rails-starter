import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import useForm from "root/hooks/useForm";
import { useAuth } from "root/hooks/useAuth";

import styles from "./index.css";

export default function Login() {
  const { formValues, handleChange } = useForm();
  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  async function handleSubmit(event) {
    const { email, password } = formValues;

    event.preventDefault();

    try {
      await handleLogin(email, password);

      navigate("/");
    } catch {
      setError(true);
    }
  }

  return (
    <div className={styles.root}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Emails
          <input id="email" name="email" type="text" onChange={handleChange} />
        </label>

        <label htmlFor="password">
          Password
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
          />
        </label>

        {error && <p>User password combination not found</p>}

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
