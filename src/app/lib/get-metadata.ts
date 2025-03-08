import parse, { type HTMLElement } from "node-html-parser";
import { cache } from "react";
import "server-only"

export const getRoot = cache(async function getRoot(url: string) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
    },
  });
  const html = await res.text();
  const root = parse(html);
  return { root, html }
})

export function getMetadata(root: HTMLElement) {
  return {
    general: {
      title: root.querySelector("title")?.text,
      description: root.querySelector("meta[name=description]")?.getAttribute("content"),
      url: root.querySelector("link[rel=canonical]")?.getAttribute("href"),
    },
    og: {
      title: fromMetaTag(root, 'og:title'),
      description: fromMetaTag(root, 'og:description'),
      url: fromMetaTag(root, 'og:url'),
      image: fromMetaTag(root, 'og:image'),
      type: fromMetaTag(root, 'og:type'),
      siteName: fromMetaTag(root, 'og:site_name'),
      imageAlt: fromMetaTag(root, 'og:image:alt'),
    },
    twitter: {
      title: fromMetaTag(root, 'twitter:title'),
      card: fromMetaTag(root, 'twitter:card'),
      description: fromMetaTag(root, 'twitter:description'),
      image: fromMetaTag(root, 'twitter:image'),
      imageAlt: fromMetaTag(root, 'twitter:image:alt'),

      site: fromMetaTag(root, 'twitter:site'),
      siteId: fromMetaTag(root, 'twitter:site:id'),
      creator: fromMetaTag(root, 'twitter:creator'),
      creatorId: fromMetaTag(root, 'twitter:creator:id'),

      player: fromMetaTag(root, 'twitter:player'),
      playerWidth: fromMetaTag(root, 'twitter:player:width'),
      playerHeight: fromMetaTag(root, 'twitter:player:height'),
      playerStream: fromMetaTag(root, 'twitter:player:stream'),

      appCountry: fromMetaTag(root, 'twitter:app:country'),

      appNameIphone: fromMetaTag(root, 'twitter:app:name:iphone'),
      appIdIphone: fromMetaTag(root, 'twitter:app:id:iphone'),
      appUrlIphone: fromMetaTag(root, 'twitter:app:url:iphone'),

      appNameIpad: fromMetaTag(root, 'twitter:app:name:ipad'),
      appIdIpad: fromMetaTag(root, 'twitter:app:id:ipad'),
      appUrlIpad: fromMetaTag(root, 'twitter:app:url:ipad'),

      appNameGoogleplay: fromMetaTag(root, 'twitter:app:name:googleplay'),
      appIdGoogleplay: fromMetaTag(root, 'twitter:app:id:googleplay'),
      appUrlGoogleplay: fromMetaTag(root, 'twitter:app:url:googleplay'),
    }
  }
}

function fromMetaTag(root: HTMLElement, key: string) {
  return root.querySelector(`meta[name='${ key }']`)?.getAttribute("content")
}

export type Metadata = ReturnType<typeof getMetadata>