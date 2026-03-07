import { genAI } from "../genAI";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const description = `Generate a single, concise, and engaging 10 - 15 words description for a social media post based on the following theme. Keep it thought-provoking and tailored to spark conversation. Avoid using multiple sections like captions or descriptions — provide only one clear sentence.
    Theme: ${prompt}
    `;

    const result = await model.generateContent(description);
    const text = result.response.text();

    return new Response(
      JSON.stringify({
        type: "Success",
        data: text.replace(/###/g, "\n").replace("\n", ""),
      }),
      { status: 200 }
    );
  } catch (error: any) {
    const message = typeof error?.message === "string" ? error.message : "Unknown error";
    const isQuotaError =
      (error as any)?.status === 429 ||
      message.toLowerCase().includes("quota exceeded") ||
      message.toLowerCase().includes("rate limit");

    return new Response(
      JSON.stringify({
        type: "Error",
        error: isQuotaError
          ? "Gemini API quota or rate limit exceeded. Please try again later."
          : message,
      }),
      { status: isQuotaError ? 429 : 500 }
    );
  }
}
