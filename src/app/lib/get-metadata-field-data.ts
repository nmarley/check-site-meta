import type { Metadata } from "./get-metadata";

export type MetadataMetadataItem = {
  value: string | undefined,
  label: string,
  description?: string,
  source?: string,
  type?: string,
  resolvedUrl?: string,
  values?: {
    value: string | undefined,
    label: string,
    labels?: (string | undefined)[],
    resolvedUrl?: string,
  }[],
}

export function getResolvedMeta(m: Metadata) {

  const resolveUrl = (url?: string) => {
    if (!url) return undefined
    try { return new URL(url, m.general.rawUrl).href } catch { }
  }

  const data = {
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
        label: "canonical url",
        type: "url",
        resolvedUrl: resolveUrl(m.general.url),
      },
      robots: {
        value: m.general.robots,
        label: "robots",
      },
      rawUrl: {
        value: m.general.rawUrl,
        label: "rawUrl",
        resolvedUrl: resolveUrl(m.general.rawUrl),
      },
      ...(() => {
        const type = "image-favicon"
        const favicons = {
          value: undefined,
          label: "",
          type: "image-favicon",
          values: [
            ...m.general.favicons.map(e => {
              return {
                value: e.href,
                label: "",
                labels: [e.rel, e.type, e.sizes],
                resolvedUrl: resolveUrl(e.href),
              }
            }),
            {
              value: "/favicon.ico",
              label: "",
              labels: ['/favicon.ico', 'image/x-icon', 'size undefined'],
              resolvedUrl: resolveUrl("/favicon.ico"),
            },
            {
              value: "/favicon.png",
              label: "",
              labels: ['/favicon.png', 'image/png', 'size undefined'],
              resolvedUrl: resolveUrl("/favicon.png"),
            }
          ]
        }
        const favicon1 = {
          type,
          value: m.general.favicon,
          label: "favicon (icon)",
          resolvedUrl: resolveUrl(m.general.favicon),
        }
        const favicon2 = {
          type,
          value: m.general.favicon2,
          label: "favicon (shortcut icon)",
          resolvedUrl: resolveUrl(m.general.favicon2),
        }
        const favicon3 = {
          type,
          value: m.general.favicon3,
          label: "favicon (icon shortcut)",
          resolvedUrl: resolveUrl(m.general.favicon3),
        }
        const favicon4 = {
          type,
          value: m.general.favicon4,
          label: "favicon (direct link)",
          resolvedUrl: resolveUrl(m.general.favicon4),
        }
        const inferredFavicon = m.general.favicon ?
          favicon1 : m.general.favicon2 ?
            favicon2 : m.general.favicon3 ?
              favicon3 : favicon4

        return {
          favicon1,
          favicon2,
          favicon3,
          favicon4,
          inferredFavicon,
          favicons
        }
      })(),
      colorTheme: {
        value: m.general.themeColor[0].value,
        label: "color theme",
        type: "color",
        values: m.general.themeColor
          .filter(e => e.value && e.media)
          .map(e => {
            return {
              value: e.value!,
              label: e.media!,
            }
          }),
      }
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
      locale: {
        value: m.og.locale,
        label: "og:locale",
      }
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
        label: "apple-touch-icon",
        values: m.mobile.appleTouchIcons.map(e => {
          return {
            value: e.href,
            label: e.sizes ?? "",
            resolvedUrl: resolveUrl(e.href),
          }
        }),
      }
    }
  } satisfies {
    [X in string]: { [Y in string]: MetadataMetadataItem }
  }
  return data
}

export type ResoledMetadata = ReturnType<typeof getResolvedMeta>

export const separator = { separator: true } as const

export type FieldDataItem = MetadataMetadataItem