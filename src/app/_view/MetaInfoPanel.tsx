// import type { Metadata } from "../lib/get-metadata";
// import { getResolvedMeta } from "../lib/get-metadata-field-data";
// import ErrorCard from "../module/error/ErrorCard";
// import { tab } from "../module/tab/tab-primitives";
// import { Tabs } from "../module/tab/Tabs";
// import { MetaCard } from "./MetaCard";


// export async function MetaInfoPanel(
//   props: { metadata: Promise<Metadata>; showErrorCard?: boolean; }
// ) {
//   let resolvedMetadata;
//   try {
//     const metadata = await props.metadata;
//     if (!metadata) return null;
//     resolvedMetadata = getResolvedMeta(metadata);
//   } catch (error) {
//     return props.showErrorCard ? null : <ErrorCard error={error} />;
//   }

//   if (props.showErrorCard) {
//     return (
//       <Tabs
//         tabProps={{ className: "tab fadeIn-50 *:p-2 *:px-3 *:[&>svg]:w-5 *:[&>svg]:h-5 gap-0" }}
//         tabIndicatorProps={{ className: "bg-white rounded-sm shadow-xs" }}
//         tabs={[
//           tab("Text", "Teext")
//           // tab("Twitter", <RiTwitterXFill />, <LinkPreview metadataPromise={metadataPromise} />),
//           // tab("Discord", <IcBaselineDiscord />, <>Coming soon.</>),
//           // tab("Google", <TablerBrandGoogleFilled />, <>Coming soon.</>),
//           // tab("Facebook", <IcBaselineFacebook />, <>Coming soon.</>),
//           // tab("Whatsapp", <IcBaselineWhatsapp />, <>Coming soon.</>),
//           // tab("Telegram", <IcBaselineTelegram />, <>Coming soon.</>),
//         ]} />
//     );
//   }

//   return (
//     <Tabs
//       tabProps={{ className: "tab self-start mb-4 fadeIn-0" }}
//       tabIndicatorProps={{ className: "bg-white rounded-sm shadow-xs" }}
//       tabs={[
//         tab("General",
//           <div>General</div>,
//           <MetaCard>
//             <SummaryMetadata m={resolvedMetadata} />
//           </MetaCard>
//         ),
//         // tab("Open Graph",
//         //   <div>Open Graph</div>,
//         //   <MetaCard>
//         //     <FieldData data={[
//         //       d.og.title,
//         //       d.og.description,
//         //       d.og.image,
//         //       d.og.url,
//         //       d.og.type,
//         //       d.og.siteName,
//         //     ]} />
//         //   </MetaCard>
//         // ),
//         // tab("Twitter",
//         //   <div>Twitter</div>,
//         //   <MetaCard>
//         //     <FieldData data={[
//         //       d.twitter.title,
//         //       d.twitter.description,
//         //       d.twitter.card,
//         //       d.twitter.image,
//         //     ]} />
//         //   </MetaCard>
//         // ),
//         // tab("Icons", <div>Icons</div>,
//         //   <MetaCard>

//         //   </MetaCard>
//         // ),
//       ]} />
//   );
// }
