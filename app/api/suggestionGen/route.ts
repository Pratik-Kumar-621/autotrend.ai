import { genAI } from "../genAI";

export async function POST() {
  const date = new Date();
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `Analyze the latest social media posts from platforms like Twitter, Instagram, Facebook to identify the top trending keywords for date ${date}. Focus on keywords related to major events, viral topics, hashtags, and emerging trends. Provide a ranked list of the top 3 keywords.
        Each keyword must be seperated by ###. Also provide only keyword, no explanation or context needed. The keyword should be engaging and interesting to the audience. Also don't ask questions. Also please don't provide any warning, errors or headline.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().replace("\n", "");

    return new Response(
      JSON.stringify({ status: "Success", data: text.split("###") }),
      { status: 200 }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ status: "Error", message: error.message }),
      {
        status: 500,
      }
    );
  }
}
