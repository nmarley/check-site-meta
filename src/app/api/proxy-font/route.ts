import { appFetch } from "@/app/lib/fetch";
import type { NextRequest } from "next/server";

// proxy font from search params
export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url) return new Response("Missing URL", { status: 400 });

  try {
    const response = await appFetch(url);
    if (response.headers.get('content-type')?.includes('font')) {
      // @ts-expect-error - Not sure what the correct type is
      return new Response(response.body, {
        headers: {
          "Content-Type": response.headers.get("Content-Type")!,
        },
      })
    } else {
      return Response.json({
        error: "Not a font",
        status: response.status,
        statusText: response.statusText,
        body: await response.text(),
      })
    }
  } catch (error) {
    console.log("Proxy Img: Error:\n", error)
    return Response.json({ error: error instanceof Error ? error.message : "Unknown error occurred" }, { status: 500 });
  }
}