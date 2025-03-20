import { Button } from "@mui/material";
import React from "react";

interface PromptGererationProps {
  keyword: string;
  setKeyword: (keyword: string) => void;
  setPosts: (posts: string[]) => void;
}

const PromptGereration = (props: PromptGererationProps) => {
  const { keyword, setKeyword, setPosts } = props;
  const [loading, setLoading] = React.useState(false);
  const handleGenerate = async () => {
    setLoading(true);
    const res = await fetch("/api/post/prompts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keyword }),
    });

    if (res.ok) {
      const data = await res.json();
      setPosts(data);
      setLoading(false);
      console.log(data);
    } else {
      setLoading(false);
      console.log("something went wrong");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Enter keyword"
        className="text-black"
      />
      <Button
        variant="contained"
        disabled={loading || !keyword}
        onClick={handleGenerate}
      >
        {loading ? "Generating..." : "Generate"}
      </Button>
    </div>
  );
};

export default PromptGereration;
