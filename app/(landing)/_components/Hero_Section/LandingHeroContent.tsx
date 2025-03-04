import { Button } from "@/components/ui/button";
import React from "react";

const LandingHeroContent = () => {
  return (
    <div className="landing-hero-content">
      <div className="landing-hero-content-info">
        <div className="landing-hero-content-info-title">
          Transform Your Social Media Management with AI
        </div>
        <div className="landing-hero-content-info-text">
          Generate trending posts in one click and post directly to your social
          handles
        </div>
        <div className="landing-hero-content-info-buttons">
          <Button className="landing-hero-content-info-buttons-item">
            Try it
          </Button>
          <Button className="landing-hero-content-info-buttons-item">
            Watch Demo
          </Button>
        </div>
      </div>
      <div className="landing-hero-content-image">
        <img src="/images/hero_image.png" alt="Hero Image" />
      </div>
    </div>
  );
};

export default LandingHeroContent;
