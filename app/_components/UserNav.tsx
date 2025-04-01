"use client";
import React from "react";
import Logo from "@/components/logo";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { Button } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

const buttons = ["home", "dashboard", "profile"];

const UserNav = () => {
  const router = useRouter();
  const { logout } = useAuth();

  const pathname = usePathname();
  console.log(pathname);

  return (
    <div className="user-nav">
      <Logo />
      <div className="user-nav-links">
        {buttons.map((item) => {
          return (
            <Button
              className={`user-nav-links-item ${
                pathname === item && "active-user-link"
              }`}
              disabled={pathname === `/${item}`}
              variant="text"
              key={item}
              onClick={() => {
                if (item === "home") return router.push("/");
                return router.push(`/${item}`);
              }}
            >
              {item}
            </Button>
          );
        })}

        <Button
          className="user-nav-links-logout"
          variant="text"
          onClick={logout}
          color="error"
        >
          <PowerSettingsNewIcon /> Logout
        </Button>
      </div>
    </div>
  );
};

export default UserNav;
