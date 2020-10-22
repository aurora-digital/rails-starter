import React from "react";
import asyncImport from "react-imported-component";
import { Link } from "react-router-dom";

import { useAuth } from "root/hooks/useAuth";

import styles from "./index.module.css";

const Text = asyncImport(() => import("root/components/Text"));

export default function Home() {
  const { user, handleLogout } = useAuth();

  return (
    <div className={styles.root}>
      <Text>Wow, an Async Component</Text>

      {user && <Text>Hello {user.name}!</Text>}

      <div className={styles.links}>
        {user && user.role === "admin" && <a href="/admin">Admin Area</a>}

        {user ? (
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  );
}
