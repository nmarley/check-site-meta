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
    <main className="container-md lg:container-2xl px-8 lg:px-12 xl:px-24 *:py-12 font-medium lg:grid lg:grid-cols-2 gap-x-8 font-sans pb-[100vh]">
      <div className="flex flex-col gap-8 min-h-screen">
        <Header />
        <InputForm url={query.url as string} />
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
      <div id="version" className="hidden">{process.env['CSM_VERSION']}</div>
      <div id="disable_analytics" className="hidden">{process.env['DISABLE_ANALYTICS']}</div>
      <Footer />
    </main>

  );
}

// Components -----------------------------


function Header() {
  return <header className="text-start">
    <div className="text-xs text-foreground-muted-2 font-mono">
      npx check-site-meta</div>
    <h1 className="leading-normal text-lg font-bold tracking-tight">
      Site Metadata Checker</h1>
    <p className="text-foreground-muted-2 text-pretty text-sm">
      Validate how your Open Graph data is used for link previews on social platforms.</p>
  </header>
}

function Footer(
  props: ComponentProps<"footer">
) {
  return (
    <footer {...props} className={cn("card w-full col-span-2", props.className)}  >
      <div className="text-xs text-gray-600 font-mono">
        <a href="" className="hover:underline">Privacy Policy</a>
        <span className="mx-1">•</span>
        <a href="" className="hover:underline">Terms of Service</a>
      </div>
    </footer>
  )
}

function InputForm(
  props: { url: string }
) {
  return <Form
    onSubmit={logCheckButton}
    action="/"
    className="flex gap-2">
    <div className="grow flex p-1 card rounded-xl focus-within:border-border-focus outline-transparent outline-0 focus-within:outline-4 focus-within:outline-focus transition-all">
      <CiSearchMagnifyingGlass className="w-4 h-4 ml-3 mr-3 self-center" />
      <input required id="lookup_url" name="url"
        className="grow border-none focus:outline-0 mr-1 px-2"
        defaultValue={props.url as string}
        autoComplete="off"
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