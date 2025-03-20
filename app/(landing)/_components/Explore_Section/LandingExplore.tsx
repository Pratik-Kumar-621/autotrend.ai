import React, { useState } from "react";
import SectionHeading from "../SectionHeading";
import PromptGereration from "./PromptGereration";
import SelectedPrompt from "./SelectedPrompt";
import GeneratedImage from "./GeneratedImage";

const LandingExplore = () => {
  const [keyword, setKeyword] = useState("");
  const [posts, setPosts] = useState<string[]>([]);
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

  console.log(posts);

  return (
    <div className="landing-section" id="landing-explore">
      <SectionHeading
        heading="Generate trending posts"
        subheading="Create engaging and viral content effortlessly with AI"
      />
      <PromptGereration {...{ keyword, setKeyword, setPosts }} />
      {posts.length !== 0 && (
        <div>
          <h2>Generated Prompts</h2>
          <ul>
            {posts.map((post, index) => (
              <li key={index} onClick={() => setSelectedPrompt(post)}>
                {post}
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedPrompt && <SelectedPrompt {...{ selectedPrompt }} />}
      {selectedPrompt && <GeneratedImage {...{ selectedPrompt }} />}
    </div>
  );
};

export default LandingExplore;
