import { Fragment } from "react"
import type { ResoledMetadata } from "../lib/get-metadata-field-data"
import { AppImage } from "../module/image/Image"
import { MetadataItem } from "./FieldData"

export function OpengraphMetadata(
  props: { m: ResoledMetadata }
) {
  const d = props.m
  return (
    <>
      <MetadataItem data={d.og.title} />
      <MetadataItem data={d.og.description} />
      <MetadataItem data={d.og.image} />
      <MetadataItem data={d.og.url} />
      <MetadataItem data={d.og.type} />
      <MetadataItem data={d.og.siteName} />
      <MetadataItem data={d.og.locale} />
      <hr />
      <MetadataItem data={d.og.images}>
        <StructuredOpengraphMetadata d={d} type="images" />
      </MetadataItem>
      <MetadataItem data={d.og.articleAuthor}>
        {d.og.articleAuthor.values.length === 0 && <div className="meta-mute">-</div>}
        {d.og.articleAuthor.values.map((item, i) => {
          return <div key={i}>{item}</div>
        })}
      </MetadataItem>
      <MetadataItem data={d.og.articlePublishedTime} />
      <MetadataItem data={d.og.articleModifiedTime} />
      <MetadataItem data={d.og.articleExpirationTime} />
      <MetadataItem data={d.og.articleSection} />
      <MetadataItem data={d.og.articleTag}>
        {d.og.articleTag.values.length === 0 && <div className="meta-mute">-</div>}
        {d.og.articleTag.values.map((item, i) => {
          return <div key={i}>{item}</div>
        })}
      </MetadataItem>
    </>
  )
}

function StructuredOpengraphMetadata(
  props: { d: ResoledMetadata, type: "images" }
) {
  const d = props.d
  const type = props.type

  return (
    <div className="grid grid-cols-1 gap-2">
      {d.og[type].values.map((item, i) => {
        return (
          <div key={i} className="flex flex-col gap-2 items-start">
            {i !== 0 && <hr className="self-stretch my-3" />}
            {type === "images" && (
              <div className="border border-slate-200 p-1 w-auto shrink-0 self-start">
                <AppImage src={item.resolvedUrl} className="h-[2lh]" />
              </div>
            )}
            <div className="text-xs meta-info-field-value break-words grid grid-cols-[5rem_1fr] gap-y-1 w-full">
              {
                item.labels.map((label, i) => {
                  return <Fragment key={i}>
                    <div className="text-foreground opacity-100">{label[0]}</div>
                    <div>{label[1] ?? <span className="meta-mute" >-</span>}</div>
                  </Fragment>
                })
              }
            </div>
          </div>
        )
      })}
    </div>
  )
}