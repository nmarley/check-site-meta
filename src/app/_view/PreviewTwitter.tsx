import { imageSize } from 'image-size'
import { appFetch } from "../lib/fetch";
import type { ResoledMetadata } from "../lib/get-metadata-field-data";
import { AppImage } from "../module/image/Image";
import type { ComponentProps, SVGProps } from "react";
import { cn } from "lazy-cn";
import { MessageList, PreviewInfo, PreviewPanelContent, type PreviewMessages } from "./Preivew";
import { getImageSizeFromResponse } from '../lib/image-size';

export async function PreviewTwitter(
  { metadata, className, ...props }: { metadata: ResoledMetadata } & ComponentProps<"div">
) {

  const { messages, type, image, data } = await getTwitterPreview(metadata)

  const PreviewSection = (() => {
    if (type === "summary_large_image") {
      return (
        <div className={cn("flex flex-col gap-y-1 max-w-[32.375rem] leading-5 font-twitter font-[400] subpixel-antialiased", className)} {...props}>
          <div className="rounded-2xl relative border border-[rgb(207,_217,_222)] overflow-hidden aspect-[120/63]">
            <AppImage
              width="1200"
              height="630"
              className="h-full object-cover"
              src={image?.url}
              firstFrameGif={image?.format === "gif"}
            />
            <div className="absolute bottom-3 left-3 px-2 bg-[rgba(0,_0,_0,_0.77)] text-white rounded-sm line-clamp-1">
              {data.title}
            </div>
          </div>
          <div className="text-[0.813rem] text-[rgb(83,_100,_113)]">
            From {data.url}
          </div>
        </div>
      )
    } else if (type === "summary") {
      return (
        <div className="max-w-[32.375rem] h-[8.188rem] w-full rounded-2xl border border-[rgb(207,_217,_222)] flex overflow-hidden bg-white">
          <div className="w-[6.875rem] min-[554px]:w-[8.125rem] border-r border-[rgb(207,_217,_222)] shrink-0 flex items-center justify-center bg-[rgba(247,249,249,1.00)]">
            {
              image ?
                <AppImage
                  className="w-full h-full object-cover bg-white"
                  firstFrameGif={image?.format === "gif"}
                  src={image.url} />
                : <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[2em] fill-current align-bottom select-none max-w-full relative text-[rgba(83,100,113,1.00)] inline-block"><g><path d="M1.998 5.5c0-1.38 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.12 2.5 2.5v13c0 1.38-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.12-2.5-2.5v-13zm2.5-.5c-.276 0-.5.22-.5.5v13c0 .28.224.5.5.5h15c.276 0 .5-.22.5-.5v-13c0-.28-.224-.5-.5-.5h-15zM6 7h6v6H6V7zm2 2v2h2V9H8zm10 0h-4V7h4v2zm0 4h-4v-2h4v2zm-.002 4h-12v-2h12v2z"></path></g></svg>
            }
          </div>
          <div className="p-3 flex flex-col gap-0.5 justify-center font-twitter text-[0.9375rem] leading-5  font-[400] subpixel-antialiased">
            <div className="text-[rgb(83,_100,_113)]">
              {data.url}</div>
            <div className="text-[rgb(15,_20,_25)] line-clamp-1">
              {data.title}</div>
            <div className="text-[rgb(83,_100,_113)] line-clamp-2">
              <span>
                {data.description}
              </span>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        null
      )
    }
  })()

  return (
    <PreviewPanelContent
      PreviewSection={PreviewSection}
      PreviewInfoContent={
        <>
          {image && (<div className="break-word text-xs text-foreground-muted-2">
            {image?.format}, {image?.width}✕{image?.height}, {image?.size} bytes, <span className="break-all">{image?.url}</span>
          </div>)}
          <MessageList messages={messages} />
        </>
      }
    />
  )

}


export function ClarityExclamationCircleSolid(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36" {...props}><path fill="currentColor" d="M18 6a12 12 0 1 0 12 12A12 12 0 0 0 18 6m-1.49 6a1.49 1.49 0 0 1 3 0v6.89a1.49 1.49 0 1 1-3 0ZM18 25.5a1.72 1.72 0 1 1 1.72-1.72A1.72 1.72 0 0 1 18 25.5" className="clr-i-solid clr-i-solid-path-1"></path><path fill="none" d="M0 0h36v36H0z"></path></svg>
  )
}



export function ClarityExclamationTriangleSolid(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36" {...props}><path fill="currentColor" d="M30.33 25.54L20.59 7.6a3 3 0 0 0-5.27 0L5.57 25.54A3 3 0 0 0 8.21 30h19.48a3 3 0 0 0 2.64-4.43Zm-13.87-12.8a1.49 1.49 0 0 1 3 0v6.89a1.49 1.49 0 1 1-3 0ZM18 26.25a1.72 1.72 0 1 1 1.72-1.72A1.72 1.72 0 0 1 18 26.25" className="clr-i-solid clr-i-solid-path-1"></path><path fill="none" d="M0 0h36v36H0z"></path></svg>
  )
}



