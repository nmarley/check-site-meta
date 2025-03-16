"use client"

import Script from "next/script";
import { useRef } from "react";

export function ButtonTest() {

  const isDarkRef = useRef(() => {
    const theme = localStorage.getItem("theme");
    return theme === "dark";
  });
  return (
    <>
      <button
        onClick={() => {
          console.log(getStoredTheme.toString())
          setTheme("light")
        }}
      >
        Light
      </button>
      <button
        onClick={() => {
          console.log(getStoredTheme.toString())
          setTheme("dark")
        }}
      >
        Dark
      </button>

    </>
  )
}


const themeModes = ['light', 'dark', 'system'] as const
type Themes = typeof themeModes[number]

export function getStoredTheme<T extends Themes>() {
  const theme = localStorage.getItem("theme");
  if (theme === null)
    return "not-set"
  if (!themeModes.includes(theme as Themes))
    return "not-set";
  return theme as T[number]
}

export function setTheme(theme: Themes) {
  if (!themeModes.includes(theme))
    return;
  document.documentElement.style.colorScheme = theme;
  localStorage.setItem("theme", theme);
}