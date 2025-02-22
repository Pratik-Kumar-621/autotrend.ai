import LandingAbout from "./_components/About_Section/LandingAbout";
import LandingHero from "./_components/Hero_Section/LandingHero";

export default function Home() {
  return (
    <div className="landing">
      <LandingHero />
      <LandingAbout />
    </div>
  );
}
