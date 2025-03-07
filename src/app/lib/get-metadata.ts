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
  return {root, html}
})


export function getMetadata(root: HTMLElement) {
  return {
    general: {
      title: root.querySelector("title")?.text,
      description: root.querySelector("meta[name=description]")?.getAttribute("content"),
      url: root.querySelector("link[rel=canonical]")?.getAttribute("href"),
    },
    og: {
      title: root.querySelector("meta[property='og:title']")?.getAttribute("content"),
      description: root.querySelector("meta[property='og:description']")?.getAttribute("content"),
      url: root.querySelector("meta[property='og:url']")?.getAttribute("content"),
      image: root.querySelector("meta[property='og:image']")?.getAttribute("content"),
      type: root.querySelector("meta[property='og:type']")?.getAttribute("content"),
      siteName: root.querySelector("meta[property='og:site_name']")?.getAttribute("content"),
    },
    twitter: {
      title: root.querySelector("meta[name='twitter:title']")?.getAttribute("content"),
      card: root.querySelector("meta[name='twitter:card']")?.getAttribute("content"),
      description: root.querySelector("meta[name='twitter:description']")?.getAttribute("content"),
      image: root.querySelector("meta[name='twitter:image']")?.getAttribute("content"),
    }
  }
}

export type Metadata = ReturnType<typeof getMetadata>

