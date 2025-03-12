"use client"

import type { CSSProperties } from "react"

export function PreviewThemeSwitcher() {
  return (
    <div className="bg-[var(--bg)] w-full h-80 rounded-md"
      style={{
        "--bg": "oklab(0.321044 -0.000249296 -0.00927344)",
      } as CSSProperties}
    >

    </div>
  )
}