"use client";
import React from "react";
import { NavLinks } from "../../_landing_data/navLinks";
import Button from "@mui/material/Button";
import Image from "next/image";
import { LoginModal } from "@/components/auth/login-modal";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";

const LandingHeroNav = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
  const { user, logout } = useAuth();

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
          &nbsp; &nbsp;
          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button
                  variant="contained"
                  className="landing-hero-nav-links-item-login"
                >
                  Dashboard
                </Button>
              </Link>
              <Button
                variant="outlined"
                onClick={logout}
                className="landing-hero-nav-links-item-login"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              variant="contained"
              onClick={() => setIsLoginModalOpen(true)}
              className="landing-hero-nav-links-item-login"
            >
              Login
            </Button>
          )}
        </div>
      </div>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
};

export default LandingHeroNav;
