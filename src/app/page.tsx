import { Suspense, type SVGProps } from "react";
import Form from 'next/form'
import { getRoot } from "./get-metadata";

export default async function Home(context: {
  searchParams: Promise<Record<string, string | string[]>>
}) {
  const query = await context.searchParams;

  let errorMsg: string | null = null
  let url: URL | null = null

  if (query.url) {
    try {
      if (Array.isArray(query.url)) {
        url = new URL(query.url[0])
      } else {
        url = new URL(query.url)
      }
    } catch (error) {
      console.log("Error:", error)
      errorMsg = error instanceof Error ? error.message : "An error occurred"
    }
  }


  return (
    <main className="mx-auto max-w-3xl lg:max-w-none px-12 xl:px-24 py-24 font-medium pb-[100vh] lg:grid lg:grid-cols-2 font-sans">
      <div className="flex flex-col gap-8">

        <header className="text-start">
          <div className="text-xs text-gray-600 font-mono">npx check-site-meta</div>
          <h1 className="text-2xl font-bold tracking-tight leading-normal">
            Site Metadata Checker
          </h1>
          <p className="mt text-gray-600 text-pretty text-sm">
            Validate how your Open Graph data is used for link previews on social platforms.
          </p>
        </header>
        <section className="card">
          <label className="text-sm font-semibold tracking-tight flex items-center gap-0.5 mb-1 text-foreground-input" htmlFor="id">
            <CiSearchMagnifyingGlass className="w-4 h-4" />
            Website URL
          </label>
          <Form action="/" className="flex gap-2">
            <input
              required
              id="url"
              name="url"
              defaultValue={query.url as string}
              className="grow border bg-background border-gray-200 p-2 px-3 pr-0 rounded-lg font-medium tracking-tight transition-all focus:outline-4 outline-gray-100 text-foreground-input" />
            <button
              className="text-sm bg-foreground text-background px-4 rounded-md hover:bg-gray-800 cursor-pointer transition-all active:translate-y-0.5 font-semibold"
            >Check Metadata</button>
          </Form>
          <div className="text-gray-400 text-xs mt-1">
            Provide a complete URL including the protocol (http:// or https://)
          </div>
          {errorMsg && (
            <div className="text-xs mt-1 text-red-500">
              {errorMsg}
            </div>
          )}

        </section>

        {/* Tabs */}
        <div className="flex p-1 rounded-md text-sm bg-slate-200/60 -mb-4 *:p-1.5 *:px-6 *:text-slate-500 *:font-semibold *:data-active:bg-white *:data-active:text-foreground *:data-active:rounded-sm *:data-active:shadow-xs *:cursor-pointer">
          <div data-active>General</div>
          <div>Open Graph</div>
          <div>Twitter</div>
          <div>JSONLD</div>
        </div>

        {(url && !errorMsg) && (
          <Suspense fallback="Loading...">
            <section className="card div:grid div:grid-cols-[8rem_1fr] div:*:first:font-medium div:*:second:text-gray-500/80 font-medium hr:-mx-5 leading-relaxed">
              <BasicMetadata url={url.toString()} />
            </section>
          </Suspense>
        )}

      </div>
      <div>

      </div>
    </main>
  );
}


async function BasicMetadata(props: {
  url: string
}) {
  const root = await getRoot(props.url)
  const title = root.querySelector("title")?.text
  const ogTitle = root.querySelector("meta[property='og:title']")?.getAttribute("content")
  const twitterTitle = root.querySelector("meta[name='twitter:title']")?.getAttribute("content")

  const description = root.querySelector("meta[name=description]")?.getAttribute("content")


  return (
    <>
      <div>
        <div><b>title</b></div>
        <div>{title}</div>
      </div>
      <div>
        <div>og:title</div>
        <div>{ogTitle ?? "-"}</div>
      </div>
      <div>
        <div>twitter:title</div>
        <div>{twitterTitle ?? "-"}</div>
      </div>
      <hr />
      <div>
        <div>description</div>
        <div>{description}</div>
      </div>
    </>
  )

}


function CiSearchMagnifyingGlass(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 15l6 6m-11-4a7 7 0 1 1 0-14a7 7 0 0 1 0 14"></path></svg>
  )
}