import { genAI } from "../genAI";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const description = `Generate a single, concise, and engaging 10 - 15 words description for a social media post based on the following theme. Keep it thought-provoking and tailored to spark conversation. Avoid using multiple sections like captions or descriptions — provide only one clear sentence.
    Theme: ${prompt}
    `;

    const result = await model.generateContent(description);
    const text = result.response.text();

    return new Response(
      JSON.stringify({
        status: "Success",
        data: text.replace(/###/g, "\n").replace("\n", ""),
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ status: "Error", error: error.message }),
      { status: 500 }
    );
  }
}
