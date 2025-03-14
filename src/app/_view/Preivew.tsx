import { cn } from "lazy-cn";
import type { ReactNode } from "react";
import type { ComponentProps, SVGProps } from "react";

export function PreviewInfo(
  props: ComponentProps<"div">
) {
  return (
    <div {...props} className={cn("max-w-100", props.className)}>
      {props.children}
    </div>
  )
}

export type PreviewMessages = [
  level: 'error' | 'warn' | 'info',
  text: string
][]

export function MessageList(
  props: { messages: PreviewMessages }
) {
  return (
    <div className="flex flex-col gap-2 text-base pt-2 leading-tight">
      {
        props.messages.map((item, i) => (
          <div key={i}
            style={{
              animationDelay: `${ (i + 3) * 100 }ms`
            }}
            className={cn("flex items-start gap-1 fadeIn-0",
              item[0] === "error" && "text-orange-400",
              item[0] === "warn" && "text-yellow-500",
              item[0] === "info" && "text-slate-500",
              "[&_svg]:opacity-60"
            )}>
            {
              item[0] === "error" &&
              <ClarityExclamationCircleSolid className="w-5 h-5 translate-y-[-0.05rem] shrink-0" />
            }
            {
              item[0] === "warn" &&
              <ClarityExclamationTriangleSolid className="w-5 h-5 translate-y-[-0.05rem] shrink-0" />
            }
            {
              item[0] === "info" &&
              <ClarityInfoCircleSolid className="w-5 h-5 translate-y-[-0.05rem] shrink-0" />
            }
            <span className="text">
              {item[1]}
            </span>
          </div>
        ))
      }
    </div>
  )
}

export function ClarityInfoCircleSolid(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36" {...props}><path fill="currentColor" d="M18 6a12 12 0 1 0 12 12A12 12 0 0 0 18 6m-2 5.15a2 2 0 1 1 2 2a2 2 0 0 1-2.1-2ZM23 24a1 1 0 0 1-1 1h-7a1 1 0 1 1 0-2h2v-6h-1a1 1 0 0 1 0-2h4v8h2a1 1 0 0 1 1 1" className="clr-i-solid clr-i-solid-path-1"></path><path fill="none" d="M0 0h36v36H0z"></path></svg>
  )
}

function ClarityExclamationCircleSolid(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36" {...props}><path fill="currentColor" d="M18 6a12 12 0 1 0 12 12A12 12 0 0 0 18 6m-1.49 6a1.49 1.49 0 0 1 3 0v6.89a1.49 1.49 0 1 1-3 0ZM18 25.5a1.72 1.72 0 1 1 1.72-1.72A1.72 1.72 0 0 1 18 25.5" className="clr-i-solid clr-i-solid-path-1"></path><path fill="none" d="M0 0h36v36H0z"></path></svg>
  )
}

function ClarityExclamationTriangleSolid(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36" {...props}><path fill="currentColor" d="M30.33 25.54L20.59 7.6a3 3 0 0 0-5.27 0L5.57 25.54A3 3 0 0 0 8.21 30h19.48a3 3 0 0 0 2.64-4.43Zm-13.87-12.8a1.49 1.49 0 0 1 3 0v6.89a1.49 1.49 0 1 1-3 0ZM18 26.25a1.72 1.72 0 1 1 1.72-1.72A1.72 1.72 0 0 1 18 26.25" className="clr-i-solid clr-i-solid-path-1"></path><path fill="none" d="M0 0h36v36H0z"></path></svg>
  )
}

export function PreviewPanelContent(
  { PreviewInfoContent, PreviewSection, className, ...props }: {
    PreviewSection: ReactNode,
    PreviewInfoContent: ReactNode,
  } & ComponentProps<"div">
) {
  return (
    <>
      <div className={cn("mb-8 w-full flex justify-center fadeIn-0", className)} {...props}>
        {PreviewSection}
      </div>
      <PreviewInfo>
        {PreviewInfoContent}
      </PreviewInfo>
    </>
  )
}
