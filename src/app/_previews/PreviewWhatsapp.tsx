import type { ComponentProps } from "react";
import type { ResoledMetadata } from "../lib/get-metadata-field-data";
import type { PreviewMessages } from "./Preview";

export async function PreviewWhatsapp(
  { metadata, className, ...props }: ComponentProps<"div"> & {
    metadata: ResoledMetadata
  }
) {

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
}