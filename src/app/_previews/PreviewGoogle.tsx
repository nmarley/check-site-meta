import type { ComponentProps } from "react";
import type { ResoledMetadata } from "../lib/get-metadata-field-data";
import { MessageList, PreviewPanelContent, type PreviewMessages } from "./Preview";

export async function PreviewGoogle({ metadata, className, ...props }: ComponentProps<"div"> & {
  metadata: ResoledMetadata
}) {
  const { messages, data } = await getGooglePreview(metadata)

  const PreviewSection = (() => {
    return (
      <></>
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
    site: m.og.siteName.value ?? m.twitter.site.value ?? m.general.rawUrl, // Google might infer from domain if missing
    favicon: m.general.favicons.values[0].resolvedUrl,
  }

  if (!data.title) {
    return { messages: [["error", "Title Metadata is required to show a preview."]] as PreviewMessages }
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