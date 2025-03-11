// "use client"

// import { Fragment, use, useState, type ReactNode } from "react"
// import type { Metadata } from "./lib/get-metadata"
// import type { ErrorInfo } from "./module/error/error-primitives"
// import ErrorCard from "./module/error/ErrorCard"
// import { AppImage } from "./module/image/Image"
// import { getResolvedMeta, separator, type FieldDataItem, type ResoledMetadata } from "./lib/get-metadata-field-data"

// export function MetadataInformations<const Tabs extends string[]>(
//   props: {
//     metadataPromise: Promise<Metadata | { error: ErrorInfo }>,
//     tabs: Tabs,
//     content: { [Tab in Tabs[number]]: ReactNode }
//   }
// ) {
//   const [tab, setTab] = useState(0)

//   const metadata = use(props.metadataPromise)
//   if ("error" in metadata) return <ErrorCard error={metadata.error} />

//   const metadataData = getResolvedMeta(metadata)

//   const tabs = ["General", "Open Graph", "Twitter", "Icons"]

//   return (
//     <>
//       <div className="tab self-start -mb-4 fadeIn-0 ">
//         {tabs.map((label, index) => (
//           <div
//             key={label}
//             data-active={tab === index ? "" : undefined}
//             onClick={() => setTab(index)}
//           >{label}</div>
//         ))}
//       </div>

//       {tab === 0 &&
//         <section className="card meta-info-grid fadeIn-100">
//           <BasicMetadata m={metadataData} />
//         </section>
//       }
//       {tab === 1 &&
//         <section className="card meta-info-grid fadeIn-0">
//           <OpenGraphMetadata data={metadataData} />
//         </section>
//       }
//       {tab === 2 &&
//         <section className="card meta-info-grid fadeIn-0">
//           <TwitterMetadata data={metadataData} />
//         </section>
//       }
//       {tab === 3 &&
//         <section className="card fadeIn-0">
//           <IconMetadata data={metadataData} />
//         </section>
//       }
//     </>
//   )
// }


// function FieldData(props: {
//   fieldData: FieldDataItem[]
// }) {
//   return props.fieldData.map((item, i) => {
//     if ("separator" in item) {
//       return <hr key={i} />
//     }

//     const fallback = item.fallback?.find(f => f.value)

//     const value = item.value ?? fallback?.value
//     const resolvedUrl = item.resolvedUrl ?? fallback?.resolvedUrl
//     const fallbackLabel = fallback?.label
//     const type = item.type

//     return (
//       <div key={i}>
//         <div>{item.label}</div>
//         <div className=" relative">
//           {!value && (
//             <span className="opacity-40">
//               -
//             </span>
//           )}
//           {!item.type && (value)}
//           {value && item.type === "url" && (
//             <span>
//               <a target="_blank" href={item.resolvedUrl} className="group link-underline">
//                 {value} <ExternalIcon />
//               </a> {fallback && <span className="text-foreground/30">({fallbackLabel})</span>}
//             </span>
//           )}
//           {value && type?.startsWith("image") && (
//             <div className="flex gap-2">
//               <div className="border border-slate-200 p-1 w-auto shrink-0 self-start">
//                 <AppImage src={resolvedUrl}
//                   className={` ${ type === "image-favicon" ? "h-[1.5lh]" : "h-[2lh]" }`}
//                 />
//               </div>
//               <span>
//                 <a target="_blank" href={resolvedUrl} className="group link-underline">
//                   {value} <ExternalIcon />
//                 </a> {fallback && <span className="text-foreground/30">({fallbackLabel})</span>}
//               </span>
//             </div>
//           )}
//         </div>
//       </div>
//     )
//   })

// }



// function BasicMetadata(props: {
//   m: ResoledMetadata
// }) {
//   const m = props.m

//   const fieldData = [
//     m.general.title,
//     m.general.description,
//     m.general.url,
//     m.general.favicon,
//     separator,
//     m.og.title,
//     m.og.description,
//     m.og.image,
//     m.og.url,
//     m.og.type,
//     m.og.siteName,
//     separator,
//     m.twitter.title,
//     m.twitter.description,
//     m.twitter.card,
//     m.twitter.image,
//   ]

//   return (
//     <FieldData fieldData={fieldData} />
//   )
// }

// function OpenGraphMetadata(props: {
//   data: ResoledMetadata
// }) {
//   const m = props.data.og

//   const fieldData = [
//     m.title,
//     m.description,
//     m.image,
//     m.url,
//     m.type,
//     m.siteName,
//     m.imageAlt,
//   ]
//   return (
//     <FieldData fieldData={fieldData} />
//   )
// }

