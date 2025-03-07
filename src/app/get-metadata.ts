import parse from "node-html-parser";
import { cache } from "react";

export const getRoot = cache(async function getRoot(url: string) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
    },
  });
  const html = await res.text();
  const root = parse(html);
  return root
})
