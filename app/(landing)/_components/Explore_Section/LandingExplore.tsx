"use client";

import React, { useState } from "react";
import SectionHeading from "../SectionHeading";
import KeywordSelection from "./KeywordSelection";
import PromptGeneration from "./PromptGeneration";
import ImageGeneration from "./ImageGeneration";
import PostingOnSocial from "./PostingOnSocial";
import StepperComponent from "@/components/stepper";
import LoadingScreen from "../LoadingScreen";
import axios from "axios";
import { toast } from "react-toastify";

const steps = [
  "Search Keywords",
  "Generate Prompts",
  "Generate Image using the prompt",
  "Post on Socials",
];

const LandingExplore = ({
  suggestion,
  handleAfterPost,
  token,
}: {
  suggestion: string[];
  handleAfterPost: () => void;
  token: string;
}) => {
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
  const [description, setDescription] = useState(""); // Add state for description
  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
    const targetElement = document.querySelector("#landing-explore");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
    const targetElement = document.querySelector("#landing-explore");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handlePromptGeneration = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/promptGen", {
        keyword,
      });
      const data = await response.data;
      if (data.type === "Error") throw new Error();
      else {
        setPrompts(data.data);
        handleNext();
        setSelectedPrompt(data.data[0]);
      }
    } catch (error: any) {
      toast.error("Error generating prompts");
      return error.message;
    } finally {
      setLoading(false);
    }
  };

  const handlePromptRegeneration = async () => {
    setBodyLoading(true);
    try {
      const response = await axios.post("/api/promptGen", {
        data: { keyword },
      });
      const data = await response.data;
      if (data.type === "Error") throw new Error();
      else {
        setPrompts(data.data);
        setSelectedPrompt(data.data[0]);
      }
    } catch (error: any) {
      toast.error("Error regenerating prompts");
      return error.message;
    } finally {
      setBodyLoading(false);
    }
  };

  const generateImage = async () => {
    try {
      const response = await axios.post("/api/imageGen", {
        selectedPrompt,
      });
      const data = response.data;
      if (data.type === "Error") throw new Error();
      else {
        return data.data;
      }
    } catch (error: any) {
      toast.error("Error generating image", {
        toastId: "image-gen-error",
      });
      return error.message;
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
      const imagePromises = Array.from({ length: 3 }, () => generateImage());
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
      const imagePromises = Array.from({ length: 3 }, () => generateImage());
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

  const handlePostGeneration = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/descriptionGen", {
        prompt: selectedPrompt,
      });
      const data = await response.data;
      if (data.type === "Error") throw new Error();
      else {
        setDescription(data.data);
        handleNext();
      }
    } catch (error: any) {
      toast.error("Error generating post");
      return error.message;
    } finally {
      setLoading(false);
    }
  };
  const handlePostRegeneration = async () => {
    setBodyLoading(true);
    try {
      const response = await axios.post("/api/descriptionGen", {
        prompt: selectedPrompt,
      });
      const data = await response.data;
      if (data.type === "Error") throw new Error();
      else setDescription(data.data);
    } catch (error: any) {
      toast.error("Error regenerating description");
      return error.message;
    } finally {
      setBodyLoading(false);
    }
  };

  const handlePostOnSocial = async () => {
    setBodyLoading(true);
    try {
      const response = await axios.post(
        "/api/savePost",
        {
          keyword: keyword,
          image: selectedImage,
          description: description,
          postedAt: [],
        },
        {
          headers: {
            Authorization: `Bearer ${token?.replace("\n", "")}`,
          },
        }
      );

      const data = await response.data;
      if (data.type === "Error") {
        throw new Error();
      }
      setCurrentStep(1);
      setKeyword("");
      setSelectedImage("");
      setSelectedImage("");
      handleAfterPost();
    } catch (error: any) {
      toast.error("Error Posting content");
      return error.message;
    } finally {
      setBodyLoading(false);
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
            <PostingOnSocial
              {...{
                handleBack,
                loading,
                bodyLoading,
                selectedImage,
                description,
                handlePostRegeneration,
                handlePostOnSocial,
              }}
            />
          </div>
        )}
      </div>
      {bodyLoading && <LoadingScreen />}
    </div>
  );
};

export default LandingExplore;
