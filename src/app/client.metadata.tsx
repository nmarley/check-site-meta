"use client"

import { use, useState } from "react"
import type { Metadata } from "./lib/get-metadata"
import { getMetadataMetadata, separator, type FieldData, type MetadataMetadata } from "./lib/get-metadata-field-data"

export function MetadataInformations(
  props: { metadataPromise: Promise<Metadata> }
) {
  const metadata = use(props.metadataPromise)
  const metadataData = getMetadataMetadata(metadata)

  const tabs = ["General", "Open Graph", "Twitter"]
  const [tab, setTab] = useState(0)

  return (
    <>
      <div className="tab self-start -mb-4 fadeIn-0 ">
        {tabs.map((label, index) => (
          <div
            key={label}
            data-active={tab === index ? "" : undefined}
            onClick={() => setTab(index)}
          >{label}</div>
        ))}
      </div>

      {tab === 0 &&
        <section className="card meta-info-grid fadeIn-100">
          <BasicMetadata m={metadataData} />
        </section>
      }
      {tab === 1 &&
        <section className="card meta-info-grid fadeIn-0">
          <OpenGraphMetadata data={metadataData} />
        </section>
      }
      {tab === 2 &&
        <section className="card meta-info-grid fadeIn-0">
          <TwitterMetadata data={metadataData} />
        </section>
      }

    </>
  )

}


function FieldData(props: {
  fieldData: FieldData
}) {
  return props.fieldData.map((item, i) => {
    if ("separator" in item) {
      return <hr key={i} />
    }
    return (
      <div key={i}>
        <div>{item.label}</div>
        <div className=" relative">
          {!item.value && (
            <span className="opacity-40">
              -
            </span>
          )}
          {!item.type && (item.value)}
          {item.value && item.type === "url" && (
            <a target="_blank" href={item.value} className="group">
              {item.value}↗
            </a>
          )}
          {item.value && item.type === "image" && (
            <div className="grid grid-cols-[1fr_3fr] gap-2">
              <img src={item.value}
                className="border rounded-md mt-1"
              />
              <a target="_blank" href={item.value} className="group link-underline">
                {item.value}↗
              </a>
            </div>
          )}
        </div>
      </div>
    )
  })

}



function BasicMetadata(props: {
  m: MetadataMetadata
}) {
  const m = props.m

  const fieldData = [
    m.general.title,
    m.general.description,
    m.general.url,
    separator,
    m.og.title,
    m.og.description,
    m.og.image,
    m.og.url,
    m.og.type,
    m.og.siteName,
    separator,
    m.twitter.title,
    m.twitter.description,
    m.twitter.card,
    m.twitter.image,
  ]

  return (
    <FieldData fieldData={fieldData} />
  )
}

function OpenGraphMetadata(props: {
  data: MetadataMetadata
}) {
  const m = props.data.og

  const fieldData = [
    m.title,
    m.description,
    m.image,
    m.url,
    m.type,
    m.siteName,
    m.imageAlt,
  ]
  return (
    <FieldData fieldData={fieldData} />
  )
}

function TwitterMetadata(props: {
  data: MetadataMetadata
}) {
  const t = props.data.twitter

  const fieldData = [
    t.title,
    t.card,
    t.description,
    t.image,
    t.imageAlt,
    separator,
    t.site,
    t.siteId,
    separator,
    t.creator,
    t.creatorId,
    separator,
    t.player,
    t.playerWidth,
    t.playerHeight,
    t.playerStream,
    separator,
    t.appCountry,
    separator,
    t.appNameIphone,
    t.appIdIphone,
    t.appUrlIphone,
    separator,
    t.appNameIpad,
    t.appIdIpad,
    t.appUrlIpad,
    separator,
    t.appNameGoogleplay,
    t.appIdGoogleplay,
    t.appUrlGoogleplay,
  ]

  return (
    <FieldData fieldData={fieldData} />
  )
}