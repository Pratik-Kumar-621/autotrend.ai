"use client";

import { Vortex } from "@/components/ui/vortex";
import LandingHeroContent from "./LandingHeroContent";
import LandingHeroNav from "./LandingHeroNav";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const LandingHero = () => {
  return (
    <div className={`landing-hero ${montserrat.variable} overflow-hidden`}>
      <Vortex
        backgroundColor="black"
        rangeY={150}
        particleCount={300}
        baseHue={180}
      >
        <LandingHeroNav />
        <LandingHeroContent />
      </Vortex>
    </div>
  );
};

export default LandingHero;
