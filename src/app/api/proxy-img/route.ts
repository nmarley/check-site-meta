import type { NextRequest } from "next/server";
import fetch2 from "node-fetch";

export async function GET(request: NextRequest) {
  const imageUrl = request.nextUrl.searchParams.get("url");
  if (!imageUrl) {
    return new Response("Missing URL", { status: 400 });
  }
  try {
    const response = await fetch2(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    });
    if (!response.ok) {
      console.error(response)
      // return new Response("Error", { status: 500 });
      return Response.json({
        error: "Error",
        status: response.status,
        statusText: response.statusText,
        body: await response.text(),

      }, { status: 500 });
    }
    // @ts-expect-error - Not sure what the correct type is
    return new Response(response.body, {
      headers: {
        "Content-Type": response.headers.get("Content-Type") ?? "image/jpeg",
      },
    })
  } catch (error) {
    console.log(error)
    return Response.json({ error: error instanceof Error ? error.message : "Unknown error occurred" }, { status: 500 });
  }
}
