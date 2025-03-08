import Image from "next/image";
import React, { useEffect, useState } from "react";

type Feature = {
  id: number;
  title: string;
  description: string;
  image: any;
  createdAt: Date;
};

const LandingFeatures = () => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    fetch("/api/features")
      .then((res) => res.json())
      .then((feature) => setFeatures(feature));
  }, []);
  console.log(features);

  return (
    <div className="landing-section" id="landing-features">
      {features?.map((item: Feature) => {
        return (
          <div className="feature-list-item" key={item.id}>
            {item.title}
            <img src={`data:image/png;base64,${item.image}`} alt="" />{" "}
          </div>
        );
      })}
    </div>
  );
};

export default LandingFeatures;
