import { Button, TextField } from "@mui/material";
import React from "react";

interface KeywordProps {
  keyword: string;
  setKeyword: (keyword: string) => void;
  handlePromptGeneration: () => void;
  loading: boolean;
}

const KeywordSelection = (props: KeywordProps) => {
  const { keyword, setKeyword, handlePromptGeneration, loading } = props;
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
      <Button
        variant="contained"
        onClick={handlePromptGeneration}
        className="landing-explore-keyword-button"
        disabled={!keyword || loading}
      >
        {loading ? "Generating..." : "Generate Prompts"}
      </Button>
    </div>
  );
};

export default KeywordSelection;
