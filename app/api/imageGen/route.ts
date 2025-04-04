import OpenAI from "openai";

export async function POST(req: Request) {
  const { selectedPrompt } = await req.json();
  try {
    const client = new OpenAI({
      baseURL: "https://api.studio.nebius.com/v1/",
      apiKey: process.env.FAL_API_KEY,
    });
    const result = await client.images.generate({
      model: "stability-ai/sdxl",
      response_format: "url",

      extra_body: {
        response_extension: "webp",
        width: 1024,
        height: 1024,
        num_inference_steps: 4,
        negative_prompt: "",
        seed: -1,
      },
      prompt: selectedPrompt,
    });
    return new Response(
      JSON.stringify({ type: "Success", data: result.data[0] }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error generating image:", error);
    return new Response(
      JSON.stringify({ type: "Error", message: error.message }),
      { status: 500 }
    );
  }
}
