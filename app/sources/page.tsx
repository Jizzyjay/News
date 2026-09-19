import Link from "next/link";
import { QueryBuilder } from "@/components/query-builder";
import { PageShell } from "@/components/page-shell";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { SourceDirectory } from "@/components/source-directory";
import { ErrorBanner } from "@/components/status";
import { Icon } from "@/components/icon";
import { SAVED_STREAMS } from "@/lib/constants";
import { safeEverything, safeSources } from "@/lib/newsapi";

export const metadata = {
  title: "Source Directory",
};

export default async function SourcesPage() {
  const [{ sources, error }, preview] = await Promise.all([
    safeSources({ language: "en" }),
    safeEverything({
      q: "semiconductor OR quantum OR renewables",
      sortBy: "publishedAt",
      pageSize: 6,
    }),
  ]);

  return (
    <>
      <SiteHeader active="sources" articles={preview.articles} />
      <PageShell>
          {error ? <ErrorBanner message={error} /> : null}
          <section className="relative mb-space-xl overflow-hidden bg-surface-container-lowest p-space-md shadow-sm sm:p-space-xl md:p-space-2xl">
            <div className="relative z-10 mb-space-xl flex flex-col justify-between gap-space-lg md:flex-row md:items-end">
              <div className="max-w-2xl">
                <div className="mb-space-xs flex items-center gap-space-xs font-label-caps text-label-caps tracking-widest text-secondary uppercase">
                  <span className="size-2 bg-secondary" />
                  <span>INGESTION PIPELINE · NEWSAPI v2</span>
                </div>
                <h1 className="mb-space-xs font-headline-lg text-headline-lg font-bold tracking-tight text-primary uppercase">
                  Source Directory & Feed Customizer
                </h1>
                <p className="font-lead text-lead text-on-surface-variant">
                  Manage and curate the news outlets, wire services, and regional desks
                  powering your Dispatch stream via NewsAPI.
                </p>
              </div>
              <div className="flex items-center gap-space-sm self-start bg-surface-container-low px-space-md py-space-sm md:self-auto">
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex size-full animate-ping bg-secondary opacity-75" />
                  <span className="relative inline-flex size-2.5 bg-secondary" />
                </span>
                <div className="flex flex-col">
                  <span className="font-label-caps text-label-caps font-bold text-primary uppercase">
                    Sync State: {error ? "Degraded" : "Synchronized"}
                  </span>
                  <span className="font-timestamp text-timestamp text-on-surface-variant">
                    {sources.length} English-language sources indexed
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-space-md pt-space-lg md:grid-cols-4">
              {[
                { label: "Active Outlets", value: String(sources.length), hint: "from /v2/sources" },
                { label: "Custom Feeds", value: "3", hint: "Pinned streams" },
                { label: "Preview Articles", value: String(preview.articles.length), hint: "constructor payload" },
                { label: "API Plan", value: "Developer", hint: "keep key server-side" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col justify-between bg-surface-container-low p-space-md">
                  <span className="font-label-caps text-label-caps tracking-wider text-on-surface-variant uppercase">
                    {stat.label}
                  </span>
                  <div className="mt-space-sm flex items-baseline gap-space-xs">
                    <span className="font-headline-md text-headline-md font-bold text-primary">
                      {stat.value}
                    </span>
                    <span className="font-source-meta text-source-meta text-on-surface-variant">
                      {stat.hint}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <QueryBuilder preview={preview.articles} />

          <section className="mb-space-2xl bg-surface-container-low p-space-md shadow-sm sm:p-space-lg">
            <div className="mb-space-md flex flex-col items-start justify-between gap-space-md md:flex-row md:items-center">
              <div className="flex items-center gap-space-sm">
                <Icon name="bookmarks" className="text-[20px] text-primary" />
                <div>
                  <h3 className="font-headline-sm text-headline-sm font-bold tracking-tight text-primary uppercase">
                    Active Custom Streams
                  </h3>
                  <span className="font-timestamp text-timestamp text-on-surface-variant">
                    Pinned high-priority multi-source aggregations
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-space-md md:grid-cols-3">
              {SAVED_STREAMS.map((stream) => (
                <div key={stream.id} className="group flex flex-col justify-between bg-surface-container-lowest p-space-md shadow-sm">
                  <div>
                    <div className="mb-space-xs flex items-center justify-between">
                      <span className="bg-primary px-1.5 py-0.5 font-label-caps text-label-caps text-on-primary uppercase">
                        STREAM {stream.id}
                      </span>
                    </div>
                    <h4 className="font-headline-sm text-headline-sm font-bold text-primary group-hover:text-secondary">
                      {stream.name}
                    </h4>
                    <p className="mt-1 line-clamp-2 font-body-sm text-body-sm text-on-surface-variant">
                      {stream.description}
                    </p>
                  </div>
                  <div className="mt-space-md flex items-center justify-between pt-space-md">
                    <span className="font-timestamp text-timestamp text-on-surface-variant">
                      /v2/everything
                    </span>
                    <Link
                      href={`/search?q=${encodeURIComponent(stream.query)}`}
                      className="flex items-center gap-1 bg-primary px-space-sm py-1 font-source-meta text-source-meta text-on-primary uppercase hover:bg-primary-container"
                    >
                      Launch <Icon name="open_in_new" className="text-[14px]" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <SourceDirectory sources={sources} />
      </PageShell>
      <SiteFooter />
    </>
  );
}
