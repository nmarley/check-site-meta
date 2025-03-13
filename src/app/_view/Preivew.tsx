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

export function MessageList(
  { errors, infos }: {
    errors: string[],
    infos: string[],
  }
) {
  return (
    <div className="flex flex-col gap-2 text-base pt-2 leading-tight">
      {errors.map((item, i) => <ErrorMessage key={i}>{item}</ErrorMessage>)}
      {infos.map((item, i) => <WarnMessage key={i}>{item}</WarnMessage>)}
    </div>
  )
}


function ErrorMessage(
  { className, children, ...props }: ComponentProps<"div">
) {
  return (
    <div className={cn("text-red-500 flex items-start gap-1", className)} {...props}>
      <ClarityExclamationCircleSolid className="w-5 h-5 translate-y-[-0.05rem] shrink-0" />
      {children}
    </div>
  )
}

function WarnMessage(
  { className, children, ...props }: ComponentProps<"div">
) {
  return (
    <div className={cn("text-orange-500 flex items-start gap-1", className)} {...props}>
      <ClarityExclamationTriangleSolid className="w-5 h-5 translate-y-[-0.05rem] shrink-0" />
      {children}
    </div>
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
      <div className={cn("mb-8 w-full flex justify-center", className)} {...props}>
        {PreviewSection}
      </div>
      <PreviewInfo>
        {PreviewInfoContent}
      </PreviewInfo>
    </>
  )
}
