import React from "react";

interface SelectedPromptProps {
  selectedPrompt: string;
}

const SelectedPrompt = (props: SelectedPromptProps) => {
  const { selectedPrompt } = props;
  return (
    <div>
      <h2>Selected Prompt</h2>
      <p>{selectedPrompt}</p>
    </div>
  );
};

export default SelectedPrompt;
