"use client";
import React, { useEffect } from "react";
import { NavLinks } from "../../_landing_data/navLinks";
import Button from "@mui/material/Button";
import Image from "next/image";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import { LoginModal } from "../LoginModal";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

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

  return (
    <>
      <div className="landing-hero-nav">
        <div className="landing-hero-nav-logo">
          <Image
            src="/images/Logo/Logo.png"
            alt="Logo"
            width={31}
            height={20}
          />
          Autotrend.ai
        </div>
        <div className="landing-hero-nav-links">
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
      </div>
      <LoginModal
        open={isLoginModalOpen}
        handleClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
};

export default LandingHeroNav;
