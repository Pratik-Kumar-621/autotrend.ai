import { Button } from "@mui/material";
import React from "react";

interface PromptsType {
  loading: boolean;
  prompts: string[];
  handleImageGeneration: () => void;
  handleBack: () => void;
  selectedPrompt: string;
  setSelectedPrompt: (inp: string) => void;
}

const PromptGeneration = (props: PromptsType) => {
  const {
    loading,
    prompts,
    handleImageGeneration,
    selectedPrompt,
    setSelectedPrompt,
    handleBack,
  } = props;
  console.log(selectedPrompt);

  return (
    <div className="landing-explore-prompts">
      <div className="landing-explore-prompts-heading">
        Select any prompt to generate image
      </div>
      <div className="landing-explore-prompts-list">
        {prompts.map((item) => {
          return (
            <label
              className={`landing-explore-prompts-list-item ${
                item === selectedPrompt &&
                "landing-explore-prompts-list-item-active"
              }`}
              key={item}
              htmlFor={item}
            >
              <input
                type="radio"
                name="prompt"
                id={item}
                checked={item === selectedPrompt}
                onChange={() => setSelectedPrompt(item)}
              />

              {item}
            </label>
          );
        })}
      </div>
      <div className="landing-explore-prompts-buttons">
        <Button
          variant="outlined"
          onClick={handleBack}
          disabled={loading}
          className="landing-explore-prompts-buttons-back"
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={handleImageGeneration}
          className="landing-explore-prompts-buttons-next"
          disabled={!selectedPrompt || loading}
        >
          {loading ? "Generating..." : "Generate Images"}
        </Button>
      </div>
    </div>
  );
};

export default PromptGeneration;
