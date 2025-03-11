import ErrorCard from "./module/error/ErrorCard";
import { MetaCard } from "./_view/MetaCard";
import { tab } from "./module/tab/tab-primitives";
import { Tabs } from "./module/tab/Tabs";
import { type MetadataMetadataItem, type ResoledMetadata } from "./lib/get-metadata-field-data";
import { ExternalIcon, MetadataItem, Separator } from "./_view/FieldData";
import { AppImage } from "./module/image/Image";
import { Suspense } from "react";

export async function MetaInfoPanel(
  props: { metadata: Promise<ResoledMetadata | null> }
) {
  try {
    const metadata = await props.metadata;
    if (!metadata) return null

    return (
      <Tabs
        tabProps={{ className: "tab self-start mb-4 fadeIn-0" }}
        tabIndicatorProps={{ className: "bg-white rounded-sm shadow-xs" }}
        tabs={[
          tab("General",
            <div>General</div>,
            <MetaCard>
              <SummaryMetadata m={metadata} />
            </MetaCard>
          ),
          tab("Open Graph",
            <div>Open Graph</div>,
            <MetaCard>
              <OpengraphMetadata m={metadata} />
            </MetaCard>
          ),
          tab("Twitter",
            <div>Twitter</div>,
            <MetaCard>
              <TwitterMetadata m={metadata} />
            </MetaCard>
          ),
          tab("Icons", <div>Icons</div>,
            <MetaCard>
              <IconMetadata data={metadata} />
            </MetaCard>
          ),
        ]} />
    );
  } catch (error) {
    return <ErrorCard error={error} />;
  }
}

function SummaryMetadata(
  props: { m: ResoledMetadata }
) {
  const d = props.m;
  return (
    <>
      <MetadataItem data={d.general.title} />
      <MetadataItem data={d.general.description} />
      <MetadataItem data={d.general.url} />
      <MetadataItem data={d.general.robots} />
      <FaviconSummary data={d.general.inferredFavicon} />
      <Separator />
      <MetadataItem data={d.og.title} />
      <MetadataItem data={d.og.description} />
      <MetadataItem data={d.og.image} />
      <MetadataItem data={d.og.url} />
      <MetadataItem data={d.og.type} />
      <MetadataItem data={d.og.siteName} />
      <Separator />
      <MetadataItem data={d.twitter.title} />
      <MetadataItem data={d.twitter.description} />
      <MetadataItem data={d.twitter.card} />
      <MetadataItem data={d.twitter.image} />
    </>
  )
}

async function FaviconSummary(
  props: { data: MetadataMetadataItem }
) {
  const d = props.data
  const isDirectLink = d.label.includes("direct link")
  const imgContent = d.resolvedUrl
    ? <>
      <div className="p-1 border border-slate-200 shrink-0 self-start">
        <AppImage src={d.resolvedUrl} className="aspect-square h-[1.5lh] w-[1.5lh]" />
      </div>
      <div>
        <a className="link-underline" target="_blank" href={d.resolvedUrl}>
          {d.value} <ExternalIcon />
        </a> <span>{d.label}</span>
      </div>
    </>
    : <span className="meta-mute">-</span>

  return (
    <div className="meta-2-col">
      <div className="meta-title">favicon</div>
      <div className="flex gap-2 meta-content">
        {isDirectLink ?
          <Suspense fallback="Loading...">
            {(async () => {
              const error = await (async () => {
                if (!d.resolvedUrl)
                  return true
                const res = await fetch(d.resolvedUrl)
                if (!res.headers.get("content-type")?.includes("image"))
                  return true
                return false
              })()
              return error
                ? <span className="meta-mute">-</span>
                : imgContent
            })()}
          </Suspense>
          : imgContent
        }
      </div>
    </div>
  )
}



function OpengraphMetadata(
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
    </>
  )
}

