import { Suspense, type SVGProps } from "react";
import Form from 'next/form'
import { getMetadata, getRoot, type Metadata } from "./lib/get-metadata";
import { parseUrlFromQuery } from "./lib/parse-url";
import { MetadataInformations } from "./client.metadata";
import { LinkPreview } from "./client.preview";

export default async function Home(context: {
  searchParams: Promise<Record<string, string | string[]>>
}) {
  const query = await context.searchParams;

  const { url, error } = parseUrlFromQuery(query.url)

  const metadataPromise = new Promise<Metadata>(async (resolve, reject) => {
    if (!url) {
      reject();
      return
    }
    try {
      const { root } = await getRoot(url.toString())
      const metadata = getMetadata(root)
      resolve(metadata)
    } catch (error) {
      console.error("Error:", error, (url))
      reject(`An error occurred, ${ error }`)
    }
  })

  return (
    <main className="mx-auto max-w-3xl lg:max-w-none px-8 lg:px-12 xl:px-24  font-medium  lg:grid lg:grid-cols-2 gap-x-8 font-sans pb-[100vh]"
      style={{
        // @ts-expect-error custom css prop
        "--padding-top": "3rem",
        "--padding-bottom": "3rem",
      }}
    >

      <div className="flex flex-col gap-8 py-[var(--padding-top)] pb-[var(--padding-bottom)]">

        <Header />

        <section className="">
          {/* <label className="text-sm font-semibold tracking-tight flex items-center gap-0.5 mb-1 text-foreground-input" htmlFor="id">
            Website URL
          </label> */}
          <Form
            action="/"
            className="flex p-1 bg-white  card rounded-xl focus-within:border-slate-400 outline-transparent focus-within:outline-4 focus-within:outline-slate-200 transition">
            <CiSearchMagnifyingGlass className="w-4 h-4 ml-3 mr-3 self-center" />
            <input
              required
              autoComplete="off"
              id="lookup_url"
              name="url"
              defaultValue={query.url as string}
              className="grow border-none focus:outline-0 mr-1 px-2"
            />
            <button
              type="submit"
            >Check</button>
          </Form>

          {error && (
            <div className="text-xs mt-1 text-red-500">
              {error}
            </div>
          )}

        </section>

        {!!(!!url && !!!error) && (
          <Suspense
            key={url.toString()}
            fallback={<span className="fadeIn-3000">Loading...</span>}>
            <MetadataInformations metadataPromise={metadataPromise} />
          </Suspense>
        )}
      </div>
      <div className="flex flex-col items-center gap-8 py-[var(--padding-top)] pb-[var(--padding-bottom)]">
        {(url && !error) && (
          <Suspense
            key={url.toString()}
            fallback={<span className="fadeIn-3000">Loading...</span>}>
            <LinkPreview metadataPromise={metadataPromise} />
          </Suspense>
        )}
      </div>
    </main>
  );
}

async function Header() {
  return (
    <header className="text-start">
      <div className="text-xs text-gray-600 font-mono">npx check-site-meta</div>
      <h1 className="leading-normal">
        Site Metadata Checker</h1>
      <p className="text-gray-600 text-pretty text-sm">
        Validate how your Open Graph data is used for link previews on social platforms.
      </p>
    </header>
  )
}

function CiSearchMagnifyingGlass(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 15l6 6m-11-4a7 7 0 1 1 0-14a7 7 0 0 1 0 14"></path></svg>
  )
}