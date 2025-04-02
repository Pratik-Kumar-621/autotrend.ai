"use client";
import LandingHero from "./_components/Hero_Section/LandingHero";
import LandingExplore from "./_components/Explore_Section/LandingExplore";
import LandingSteps from "./_components/Steps_Section/LandingSteps";
import LandingFeatures from "./_components/Features_Section/LandingFeatures";
import LandingContact from "./_components/Contact_Section/LandingContact";
import { toast, ToastContainer } from "react-toastify";

import React from "react";
import LoadingScreen from "./_components/LoadingScreen";
import { Feature, Step } from "./landingTypes";

import { fal } from "@fal-ai/client";
import { useAuth } from "@/lib/auth-context";

fal.config({
  credentials: "YOUR_FAL_KEY",
});

export default function Home() {
  const [features, setFeatures] = React.useState<Feature[]>([]);
  const [steps, setSteps] = React.useState<Step[]>([]);
  const [suggestion, setSuggestion] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(true);
  const { loadingAuth, token } = useAuth();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [featuresResponse, stepsResponse, suggestionResponse] =
          await Promise.all([
            fetch("/api/features"),
            fetch("/api/steps"),
            fetch("/api/post/suggestedkeyword", { method: "POST" }),
          ]);

        const featuresData = await featuresResponse.json();
        const stepsData = await stepsResponse.json();
        const suggestionData = await suggestionResponse.json();

        setFeatures(featuresData);
        setSteps(stepsData);
        setSuggestion(suggestionData);
      } catch (error: any) {
        toast.error(`Failed to fetch data. Reason: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleAfterPost = () => {
    toast.success(
      "Post has been saved successfully. Visit dashboard Page to view the post"
    );
  };
  return (
    <div className="landing">
      {(loading || loadingAuth) && <LoadingScreen />}
      <LandingHero />
      {!loading && (
        <>
          <LandingExplore {...{ suggestion, handleAfterPost, token }} />
          {features.length !== 0 && <LandingFeatures {...{ features }} />}
          {steps.length !== 0 && <LandingSteps {...{ steps }} />}
        </>
      )}
      <LandingContact />
      <ToastContainer />
    </div>
  );
}
