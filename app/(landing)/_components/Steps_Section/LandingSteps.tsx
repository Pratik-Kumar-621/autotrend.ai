import React from "react";
import SectionHeading from "../SectionHeading";
import { StepProps } from "../../landingTypes";

const LandingSteps = ({ steps }: StepProps) => {
  return (
    <div className="landing-section" id="landing-steps">
      <SectionHeading
        heading="How it works"
        subheading="Follow these steps to generate trending social media posts in minutes 🚀"
      />

      <div className="max-w-[750px] mx-auto ">
        {steps
          .sort((a, b) => a.sequence - b.sequence)
          .map((step, index) => (
            <div key={index} className="mb-4">
              <div className="card bg-transparent p-4 rounded-lg shadow-md border border-[#6c6c6c] min-w-[200px] text-center">
                {step.step}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default LandingSteps;
