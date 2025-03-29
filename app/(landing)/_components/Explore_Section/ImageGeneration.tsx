import Image from "next/image";
import { Button, IconButton, Tooltip } from "@mui/material";
import React, { useEffect } from "react";
import LoopIcon from "@mui/icons-material/Loop";
interface ImageGenProps {
  image: any;
  handleBack: () => void;
  handlePostGeneration: () => void;
  loading: boolean;
  selectedImage: string;
  setSelectedImage: (image: string) => void;
  bodyLoading: boolean;
  handleImageRegeneration: () => void;
}
const ImageGeneration = (props: ImageGenProps) => {
  const {
    image,
    handleBack,
    handlePostGeneration,
    loading,
    selectedImage,
    setSelectedImage,
    bodyLoading,
    handleImageRegeneration,
  } = props;
  useEffect(() => {
    setSelectedImage(image[0].url);
  }, [image]);
  return (
    <div className="landing-explore-images">
      <div className="landing-explore-images-heading">
        Select any Image to generate a post{" "}
        <Tooltip title="Regenerate Prompts">
          <IconButton color="inherit" onClick={handleImageRegeneration}>
            <LoopIcon />
          </IconButton>
        </Tooltip>
      </div>
      <div className="landing-explore-images-list">
        {image?.map((item: any, ind: number) => {
          return (
            <label
              htmlFor={item.url}
              key={ind}
              className={`landing-explore-images-list-item ${
                item.url === selectedImage &&
                "landing-explore-images-list-item-active"
              }`}
            >
              <input
                type="radio"
                name="generated-image"
                id={item.url}
                checked={item.url === selectedImage}
                onChange={() => setSelectedImage(item.url)}
              />
              <Image src={item.url} alt="Image" width={400} height={400} />
            </label>
          );
        })}
      </div>
      <div className="landing-explore-prompts-buttons">
        <Button
          variant="outlined"
          onClick={handleBack}
          disabled={loading || bodyLoading}
          className="landing-explore-prompts-buttons-back"
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={handlePostGeneration}
          className="landing-explore-prompts-buttons-next"
          disabled={!selectedImage || loading || bodyLoading}
        >
          {loading ? "Generating..." : "Generate Post"}
        </Button>
      </div>
    </div>
  );
};

export default ImageGeneration;
