"use client";
import React from "react";
import { NavLinks } from "../../_landing_data/navLinks";
import Button from "@mui/material/Button";
import Image from "next/image";

const LandingHeroNav = () => {
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
            className="landing-hero-nav-links-item"
          >
            {link.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LandingHeroNav;
