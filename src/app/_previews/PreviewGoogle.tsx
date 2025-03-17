import type { ComponentProps, CSSProperties } from "react";
import { descriptions, type ResoledMetadata } from "../lib/get-metadata-field-data";
import { MessageList, PreviewFrame, PreviewPanelContent, type PreviewMessages } from "./Preview";
import { AppImage } from "../module/image/Image";
import { cn } from "lazy-cn";

export async function PreviewGoogle({ metadata, className, ...props }: ComponentProps<"div"> & {
  metadata: ResoledMetadata
}) {
  const { messages, data } = await getGooglePreview(metadata)

  const PreviewSection = (() => {
    if (!data) return null
    return (
      <PreviewFrame
        className="p-8 rounded-lg overflow-hidden flex justify-center"
        style={{
          "--bg": "rgb(16, 18, 24)",
          "--text": "rgb(218, 220, 224)",
          "--text-muted": "rgb(189, 193, 198)",
          "--font": "Arial, sans-serif",
          "--accent": "rgb(126, 170, 255)",
          "--border": "rgb(154, 160, 166)",
        } as CSSProperties}
      >
        <div className="relative flex flex-col justify-start text-px-14 font-[400] leading-[1.58] ">
          <div className="basis-full grow shrink min-w-0">
            <div className="flex flex-col-reverse leading-[1.3] ">
              <h3 className="fadeIn-50 mb-px-3 pt-px-5 text-[var(--accent)] text-px-20 line-clamp-1">
                {data.title}
              </h3>
              <div className="max-w-[calc(100%_-_20px)] fadeIn-0">
                <div className="flex items-center overflow-hidden">
                  <div className="mr-px-12 inline-block">
                    <div className="w-px-26 h-px-26 bg-white border border-[var(--border)] rounded-[50%] overflow-clip flex items-center justify-center">
                      <AppImage src={data.favicon} className={cn(
                        data.fullWidthFavicon ? "w-px-26 h-px-26" : "w-px-18 h-px-18",
                      )} />
                    </div>
                  </div>
                  <div className="overflow-hidden max-w-[22rem]">
                    <div className="leading-[20px]">
                      {data.site}
                    </div>
                    <div className="text-px-12 text-[var(--muted)] line-clamp-1">
                      {new URL(data.url).origin}
                      {(() => {
                        const pathname = new URL(data.url).pathname
                        const arr = pathname.split("/").filter(Boolean)
                        if (arr.length === 0) return ""
                        const separator = " › "

                        return <span>{separator}{arr.join(separator)}</span>

                        return pathname.length > 1 ? pathname : ""
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="basis-full shrink grow fadeIn-100">
            <div className="line-clamp-2 overflow-hidden text-px-14 font-[400]">
              {data.description}
            </div>
          </div>
        </div>
      </PreviewFrame>
    )
  })()

  return (
    <PreviewPanelContent
      PreviewSection={PreviewSection}
      PreviewInfoContent={
        <MessageList messages={messages} />
      }
    />
  )
}

async function getGooglePreview(metadata: ResoledMetadata) {
  const m = metadata

  const messages: PreviewMessages = []

  const data = {
    title: m.general.title.value ?? m.og.title.value ?? m.twitter.title.value,
    description:
      m.general.description.value ??
      m.og.description.value ??
      m.twitter.description.value,
    site: m.og.siteName.value ?? m.twitter.site.value ?? new URL(m.general.rawUrl.value).hostname, // Google might infer from domain if missing
    url: m.general.url.value ?? m.general.rawUrl.value,
    favicon: m.general.favicons.values[0].resolvedUrl,
    fullWidthFavicon: false,
  }

  if (!data.title) {
    return { messages: [["error", "Title Metadata is required to show a preview."]] as PreviewMessages }
  }
  if (!data.description) {
    messages.push(["warn", "Description Metadata is recommended for better visibility."])
    data.description = "No description provided."
  }
  if ((data.description ?? '').length < 50) {
    messages.push(["warn", "Description is too short. It may not show up properly in search results. (50-160 characters recommended)"])
  }
  if (!data.site) {
    messages.push(["warn", "Site Name is recommended for better visibility."])
    data.site = new URL(data.url).hostname
  }
  if (m.icons.appleTouchIcons.values.length > 0 || m.general.favicons.values.find(f => f.source.includes("favicon.ico"))) {
    data.fullWidthFavicon = true
  }

  return {
    messages,
    data,
  }
}

// Kobee1203/schema-org-java: Java library for working with
// How can http://schema.org be used in JSON-LD's @context
// Does Google indexing support schema.org as JSON-LD
// JSON-LD for availability should be “https://schema.org
// Jakarta Globe - breaking news today | Your City, Your World
// Jakarta Sport Festival 2024 Tuntas Digelar, Perkenalkan
// What is the longest title ever held by any individual in your