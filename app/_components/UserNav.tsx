"use client";
import React from "react";
import Logo from "@/components/logo";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Button } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

const buttons = ["home", "dashboard", "profile"];

const UserNav = () => {
  const router = useRouter();
  const { logout } = useAuth();
  const pathname = usePathname();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <div className="user-nav">
      <Logo />
      <div
        className="user-nav-links"
        style={isMobile ? { display: "none" } : {}}
      >
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
      {isMobile && (
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={() => setDrawerOpen(true)}
          sx={{ ml: "auto" }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { width: 220, background: "#181818", color: "#fff" },
        }}
      >
        <div style={{ padding: 24 }}>
          {buttons.map((item) => (
            <Button
              key={item}
              className={`user-nav-links-item ${
                pathname === item && "active-user-link"
              }`}
              disabled={pathname === `/${item}`}
              variant="text"
              fullWidth
              onClick={() => {
                setDrawerOpen(false);
                if (item === "home") return router.push("/");
                return router.push(`/${item}`);
              }}
              sx={{ justifyContent: "flex-start", color: "#fff", mb: 1 }}
            >
              {item}
            </Button>
          ))}
          <Button
            className="user-nav-links-logout"
            variant="text"
            fullWidth
            onClick={() => {
              setDrawerOpen(false);
              logout();
            }}
            color="error"
            sx={{ justifyContent: "flex-start", mb: 1 }}
          >
            <PowerSettingsNewIcon /> Logout
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default UserNav;
