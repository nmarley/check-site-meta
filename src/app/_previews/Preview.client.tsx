"use client"

import { cn } from "lazy-cn"
import { useSearchParams } from "next/navigation"
import type { ComponentProps, CSSProperties, ReactNode } from "react"
import { TabList } from "../module/tab/TabList"
import { tab } from "../module/tab/tab-primitives"
import { MaterialSymbolsDarkModeOutline, MaterialSymbolsLightModeOutline } from "../theme-switch"

export function PreviewFrame(
  { className, themes, ...props }: ComponentProps<"div"> & {
    themes?: Record<string, CSSProperties> & { "default": CSSProperties }
  }
) {
  const sp = useSearchParams()
  const themeKey = sp.get("theme")

  const theme = (() => {
    if (!themes) return props.style
    if (!themeKey) return themes?.default
    if (themeKey in themes) return themes?.[themeKey]
    else return themes?.default
  })()

  return (<div {...props}
    className={cn(
      "bg-[var(--bg)]",
      "text-[var(--fg)]",
      "font-[family-name:var(--font)]",
      "w-full flex flex-col rounded-md", className
    )}
    style={{ ...theme, ...props.style }}
  />)
}

export function PreviewThemeSwitcher(props: {
  themes?: {
    key: string,
    label: ReactNode,
  }[],
}) {
  const sp = useSearchParams()


  return (
    <TabList
      className="tab-item:p-1.5 tab-item:px-2 text-lg"
      initialTab={() => props.themes?.findIndex((item, i) => item.key === sp.get("theme")) ?? 0}
      onTabChange={tab => {
        const newSp = new URLSearchParams(sp)
        newSp.set("theme", tab.key)
        window.history.replaceState(null, "", "?" + newSp.toString())
      }}
      tabs={props.themes ?? []}
    />
  )

}