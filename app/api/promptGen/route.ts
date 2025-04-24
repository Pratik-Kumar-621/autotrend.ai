import { genAI } from "../genAI";

export async function POST(req: Request) {
  const { keyword } = await req.json();

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `Generate 12 prompts for engaging social media post ideas based on trending keyword: "${keyword}". 
        Each prompt should contain atleast 15 words and atmost 18 words and seperated by ###. Also provide only prompts, no explanation or context needed. The prompts should be engaging and interesting to the audience. Also don't ask questions in the prompts.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().replace("\n", "");

    return new Response(
      JSON.stringify({
        type: "Success",
        data: text.split("\n").filter((t) => t !== "###" && t !== ""),
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        type: "Error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
