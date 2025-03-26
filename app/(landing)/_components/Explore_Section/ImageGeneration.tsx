import Image from "next/image";
import React from "react";

const ImageGeneration = ({ image }: { image: any }) => {
  return (
    <div>
      <Image
        src={`data:image/jpeg;base64,${image}`}
        alt="Image"
        width={400}
        height={400}
      />
    </div>
  );
};

export default ImageGeneration;
