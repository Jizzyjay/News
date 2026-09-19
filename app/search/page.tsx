import { CompactCard } from "@/components/article-cards";
import { SearchBox } from "@/components/search-box";
import { PageShell } from "@/components/page-shell";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { EmptyWire, ErrorBanner } from "@/components/status";
import { safeEverything } from "@/lib/newsapi";
import type { SortBy } from "@/lib/types";

type SearchParams = Promise<{
  q?: string;
  sortBy?: SortBy;
  language?: string;
}>;

export const metadata = {
  title: "Search",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const q = params.q?.trim() ?? "";
  const feed = q
    ? await safeEverything({
        q,
        sortBy: params.sortBy ?? "publishedAt",
        language: params.language ?? "en",
        pageSize: 24,
      })
    : { articles: [], totalResults: 0, error: null as string | null };
  const error = "error" in feed ? feed.error : null;

  return (
    <>
      <SiteHeader articles={feed.articles} active="search" query={q} />
      <PageShell>
          {error ? <ErrorBanner message={error} /> : null}
          <section className="mb-space-xl bg-surface-container-lowest p-space-md shadow-sm sm:p-space-xl">
            <span className="font-label-caps text-label-caps tracking-widest text-secondary uppercase">
              ENDPOINT /v2/everything
            </span>
            <h1 className="mt-space-xs break-words font-headline-lg text-headline-lg font-bold text-primary">
              {q ? `Results for “${q}”` : "Search the wire"}
            </h1>
            <p className="mt-space-xs font-body-md text-body-md text-on-surface-variant">
              {q
                ? `${feed.totalResults.toLocaleString()} matching articles from NewsAPI.`
                : "Query headlines, authors, and source names across the NewsAPI everything endpoint."}
            </p>
            <div className="mt-space-md md:hidden">
              <SearchBox defaultValue={q} alwaysVisible />
            </div>
          </section>
          {!q ? (
            <EmptyWire
              title="Enter a query to compile a custom feed"
              detail="Use the masthead search or the source directory constructor."
            />
          ) : feed.articles.length === 0 ? (
            <EmptyWire title="No matches" detail="Try a broader keyword or a different sort." />
          ) : (
            <div className="grid grid-cols-1 gap-space-lg md:grid-cols-2 lg:grid-cols-3">
              {feed.articles.map((article) => (
                <CompactCard key={article.url} article={article} />
              ))}
            </div>
          )}
      </PageShell>
      <SiteFooter />
    </>
  );
}
