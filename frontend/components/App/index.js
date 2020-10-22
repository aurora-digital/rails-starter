import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import asyncImport from "react-imported-component";

import { AuthProvider, useAuth } from "root/hooks/useAuth";

// Route code splitting, as an example
const Home = asyncImport(() => import("root/components/Home"));
const Login = asyncImport(() => import("root/components/Login"));

function InnerApp() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {!user && <Route path="/login" element={<Login />} />}
      </Routes>
    </Router>
  );
}

export default function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <InnerApp />
      </AuthProvider>
    </React.StrictMode>
  );
}
