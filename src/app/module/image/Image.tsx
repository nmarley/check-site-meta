/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client"

import { useEffect, useRef, type ComponentProps } from "react";

export function AppImage(
  { firstFrameGif, src, ...props }: ComponentProps<'img'> & {
    firstFrameGif?: boolean
  }
) {
  if (!src) return null

  if (firstFrameGif) {
    return <AppImageFirstFrameGif src={`/api/proxy-img?url=${ encodeURIComponent(src) }`} {...props as ComponentProps<"canvas">} />
  }

  return <img
    {...props}
    alt={props.alt || ""}
    src={`/api/proxy-img?url=${ encodeURIComponent(src) }`}
  />;

}

function AppImageFirstFrameGif(
  { src, ...props }: ComponentProps<'canvas'> & {
    src: string
  }
) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return

    const ctx = canvas.getContext("2d");
    if (!ctx) return

    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
  }, [src])

  return (
    <>
      <img ref={imgRef} src={src} style={{ display: "none"}} />
      <canvas {...props} ref={canvasRef} />
    </>
  )
}