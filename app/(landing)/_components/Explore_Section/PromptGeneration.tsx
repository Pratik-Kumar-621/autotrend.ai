import { Button, IconButton, Tooltip } from "@mui/material";
import React, { useEffect } from "react";
import LoopIcon from "@mui/icons-material/Loop";
interface PromptsType {
  loading: boolean;
  prompts: string[];
  handleImageGeneration: () => void;
  handleBack: () => void;
  selectedPrompt: string;
  setSelectedPrompt: (inp: string) => void;
  bodyLoading: boolean;
  handlePromptRegeneration: () => void;
}

const PromptGeneration = (props: PromptsType) => {
  const {
    loading,
    prompts,
    handleImageGeneration,
    selectedPrompt,
    setSelectedPrompt,
    handleBack,
    bodyLoading,
    handlePromptRegeneration,
  } = props;
  useEffect(() => {
    if (!selectedPrompt) {
      setSelectedPrompt(prompts[0]);
    }
  }, [prompts]);

  return (
    <div className="landing-explore-prompts">
      <div className="landing-explore-prompts-heading">
        Select any prompt to generate image{" "}
        <Tooltip title="Regenerate Images">
          <IconButton color="inherit" onClick={handlePromptRegeneration}>
            <LoopIcon />
          </IconButton>
        </Tooltip>
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
          onClick={handleBack || bodyLoading}
          disabled={loading}
          className="landing-explore-prompts-buttons-back"
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={handleImageGeneration}
          className="landing-explore-prompts-buttons-next"
          disabled={!selectedPrompt || loading || bodyLoading}
        >
          {loading ? "Generating..." : "Generate Images"}
        </Button>
      </div>
    </div>
  );
};

export default PromptGeneration;
