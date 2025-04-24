"use client";
import React, { useEffect } from "react";
import { NavLinks } from "../../_landing_data/navLinks";
import Button from "@mui/material/Button";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import { LoginModal } from "../LoginModal";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import Logo from "@/components/logo";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { IconButton } from "@mui/material";

const LandingHeroNav = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
  const { user, logout, loadingAuth } = useAuth();
  useEffect(() => {
    if (user !== null) setIsLoginModalOpen(false);
  }, [user]);

  const handleScroll = (link: string) => {
    const targetElement = document.querySelector(link);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <>
      <div className="landing-hero-nav">
        <Logo />
        <div
          className="landing-hero-nav-links"
          style={isMobile ? { display: "none" } : {}}
        >
          {NavLinks.map((link) => (
            <Button
              variant="text"
              key={link.name}
              onClick={() => handleScroll(link.link)}
              className="landing-hero-nav-links-item"
            >
              {link.name}
            </Button>
          ))}
          {!loadingAuth && (
            <>
              {user ? (
                <>
                  <Link href="/dashboard">
                    <Button
                      variant="text"
                      className="landing-hero-nav-links-item"
                    >
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    variant="text"
                    color="error"
                    onClick={logout}
                    className="landing-hero-nav-links-item-logout"
                  >
                    <PowerSettingsNewIcon /> Logout
                  </Button>
                </>
              ) : (
                <>
                  &nbsp;
                  <Button
                    variant="contained"
                    onClick={() => setIsLoginModalOpen(true)}
                    className="landing-hero-nav-links-item-login"
                  >
                    Sign In
                  </Button>
                </>
              )}
            </>
          )}
        </div>
        {isMobile && (
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerOpen(true)}
            sx={{ ml: "auto", color: "#ffffff" }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </div>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { width: 250, background: "#181818", color: "#fff" },
        }}
      >
        <div style={{ padding: 24 }}>
          {NavLinks.map((link) => (
            <Button
              key={link.name}
              variant="text"
              fullWidth
              onClick={() => {
                setDrawerOpen(false);
                handleScroll(link.link);
              }}
              className="landing-hero-nav-links-item"
              sx={{ justifyContent: "flex-start", color: "#fff", mb: 1 }}
            >
              {link.name}
            </Button>
          ))}
          {!loadingAuth && (
            <>
              {user ? (
                <>
                  <Link href="/dashboard" passHref legacyBehavior>
                    <Button
                      variant="text"
                      fullWidth
                      onClick={() => setDrawerOpen(false)}
                      className="landing-hero-nav-links-item"
                      sx={{
                        justifyContent: "flex-start",
                        color: "#fff",
                        mb: 1,
                      }}
                    >
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    variant="text"
                    color="error"
                    fullWidth
                    onClick={() => {
                      setDrawerOpen(false);
                      logout();
                    }}
                    className="landing-hero-nav-links-item-logout"
                    sx={{ justifyContent: "flex-start", mb: 1 }}
                  >
                    <PowerSettingsNewIcon /> Logout
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    setDrawerOpen(false);
                    setIsLoginModalOpen(true);
                  }}
                  className="landing-hero-nav-links-item-login"
                  sx={{ justifyContent: "flex-start", mb: 1 }}
                >
                  Sign In
                </Button>
              )}
            </>
          )}
        </div>
      </Drawer>
      <LoginModal
        open={isLoginModalOpen}
        handleClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
};

export default LandingHeroNav;
