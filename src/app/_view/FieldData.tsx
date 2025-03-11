"use client"

import { useState, type ComponentProps, type ReactNode, type SVGProps } from "react";
import type { FieldDataItem } from "../lib/get-metadata-field-data";
import { AppImage } from "../module/image/Image";
import { cn } from "lazy-cn";

export function MetadataItem(props: {
  data: FieldDataItem,
  children?: ReactNode,
  contentProps?: ComponentProps<"div">
  containerProps?: ComponentProps<"div">
}) {
  const { label, value, resolvedUrl, type } = props.data

  const [infoOpen, setInfoOpen] = useState(false)

  const content = props.children ?? <>
    {!value && <span className="meta-mute">{'-'}</span>}
    {!type && value}
    {value && type === "url" && <span>
      <a target="_blank" href={resolvedUrl} className="group link-underline text-base!">
        {value} <ExternalIcon />
      </a>
    </span>}
    {value && type?.startsWith("image") && (
      <div className="flex gap-2">
        <div className="border border-slate-200 p-1 w-auto shrink-0 self-start">
          {type === "image-favicon"
            ? <AppImage src={resolvedUrl} className="h-[1.5lh]" />
            : <AppImage src={resolvedUrl} className="h-[2lh]" />}
        </div>
        <span>
          <a target="_blank" href={resolvedUrl} className="group link-underline">
            {value} <ExternalIcon />
          </a>
        </span>
      </div>
    )}
  </>

  return (
    <div {...props.containerProps} className={cn("meta-2-col group flex-nowrap", props.containerProps?.className)} onMouseLeave={() => setInfoOpen(false)} >
      <div className="meta-title">
        {label} <InfoButton onClick={() => setInfoOpen(!infoOpen)} />
      </div>
      <div {...props.contentProps} className={cn("meta-content", props.contentProps?.className)} >
        {content}
      </div>
      <div className={cn("col-span-2 grid grid-rows-[0fr] overflow-hidden transition-all", infoOpen && "grid-rows-[1fr]")}>
        <div className="overflow-hidden">
          <div className={cn("bg-slate-50 p-4 rounded-md text-sm overflow-hidden mt-2")}>
            A URL to an image file or to a dynamically generated image for Twitter link previews.
            Images must be less than 5 MB in size. JPG,PNG, WEBP and GIF formats are supported.
            Only the first frame of an animated GIF will be used.SVG is not supported. og:image is used as a fallback.
          </div>
        </div>
      </div>
    </div>
  )
}

export function Separator() {
  return <hr />
}
export function ExternalIcon() {
  return (<svg data-testid="geist-icon" height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16" style={{ "color": "currentcolor" }} className="inline align-[-0.15rem]"><path fillRule="evenodd" clipRule="evenodd" d="M11.5 9.75V11.25C11.5 11.3881 11.3881 11.5 11.25 11.5H4.75C4.61193 11.5 4.5 11.3881 4.5 11.25L4.5 4.75C4.5 4.61193 4.61193 4.5 4.75 4.5H6.25H7V3H6.25H4.75C3.7835 3 3 3.7835 3 4.75V11.25C3 12.2165 3.7835 13 4.75 13H11.25C12.2165 13 13 12.2165 13 11.25V9.75V9H11.5V9.75ZM8.5 3H9.25H12.2495C12.6637 3 12.9995 3.33579 12.9995 3.75V6.75V7.5H11.4995V6.75V5.56066L8.53033 8.52978L8 9.06011L6.93934 7.99945L7.46967 7.46912L10.4388 4.5H9.25H8.5V3Z" fill="currentColor"></path></svg>)
}
export function InfoButton(
  props: ComponentProps<"button">
) {
  return (
    <button className="opacity-10 group-hover:opacity-100 group-hover:*:translate-y-0 bg-slate-100 rounded-md px-0 py-0 w-3.5 h-3.5 text-slate-500 inline-flex items-center justify-center align-[-0.1rem] ml-0.5 overflow-hidden " {...props}>
      <InfoIcon className="transition translate-y-full" />
    </button>
  )
}
export function InfoIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  // MdiInformationVariant
  return <svg xmlns="http://www.w3.org/2000/svg" className={cn("inline", className)} width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M13.5 4A1.5 1.5 0 0 0 12 5.5A1.5 1.5 0 0 0 13.5 7A1.5 1.5 0 0 0 15 5.5A1.5 1.5 0 0 0 13.5 4m-.36 4.77c-1.19.1-4.44 2.69-4.44 2.69c-.2.15-.14.14.02.42c.16.27.14.29.33.16c.2-.13.53-.34 1.08-.68c2.12-1.36.34 1.78-.57 7.07c-.36 2.62 2 1.27 2.61.87c.6-.39 2.21-1.5 2.37-1.61c.22-.15.06-.27-.11-.52c-.12-.17-.24-.05-.24-.05c-.65.43-1.84 1.33-2 .76c-.19-.57 1.03-4.48 1.7-7.17c.11-.64.41-2.04-.75-1.94"></path></svg>
}

// ---- Content Components ----