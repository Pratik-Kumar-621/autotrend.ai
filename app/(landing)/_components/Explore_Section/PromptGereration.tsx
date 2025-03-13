import React from "react";

interface PromptGererationProps {
  keyword: string;
  setKeyword: (keyword: string) => void;
  setPosts: (posts: string[]) => void;
}

const PromptGereration = (props: PromptGererationProps) => {
  const { keyword, setKeyword, setPosts } = props;
  const handleGenerate = async () => {
    const res = await fetch("/api/post/prompts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keyword }),
    });

    if (res.ok) {
      const data = await res.json();
      setPosts(data);
      console.log(data);
    } else {
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
      <button onClick={handleGenerate}>Generate Posts</button>
    </div>
  );
};

export default PromptGereration;
