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
import axios from "axios";

fal.config({
  credentials: "YOUR_FAL_KEY",
});

export default function Home() {
  const [features, setFeatures] = React.useState<Feature[]>([]);
  const [steps, setSteps] = React.useState<Step[]>([]);
  const [suggestion, setSuggestion] = React.useState<string[]>([]);
  const [loadingFeature, setLoadingFeature] = React.useState(true);
  const [loadingSteps, setLoadingSteps] = React.useState(true);
  const [loadingSuggestions, setLoadingSuggestions] = React.useState(true);
  const { loadingAuth, token } = useAuth();

  React.useEffect(() => {
    getFeatures();
    getSteps();
    getSuggestions();
  }, []);
  const getFeatures = async () => {
    try {
      const response = await axios.get("/api/features");
      if (response.data.status === "Success") {
        setFeatures(response.data.data);
      } else {
        throw new Error();
      }
    } catch (error: any) {
      toast.error("Failed to load features");
      return error;
    } finally {
      setLoadingFeature(false);
    }
  };
  const getSteps = async () => {
    try {
      const response = await axios.get("/api/steps");
      if (response.data.status === "Success") {
        setSteps(response.data.data);
      } else {
        throw new Error();
      }
    } catch (error: any) {
      toast.error("Failed to load steps");
      return error;
    } finally {
      setLoadingSteps(false);
    }
  };
  const getSuggestions = async () => {
    try {
      const response = await axios.post("/api/suggestionGen");
      if (response.data.status === "Success") {
        setSuggestion(response.data.data);
      } else {
        throw new Error();
      }
    } catch (error: any) {
      toast.error("Failed to load suggestions");
      return error;
    } finally {
      setLoadingSuggestions(false);
    }
  };
  const handleAfterPost = () => {
    toast.success(
      "Post has been saved successfully. Visit dashboard Page to view the post"
    );
  };
  return (
    <div className="landing">
      {(loadingFeature ||
        loadingSteps ||
        loadingSuggestions ||
        loadingAuth) && <LoadingScreen />}
      <LandingHero />

      {!loadingSuggestions && (
        <LandingExplore {...{ suggestion, handleAfterPost, token }} />
      )}
      {!loadingFeature && features.length !== 0 && (
        <LandingFeatures {...{ features }} />
      )}
      {!loadingSteps && steps.length !== 0 && <LandingSteps {...{ steps }} />}

      <LandingContact />
      <ToastContainer />
    </div>
  );
}
