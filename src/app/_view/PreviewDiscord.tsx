import type { ComponentProps, CSSProperties } from "react";
import type { ResoledMetadata } from "../lib/get-metadata-field-data";
import { getTwitterPreview } from "./PreviewTwitter";
import { cn } from "lazy-cn";
import { AppImage } from "../module/image/Image";

export async function PreviewDiscord(
  { metadata, className, ...props }: ComponentProps<"div"> & {
    metadata: ResoledMetadata
  }
) {
  const { errors, infos, data } = await getTwitterPreview(metadata)

  const themeColor = metadata.general.colorTheme.values[0]?.value

  const site = metadata.og.siteName.value
  const title = data?.title ?? metadata.general.title.value
  const description = data?.description ?? metadata.general.description.value
  const image = metadata.og.image.resolvedUrl ?? data?.image ?? metadata.twitter.image.value
  const type = data?.type ?? metadata.twitter.card.value ?? "summary"



  return (
    <div {...props} className={cn("bg-[var(--bg)] w-full rounded-md font-discord subpixel-antialiased", className)}
      style={{
        "--bg": "oklab(0.321044 -0.000249296 -0.00927344)",
        "--embed-bg": "oklab(0.296709 -0.000735492 -0.00772537)",
        "--embed-border": themeColor ?? "oklab(0.239468 0.000131123 -0.00589392)",
        "--embed-link": "oklab(0.705515 -0.0795695 -0.144235)",
        "--embed-text": "oklab(0.89908 -0.00192907 -0.0048306)",
      } as CSSProperties}
    >
      <div className="_pl-[4.5rem] p-8">
        <div className={cn(
          "bg-[var(--embed-bg)] border-l-[0.25rem] border-[var(--embed-border)] rounded-[0.25rem] grid",
          "max-w-max"
        )}>
          <div className={cn(
            "pt-[.5rem] pr-[1rem] pb-[1rem] pl-[.75rem]  grid",
            "grid-cols-[auto_min-content]",
            "grid-rows-[auto]",
            "max-w-[27rem]"
          )}>
            {site && (
              <div className="mt-2 col-[1/1] text-[color:var(--embed-text)] text-[.75rem] font-[400] leading-[1rem]">
                {site}
              </div>
            )}
            <div className="mt-2 col-[1/1]">
              <a className="text-[color:var(--embed-link)] text-[1rem] font-[600] leading-[1.375rem]">
                {title}
              </a>
            </div>
            <div className="mt-2 col-[1/1] text-[color:var(--embed-text)] text-[0.875rem] font-[400] leading-[1.125rem] whitespace-pre-wrap">
              {description}
            </div>
            {image && type === "summary" && (
              <div className="row-[1/8] col-[2/2] ml-4 mt-2 max-w-20 max-h-20 justify-items-end h-full flex rounded-[.25rem]">
                <AppImage src={image} alt="" className="w-min h-min max-w-none max-h-[inherit] object-contain object-top rounded-[.25rem] overflow-hidden" />
              </div>
            )}
            {image && type === "summary_large_image" && (
              <div className="col-[1/1] mt-4 w-full flex object-contain rounded-[.25rem] overflow-hidden">
                <div>
                  <AppImage src={image} alt="" className="max-w-none w-full" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}