import { cn } from "lazy-cn";
import type { ComponentProps } from "react";
import { AppImage } from "../module/image/Image";
import { MetadataItem } from "./FieldData";
import type { ResoledMetadata } from "../lib/get-metadata-field-data";
import { px } from "../lib/unit";

export function FaviconPreview(props: {
  src: string,
  containerProps?: ComponentProps<"div">
  imgProps1?: ComponentProps<"img">
  imgProps2?: ComponentProps<"img">
}) {
  return (
    <div
      {...props.containerProps}
      className={cn("border border-slate-200 flex", props.containerProps?.className)}
    >
      <div className="p-1 bg-zinc-100">
        <AppImage
          {...props.imgProps1}
          src={props.src}
          className={cn("h-[1.5lh] w-[1.5lh]", props.imgProps1?.className)}
        />
      </div>

      <div className="p-1 bg-zinc-500">
        <AppImage
          {...props.imgProps2}
          src={props.src}
          className={cn("h-[1.5lh] w-[1.5lh]", props.imgProps2?.className)}
        />
      </div>
    </div>
  )
}


export function IconListPreviewMetadataItem(props: {
  data: ResoledMetadata['icons']['appleTouchIcons']
}) {
  const item = props.data
  return (
    <MetadataItem data={item}
      containerProps={{ className: "flex! flex-col" }}
      contentProps={{ className: "col-span-2 row-start-[10] order-10 mt-2" }}>
      <div className="flex gap-2 items-end flex-wrap ">
        {(() => {
          const items = item.values
          if (!items?.length) return (<div className="opacity-40">-</div>)

          return <>
            {items?.map((item, i) => {
              if (!item.value) return <></>
              const size = item.label
              const resolvedSizes = item.label ? parseInt(item.label) || null : null

              return <div key={i} className="flex flex-col gap-1 items-center justify-center text-center">
                <div className="border border-slate-200 p-1 w-auto shrink-0"
                  style={{
                    width: resolvedSizes ? px(resolvedSizes) : undefined,
                    height: resolvedSizes ? px(resolvedSizes) : undefined
                  }}
                >
                  <AppImage src={item.resolvedUrl} />
                </div>
                {size ? <span className="text-xs">{size}<br /></span> : null}
              </div>
            })}
          </>
        })()}
      </div>
      <div className="flex flex-col mt-2 meta-info-field-value">
        {(() => {
          const items = item.values

          if (!items?.length) {
            return (<div className="opacity-40">-</div>)
          }

          return <>
            {items?.map((item, i) => {
              if (!item.value) return null
              return <div key={i} className="text-xs my-0.5">
                {item.value.startsWith('data:') ? (
                  <div className="line-clamp-3">{item.value}...</div>
                ) : (
                  <div>{item.value}</div>
                )}
              </div>
            })}
          </>
        })()}
      </div>
    </MetadataItem>
  )
}