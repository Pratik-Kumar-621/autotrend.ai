import React from "react";
import "../_assets/styles/admin.scss";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="admin">{children}</div>;
};

export default AdminLayout;
