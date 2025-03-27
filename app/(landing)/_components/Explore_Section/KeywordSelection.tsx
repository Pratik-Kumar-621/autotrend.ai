import { Button, TextField } from "@mui/material";
import React from "react";

interface KeywordProps {
  keyword: string;
  setKeyword: (keyword: string) => void;
  handlePromptGeneration: () => void;
  loading: boolean;
  suggestion: string[];
}

const KeywordSelection = (props: KeywordProps) => {
  const { keyword, setKeyword, handlePromptGeneration, loading, suggestion } =
    props;

  return (
    <div className="landing-explore-keyword">
      <div className="landing-explore-keyword-heading">
        Provide the keyword to generate prompts
      </div>
      <TextField
        className="landing-explore-keyword-input"
        id="outlined-basic"
        label="Enter your keyword (e.g. 'Tech Innovation')"
        variant="outlined"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <br />
      <div className="landing-explore-keyword-suggestions">
        <div className="landing-explore-keyword-suggestions-heading bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
          Trending Suggestions:&nbsp;
        </div>
        {suggestion.length > 0 && (
          <div className="landing-explore-keyword-suggestions-list">
            {suggestion.map((item, index) => (
              <label
                key={index}
                className="landing-explore-keyword-suggestions-list-item"
                onClick={() => setKeyword(item)}
              >
                {item}
              </label>
            ))}
          </div>
        )}
      </div>
      <Button
        variant="contained"
        onClick={handlePromptGeneration}
        className="landing-explore-keyword-button mt-4"
        disabled={!keyword || loading}
      >
        {loading ? "Generating..." : "Generate Prompts"}
      </Button>
    </div>
  );
};

export default KeywordSelection;
