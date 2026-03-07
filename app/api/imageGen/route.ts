export async function POST(req: Request) {
  const { selectedPrompt } = await req.json();

  try {
    const apiKey = process.env.STABILITY_API_KEY;
    if (!apiKey) {
      throw new Error("STABILITY_API_KEY environment variable is not set");
    }

    const formData = new FormData();
    formData.append("prompt", selectedPrompt);
    formData.append("aspect_ratio", "1:1");
    formData.append("seed", "0");
    formData.append("output_format", "webp");

    const response = await fetch(
      "https://api.stability.ai/v2beta/stable-image/generate/core",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: formData,
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    const result = await response.json();

    const image = `data:image/webp;base64,${result.image}`;

    return new Response(
      JSON.stringify({
        type: "Success",
        data: {
          url: image,
          revised_prompt: result.revised_prompt,
        },
      }),
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error generating image:", error);
    return new Response(
      JSON.stringify({ type: "Error", error: error.message }),
      {
        status: 500,
      },
    );
  }
}
