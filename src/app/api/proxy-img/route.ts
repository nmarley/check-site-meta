import { appFetch } from "@/app/lib/fetch";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const imageUrl = request.nextUrl.searchParams.get("url");
  if (!imageUrl) {
    return new Response("Missing URL", { status: 400 });
  }
  try {
    // console.log("Proxying image", imageUrl);
    const response = await appFetch(imageUrl);
    // console.log(response.headers.get("content-type"))

    if (response.headers.get('content-type')?.includes('image')) {
      // @ts-expect-error - Not sure what the correct type is
      return new Response(response.body, {
        headers: {
          "Content-Type": response.headers.get("Content-Type") ?? "image/png",
        },
      })
    } else {
      // const text = await response.text()
      // console.log("Not an Image\n\n HTML:\n",text)
      return Response.json({
        error: "Not an image",
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
