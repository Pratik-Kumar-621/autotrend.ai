import LandingHero from "./_components/Hero_Section/LandingHero";
import LandingExplore from "./_components/Explore_Section/LandingExplore";
import "../_assets/styles/landing.scss";
import LandingSteps from "./_components/Steps_Section/LandingSteps";
import LandingFeatures from "./_components/Features_Section/LandingFeatures";
import LandingContact from "./_components/Contact_Section/LandingContact";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <div className="landing">
      <LandingHero />
      <LandingFeatures />
      <LandingSteps />
      <LandingExplore />
      <LandingContact />
      <ToastContainer />
    </div>
  );
}
