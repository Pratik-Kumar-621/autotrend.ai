"use client";
import React, { useState } from "react";
import { LoginFormProps } from "../adminTypes";
import { Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
const LoginForm: React.FC<LoginFormProps> = ({ onLogin, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const username = (e.target as HTMLFormElement).username.value;
    const password = (e.target as HTMLFormElement).password.value;
    onLogin(username, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-8 space-y-6 text-black bg-white rounded shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-900">
            Admin Login
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username:
            </label>
            <input
              type="text"
              name="username"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </button>
            </div>
          </div>
          <Button
            type="submit"
            variant="contained"
            className="w-full !capitalize !text-[16px] !rounded-md !py-2"
          >
            Login
          </Button>
        </form>
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default LoginForm;
