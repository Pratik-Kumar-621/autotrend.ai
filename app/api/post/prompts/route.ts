import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/utils/openai";

export async function POST(req: NextRequest) {
  const { keyword } = await req.json();

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4.5-preview",
      messages: [
        {
          role: "system",
          content: "You are an expert social media content creator.",
        },
        {
          role: "user",
          content: `Generate 5 creative social media post ideas for the keyword "${keyword}"`,
        },
      ],
      max_tokens: 200,
      n: 5,
    });

    const prompts = response.choices.map(
      (choice) => choice.message?.content?.trim() || ""
    );
    return NextResponse.json({ prompts });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
