/* eslint-disable @next/next/no-img-element */
"use client"

import { type ComponentProps } from "react";

export function AppImage(
  props: ComponentProps<'img'>
) {
  if (!props.src) return null

  return <img
    {...props}
    alt={props.alt || ""}
    src={`/api/proxy-img?url=${ encodeURIComponent(props.src)}`}
  />;

}