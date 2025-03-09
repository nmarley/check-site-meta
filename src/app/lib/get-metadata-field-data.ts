import type { Metadata } from "./get-metadata";

export type MetadataMetadataItem = {
  value: string | undefined,
  label: string,
  description?: string,
  source?: string,
  type?: string,
  resolvedUrl?: string,
  fallback?: {
    value: string | undefined,
    label: string,
    resolvedUrl?: string,
  }[],
  values?: {
    value: string | undefined,
    label: string,
    resolvedUrl?: string,
  }[],
}

export function getMetadataMetadata(m: Metadata):
  {
    [X in keyof Metadata]: {
      [Y in keyof Metadata[X]]: MetadataMetadataItem
    }
  } {

  const resolveUrl = (url?: string) => {
    if (!url) return undefined
    try {
      return new URL(url, m.general.rawUrl).href
    } catch {
      return undefined
    }
  }

  const data: {
    [X in keyof Metadata]: {
      [Y in keyof Metadata[X]]: MetadataMetadataItem
    }
  } = {
    general: {
      title: {
        value: m.general.title,
        label: "title",
      },
      description: {
        value: m.general.description,
        label: "description",
      },
      url: {
        value: m.general.url,
        label: "url",
        type: "url",
        resolvedUrl: resolveUrl(m.general.url),
      },
      rawUrl: {
        value: m.general.rawUrl,
        label: "rawUrl",
        resolvedUrl: resolveUrl(m.general.rawUrl),
      },
      favicon: {
        value: m.general.favicon,
        label: "favicon",
        type: "image-favicon",
        resolvedUrl: resolveUrl(m.general.favicon),
        fallback: [
          {
            value: m.general.favicon2,
            label: "shortcut icon",
            resolvedUrl: resolveUrl(m.general.favicon2),
          },
          {
            value: m.general.favicon3,
            label: "icon shortcut",
            resolvedUrl: resolveUrl(m.general.favicon3),
          },
          {
            value: m.general.favicon4,
            label: "/favicon.ico",
            resolvedUrl: resolveUrl(m.general.favicon4),
          },
        ]
      },
      favicon2: {
        value: m.general.favicon2,
        label: "favicon (shortcut icon)",
        type: "image",
        resolvedUrl: resolveUrl(m.general.favicon2),
      },
      favicon3: {
        value: m.general.favicon3,
        label: "favicon (icon shortcut)",
        type: "image",
        resolvedUrl: resolveUrl(m.general.favicon3),
      },
      favicon4: {
        value: m.general.favicon4,
        label: "favicon (direct link)",
        type: "image",
        resolvedUrl: resolveUrl(m.general.favicon4),
      },
    },
    og: {
      title: {
        value: m.og.title,
        label: "og:title",
      },
      description: {
        value: m.og.description,
        label: "og:description",
      },
      url: {
        value: m.og.url,
        label: "og:url",
        type: "url",
      },
      image: {
        value: m.og.image,
        label: "og:image",
        type: "image",
        resolvedUrl: resolveUrl(m.og.image),
      },
      type: {
        value: m.og.type,
        label: "og:type",
      },
      siteName: {
        value: m.og.siteName,
        label: "og:site_name",
      },
      imageAlt: {
        value: m.og.imageAlt,
        label: "og:image:alt",
      },
    },
    twitter: {
      title: {
        value: m.twitter.title,
        label: "twitter:title",
      },
      card: {
        value: m.twitter.card,
        label: "twitter:card",
      },
      description: {
        value: m.twitter.description,
        label: "twitter:description",
      },
      image: {
        value: m.twitter.image,
        label: "twitter:image",
        type: "image",
        resolvedUrl: resolveUrl(m.twitter.image),
      },
      imageAlt: {
        value: m.twitter.imageAlt,
        label: "twitter:image:alt",
      },
      site: {
        value: m.twitter.site,
        label: "twitter:site",
      },
      siteId: {
        value: m.twitter.siteId,
        label: "twitter:site:id",
      },
      creator: {
        value: m.twitter.creator,
        label: "twitter:creator",
      },
      creatorId: {
        value: m.twitter.creatorId,
        label: "twitter:creator:id",
      },
      player: {
        value: m.twitter.player,
        label: "twitter:player",
        type: "url",
      },
      playerWidth: {
        value: m.twitter.playerWidth,
        label: "twitter:player:width",
      },
      playerHeight: {
        value: m.twitter.playerHeight,
        label: "twitter:player:height",
      },
      playerStream: {
        value: m.twitter.playerStream,
        label: "twitter:player:stream",
        type: "url",
      },
      appCountry: {
        value: m.twitter.appCountry,
        label: "twitter:app:country",
      },
      appNameIphone: {
        value: m.twitter.appNameIphone,
        label: "twitter:app:name:iphone",
      },
      appIdIphone: {
        value: m.twitter.appIdIphone,
        label: "twitter:app:id:iphone",
      },
      appUrlIphone: {
        value: m.twitter.appUrlIphone,
        label: "twitter:app:url:iphone",
        type: "url",
      },
      appNameIpad: {
        value: m.twitter.appNameIpad,
        label: "twitter:app:name:ipad",
      },
      appIdIpad: {
        value: m.twitter.appIdIpad,
        label: "twitter:app:id:ipad",
      },
      appUrlIpad: {
        value: m.twitter.appUrlIpad,
        label: "twitter:app:url:ipad",
        type: "url",
      },
      appNameGoogleplay: {
        value: m.twitter.appNameGoogleplay,
        label: "twitter:app:name:googleplay",
      },
      appIdGoogleplay: {
        value: m.twitter.appIdGoogleplay,
        label: "twitter:app:id:googleplay",
      },
      appUrlGoogleplay: {
        value: m.twitter.appUrlGoogleplay,
        label: "twitter:app:url:googleplay",
        type: "url",
      },
    },
    icons: {
      appleTouchIcons: {
        value: undefined,
        label: "",
        values: m.icons.appleTouchIcons.map(e => {
          return {
            value: e.href,
            label: e.sizes ?? "",
            resolvedUrl: resolveUrl(e.href),
          }
        }),
      }
    }
  }
  return data
}

export type MetadataMetadata = ReturnType<typeof getMetadataMetadata>

export const separator = { separator: true } as const

export type FieldData = (MetadataMetadataItem | typeof separator)[]