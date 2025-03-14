"use client"

import { px } from "@/app/lib/unit";
import { cn } from "lazy-cn";
import { useSearchParams } from "next/navigation";
import { useEffect, useId, useLayoutEffect, useRef, useState, type ComponentProps, type ReactNode } from "react";

export function Tabs
  (props: {
    id: string,
    tabs: ({ key: string, label: ReactNode, content?: ReactNode })[],
    initialTab?: number,
    tabProps?: ComponentProps<"div">,
    tabIndicatorProps?: ComponentProps<"div">,
    contentProps?: ComponentProps<"div">,
    containerProps?: ComponentProps<"div">,
  }) {
  const sp = useSearchParams()

  const [tabNum, setTab] = useState<number>(() => {
    const n = parseInt(sp.get(props.id) ?? '0')
    return isNaN(n) ? props.initialTab ?? 0 : n
  })
  
  const tab = props.tabs[tabNum]
  const currentContent = tab.content

  const indicatorRef = useRef<HTMLDivElement>(null)
  const rectRef = useRef({
    x: null as number | null,
    w: null as number | null,
  })

  useLayoutEffect(() => {
    if (!indicatorRef.current) return

    const indicator = indicatorRef.current
    const
      currRect = indicator.getBoundingClientRect(),
      prevX = rectRef.current.x,
      currX = currRect.left,
      prevW = rectRef.current.w,
      currW = currRect.width
    if (!prevX || !currX || !prevW || !currW) return
    const a = indicator.animate([
      { translate: px(prevX - currX), width: px(prevW) },
      { translate: px(0), width: px(currW) }
    ], {
      duration: 100,
      fill: "forwards",
      easing: "ease-out",
    })
    a.onfinish = () => a.cancel()
  }, [tab])

  // Adjust height of content to match its scrollHeight and animate it
  const contentRect = useRef({ height: null as number | null })

  const id = useId()
  useEffect(() => {
    const tabContainer = document.getElementById(id)
    if (!tabContainer) return
    if (contentRect.current.height === null) return
    const content = tabContainer.children[1] as HTMLDivElement
    const prev = contentRect.current.height
    const curr = (content?.firstChild as HTMLDivElement)?.scrollHeight
    const delta = curr - prev;

    (content.firstChild as HTMLDivElement)?.animate?.([
      { marginBottom: px(-delta) },
      {}
    ], {
      duration: Math.abs(delta),
      easing: "ease-out",
      composite: "add",
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])

  return (
    <div id={id} {...props.containerProps} >
      <div {...props.tabProps}>
        {props.tabs.map((label, index) => (
          <div key={label.key}
            data-active={tab.key === label.key ? "" : undefined}
            onClick={() => {
              const rect = indicatorRef.current?.getBoundingClientRect()
              rectRef.current.x = rect?.left ?? null
              rectRef.current.w = rect?.width ?? null
              setTab(index)
              const newSp = new URLSearchParams(sp)
              newSp.set(props.id, index.toString())
              window.history.replaceState(null, "", "?" + newSp.toString())


              const tabContainer = document.getElementById(id)
              if (!tabContainer) return
              contentRect.current.height = (tabContainer.childNodes[1] as HTMLDivElement)?.getBoundingClientRect().height ?? null
            }}
            className="relative group"
          >
            {label.label}
            {tab === label && <div ref={indicatorRef}
              {...props.tabIndicatorProps}
              className={cn(
                "absolute top-0 left-0 w-full h-full pointer-events-none -z-10",
                props.tabIndicatorProps?.className
              )}
            />}
          </div>
        ))}
      </div>

      {currentContent}
    </div>
  )
}
