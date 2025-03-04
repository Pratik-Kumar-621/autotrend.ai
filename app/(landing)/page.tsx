import LandingHero from "./_components/Hero_Section/LandingHero";
import LandingExplore from "./_components/About_Section/LandingExplore";
import "../_assets/styles/landing.scss";

export default function Home() {
  return (
    <div className="landing">
      <LandingHero />
      <LandingExplore />
    </div>
  );
}
