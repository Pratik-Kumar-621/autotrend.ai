import React from "react";
import SectionHeading from "../SectionHeading";

const LandingExplore = () => {
  const handleStart = () => {};
  return (
    <div className="landing-section" id="landing-explore">
      <SectionHeading
        heading="Generate trending posts"
        subheading="Create engaging and viral content effortlessly with AI"
      />
      {/* Add a button to start the process */}
      <button onClick={handleStart} className="start-button">
        Start Generating Posts
      </button>
    </div>
  );
};

export default LandingExplore;
