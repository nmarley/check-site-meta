import type { FieldDataItem } from "../lib/get-metadata-field-data";
import { AppImage } from "../module/image/Image";

export function FieldData(props: {
  data: FieldDataItem[]
}) {
  return props.data.map((item, i) => {
    if ("separator" in item)
      return <hr key={i} />

    const fallback = item.fallback?.find(f => f.value)

    const label = item.label
    const value = item.value ?? fallback?.value
    const resolvedUrl = item.resolvedUrl ?? fallback?.resolvedUrl
    const fallbackLabel = fallback?.label
    const type = item.type

    return (
      <div key={i} className="meta-2-col">
        <div>{label}</div>
        <div className="relative meta-content">
          {!value && <span className="opacity-40">{'-'}</span>}
          {!item.type && (value)}
          {value && item.type === "url" && <span>
            <a target="_blank" href={item.resolvedUrl} className="group link-underline">
              {value} <ExternalIcon />
            </a> {fallback && <span className="text-foreground/30">({fallbackLabel})</span>}
          </span>}
          {value && type?.startsWith("image") && (
            <div className="flex gap-2">
              <div className="border border-slate-200 p-1 w-auto shrink-0 self-start">
                {type === "image-favicon"
                  ? <AppImage src={resolvedUrl} className="h-[1.5lh]" />
                  : <AppImage src={resolvedUrl} className="h-[2lh]" />}
              </div>
              <span>
                <a target="_blank" href={resolvedUrl} className="group link-underline">
                  {value} <ExternalIcon />
                </a> {fallback && <span className="text-foreground/30">({fallbackLabel})</span>}
              </span>
            </div>
          )}
        </div>
      </div>
    )
  })
}

export function MetadataItem(props: {
  data: FieldDataItem
}) {
  const item = props.data

  const fallback = item.fallback?.find(f => f.value)

  const label = item.label
  const value = item.value ?? fallback?.value
  const resolvedUrl = item.resolvedUrl ?? fallback?.resolvedUrl
  const fallbackLabel = fallback?.label
  const type = item.type

  return (
    <div className="meta-2-col">
      <div className="meta-title">{label}</div>
      <div className="meta-content">
        {!value && <span className="meta-mute">{'-'}</span>}
        {!item.type && (value)}
        {value && item.type === "url" && <span>
          <a target="_blank" href={item.resolvedUrl} className="group link-underline">
            {value} <ExternalIcon />
          </a> {fallback && <span className="text-foreground/30">({fallbackLabel})</span>}
        </span>}
        {value && type?.startsWith("image") && (
          <div className="flex gap-2">
            <div className="border border-slate-200 p-1 w-auto shrink-0 self-start">
              {type === "image-favicon"
                ? <AppImage src={resolvedUrl} className="h-[1.5lh]" />
                : <AppImage src={resolvedUrl} className="h-[2lh]" />}
            </div>
            <span>
              <a target="_blank" href={resolvedUrl} className="group link-underline">
                {value} <ExternalIcon />
              </a> {fallback && <span className="text-foreground/30">({fallbackLabel})</span>}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export function Separator() {
  return <hr />
}

export function ExternalIcon() {
  return (<svg data-testid="geist-icon" height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16" style={{ "color": "currentcolor" }} className="inline align-[-0.15rem]"><path fillRule="evenodd" clipRule="evenodd" d="M11.5 9.75V11.25C11.5 11.3881 11.3881 11.5 11.25 11.5H4.75C4.61193 11.5 4.5 11.3881 4.5 11.25L4.5 4.75C4.5 4.61193 4.61193 4.5 4.75 4.5H6.25H7V3H6.25H4.75C3.7835 3 3 3.7835 3 4.75V11.25C3 12.2165 3.7835 13 4.75 13H11.25C12.2165 13 13 12.2165 13 11.25V9.75V9H11.5V9.75ZM8.5 3H9.25H12.2495C12.6637 3 12.9995 3.33579 12.9995 3.75V6.75V7.5H11.4995V6.75V5.56066L8.53033 8.52978L8 9.06011L6.93934 7.99945L7.46967 7.46912L10.4388 4.5H9.25H8.5V3Z" fill="currentColor"></path></svg>)
}