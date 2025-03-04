"use clinet";
import React from "react";
import { NavLinks } from "../../_landing_data/navLinks";
import { Button } from "@/components/ui/button";

const LandingHeroNav = () => {
  return (
    <div className="landing-hero-nav">
      <div className="landing-hero-nav-logo">
        <img src="/images/Logo/Logo.png" alt="Logo" />
        Autotrend.ai
      </div>
      <div className="landing-hero-nav-links">
        {NavLinks.map((link) => (
          <Button key={link.name} className="landing-hero-nav-links-item">
            {link.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LandingHeroNav;
