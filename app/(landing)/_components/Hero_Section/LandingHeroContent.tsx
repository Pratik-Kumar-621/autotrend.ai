import React from "react";
import Button from "@mui/material/Button";
import { Tooltip } from "@mui/material";
import Image from "next/image";

const LandingHeroContent = () => {
  const handleClick = () => {
    const targetElement = document.querySelector("#landing-explore");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="landing-hero-content">
      <div className="landing-hero-content-info">
        <div className="landing-hero-content-info-title bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)] ">
          Transform Your Social Media Management with AI
        </div>
        <div className="landing-hero-content-info-text">
          Generate trending posts in few clicks and post directly to your social
          handles
        </div>
        <div className="landing-hero-content-info-buttons">
          <Button
            className="landing-hero-content-info-buttons-item-primary"
            variant="contained"
            onClick={handleClick}
          >
            Try it&nbsp; ⇾
          </Button>
          <Tooltip title="Coming Soon" arrow>
            <div>
              <Button
                variant="outlined"
                disabled
                className="landing-hero-content-info-buttons-item-secondary"
              >
                Watch Demo
              </Button>
            </div>
          </Tooltip>
        </div>
      </div>
      <div className="landing-hero-content-image">
        <Image
          src="/images/hero_image.png"
          alt="Hero Image"
          height={322}
          width={474}
        />
      </div>
    </div>
  );
};

export default LandingHeroContent;
