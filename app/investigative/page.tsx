import Link from "next/link";
import { CompactCard } from "@/components/article-cards";
import { PageShell } from "@/components/page-shell";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { EmptyWire, ErrorBanner } from "@/components/status";
import { safeEverything, safeTopHeadlines } from "@/lib/newsapi";
import { articlePath, authorLabel, formatRelativeTime, sourceLabel } from "@/lib/utils";

export const metadata = {
  title: "Investigative & Reads",
};

export default async function InvestigativePage() {
  const feed = await safeEverything({
    q: "investigation OR exclusive OR inquiry OR scandal OR report",
    sortBy: "relevancy",
    language: "en",
    pageSize: 18,
  });
  const fallback =
    feed.articles.length === 0
      ? await safeTopHeadlines({ category: "general", pageSize: 18 })
      : feed;
  const error = "error" in feed ? feed.error : "error" in fallback ? fallback.error : null;
  const [hero, ...rest] = fallback.articles;

  return (
    <>
      <SiteHeader articles={fallback.articles} active="investigative" />
      <PageShell>
          {error ? <ErrorBanner message={error} /> : null}
          <div className="mb-space-xl bg-surface-container-lowest p-space-md shadow-sm sm:p-space-xl">
            <span className="font-label-caps text-label-caps tracking-widest text-secondary uppercase">
              Longform desk
            </span>
            <h1 className="mt-space-xs font-headline-lg text-headline-lg font-bold tracking-tight text-primary">
              Investigative & Reads
            </h1>
            <p className="mt-space-xs max-w-3xl font-lead text-lead text-on-surface-variant">
              Deeper NewsAPI matches for investigations, exclusives, and special reports,
              mapped into the Dispatch reader grid.
            </p>
          </div>
          {!hero ? (
            <EmptyWire />
          ) : (
            <>
              <article className="mb-space-xl bg-surface-container-lowest p-space-md shadow-md sm:p-space-lg">
                <span className="bg-secondary px-space-xs py-space-xxs font-label-caps text-label-caps text-on-secondary uppercase">
                  Deep Dive
                </span>
                <h2 className="mt-space-sm max-w-5xl break-words font-display-xl text-display-xl font-bold tracking-tight text-primary max-md:font-display-xl-mobile max-md:text-display-xl-mobile">
                  <Link href={articlePath(hero)}>{hero.title}</Link>
                </h2>
                <p className="mt-space-md max-w-4xl font-lead text-lead text-on-surface-variant">
                  {hero.description}
                </p>
                <div className="mt-space-md font-source-meta text-source-meta text-on-surface-variant">
                  {sourceLabel(hero)} · {authorLabel(hero)} · {formatRelativeTime(hero.publishedAt)}
                </div>
              </article>
              <div className="grid grid-cols-1 gap-space-lg md:grid-cols-2 lg:grid-cols-3">
                {rest.map((article) => (
                  <CompactCard key={article.url} article={article} />
                ))}
              </div>
            </>
          )}
      </PageShell>
      <SiteFooter />
    </>
  );
}
