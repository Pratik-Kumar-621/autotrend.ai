"use client";

import LandingHeroContent from "./LandingHeroContent";
import LandingHeroNav from "./LandingHeroNav";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const LandingHero = () => {
  return (
    <div className={`landing-hero ${montserrat.variable}`}>
      <LandingHeroNav />
      <LandingHeroContent />
    </div>
  );
};

export default LandingHero;
