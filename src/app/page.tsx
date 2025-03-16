import { Suspense, type ComponentProps, type SVGProps } from "react";
import Form from 'next/form'
import { getRawMeta, fetchRoot } from "./lib/get-metadata";
import { parseUrlFromQuery } from "./lib/parse-url";
import type { SearchParamsContext } from "./lib/next-types";
import { getResolvedMeta } from "./lib/get-metadata-field-data";
import { MetaInfoPanel } from "./comp.meta-info";
import { MetaPreviewPanel } from "./comp.meta-preview";
import { after } from "next/server";
import { logCheckButton } from "./lib/analytics";
import { cn } from "lazy-cn";
import { getVersion } from "./lib/version";
import { Tabs } from "./module/tab/Tabs";
import { tab } from "./module/tab/tab-primitives";
import { TabList } from "./module/tab/TabList";
import { ThemeSwitcher } from "./theme-switch";

// Structure:
// 
//  query
//   ↓
//  url
//   ↓
//  root
//   ↓
//  metadata    
//   ↓
//  resolved metadata  ← descriptions
//   ↓             ↓
//  fields       previews
// 

export default async function Home(context: SearchParamsContext) {
  const query = await context.searchParams;

  const getMetadata = async () => {
    const url = parseUrlFromQuery(query.url)
    if (!url) return null
    const { root } = await fetchRoot(url.toString())
    const metadata = getRawMeta(root, url.toString())
    const resolvedMetadata = getResolvedMeta(metadata)
    return resolvedMetadata
  }

  const random = Math.random()

  return (
    <>
      <main className="container-md lg:container-2xl px-8 lg:px-12 xl:px-24 *:py-12 font-medium lg:grid lg:grid-cols-2 gap-x-8 font-sans">
        <div className="flex flex-col gap-8 min-h-screen">
          <Header />
          <InputForm query={query} />
          <Suspense key={random} fallback={<Loading />}>
            <MetaInfoPanel metadata={getMetadata()} />
          </Suspense>
          {/* <RawHTML url={query.url} /> */}
        </div>
        <div className="flex flex-col items-center gap-8">
          <Suspense key={random}>
            <MetaPreviewPanel metadata={getMetadata()} />
          </Suspense>
        </div>

      </main>
      <Footer />
    </>
  );
}

// Components -----------------------------


function Header() {
  return <header className="text-start text-foreground-muted">
    <div className="text-xs font-mono">
      npx check-site-meta</div>
    <h1 className="leading-normal text-lg font-bold tracking-tight">
      Site Metadata Checker</h1>
    <p className="text-pretty text-sm">
      Validate how your Open Graph data is used for link previews on social platforms.</p>
  </header>
}

function Footer(
  props: ComponentProps<"footer">
) {
  return (
    <footer {...props} className={cn(" w-full col-span-2 pb-[100vh] pt-10 border-t border-border bg-background shadow-2xl", props.className)}>
      <div className="container-md lg:container-2xl px-8 lg:px-12 xl:px-24 text-foreground-body flex">
        <div className="flex flex-col grow">
          <div className="text-[1rem] font-semibold tracking-tight leading-none font-mono">
            npx check-site-meta
          </div>
          <div className="text-xs font-normal">
            v{getVersion()}
          </div>
          <div className="mt-10 flex flex-wrap gap-6">
            {
              [
                ['npm', 'https://www.npmjs.com/package/check-site-meta'],
                ['github', 'https://github.com/alfonsusac/check-site-meta'],
                ['twitter', 'https://x.com/alfonsusac/status/1899798175512412648'],
                ['discord', 'https://discord.gg/DCNgFtCm'],
              ].map(e => (<a key={e[0]} className="button transition underline" href={e[1]} target="_blank">{e[0]}</a>))
            }
          </div>
          <div className="mt-4">
            Made by <a href="https://alfon.dev">alfonsusac</a> • ©{new Date().getFullYear()} alfonsusac. All rights reserved.
          </div>
        </div>
        {/* Left */}
        {/* Right */}
        <div>
          <ThemeSwitcher />
        </div>
      </div>
    </footer>
  )
}


function InputForm(
  props: { query: Record<string, string | string[] | undefined> }
) {
  return <Form
    onSubmit={logCheckButton}
    action="/"
    className="flex gap-2"
  >
    <input readOnly type="hidden" name="info" value={String(props.query['info'])} />
    <input readOnly type="hidden" name="preview" value={String(props.query['preview'])} />

    <div className="grow flex p-1 card rounded-xl focus-within:border-border-focus outline-transparent outline-0 focus-within:outline-4 focus-within:outline-focus transition-all">
      <CiSearchMagnifyingGlass className="w-4 h-4 ml-3 mr-1.5 self-center" />
      <input required id="lookup_url" name="url"
        className="grow border-none focus:outline-0 mr-1 px-1 placeholder:text-foreground-muted-3/50 placeholder:font-normal placeholder:italic"
        defaultValue={props.query['url'] as string}
        autoComplete="off"
        placeholder="localhost:3000"
      />
    </div>

    <button type="submit" className="primary normal">Check</button>
  </Form>
}
function Loading() {
  return (
    <div>
      <div className="fadeIn-200">Loading...</div>
      <div className="fadeIn-2000">This takes longer than expected...</div>
    </div>
  )
}
function CiSearchMagnifyingGlass(props: SVGProps<SVGSVGElement>) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 15l6 6m-11-4a7 7 0 1 1 0-14a7 7 0 0 1 0 14"></path></svg>)
}


// DEBUG

async function RawHTML(
  prop: { url: string | string[] | undefined }
) {
  const getHTML = async () => {
    const url = parseUrlFromQuery(prop.url)
    if (!url) return null
    const { html } = await fetchRoot(url.toString())
    return html
  }

  return (
    <Suspense>
      <div className="fadeIn-500">
        <pre className="whitespace-pre-wrap break-all">{await getHTML().catch(err => null)}</pre>
      </div>
    </Suspense>
  )
}