import Image from "next/image";
import React, { useEffect } from "react";

interface ImageGenerationProps {
  selectedPrompt: string;
}
const GeneratedImage = (props: ImageGenerationProps) => {
  const { selectedPrompt } = props;
  const [loading, setLoading] = React.useState(false);

  const [image, setImage] = React.useState<string>("");
  useEffect(() => {
    const generateImage = async () => {
      setLoading(true);
      const res = await fetch("/api/post/generateimage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: selectedPrompt }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setImage(data.b64_json);
        setLoading(false);
      } else {
        console.log("something went wrong");
        setLoading(false);
      }
    };
    generateImage();
  }, [selectedPrompt]);

  return (
    <div>
      {loading ? (
        <p>Generating Image...</p>
      ) : (
        <Image
          src={`data:image/jpeg;base64,${image}`}
          alt={selectedPrompt}
          width={300}
          height={300}
        />
      )}
    </div>
  );
};

export default GeneratedImage;