function TwitterMetadata(
  props: { m: ResoledMetadata }
) {
  const d = props.m
  return (
    <>
      <MetadataItem data={d.twitter.title} />
      <MetadataItem data={d.twitter.description} />
      <MetadataItem data={d.twitter.card} />
      <MetadataItem data={d.twitter.image} />
      <MetadataItem data={d.twitter.imageAlt} />
      <Separator />
      <MetadataItem data={d.twitter.site} />
      <MetadataItem data={d.twitter.siteId} />
      <Separator />
      <MetadataItem data={d.twitter.creator} />
      <MetadataItem data={d.twitter.creatorId} />
      <Separator />
      <MetadataItem data={d.twitter.player} />
      <MetadataItem data={d.twitter.playerWidth} />
      <MetadataItem data={d.twitter.playerHeight} />
      <MetadataItem data={d.twitter.playerStream} />
      <Separator />
      <MetadataItem data={d.twitter.appCountry} />
      <Separator />
      <MetadataItem data={d.twitter.appNameIphone} />
      <MetadataItem data={d.twitter.appIdIphone} />
      <MetadataItem data={d.twitter.appUrlIphone} />
      <Separator />
      <MetadataItem data={d.twitter.appNameIpad} />
      <MetadataItem data={d.twitter.appIdIpad} />
      <MetadataItem data={d.twitter.appUrlIpad} />
      <Separator />
      <MetadataItem data={d.twitter.appNameGoogleplay} />
      <MetadataItem data={d.twitter.appIdGoogleplay} />
      <MetadataItem data={d.twitter.appUrlGoogleplay} />
    </>
  )
}

function IconMetadata(props: {
  data: ResoledMetadata
}) {

  return (
    <>
      <div className="mb-4">icon</div>
      <div className="flex gap-2 items-end flex-wrap">
        {(() => {
          if (!props.data.general.favicons.values.length) return <div className="opacity-40">-</div>

          console.log(props.data.general.favicons.values)

          return <>{props.data.general.favicons.values.map((item, i) => {
            return <div key={i} className="flex gap-2 items-start">
              <div className="border border-slate-200 p-1 w-auto shrink-0">
                <AppImage src={item.resolvedUrl} className="h-[1.5lh]" />
              </div>
              <span className="text-xs meta-info-field-value break-words">
                {item.value}<br/>
                {item.labels[2]}<br />
                <span className="">&quot;{item.labels[0]}&quot;</span>
              </span>
            </div>
          })}
          </>


          // return (
          //   <>
          //   <div className="flex gap-2 items-start">
          //     <div className="border border-slate-200 p-1 w-auto shrink-0">
          //       <AppImage src={resolvedUrl} className="h-[1.5lh]" />
          //     </div>
          //     <span className="text-xs meta-info-field-value break-words">
          //       {value}
          //       <br /><span className="">&quot;{label}&quot;</span>
          //     </span>
          //   </div>
          //   </>
          // )
        })()}
      </div>
      <hr />
      <div className="mb-4">apple-touch-icon</div>
      <div>
        <div className="flex gap-2 items-end flex-wrap">
          {(() => {
            const items = props.data.icons.appleTouchIcons.values

            if (!items?.length) {
              return (<div className="opacity-40">-</div>)
            }

            return <>
              {items?.map((item, i) => {
                if (!item.value) return <></>

                return <div key={i} className="flex flex-col gap-1 items-center justify-center text-center">
                  <div className="border border-slate-200 p-1 w-auto shrink-0">
                    <AppImage src={item.resolvedUrl} />
                  </div>
                  <span className="text-xs">
                    {item.label}<br />
                  </span>
                </div>
              })}
            </>
          })()}
        </div>
        <div className="flex flex-col mt-2 meta-info-field-value">
          {(() => {
            const items = props.data.icons.appleTouchIcons.values

            if (!items?.length) {
              return (<div className="opacity-40">-</div>)
            }

            return <>
              {items?.map((item, i) => {
                if (!item.value) return null
                return <span key={i} className="text-xs">
                  {item.value}<br />
                </span>
              })}
            </>
          })()}
        </div>
      </div>

    </>
  )
}