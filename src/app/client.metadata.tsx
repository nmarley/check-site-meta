"use client"

import { use, useState } from "react"
import type { Metadata } from "./lib/get-metadata"

export function MetadataInformations(
  props: { metadataPromise: Promise<Metadata> }
) {
  const metadata = use(props.metadataPromise)

  // const tabs = ["General", "Open Graph", "Twitter", "JSONLD", "Misc"]
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
          <BasicMetadata metadata={metadata} />
        </section>
      }
      {tab === 1 &&
        <section className="card meta-info-grid fadeIn-0">
          <OpenGraphMetadata metadata={metadata} />
        </section>
      }
      {tab === 2 &&
        <section className="card meta-info-grid fadeIn-0">
          <TwitterMetadata metadata={metadata} />
        </section>
      }
      
    </>
  )

}

function BasicMetadata(props: {
  metadata: Metadata
}) {
  const {
    general: {
      title,
      description,
      url
    },
    og: {
      title: ogTitle,
      description: ogDescription,
      url: ogUrl,
      image: ogImage,
      type: ogType,
      siteName: ogSiteName,
    },
    twitter: {
      title: twitterTitle,
      description: twitterDescription,
      card: twitterCard,
      image: twitterImage,
    }
  } = props.metadata
  return (
    <>
      <div>
        <div>title</div>
        <div>{title ?? "-"}</div>
      </div>
      <div>
        <div>description</div>
        <div>{description ?? "-"}</div>
      </div>
      <div>
        <div>url</div>
        <div>{url ? (<a href={url}>{`${ url }↗`}</a>) : "-"}</div>
      </div>

      <hr />

      <div>
        <div>og:title</div>
        <div>{ogTitle ?? "-"}</div>
      </div>

      <div>
        <div>og:description</div>
        <div>{ogDescription ?? "-"}</div>
      </div>
      <div>
        <div>og:image</div>
        <div>{ogImage ? (<a href={url}>{`${ ogImage }↗`}</a>) : "-"}</div>
      </div>
      <div>
        <div>og:url</div>
        <div>{ogUrl ? (<a href={url}>{`${ ogUrl }↗`}</a>) : "-"}</div>
      </div>
      <div>
        <div>og:type</div>
        <div>{ogType ?? "-"}</div>
      </div>
      <div>
        <div>og:site_name</div>
        <div>{ogSiteName ?? "-"}</div>
      </div>

      <hr />


      <div>
        <div>twitter:title</div>
        <div>{twitterTitle ?? "-"}</div>
      </div>
      <div>
        <div>twitter:description</div>
        <div>{twitterDescription ?? "-"}</div>
      </div>
      <div>
        <div>twitter:card</div>
        <div>{twitterCard ?? "-"}</div>
      </div>
      <div>
        <div>twitter:image</div>
        <div>{twitterImage ? (<a href={url}>{`${ twitterImage }↗`}</a>) : "-"}</div>
      </div>
    </>
  )

}

function OpenGraphMetadata(props: {
  metadata: Metadata
}) {
  const {
    og: {
      title: ogTitle,
      description: ogDescription,
      url: ogUrl,
      image: ogImage,
      type: ogType,
      siteName: ogSiteName,
    }
  } = props.metadata
  return (
    <>
      <div>
        <div>og:description</div>
        <div>{ogDescription ?? "-"}</div>
      </div>
      <div>
        <div>og:image</div>
        <div>{ogImage ? (<a>{`${ ogImage }↗`}</a>) : "-"}</div>
      </div>
      <div>
        <div>og:url</div>
        <div>{ogUrl ? (<a>{`${ ogUrl }↗`}</a>) : "-"}</div>
      </div>
      <div>
        <div>og:type</div>
        <div>{ogType ?? "-"}</div>
      </div>
      <div>
        <div>og:site_name</div>
        <div>{ogSiteName ?? "-"}</div>
      </div>
    </>
  )
}

function TwitterMetadata(props: {
  metadata: Metadata
}) {
  const {
    twitter: {
      title: twitterTitle,
      description: twitterDescription,
      card: twitterCard,
      image: twitterImage,
    }
  } = props.metadata
  return (
    <>
      <div>
        <div>twitter:title</div>
        <div>{twitterTitle ?? "-"}</div>
      </div>
      <div>
        <div>twitter:description</div>
        <div>{twitterDescription ?? "-"}</div>
      </div>
      <div>
        <div>twitter:card</div>
        <div>{twitterCard ?? "-"}</div>
      </div>
      <div>
        <div>twitter:image</div>
        <div>{twitterImage ? (<a>{`${ twitterImage }↗`}</a>) : "-"}</div>
      </div>
    </>
  )
}