"use client";
import React, { useState, useEffect } from "react";
import LoginForm from "./_components/LoginForm";
import AdminDetails from "./_components/AdminDetails";
import LoadingScreen from "../(landing)/_components/LoadingScreen";

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // check if user is logged in or not
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
    setLoading(false);
  }, []);

  // login user and save the user instance in localstorage
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

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="mx-10">
          {isLoggedIn ? (
            <AdminDetails onLogout={handleLogout} />
          ) : (
            <LoginForm onLogin={handleLogin} error={error} />
          )}
        </div>
      )}
    </>
  );
};

export default AdminPage;
