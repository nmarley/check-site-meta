import ErrorCard from "./module/error/ErrorCard";
import { MetaCard } from "./_view/MetaCard";
import { tab } from "./module/tab/tab-primitives";
import { Tabs } from "./module/tab/Tabs";
import { type MetadataMetadataItem, type ResoledMetadata } from "./lib/get-metadata-field-data";
import { ExternalIcon, MetadataItem, Separator } from "./_view/FieldData";
import { AppImage } from "./module/image/Image";
import { Fragment, Suspense } from "react";
import { FaviconPreview } from "./_view/Favicon";
import { appFetch } from "./lib/fetch";
import { px } from "./lib/unit";

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
    console.log(error)
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
      <MetadataItem data={d.general.inferredFavicon}>
        <Suspense fallback="Loading...">
          <FaviconSummary data={d.general.favicons} baseUrl={d.general.rawUrl.value} />
        </Suspense>
      </MetadataItem>
      <MetadataItem data={d.general.colorTheme}>
        <ColorThemes data={d.general.colorTheme} />
      </MetadataItem>
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
  props: { data: MetadataMetadataItem, baseUrl: string }
) {
  const favicons = props.data.values
  if (!favicons) return <span className="meta-mute">-</span>

  let favicon: {
    value: string,
    resolvedUrl: string,
    label: string
  } | null = null

  for (const f of favicons) {
    if (!f.resolvedUrl) continue
    const res = await appFetch(f.resolvedUrl)
    // wait 200ms
    await new Promise(resolve => setTimeout(resolve, 200))
    console.log("URL", f.resolvedUrl, "OK?", res.ok, "WHY?", res.status, res.statusText)
    if (res.headers.get("content-type")?.includes("image")) {
      favicon = {
        value: f.value ?? "",
        resolvedUrl: f.resolvedUrl,
        label: f.label
      }
      break
    }
  }

  if (!favicon) return <span className="meta-mute">-</span>

  return (
    <div className="flex gap-2 items-start">
      <FaviconPreview
        containerProps={{ className: "shrink-0" }}
        src={favicon.resolvedUrl}
      />
      <div>
        <a className="link-underline block leading-snug" target="_blank" href={favicon.resolvedUrl}>
          {favicon.value} <ExternalIcon />
        </a> <span>{favicon.label}</span>
      </div>
    </div>
  )
}

function ColorThemes(
  props: { data: MetadataMetadataItem }
) {
  return (
    <>
      {props.data.values?.map((item, i) => {
        return (
          <div key={i} className="flex gap-1 items-start my-1">
            <div
              className="w-4 h-4 rounded-sm border border-slate-200 shrink-0"
              style={{
                background: item.value
              }}
            />
            <span className="text-xs">{item.value}</span>
            <span className="text-xs">{item.label}</span>
          </div>
        )
      })}
    </>
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
      <hr />
      <MetadataItem data={d.og.images}>
        <div className="grid grid-cols-1 gap-2">
          {[...d.og.images.values, ...d.og.images.values, ...d.og.images.values].map((item, i) => {
            return (
              <div key={i} className="flex flex-col gap-2 items-start">
                {i !== 0 &&
                  <hr className="self-stretch my-3" />
                }

                <div className="border border-slate-200 p-1 w-auto shrink-0 self-start">
                  <AppImage src={item.resolvedUrl} className="h-[2lh]" />
                </div>
                <div className="text-xs meta-info-field-value break-words grid grid-cols-[5rem_1fr] gap-y-1 w-full">
                  <div>url</div>
                  <div>{item.value}</div>
                  {
                    item.labels.map((label, i) => {
                      return <Fragment key={i}>
                        <div>{label[0]}</div>
                        <div>{label[1] ?? "-"}</div>
                      </Fragment>
                    })
                  }
                </div>
              </div>
            )
          })}
        </div>
      </MetadataItem>
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
      <MetadataItem data={{ label: "icon", value: undefined }}
        contentProps={{ className: "col-span-2 col-span-2 row-start-[10] mt-2 grid grid-cols-1 gap-2" }}>
        {(async () => {
          if (!props.data.general.favicons.values.length) return <div className="opacity-40">-</div>

          const rawFavicons = props.data.general.favicons.values

          const favicons: {
            source: string,
            size: string,
            resolvedSize: number | null,
            value: string,
            resolvedUrl: string,
          }[] = []

          for (const f of rawFavicons) {
            if (!f.resolvedUrl) continue
            const res = await appFetch(f.resolvedUrl)

            if (res.headers.get("content-type")?.includes("image")) {
              const resolvedSize = f.labels[2] ? parseInt(f.labels[2]) : NaN
              favicons.push({
                source: f.labels[0] ?? "?",
                size: f.labels[2] ?? "size undefined",
                value: f.value ?? "value undefined (huh?)",
                resolvedSize: isNaN(resolvedSize) ? null : resolvedSize,
                resolvedUrl: f.resolvedUrl
              })
            }
          }

          return <>{favicons.map((item, i) => {
            const { source, size, value, resolvedUrl, resolvedSize } = item
            return <div key={i} className="flex gap-2 items-start flex-wrap">
              <FaviconPreview
                containerProps={{ className: "shrink-0" }}
                imgProps1={{ style: { height: resolvedSize ? px(resolvedSize) : undefined, width: resolvedSize ? px(resolvedSize) : undefined } }}
                imgProps2={{ style: { height: resolvedSize ? px(resolvedSize) : undefined, width: resolvedSize ? px(resolvedSize) : undefined } }}
                src={resolvedUrl} />
              <div className="text-xs meta-info-field-value break-words min-w-40 basis-0 grow">
                &quot;{source}&quot;<br />
                {value.startsWith('data:') ? (
                  <div>
                    <div className="line-clamp-2">{value}...</div>
                  </div>
                ) : (
                  <div>{value}</div>
                )}
                {size ?? "size undefined"}<br />
              </div>
            </div>
          })}
          </>
        })()}
      </MetadataItem>


      <hr />


      <MetadataItem data={props.data.icons.appleTouchIcons}
        contentProps={{ className: "col-span-2 row-start-[10] mt-2" }}>
        <div className="flex gap-2 items-end flex-wrap">
          {(() => {
            const items = props.data.icons.appleTouchIcons.values
            if (!items?.length) return (<div className="opacity-40">-</div>)

            return <>
              {items?.map((item, i) => {
                if (!item.value) return <></>
                const size = item.label
                const resolvedSizes = item.label ? parseInt(item.label) || null : null

                return <div key={i} className="flex flex-col gap-1 items-center justify-center text-center">
                  <div className="border border-slate-200 p-1 w-auto shrink-0"
                    style={{
                      width: resolvedSizes ? px(resolvedSizes) : undefined,
                      height: resolvedSizes ? px(resolvedSizes) : undefined
                    }}
                  >
                    <AppImage src={item.resolvedUrl} />
                  </div>
                  {size ? <span className="text-xs">{size}<br /></span> : null}
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
                return <div key={i} className="text-xs line-clamp-2 my-0.5">
                  {item.value}<br />
                </div>
              })}
            </>
          })()}
        </div>
      </MetadataItem>


    </>
  )
}