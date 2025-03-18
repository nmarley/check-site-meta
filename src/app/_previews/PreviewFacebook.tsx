import type { ComponentProps, CSSProperties, SVGProps } from "react";
import type { ResoledMetadata } from "../lib/get-metadata-field-data";
import { MessageList, PreviewMenu, PreviewPanelContent, type PreviewMessages } from "./Preview";
import { PreviewFrame, PreviewThemeSwitcher } from "./Preview.client";
import { tab } from "../module/tab/tab-primitives";
import { MaterialSymbolsDarkModeOutline, MaterialSymbolsLightModeOutline } from "../theme-switch";
import { cn } from "lazy-cn";
import { AppImage } from "../module/image/Image";

export async function PreviewFacebook(
  { metadata, className, ...props }: ComponentProps<"div"> & {
    metadata: ResoledMetadata
  }
) {

  const { messages, data } = await getFacebookPreview(metadata)

  const PreviewSection = (() => {
    return (
      <PreviewFrame
        themeId="t-facebook"
        className="justify-center antialiased"
        style={{
          '--card-radius': '8px',
          '--font-family': 'system-ui, -apple-system, "system-ui", ".SFNSText-Regular", sans-serif',
        } as CSSProperties}
        themes={{
          'default': {
            '--bg': 'rgb(242, 244, 247)',
            '--card-bg': 'rgb(255, 255, 255)',
            '--main': 'rgb(8, 8, 9)',
            '--muted': 'rgb(101, 104, 108)',
            '--card-shadow': '0 1px 2px rgba(0,0,0,.2)',

            '--border': 'rgba(0, 0, 0, 0.1)',

            '--meta-bg': 'rgb(240, 242, 245)'

          } as CSSProperties,
          'dark': {
            // '--bg': 'rgb(21, 32, 43)',
          } as CSSProperties,
        }}
      >
        <div className={cn(
          "bg-(--card-bg)",
          "rounded-(--card-radius)",
          'font-(family-name:--font-family)',
          'shadow-(--card-shadow)',
          'overflow-hidden'
        )}>
          {/* Header */}
          <div className='mb-px-12 px-px-12 pt-px-12 flex'>
            <div className="h-0 shrink-0 mr-px-8">
              <div className="size-px-40 rounded-full bg-slate-500/30" />
            </div>
            <div className="grow">
              <div className="-my-px-5 flex flex-col">
                <div className="my-px-1 leading-[1.333] text-px-15 font-[600] text-(--main)">
                  <div className="mt-1">John Doe</div>
                </div>
                <div className="my-px-1 leading-[1.2308] text-px-13 font-[600] text-(--muted)">
                  8 March at 15:00
                  <span className="font-[400]"> · </span>
                  <GlobeIcon className="size-px-12 fill-current inline" />
                </div>
              </div>
            </div>
          </div>
          {/* Body */}
          <div>
            {/* Text Content */}
            <div className="pt-px-4 px-px-12 pb-px-16">
              <div className="mb-px-1 -mt-px-1 text-px-15 font-[400] leading-[1.3333]  text-(--main)">
                just checked out this website and had such a great experience! the design is super clean, everything loads fast, and the content is really well-organized. found exactly what i was looking for without any hassle. definitely worth a visit if ure into discovering new creative tools! #greatux #smoothexperience
              </div>
            </div>
            {/* Link Preview */}
            <div>
              {/* Image */}
              <div className="relative">
                <div className="aspect-[1000/522] outline overflow-hidden object-center">
                  <AppImage src={data.image} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="absolute -bottom-px-14 right-px-14 size-px-30 z-10 rounded-px-14 border bg-(--card-bg) border-(--border) flex items-center justify-center">
                  <TypcnInfoLarge className="size-px-20 text-(--main)" />
                </div>
              </div>
              {/* Text */}
              <div className="-mx-1.5 px-4 py-3 flex relative items-center shrink-0 flex-nowrap bg-(--meta-bg)">
                <div className="-my-0.5 -mb-2 min-w-0 px-1.5">
                  <div className="mb-px-1 -mt-1 ">
                    <span className="uppercase text-px-13 font-[400] leading-[1.2308] text-(--muted)">
                      {data.site}
                    </span>
                  </div>
                  <div className="my-px-1">
                    <span className="text-px-17 font-[600] leading-[1.1765] text-(--main)">
                      {data.title}
                    </span>
                  </div>
                  <div className="my-px-1 text-(--muted) overflow-ellipsis overflow-hidden max-w-full">
                    <span className="text-px-15 font-[400] leading-[1.333] text-nowrap [text-wrap-mode:nowrap] whitespa">
                    {data.description}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="h-10">

          </div>
        </div>
      </PreviewFrame>
    )
  })

  return (
    <PreviewPanelContent
      PreviewSection={
        <>
          <PreviewSection />
          <PreviewMenu>
            <PreviewThemeSwitcher
              themeId="t-facebook"
              themes={[
                tab("default", <MaterialSymbolsLightModeOutline />),
                tab("dark", <MaterialSymbolsDarkModeOutline />),
              ]}
            />
          </PreviewMenu>
        </>
      }
      PreviewInfoContent={
        <MessageList messages={messages} />
      }
    />
  )

}

