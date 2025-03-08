/* eslint-disable */

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
      .then((feature) => setFeatures(feature))
      .catch((error) => console.log(error.message));
  }, []);
  console.log(features);

  return (
    <div className="landing-section" id="landing-features">
      {features ? (
        features.map((item: Feature) => {
          return (
            <div className="feature-list-item" key={item.id}>
              {item.title}
            </div>
          );
        })
      ) : (
        <>Error</>
      )}
    </div>
  );
};

export default LandingFeatures;
