import React, { useState } from "react";
import SectionHeading from "../SectionHeading";
import KeywordSelection from "./KeywordSelection";
import PromptGeneration from "./PromptGeneration";
import ImageGeneration from "./ImageGeneration";
import PostingOnSocial from "./PostingOnSocial";
import StepperComponent from "@/components/stepper";

const steps = [
  "Search Keywords",
  "Generate Prompts",
  "Generate Image using the prompt",
  "Post on Socials",
];

const LandingExplore = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [prompts, setPrompts] = useState([]);
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [image, setImage] = useState("");
  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };
  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };
  // const handleSubmit = () => {
  //   console.log("Submit");
  // };

  const handlePromptGeneration = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/post/prompts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keyword }),
      });
      const data = await response.json();
      setPrompts(data || []);
      handleNext();
    } catch (error) {
      console.error("Error generating prompts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageGeneration = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/post/generateimage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keyword: selectedPrompt }),
      });
      const data = await response.json();
      setImage(data.b64_json || "");
      handleNext();
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landing-section landing-explore" id="landing-explore">
      <SectionHeading
        heading="Generate trending posts"
        subheading="Create engaging and viral content effortlessly with AI"
      />
      <div className="landing-explore-steps">
        <StepperComponent {...{ currentStep, steps, handlePromptGeneration }} />
      </div>

      <div className="landing-explore-stepper-content">
        {currentStep === 1 && (
          <KeywordSelection
            {...{ keyword, setKeyword, handlePromptGeneration, loading }}
          />
        )}
        {currentStep === 2 && (
          <PromptGeneration
            {...{
              prompts,
              handleImageGeneration,
              selectedPrompt,
              setSelectedPrompt,
              handleBack,
              loading,
            }}
          />
        )}
        {currentStep === 3 && <ImageGeneration {...{ image }} />}
        {currentStep === 4 && (
          <div className="landing-explore-stepper-content-social">
            <PostingOnSocial />
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingExplore;
