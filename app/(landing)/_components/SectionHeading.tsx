import React from "react";

interface SectionHeadingProps {
  heading: string;
  subheading: string;
}

const SectionHeading = ({ heading, subheading }: SectionHeadingProps) => {
  return (
    <div className="section-heading">
      <h2 className="text-3xl font-bold text-center mb-4">{heading}</h2>
      <p className="text-center text-lg mb-8 px-4">{subheading}</p>
    </div>
  );
};

export default SectionHeading;
