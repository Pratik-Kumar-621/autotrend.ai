import React, { useState } from "react";
import SectionHeading from "../SectionHeading";
import { Button, Step, StepLabel, Stepper } from "@mui/material";
import KeywordSelection from "./KeywordSelection";
import PromptGeneration from "./PromptGeneration";
import ImageGeneration from "./ImageGeneration";
import PostingOnSocial from "./PostingOnSocial";

const steps = [
  "Generate Keywords",
  "Generate Prompts",
  "Generate Image using the prompt",
  "Post on Socials",
];

const buttonText = [
  {
    step: 1,
    activeName: "Generate Prompts",
    loadingName: "Generating...",
  },
  {
    step: 2,
    activeName: "Generate Image",
    loadingName: "Generating...",
  },
  {
    step: 3,
    activeName: "Create Post",
    loadingName: "Creating Post",
  },
  {
    step: 4,
    activeName: "Post on Social",
    loadingName: "Posting...",
  },
];

const LandingExplore = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };
  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };
  const handleSubmit = () => {
    console.log("Submit");
  };

  return (
    <div className="landing-section landing-explore" id="landing-explore">
      <SectionHeading
        heading="Generate trending posts"
        subheading="Create engaging and viral content effortlessly with AI"
      />
      <div className="landing-explore-steps">
        <Stepper activeStep={currentStep - 1} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>

      <div className="landing-explore-stepper-content">
        {currentStep === 1 && (
          <div className="landing-explore-stepper-content-keyword">
            <KeywordSelection />
          </div>
        )}
        {currentStep === 2 && (
          <div className="landing-explore-stepper-content-prompt">
            <PromptGeneration />
          </div>
        )}
        {currentStep === 3 && (
          <div className="landing-explore-stepper-content-image">
            <ImageGeneration />
          </div>
        )}
        {currentStep === 4 && (
          <div className="landing-explore-stepper-content-social">
            <PostingOnSocial />
          </div>
        )}
      </div>

      <div className="landing-explore-stepper-buttons">
        {currentStep > 1 && (
          <div className="landing-explore-stepper-buttons-back">
            <Button variant="outlined" onClick={handleBack}>
              Back
            </Button>
          </div>
        )}

        <div className="landing-explore-stepper-buttons-next">
          {buttonText.map((item) => {
            return (
              <>
                {currentStep === item.step ? (
                  <Button
                    variant="contained"
                    key={item.step}
                    onClick={() => {
                      if (currentStep === 4) {
                        handleSubmit();
                      } else handleNext();
                    }}
                  >
                    {item.activeName}
                  </Button>
                ) : (
                  <></>
                )}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LandingExplore;
