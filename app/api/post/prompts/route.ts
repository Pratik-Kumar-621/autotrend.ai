import { NextRequest, NextResponse } from "next/server";

import { genAI } from "../genAI";

export async function POST(req: NextRequest) {
  const { keyword } = await req.json();

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `Generate 10 prompts for engaging social media post ideas based on trending keyword: "${keyword}". 
        Each prompt should contain atleast 15 words and atmost 18 words and seperated by ###. Also provide only prompts, no explanation or context needed. The prompts should be engaging and interesting to the audience. Also don't ask questions in the prompts.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json(
      text.split("\n").filter((t) => t !== "###" && t !== ""),
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