// function TwitterMetadata(props: {
//   data: ResoledMetadata
// }) {
//   const t = props.data.twitter

//   const fieldData = [
//     t.title,
//     t.card,
//     t.description,
//     t.image,
//     t.imageAlt,
//     separator,
//     t.site,
//     t.siteId,
//     separator,
//     t.creator,
//     t.creatorId,
//     separator,
//     t.player,
//     t.playerWidth,
//     t.playerHeight,
//     t.playerStream,
//     separator,
//     t.appCountry,
//     separator,
//     t.appNameIphone,
//     t.appIdIphone,
//     t.appUrlIphone,
//     separator,
//     t.appNameIpad,
//     t.appIdIpad,
//     t.appUrlIpad,
//     separator,
//     t.appNameGoogleplay,
//     t.appIdGoogleplay,
//     t.appUrlGoogleplay,
//   ]

//   return (
//     <FieldData fieldData={fieldData} />
//   )
// }


// function ExternalIcon() {
//   return (<svg data-testid="geist-icon" height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16" style={{ "color": "currentcolor" }} className="inline align-[-0.15rem]"><path fillRule="evenodd" clipRule="evenodd" d="M11.5 9.75V11.25C11.5 11.3881 11.3881 11.5 11.25 11.5H4.75C4.61193 11.5 4.5 11.3881 4.5 11.25L4.5 4.75C4.5 4.61193 4.61193 4.5 4.75 4.5H6.25H7V3H6.25H4.75C3.7835 3 3 3.7835 3 4.75V11.25C3 12.2165 3.7835 13 4.75 13H11.25C12.2165 13 13 12.2165 13 11.25V9.75V9H11.5V9.75ZM8.5 3H9.25H12.2495C12.6637 3 12.9995 3.33579 12.9995 3.75V6.75V7.5H11.4995V6.75V5.56066L8.53033 8.52978L8 9.06011L6.93934 7.99945L7.46967 7.46912L10.4388 4.5H9.25H8.5V3Z" fill="currentColor"></path></svg>)
// }

// function IconMetadata(props: {
//   data: ResoledMetadata
// }) {

//   return (
//     <>
//       <div className="mb-4">icon</div>
//       <div className="flex gap-2 items-end flex-wrap">
//         {(() => {
//           const fallback = props.data.general.favicon.fallback?.find(f => f.value)
//           const value = props.data.general.favicon.value ?? fallback?.value
//           const resolvedUrl = props.data.general.favicon.resolvedUrl ?? fallback?.resolvedUrl
//           const fallbackLabel = fallback?.label

//           if (!resolvedUrl) {
//             return (
//               <div className="opacity-40">
//                 -
//               </div>
//             )
//           }

//           return (
//             <div className="flex flex-col gap-1 items-center justify-center text-center">
//               <div className="border border-slate-200 p-1 w-auto shrink-0">
//                 <AppImage src={resolvedUrl} className="h-[1.5lh]" />
//               </div>
//               <span className="text-xs meta-info-field-value">
//                 {value}
//                 <br />{fallback && <span className="">&quot;{fallbackLabel}&quot;</span>}
//               </span>
//             </div>
//           )
//         })()}
//       </div>

//       <hr />

//       <div className="mb-4">apple-touch-icon</div>
//       <div>
//         <div className="flex gap-2 items-end flex-wrap">
//           {(() => {
//             const items = props.data.icons.appleTouchIcons.values

//             if (!items?.length) {
//               return (<div className="opacity-40">-</div>)
//             }

//             return <>
//               {items?.map((item, i) => {
//                 if (!item.value) return <></>

//                 return <div key={i} className="flex flex-col gap-1 items-center justify-center text-center">
//                   <div className="border border-slate-200 p-1 w-auto shrink-0">
//                     <AppImage src={item.resolvedUrl} />
//                   </div>
//                   <span className="text-xs">
//                     {item.label}<br />
//                   </span>
//                 </div>
//               })}
//             </>
//           })()}
//         </div>
//         <div className="flex flex-col mt-2 meta-info-field-value">
//           {(() => {
//             const items = props.data.icons.appleTouchIcons.values

//             if (!items?.length) {
//               return (<div className="opacity-40">-</div>)
//             }

//             return <>
//               {items?.map((item, i) => {
//                 if (!item.value) return null
//                 return <span key={i} className="text-xs">
//                   {item.value}<br />
//                 </span>
//               })}
//             </>
//           })()}
//         </div>
//       </div>

//     </>
//   )
// }