"use client";

import React from "react";

interface AdminDetailsProps {
  onLogout: () => void;
}

const AdminDetails: React.FC<AdminDetailsProps> = ({ onLogout }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Admin Page</h1>
      <button
        onClick={onLogout}
        className="px-4 py-2 mt-4 font-medium text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminDetails;
