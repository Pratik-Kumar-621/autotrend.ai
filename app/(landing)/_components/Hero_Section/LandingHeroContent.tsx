import React from "react";
import { Logo } from "../../../_assets/images/image.png";
import Image from "next/image";

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
          <button className="landing-hero-content-info-buttons-item">
            Get Started
          </button>
          <button className="landing-hero-content-info-buttons-item">
            Watch Demo
          </button>
        </div>
      </div>
      <div className="landing-hero-content-image">
        <div className="landing-hero-content-image-item">
          <Image
            src="/images/image.png"
            alt="twitter-img"
            width={300}
            height={200}
          />
        </div>{" "}
        <div className="landing-hero-content-image-item">
          <Image
            src="/images/image.png"
            alt="instagram-img"
            width={300}
            height={200}
          />{" "}
        </div>{" "}
        <div className="landing-hero-content-image-item">
          <Image
            src="/images/image.png"
            alt="facebook-img"
            width={300}
            height={200}
          />{" "}
        </div>
      </div>
    </div>
  );
};

export default LandingHeroContent;
