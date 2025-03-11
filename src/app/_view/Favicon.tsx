import { cn } from "lazy-cn";
import type { ComponentProps } from "react";
import { AppImage } from "../module/image/Image";

export function FaviconPreview(props: {
  src: string,
  containerProps?: ComponentProps<"div">
  imgProps1?: ComponentProps<"img">
  imgProps2?: ComponentProps<"img">
}) {
  return (
    <div
      {...props.containerProps}
      className={cn("border border-slate-200 w-auto shrink-0 flex", props.containerProps?.className)}
    >
      <div className="p-1 bg-zinc-100">
        <AppImage
          {...props.imgProps1}
          src={props.src}
          className={cn("h-[1.5lh] aspect-square", props.imgProps1?.className)}
        />
      </div>

      <div className="p-1 bg-zinc-500">
        <AppImage
          {...props.imgProps2}
          src={props.src}
          className={cn("h-[1.5lh]", props.imgProps2?.className)}
        />
      </div>
    </div>
  )
}