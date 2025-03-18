import type { ComponentProps } from "react";
import type { ResoledMetadata } from "../lib/get-metadata-field-data";
import { MessageList, PreviewMenu, PreviewPanelContent, type PreviewMessages } from "./Preview";
import { PreviewFrame, PreviewThemeSwitcher } from "./Preview.client";
import { tab } from "../module/tab/tab-primitives";
import { MaterialSymbolsDarkModeOutline, MaterialSymbolsLightModeOutline } from "../theme-switch";

export async function PreviewFacebook(
  { metadata, className, ...props }: ComponentProps<"div"> & {
    metadata: ResoledMetadata
  }
) {

  const { messages, data } = await getFacebookPreview(metadata)

  const PreviewSection = (() => {
    return (
      <PreviewFrame
        themeId="t-facebook"
        className="p-8 rounded-lg overflow-hidden flex justify-center"
      >

      </PreviewFrame>
    )
  })
 
  return (
    <PreviewPanelContent
      PreviewSection={
        <>
          <PreviewSection />
          <PreviewMenu>
            <PreviewThemeSwitcher
              themeId="t-facebook"
              themes={[
                tab("default", <MaterialSymbolsLightModeOutline />),
                tab("dark", <MaterialSymbolsDarkModeOutline />),
              ]}
            />
          </PreviewMenu>
        </>
      }
      PreviewInfoContent={
        <MessageList messages={messages} />
      }
    />
  )

}

async function getFacebookPreview(metadata: ResoledMetadata) {
  const m = metadata

  const messages: PreviewMessages = []

  const data = {
    title: m.general.title.value ?? m.og.title.value ?? m.twitter.title.value,
    description:
      m.general.description.value ??
      m.og.description.value ??
      m.twitter.description.value,
    site: m.og.siteName.value ?? m.twitter.site.value ?? m.general.title.value ?? new URL(m.general.rawUrl.value).hostname, // Google might infer from domain if missing
    url: m.general.url.value ?? m.general.rawUrl.value,
    favicon: m.general.favicons.values[0].resolvedUrl,
    fullWidthFavicon: false,
  }

  // if (!data.title) {
  //   return { messages: [["error", "Title Metadata is required to show a preview."]] as PreviewMessages }
  // }
  // if (!data.description) {
  //   messages.push(["warn", "Description Metadata is recommended for better visibility."])
  //   // data.description = "No description provided."
  // }
  // if ((data.description ?? '').length < 50) {
  //   messages.push(["warn", "Description is too short. It may not show up properly in search results. (50-160 characters recommended)"])
  // }
  // if (!data.site) {
  //   messages.push(["warn", "Site Name is recommended for better visibility."])
  //   data.site = new URL(data.url).hostname
  // }
  // if (m.icons.appleTouchIcons.values.length > 0) {
  //   data.fullWidthFavicon = true
  //   messages.push(['info', 'Apple Touch Icon or Favicon.ico detected. Favicon will be displayed in full size.'])
  // } else {
  //   messages.push(['info', 'No Apple Touch Icon or Favicon.ico detected. Favicon will be displayed in 18x18 size.'])
  // }

  // messages.push(['info', 'Preview is generated based on the provided metadata. Actual appearance may vary.'])

  return {
    messages,
    data,
  }
}