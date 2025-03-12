import fetch2 from "node-fetch";

export async function appFetch(...args: Parameters<typeof fetch2>) {
  return fetch2(args[0], {
    // referrer: "http://localhost:3000",
    ...args[1],
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0',
      'Accept-Language': 'en-GB-oxendict,en-GB;q=0.9,en;q=0.8,id;q=0.7,en-US;q=0.6',
      // 'referer': 'http://localhost:3000',
      ...args[1]?.headers
    },
  })
}

export function withProxy(url: string) {
  return `/proxy-img?url=${encodeURIComponent(url)}`
}