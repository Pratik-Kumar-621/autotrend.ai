import React, { useState } from "react";
import SectionHeading from "../SectionHeading";
import KeywordSelection from "./KeywordSelection";
import PromptGeneration from "./PromptGeneration";
import ImageGeneration from "./ImageGeneration";
import PostingOnSocial from "./PostingOnSocial";
import StepperComponent from "@/components/stepper";
import LoadingScreen from "../LoadingScreen";

const steps = [
  "Search Keywords",
  "Generate Prompts",
  "Generate Image using the prompt",
  "Post on Socials",
];

const LandingExplore = ({ suggestion }: { suggestion: string[] }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [prompts, setPrompts] = useState([]);
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [image, setImage] = useState<any>([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [cachedImages, setCachedImages] = useState<{ [key: string]: any[] }>(
    {}
  );
  const [bodyLoading, setBodyLoading] = useState(false);

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };
  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

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

  const handlePromptRegeneration = async () => {
    setBodyLoading(true);
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
    } catch (error) {
      console.error("Error regenerating prompts:", error);
    } finally {
      setBodyLoading(false);
    }
  };

  const generateImage = async () => {
    try {
      const response = await fetch("/api/post/generateimage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keyword: selectedPrompt }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return "Error generating image:";
    }
  };

  const handleImageGeneration = async () => {
    if (cachedImages[selectedPrompt]) {
      setImage(cachedImages[selectedPrompt]);
      handleNext();
      return;
    }

    setLoading(true);
    try {
      const imagePromises = Array.from({ length: 6 }, () => generateImage());
      const generatedImages = await Promise.all(imagePromises);
      setImage(generatedImages);
      setCachedImages((prev) => ({
        ...prev,
        [selectedPrompt]: generatedImages,
      }));
      handleNext();
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageRegeneration = async () => {
    setBodyLoading(true);
    try {
      const imagePromises = Array.from({ length: 6 }, () => generateImage());
      const regeneratedImages = await Promise.all(imagePromises);
      setImage(regeneratedImages);
      setCachedImages((prev) => ({
        ...prev,
        [selectedPrompt]: regeneratedImages,
      }));
    } catch (error) {
      console.error("Error regenerating images:", error);
    } finally {
      setBodyLoading(false);
    }
  };

  const handlePostGeneration = () => {};

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
            {...{
              keyword,
              setKeyword,
              handlePromptGeneration,
              loading,
              suggestion,
            }}
          />
        )}
        {currentStep === 2 && (
          <PromptGeneration
            {...{
              prompts,
              handleImageGeneration,
              handlePromptRegeneration,
              selectedPrompt,
              setSelectedPrompt,
              handleBack,
              loading,
              bodyLoading,
            }}
          />
        )}
        {currentStep === 3 && (
          <ImageGeneration
            {...{
              image,
              handleBack,
              handlePostGeneration,
              handleImageRegeneration,
              loading,
              bodyLoading,
              selectedImage,
              setSelectedImage,
            }}
          />
        )}
        {currentStep === 4 && (
          <div className="landing-explore-stepper-content-social">
            <PostingOnSocial />
          </div>
        )}
      </div>
      {bodyLoading && <LoadingScreen />}
    </div>
  );
};

export default LandingExplore;