export async function getTwitterPreview(metadata: ResoledMetadata) {
  const m = metadata

  const messages: PreviewMessages = []

  const data = {
    title: m.twitter.title.value ?? m.og.title.value,
    description: m.twitter.description.value ?? m.og.description.value,
    image: m.twitter.image.resolvedUrl ?? m.og.image.resolvedUrl,
    imageAlt: m.twitter.imageAlt.value ?? m.og.imageAlt.value,
    url: new URL(m.general.rawUrl.resolvedUrl!).host.replace('www.', ''),
    type: m.twitter.card.value
  }


  if (!data.title) {
    messages.push(["error", "Title Metadata is required. Please provide either twitter:title or og:title."])
    return { messages }
  }

  const {
    type,
    image
  } = await (async () => {

    const isLargeSummary = data.type === "summary_large_image"

    // check if image is valid
    // - must be less than 5mb
    // - must be of type JPG, PNG, WEBP and GIF
    // - if type === "summary_large_image", must be at least 300x157px
    // - otherwise, must be at least 120x120px
    // - must be less than 4096x4096px
    // - if image is invalid, fallback to summary

    const {
      fallbackToSummary,
      image
    } = await (async () => {
      if (!data.image) {
        if (isLargeSummary) {
          messages.push(["error", "Image is not provided. Image is required for summary_large_image. Defaulting to summary."])
        } else {
          messages.push(["info", "Image is not provided."])
        }
        return { fallbackToSummary: true }
      }

      const res = await appFetch(data.image).catch((err) => {
        // console.error("Error Procesing Twitter Image", err)
        return undefined
      })
      if (!res) {
        messages.push(["error", `Unable to fetch image from ${ data.image }. Defaulting to summary.`])
        return { fallbackToSummary: true }
      }

      const imageSizeRes = await getImageSizeFromResponse(res).catch((err) => {
        // console.error("Error Procesing Twitter Image", err)
        return undefined
      })
      if (!imageSizeRes?.imageSize) {
        messages.push(["error", `Unable to read image metadata.${ isLargeSummary ? " Defaulting to summary." : "" }`])
        return { fallbackToSummary: true }
      }

      const { buffer, imageSize: { width, height, type: format } } = imageSizeRes

      const imgData = { width, height, format, size: buffer.length, url: data.image }

      if (!width || !height || !format) {
        messages.push(["error", `Unable to read image metadata.${ isLargeSummary ? " Defaulting to summary." : "" }`])
        return { fallbackToSummary: true }
      }

      if (buffer.length > 5 * 1024 * 1024) {
        messages.push(["error", `Image must be less than 5mb (Current: ${ buffer.length }). Preview may fail to load. ${ isLargeSummary ? " Defaulting to summary." : "" }`])
        return { fallbackToSummary: true }
      }
      if (!format.match(/(jpeg|jpg|png|webp|gif)/)) {
        messages.push(["error", `Image must be of type JPG, PNG, WEBP or GIF (Current: ${ format }).${ isLargeSummary ? " Defaulting to summary." : "" }`])
        return { fallbackToSummary: true }
      }
      if (format === "gif") {
        messages.push(["info", `GIF images only show the first frame on Twitter. The preview may not be accurate.`])
      }
      if (format === "png") {
        messages.push(["info", `If the image is animated (APNG), Only the first frame will be shown.`])
      }
      if (format === "webp") {
        messages.push(["info", `If the image is an animated Webp, Only the first frame will be shown.`])
      }

      if (width > 4096 || height > 4096) {
        messages.push(["error", `Image must be smaller than 4096x4096px (Current: ${ width }x${ height }).${ isLargeSummary ? " Defaulting to summary." : "" }`])
        return { fallbackToSummary: true }
      }

      // Docs said 120x120 but ive seen 109x109 works...

      if (width >= 120 && height >= 120) {
        if (data.type === "summary_large_image" && (width < 300 || height < 157)) {
          messages.push(["error", `Image must be at least 300x157px for summary_large_image (Current: ${ width }x${ height }). Defaulting to summary.`])
          return { fallbackToSummary: true, image: imgData }
        }
        return { image: imgData }
      } else {
        messages.push(["error", `Image must be at least 120x120px (Current: ${ width }x${ height }). Image may not show properly. ${ isLargeSummary ? " Defaulting to summary." : "" }`])
        return { fallbackToSummary: true, image: imgData }
      }
    })()

    // Has title and description

    if (!data.type) {
      messages.push(["info", "Twitter card type (`twitter:card`) is not specified. Defaulting to summary."])
      return { type: "summary", image }
    }
    if (data.type !== "summary" && data.type !== "summary_large_image") {
      messages.push(["error", "Unable to preview twitter:card values other than `summary` or `summary_large_image`. (I have no idea what they look like)"])
      return { type: "summary", image }
    }

    // data.type === "summary_large_image" OR "summary"

    if (data.type === "summary") {
      return { type: "summary", image }
    }

    // data.type === "summary_large_image"

    if (fallbackToSummary) {
      return { type: "summary", image }
    }

    return { type: "summary_large_image", image }
  })()



  return {
    messages,
    type,
    image,
    data,
  }
}