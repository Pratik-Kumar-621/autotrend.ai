"use client";
import React, { useState, useEffect } from "react";
import LoginForm from "./components/_admindetailComponents/LoginForm";
import AdminDetails from "./components/AdminDetails";

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loginData = localStorage.getItem("adminLogin");
    if (loginData) {
      const { expiry } = JSON.parse(loginData);
      if (new Date().getTime() < expiry) {
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem("adminLogin");
      }
    }
  }, []);

  const handleLogin = (username: string, password: string) => {
    const adminUsername = process.env.NEXT_PUBLIC_ADMIN_USER_NAME;
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    if (username === adminUsername && password === adminPassword) {
      const expiry = new Date().getTime() + 5 * 60 * 60 * 1000; // 5 hours
      localStorage.setItem("adminLogin", JSON.stringify({ expiry }));
      setIsLoggedIn(true);
    } else {
      setError("Invalid credentials");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminLogin");
    setIsLoggedIn(false);
  };

  if (isLoggedIn) {
    return <AdminDetails onLogout={handleLogout} />;
  }

  return <LoginForm onLogin={handleLogin} error={error} />;
};

export default AdminPage;
