// pages/api/post-tweet.ts
import { TwitterApi } from "twitter-api-v2";
import fetch from "node-fetch";

export const POST = async (req: Request) => {
  try {
    const data = await req.json();
    const { accessToken, accessSecret, tweet, altText, imageUrl } = data;

    if (!accessToken || !accessSecret || !imageUrl) {
      throw new Error("Missing required fields");
    }

    const twitterClient = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY!,
      appSecret: process.env.TWITTER_API_SECRET_KEY!,
      accessToken,
      accessSecret,
    });

    // Fetch image from URL and convert to buffer
    const imageRes = await fetch(imageUrl);
    const imageBuffer = await imageRes.buffer();

    const mimeType = imageRes.headers.get("content-type") || "image/jpeg";

    const mediaId = await twitterClient.v1.uploadMedia(imageBuffer, {
      mimeType,
    });

    // Attach alt text
    if (altText) {
      await twitterClient.v1.createMediaMetadata(mediaId, altText);
    }

    const tweetResponse = await twitterClient.v2.tweet({
      text: tweet,
      media: {
        media_ids: [mediaId],
      },
    });

    return new Response(
      JSON.stringify({
        type: "Success",
        data: tweetResponse,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        type: "Error",
        message: err.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
