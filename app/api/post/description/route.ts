import { NextRequest, NextResponse } from "next/server";

import { genAI } from "../genAI";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const description = `Generate a single, concise, and engaging 10 - 15 words description for a social media post based on the following theme. Keep it thought-provoking and tailored to spark conversation. Avoid using multiple sections like captions or descriptions — provide only one clear sentence.
    Theme: ${prompt}
    `;

    const result = await model.generateContent(description);
    const text = result.response.text();

    return NextResponse.json(text, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
