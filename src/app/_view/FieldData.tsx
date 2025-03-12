"use client"

import { useState, type ComponentProps, type ReactNode, type SVGProps } from "react";
import { descriptions, type FieldDataItem } from "../lib/get-metadata-field-data";
import { AppImage } from "../module/image/Image";
import { cn } from "lazy-cn";

export function MetadataItem(props: {
  data: FieldDataItem,
  children?: ReactNode,
  contentProps?: ComponentProps<"div">
  titleProps?: ComponentProps<"div">
  containerProps?: ComponentProps<"div">
}) {
  const { label, value, resolvedUrl, type, description } = props.data

  const [infoOpen, setInfoOpen] = useState(false)

  const content = props.children ?? <>
    {!value && <span className="meta-mute">{'-'}</span>}
    {!type && value}
    {value && type === "url" && <span>
      <a target="_blank" href={resolvedUrl} className="group link-underline text-base! *:inline [&_svg]:align-[-0.15rem]">
        {value} <ExternalIcon />
      </a>
    </span>}
    {value && type?.startsWith("image") && (
      <div className="flex gap-x-2 flex-wrap" >
        <div className="border border-slate-200 p-1 w-auto shrink-0 self-start">
          {type === "image-favicon"
            ? <AppImage src={resolvedUrl} className="h-[1.5lh]" />
            : <AppImage src={resolvedUrl} className="h-[2lh]" />}
        </div>
        <div className="min-w-20">
          <a target="_blank" href={resolvedUrl} className="group link-underline block">
            {value} <ExternalIcon />
          </a>
        </div>
      </div>
    )}
  </>

  return (
    <div {...props.containerProps} className={cn("meta-2-col group flex-nowrap", props.containerProps?.className)}
      // onMouseLeave={() => setInfoOpen(false)}
    >
      <div className="meta-title whitespace-pre-wrap">
        {label} <InfoButton onClick={() => setInfoOpen(!infoOpen)} />
      </div>
      <div {...props.contentProps} className={cn("meta-content", props.contentProps?.className)} >
        {content}
      </div>
      <div className={cn("col-span-2 grid grid-rows-[0fr] overflow-hidden transition-all", infoOpen && "grid-rows-[1fr]")}>
        <div className="overflow-hidden">
          <div className={cn("bg-slate-50 p-4 rounded-md text-sm overflow-hidden mt-2 flex flex-col")}>
            {description ?? "No description available"}
            <button className="text-end text-slate-500 text-xs font-medium bg-transparent block px-0 self-end hover:underline"
              onClick={() => setInfoOpen(false)}
            >hide</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Separator() {
  return <hr />
}


export function ExternalIcon(props: SVGProps<SVGSVGElement>) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props} className="inline align-[-0.15rem]"><path fill="currentColor" d="M10 6v2H5v11h11v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zm11-3v9l-3.794-3.793l-5.999 6l-1.414-1.414l5.999-6L12 3z"></path></svg>)
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