import React from "react";
import Image from "next/image";
import "../../_assets/styles/loadingScreen.scss";

const LoadingScreen: React.FC = () => {
  return (
    <div className="loading-screen">
      <Image
        src="/images/Logo/Logo.png"
        alt="Loading..."
        width={100}
        height={100}
        className="loading-animation primary-logo"
      />
    </div>
  );
};

export default LoadingScreen;