async function getFacebookPreview(metadata: ResoledMetadata) {
  const m = metadata

  const messages: PreviewMessages = []

  const data = {
    title: m.general.title.value ?? m.og.title.value ?? m.twitter.title.value,
    description:
      m.general.description.value ??
      m.og.description.value ??
      m.twitter.description.value,
    site: m.og.siteName.value ?? m.twitter.site.value ?? m.general.title.value ?? new URL(m.general.rawUrl.value).hostname,
    url: m.general.url.value ?? m.general.rawUrl.value,
    image: m.og.image.resolvedUrl ?? m.twitter.image.resolvedUrl,
    fullWidthFavicon: false,
  }

  // if (!data.title) {
  //   return { messages: [["error", "Title Metadata is required to show a preview."]] as PreviewMessages }
  // }
  // if (!data.description) {
  //   messages.push(["warn", "Description Metadata is recommended for better visibility."])
  //   // data.description = "No description provided."
  // }
  // if ((data.description ?? '').length < 50) {
  //   messages.push(["warn", "Description is too short. It may not show up properly in search results. (50-160 characters recommended)"])
  // }
  // if (!data.site) {
  //   messages.push(["warn", "Site Name is recommended for better visibility."])
  //   data.site = new URL(data.url).hostname
  // }
  // if (m.icons.appleTouchIcons.values.length > 0) {
  //   data.fullWidthFavicon = true
  //   messages.push(['info', 'Apple Touch Icon or Favicon.ico detected. Favicon will be displayed in full size.'])
  // } else {
  //   messages.push(['info', 'No Apple Touch Icon or Favicon.ico detected. Favicon will be displayed in 18x18 size.'])
  // }

  // messages.push(['info', 'Preview is generated based on the provided metadata. Actual appearance may vary.'])

  return {
    messages,
    data,
  }
}



function GlobeIcon(props: ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" {...props}><title>Shared with Public</title><g fillRule="evenodd" transform="translate(-448 -544)"><g><path d="M109.5 408.5c0 3.23-2.04 5.983-4.903 7.036l.07-.036c1.167-1 1.814-2.967 2-3.834.214-1 .303-1.3-.5-1.96-.31-.253-.677-.196-1.04-.476-.246-.19-.356-.59-.606-.73-.594-.337-1.107.11-1.954.223a2.666 2.666 0 0 1-1.15-.123c-.007 0-.007 0-.013-.004l-.083-.03c-.164-.082-.077-.206.006-.36h-.006c.086-.17.086-.376-.05-.529-.19-.214-.54-.214-.804-.224-.106-.003-.21 0-.313.004l-.003-.004c-.04 0-.084.004-.124.004h-.037c-.323.007-.666-.034-.893-.314-.263-.353-.29-.733.097-1.09.28-.26.863-.8 1.807-.22.603.37 1.166.667 1.666.5.33-.11.48-.303.094-.87a1.128 1.128 0 0 1-.214-.73c.067-.776.687-.84 1.164-1.2.466-.356.68-.943.546-1.457-.106-.413-.51-.873-1.28-1.01a7.49 7.49 0 0 1 6.524 7.434" transform="translate(354 143.5)"></path><path d="M104.107 415.696A7.498 7.498 0 0 1 94.5 408.5a7.48 7.48 0 0 1 3.407-6.283 5.474 5.474 0 0 0-1.653 2.334c-.753 2.217-.217 4.075 2.29 4.075.833 0 1.4.561 1.333 2.375-.013.403.52 1.78 2.45 1.89.7.04 1.184 1.053 1.33 1.74.06.29.127.65.257.97a.174.174 0 0 0 .193.096" transform="translate(354 143.5)"></path><path fillRule="nonzero" d="M110 408.5a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-1 0a7 7 0 1 0-14 0 7 7 0 0 0 14 0z" transform="translate(354 143.5)"></path></g></g></svg>
  )
}
function TypcnInfoLarge(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M13.839 17.525c-.006.002-.559.186-1.039.186c-.265 0-.372-.055-.406-.079c-.168-.117-.48-.336.054-1.4l1-1.994c.593-1.184.681-2.329.245-3.225c-.356-.733-1.039-1.236-1.92-1.416a5 5 0 0 0-.958-.097c-1.849 0-3.094 1.08-3.146 1.126a.5.5 0 0 0 .493.848c.005-.002.559-.187 1.039-.187c.263 0 .369.055.402.078c.169.118.482.34-.051 1.402l-1 1.995c-.594 1.185-.681 2.33-.245 3.225c.356.733 1.038 1.236 1.921 1.416c.314.063.636.097.954.097c1.85 0 3.096-1.08 3.148-1.126a.5.5 0 0 0-.491-.849"></path><circle cx="13" cy="6.001" r="2.5" fill="currentColor"></circle></svg>
  )
}