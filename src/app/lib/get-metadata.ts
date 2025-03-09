import parse, { type HTMLElement } from "node-html-parser";
import { cache } from "react";
import "server-only"
import { AppError } from "../module/error/error-primitives";

export const getRoot = cache(async function getRoot(url: string) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
    },
  }).catch(error => { throw new AppError(error, "fetch", "Fetch Failed", error.message) })

  if (!res.ok) {
    throw new AppError(null, "fetch", "Fetch Failed", `HTTP ${res.status} ${res.statusText}`)
  }

  if (!res.headers.get("content-type")?.includes("text/html")) {
    throw new AppError(null, "parse", "Fetch Returns Non-HTML", `Content-Type: ${res.headers.get("content-type")}`)
  }

  const html = await res.text().catch(error => { throw new AppError(error, "parse", "Response Parse Failed", error.message) });

  try {
    const root = parse(html);
    return { root, html }
  } catch (error) {
    throw new AppError(error, "parse", "HTML Parse Failed", error instanceof Error ? error.message : "Unknown Error")
  }
})

export function getMetadata(root: HTMLElement, rawUrl: string) {
  try {
    return {
      general: {
        title: root.querySelector("title")?.text,
        description: root.querySelector("meta[name=description]")?.getAttribute("content"),
        url: root.querySelector("link[rel=canonical]")?.getAttribute("href"),
        rawUrl,
        favicon: root.querySelector("link[rel=icon]")?.getAttribute("href"),
        favicon2: root.querySelector("link[rel='shortcut icon']")?.getAttribute("href"),
        favicon3: root.querySelector("link[rel='icon shortcut']")?.getAttribute("href"),
        favicon4: "/favicon.ico",
      },
      og: {
        title: fromMetaTagWithProperty(root, 'og:title'),
        description: fromMetaTagWithProperty(root, 'og:description'),
        url: fromMetaTagWithProperty(root, 'og:url'),
        image: fromMetaTagWithProperty(root, 'og:image'),
        type: fromMetaTagWithProperty(root, 'og:type'),
        siteName: fromMetaTagWithProperty(root, 'og:site_name'),
        imageAlt: fromMetaTagWithProperty(root, 'og:image:alt'),
      },
      twitter: {
        title: fromMetaTagWithName(root, 'twitter:title'),
        card: fromMetaTagWithName(root, 'twitter:card'),
        description: fromMetaTagWithName(root, 'twitter:description'),
        image: fromMetaTagWithName(root, 'twitter:image'),
        imageAlt: fromMetaTagWithName(root, 'twitter:image:alt'),

        site: fromMetaTagWithName(root, 'twitter:site'),
        siteId: fromMetaTagWithName(root, 'twitter:site:id'),
        creator: fromMetaTagWithName(root, 'twitter:creator'),
        creatorId: fromMetaTagWithName(root, 'twitter:creator:id'),

        player: fromMetaTagWithName(root, 'twitter:player'),
        playerWidth: fromMetaTagWithName(root, 'twitter:player:width'),
        playerHeight: fromMetaTagWithName(root, 'twitter:player:height'),
        playerStream: fromMetaTagWithName(root, 'twitter:player:stream'),

        appCountry: fromMetaTagWithName(root, 'twitter:app:country'),

        appNameIphone: fromMetaTagWithName(root, 'twitter:app:name:iphone'),
        appIdIphone: fromMetaTagWithName(root, 'twitter:app:id:iphone'),
        appUrlIphone: fromMetaTagWithName(root, 'twitter:app:url:iphone'),

        appNameIpad: fromMetaTagWithName(root, 'twitter:app:name:ipad'),
        appIdIpad: fromMetaTagWithName(root, 'twitter:app:id:ipad'),
        appUrlIpad: fromMetaTagWithName(root, 'twitter:app:url:ipad'),

        appNameGoogleplay: fromMetaTagWithName(root, 'twitter:app:name:googleplay'),
        appIdGoogleplay: fromMetaTagWithName(root, 'twitter:app:id:googleplay'),
        appUrlGoogleplay: fromMetaTagWithName(root, 'twitter:app:url:googleplay'),
      },
      icons: {
        appleTouchIcons: Array.from(root.querySelectorAll("link[rel='apple-touch-icon']")).map(e => {
          return {
            sizes: e.getAttribute("sizes"),
            href: e.getAttribute("href")
          }
        }),
      }
    }
  } catch (error) {
    throw new AppError(error, "parse", "Metadata Parse Failed", error instanceof Error ? error.message : "Unknown Error")
  }
}

function fromMetaTagWithName(root: HTMLElement, key: string) {
  return root.querySelector(`meta[name='${ key }']`)?.getAttribute("content")
}
function fromMetaTagWithProperty(root: HTMLElement, key: string) {
  return root.querySelector(`meta[property='${ key }']`)?.getAttribute("content")
}

export type Metadata = ReturnType<typeof getMetadata>