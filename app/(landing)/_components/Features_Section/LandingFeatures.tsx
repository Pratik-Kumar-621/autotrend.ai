/* eslint-disable */
"use client";
import Image from "next/image";
import React from "react";
import SectionHeading from "../SectionHeading";
import { FeatureProps } from "../../landingTypes";

const LandingFeatures = ({ features }: FeatureProps) => {
  return (
    <div className="landing-feature landing-section" id="landing-features">
      <SectionHeading
        heading="Powerful Features for Social Media Success"
        subheading="Streamline your social media workflow with our innovative tools"
      />
      <div className="landing-feature-list">
        {features
          .sort((a, b) => a.sequence - b.sequence)
          .map((item) => (
            <div className="landing-feature-list-item" key={item.id}>
              <div className="landing-feature-list-item-icon flex justify-center items-center">
                <Image
                  src={`data:image/jpeg;base64,${item.image}`}
                  alt={item.title}
                  width={32}
                  height={32}
                />
              </div>

              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default LandingFeatures;
