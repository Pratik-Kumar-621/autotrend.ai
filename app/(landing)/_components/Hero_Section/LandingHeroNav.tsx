"use client";
import React from "react";
import { NavLinks } from "../../_landing_data/navLinks";
import Button from "@mui/material/Button";
import Image from "next/image";

const LandingHeroNav = () => {
  const handleScroll = (link: string) => {
    const targetElement = document.querySelector(link);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="landing-hero-nav">
      <div className="landing-hero-nav-logo">
        <Image src="/images/Logo/Logo.png" alt="Logo" width={31} height={20} />
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
        <Button variant="contained" className="landing-hero-nav-links-item">
          Login
        </Button>
      </div>
    </div>
  );
};

export default LandingHeroNav;
