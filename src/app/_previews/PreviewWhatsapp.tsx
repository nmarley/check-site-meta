import type { ComponentProps, CSSProperties } from "react";
import type { ResoledMetadata } from "../lib/get-metadata-field-data";
import { MessageList, PreviewMenu, PreviewPanelContent, type PreviewMessages } from "./Preview";
import { PreviewFrame } from "./Preview.client";

export async function PreviewWhatsapp(
  { metadata, className, ...props }: ComponentProps<"div"> & {
    metadata: ResoledMetadata
  }
) {

  const PreviewSection = (() => {
    return (
      <PreviewFrame
        themeId="t-whatsapp"
        style={{

        } as CSSProperties}
        themes={{
          'default': {

          } as CSSProperties,
        }}
      >
        <div className="rl">

        </div>
      </PreviewFrame>
    )
  })

  return (
    <PreviewPanelContent
      PreviewSection={
        <>
          <PreviewSection />
          {/* <PreviewMenu>
            <PreviewThemeSwitcher
              themeId="t-google"
              themes={[
                tab("default", <MaterialSymbolsLightModeOutline />),
                tab("dark", <MaterialSymbolsDarkModeOutline />),
              ]} />
          </PreviewMenu> */}
        </>
      }
      PreviewInfoContent={
        <>
          <MessageList messages={[]} />
        </>
      }
    />
  )

}

async function getWhatsappPreview(metadata: ResoledMetadata) {
  const m = metadata

  const messages: PreviewMessages = []

  const data = {
    title: m.twitter.title.value ?? m.og.title.value ?? m.general.title.value,
    description: m.og.description.value ?? m.twitter.description.value ?? m.general.description.value
  }

  if (!data.title && !data.description) {
    return { messages: [["error", "Title or Description Metadata is required to show a whatsapp preview."]] as PreviewMessages }
  }

  return (
    <></>
  )
}