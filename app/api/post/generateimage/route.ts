import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  const { keyword } = await req.json();
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
      prompt: keyword,
    });
    return NextResponse.json(result.data[0], { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
