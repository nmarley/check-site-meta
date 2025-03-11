import parse, { type HTMLElement } from "node-html-parser";
import { cache } from "react";
import "server-only"
import { AppError } from "../module/error/error-primitives";
import { appFetch } from "./fetch";

export const fetchRoot = cache(async function getRoot(url: string) {

  const res = await appFetch(
    url).catch(error => { throw new AppError(error, "fetch", "Fetch Failed", error.message, [`url: ${ url }`]) })
  if (!res.headers.get("content-type")?.includes("text/html")) {
    throw new AppError(null, "parse", "Fetch Returns Non-HTML", `Content-Type: ${ res.headers.get("content-type") }`)
  }
  const html = await res.text().catch(error => {
    throw new AppError(error, "parse", "Response Parse Failed", error.message)
  });
  try {
    const root = parse(html);
    return { root, html }
  } catch (error) {
    throw new AppError(error, "parse", "HTML Parse Failed", error instanceof Error ? error.message : "Unknown Error")
  }
})

export function getRawMeta(root: HTMLElement, rawUrl: string) {
  try {
    return {
      general: {
        title: root.querySelector("title")?.text,
        description: root.querySelector("meta[name=description]")?.getAttribute("content"),
        url: root.querySelector("link[rel=canonical]")?.getAttribute("href"),
        rawUrl,
        favicon: root.querySelector("link[rel=icon]")?.getAttribute("href"),
        favicons: root.querySelectorAll("link[rel~=icon]").map(e => {
          return {
            rel: e.getAttribute("rel"),
            type: e.getAttribute("type"),
            sizes: e.getAttribute("sizes"),
            href: e.getAttribute("href")
          }
        }),
        favicon2: root.querySelector("link[rel='shortcut icon']")?.getAttribute("href"),
        favicon3: root.querySelector("link[rel='icon shortcut']")?.getAttribute("href"),
        favicon4: "/favicon.ico",
        author: root.querySelector("meta[name=author]")?.getAttribute("content"),
        robots: root.querySelector("meta[name=robots]")?.getAttribute("content"),
        keywords: root.querySelector("meta[name=keywords]")?.getAttribute("content"),
        generator: root.querySelector("meta[name=generator]")?.getAttribute("content"),
        license: root.querySelector("meta[name=license]")?.getAttribute("content"),
        viewport: root.querySelector("meta[name=viewport]")?.getAttribute("content"),
        themeColor: root.querySelectorAll("meta[name='theme-color']").map(e => {
          return {
            media: e.getAttribute("media"),
            value: e.getAttribute("content")
          }
        }),
        colorScheme: root.querySelector("meta[name='color-scheme']")?.getAttribute("content"),
        formatDetection: root.querySelector("meta[name='format-detection']")?.getAttribute("content"),
        applicationName: root.querySelector("meta[name='application-name']")?.getAttribute("content"),
      },
      og: {
        // Basic Metadata
        title: fromMetaTagWithProperty(root, 'og:title'),
        type: fromMetaTagWithProperty(root, 'og:type'),
        image: fromMetaTagWithProperty(root, 'og:image'),
        url: fromMetaTagWithProperty(root, 'og:url'),

        // Optional Metadata
        audio: fromMetaTagWithProperty(root, 'og:audio'),
        description: fromMetaTagWithProperty(root, 'og:description'),
        determiner: fromMetaTagWithProperty(root, 'og:determiner'),
        locale: fromMetaTagWithProperty(root, 'og:locale'),
        localeAlternate: fromMetaTagWithPropertyArray(root, 'og:locale:alternate').map(e => e.getAttribute("content")),
        siteName: fromMetaTagWithProperty(root, 'og:site_name'),
        video: fromMetaTagWithProperty(root, 'og:video'),

        imageAlt: fromMetaTagWithProperty(root, 'og:image:alt'),
        keywords: fromMetaTagWithProperty(root, 'og:keywords'),

        // Structured Properties
        images: root.querySelectorAll("meta[property*='og:image']").reduce((acc, e) => {
          const property = e.getAttribute("property")
          const content = e.getAttribute("content")
          if (!content || !property) return acc
          if (property.split('og:image')[1]) {
            if (!acc.length) return acc
            const attr = property.split('og:image')[1].split(':')[1] as keyof typeof acc[0]
            acc[acc.length - 1][attr] = content
          } else { acc.push({ url: content }) }
          return acc
        }, [] as { url: string, secure_url?: string, type?: string, width?: string, height?: string, alt?: string }[]),

        articlePublishedTime: fromMetaTagWithProperty(root, 'article:published_time'),
        articleModifiedTime: fromMetaTagWithProperty(root, 'article:modified_time'),
        articleExpirationTime: fromMetaTagWithProperty(root, 'article:expiration_time'),
        articleAuthor: fromMetaTagWithPropertyArray(root, 'article:author').map(e => e.getAttribute("content")),
        articleSection: fromMetaTagWithProperty(root, 'article:section'),
        articleTag: fromMetaTagWithPropertyArray(root, 'article:tag').map(e => e.getAttribute("content")),
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
      mobile: {
        appleTouchIcons: Array.from(root.querySelectorAll("link[rel='apple-touch-icon']")).map(e => {
          return {
            sizes: e.getAttribute("sizes"),
            href: e.getAttribute("href")
          }
        }),
        appleTouchIconsPrecomposed: Array.from(root.querySelectorAll("link[rel='apple-touch-icon-precomposed']")).map(e => {
          return {
            sizes: e.getAttribute("sizes"),
            href: e.getAttribute("href")
          }
        }),
        mobileWebAppCapable: fromMetaTagWithName(root, 'apple-mobile-web-app-capable'),
        appleMobileWebAppCapable: fromMetaTagWithName(root, 'apple-mobile-web-app-capable'),
        appleMobileWebAppTitle: fromMetaTagWithName(root, 'apple-mobile-web-app-title'),
        appleMobileWebAppStatusBarStyle: fromMetaTagWithName(root, 'apple-mobile-web-app-status-bar-style'),
      },
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
function fromMetaTagWithPropertyArray(root: HTMLElement, key: string) {
  return root.querySelectorAll(`meta[property='${ key }']`)
}


export type Metadata = ReturnType<typeof getRawMeta>


export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'
