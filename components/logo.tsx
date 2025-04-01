import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="logo">
      <Image src="/images/Logo/Logo.png" alt="Logo" width={31} height={20} />
      Autotrend.ai
    </div>
  );
};

export default Logo;
