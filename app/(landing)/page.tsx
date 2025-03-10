"use client";
import LandingHero from "./_components/Hero_Section/LandingHero";
import LandingExplore from "./_components/Explore_Section/LandingExplore";
import "../_assets/styles/landing.scss";
import LandingSteps from "./_components/Steps_Section/LandingSteps";
import LandingFeatures from "./_components/Features_Section/LandingFeatures";
import LandingContact from "./_components/Contact_Section/LandingContact";
import { toast, ToastContainer } from "react-toastify";
import React from "react";
import LoadingScreen from "./_components/LoadingScreen";
import { Feature, Step } from "./landingTypes";

export default function Home() {
  const [features, setFeatures] = React.useState<Feature[]>([]);
  const [steps, setSteps] = React.useState<Step[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [featuresResponse, stepsResponse] = await Promise.all([
          fetch("/api/features"),
          fetch("/api/steps"),
        ]);

        if (!featuresResponse.ok || !stepsResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const featuresData = await featuresResponse.json();
        const stepsData = await stepsResponse.json();

        setFeatures(featuresData);
        setSteps(stepsData);
      } catch (error: any) {
        toast.error(`Failed to fetch data. Reason: ${error.message} `);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="landing">
      {loading && <LoadingScreen />}
      <LandingHero />
      <LandingExplore />
      {!loading && (
        <>
          <LandingFeatures {...{ features }} />
          <LandingSteps {...{ steps }} />
        </>
      )}
      <LandingContact />
      <ToastContainer />
    </div>
  );
}
