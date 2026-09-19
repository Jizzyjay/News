import Link from "next/link";
import { ArticleImage } from "@/components/article-image";
import { Icon } from "@/components/icon";
import { PageShell } from "@/components/page-shell";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { EmptyWire, ErrorBanner } from "@/components/status";
import { TechGrid } from "@/components/tech-grid";
import { TECH_SOURCES, TECH_TOPICS } from "@/lib/constants";
import { safeEverything, safeTopHeadlines } from "@/lib/newsapi";
import {
  articlePath,
  authorLabel,
  estimateReadMinutes,
  formatRelativeTime,
  sourceLabel,
} from "@/lib/utils";

type SearchParams = Promise<{
  topic?: string;
  sort?: string;
  sources?: string;
}>;

export default async function TechPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const topic = TECH_TOPICS.find((item) => item.id === params.topic) ?? TECH_TOPICS[0];
  const selectedSources = params.sources ?? TECH_SOURCES.slice(0, 4).join(",");
  const sort = params.sort === "popularity" ? "popularity" : "publishedAt";

  const feed = topic.q
    ? await safeEverything({
        q: topic.q,
        sortBy: sort,
        pageSize: 21,
      })
    : await safeTopHeadlines({
        category: "technology",
        pageSize: 21,
      });

  const error = "error" in feed ? feed.error : null;
  const [hero, ...rest] = feed.articles;

  return (
    <>
      <SiteHeader articles={feed.articles} active="tech" />
      <PageShell>
          {error ? <ErrorBanner message={error} /> : null}
          <section className="relative mb-space-lg overflow-hidden bg-surface-container-lowest p-space-md shadow-sm sm:p-space-lg md:p-space-xl">
            <div className="pointer-events-none absolute -top-24 -right-20 size-96 rounded-full bg-secondary/5 blur-3xl" />
            <div className="relative z-10 flex flex-col justify-between gap-space-md lg:flex-row lg:items-end">
              <div className="max-w-3xl">
                <div className="mb-space-xs flex items-center gap-space-xs">
                  <span className="bg-secondary px-2 py-0.5 font-label-caps text-label-caps tracking-wider text-on-secondary uppercase">
                    Field Desk 04
                  </span>
                  <span className="font-timestamp text-timestamp tracking-widest text-on-surface-variant uppercase">
                    Feed Pipeline #TC-8890
                  </span>
                </div>
                <h1 className="font-headline-lg text-headline-lg font-bold tracking-tight text-primary">
                  Technology & Innovation
                </h1>
                <p className="mt-space-xs font-lead text-lead text-on-surface-variant">
                  Live news stream aggregated from TechCrunch, Wired, The Verge, Ars
                  Technica and the broader NewsAPI technology category.
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-start gap-space-xs bg-surface-container-low p-space-md shadow-sm lg:items-end">
                <div className="flex flex-wrap items-center gap-space-xs font-source-meta text-source-meta font-semibold text-secondary">
                  <span className="inline-block size-2 animate-ping rounded-full bg-secondary" />
                  <span className="-ml-3 inline-block size-2 rounded-full bg-secondary" />
                  <span>SYSTEM ACTIVE • NEWSAPI V2 POLLING</span>
                </div>
                <div className="font-timestamp text-timestamp text-on-surface">
                  Status: Connected •{" "}
                  <span className="font-semibold text-primary">
                    {feed.totalResults.toLocaleString()} articles
                  </span>{" "}
                  in this query
                </div>
                <div className="mt-space-xxs h-1 w-full overflow-hidden bg-surface-container-high">
                  <div className="h-full w-3/4 animate-pulse bg-secondary" />
                </div>
              </div>
            </div>
          </section>

          <section className="mb-space-lg flex flex-col gap-space-md bg-surface-container-lowest p-space-md shadow-sm">
            <div className="no-scrollbar flex items-center gap-space-xs overflow-x-auto pb-space-xxs">
              {TECH_TOPICS.map((item) => (
                <Link
                  key={item.id}
                  href={`/tech?topic=${item.id}&sort=${sort}`}
                  className={
                    topic.id === item.id
                      ? "bg-primary px-space-md py-1.5 font-source-meta text-source-meta tracking-wider text-on-primary uppercase shadow-sm whitespace-nowrap"
                      : "bg-surface-container px-space-md py-1.5 font-source-meta text-source-meta tracking-wider text-on-surface-variant uppercase whitespace-nowrap hover:bg-surface-container-high hover:text-primary"
                  }
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs">
              <div className="flex flex-wrap items-center gap-space-sm">
                <span className="flex items-center gap-space-xs bg-surface-container px-space-md py-1.5 font-source-meta text-source-meta tracking-wider text-on-surface uppercase">
                  <Icon name="filter_alt" className="text-[16px] text-on-surface-variant" />
                  Sources: {selectedSources.split(",").length} bound
                </span>
                <Link
                  href={`/tech?topic=${topic.id}&sort=${sort === "publishedAt" ? "popularity" : "publishedAt"}`}
                  className="flex items-center gap-space-xs bg-surface-container px-space-md py-1.5 font-source-meta text-source-meta tracking-wider text-on-surface uppercase hover:bg-surface-container-high"
                >
                  <Icon name="sort" className="text-[16px] text-on-surface-variant" />
                  {sort === "publishedAt" ? "Latest First" : "Popularity"}
                </Link>
                <span className="hidden font-timestamp text-timestamp text-on-surface-variant sm:inline">
                  Showing {feed.articles.length} of {feed.totalResults.toLocaleString()} stories
                </span>
              </div>
            </div>
          </section>

          {!hero ? (
            <EmptyWire title="Tech desk is quiet" />
          ) : (
            <>
              <section className="mb-space-xl">
                <article className="group relative overflow-hidden bg-surface-container-lowest shadow-md">
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    <div className="relative h-56 overflow-hidden sm:h-80 lg:col-span-7 lg:h-[450px]">
                      <ArticleImage
                        article={hero}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent lg:hidden" />
                      <div className="absolute top-space-md left-space-md z-10 flex max-w-[calc(100%-2rem)] flex-wrap gap-space-xs">
                        <span className="flex items-center gap-1 bg-secondary px-space-sm py-1 font-label-caps text-label-caps font-bold tracking-wider text-on-secondary uppercase">
                          <span className="size-1.5 rounded-full bg-on-secondary" /> BREAKING REPORT
                        </span>
                        <span className="bg-primary px-space-sm py-1 font-source-meta text-source-meta tracking-wider text-on-primary uppercase">
                          {sourceLabel(hero)}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between bg-surface-container-lowest p-space-md sm:p-space-lg lg:col-span-5 lg:p-space-xl">
                      <div>
                        <div className="mb-space-xs flex flex-wrap items-center gap-space-sm font-timestamp text-timestamp text-on-surface-variant">
                          <span className="font-bold tracking-wider text-secondary uppercase">
                            {hero.source.id ?? "TECHNOLOGY"}
                          </span>
                          <span>•</span>
                          <span>{formatRelativeTime(hero.publishedAt)}</span>
                          <span>•</span>
                          <span className="flex items-center gap-0.5">
                            <Icon name="schedule" className="text-[14px]" />
                            {estimateReadMinutes(hero)} min read
                          </span>
                        </div>
                        <h2 className="break-words font-headline-lg text-headline-lg leading-tight font-bold tracking-tight text-primary hover:text-secondary">
                          <Link href={articlePath(hero)}>{hero.title}</Link>
                        </h2>
                        <p className="mt-space-sm font-lead text-lead text-on-surface-variant">
                          {hero.description}
                        </p>
                        <div className="mt-space-md flex flex-col gap-space-sm bg-surface-container-low p-space-sm sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-center gap-space-xs">
                            <Icon name="trending_up" className="text-[18px] text-secondary" />
                            <span className="font-source-meta text-source-meta text-on-surface">
                              NewsAPI totalResults:{" "}
                              <span className="font-bold">{feed.totalResults.toLocaleString()}</span>
                            </span>
                          </div>
                          <span className="font-timestamp text-timestamp text-on-surface-variant">
                            Verified Bureau Dispatch
                          </span>
                        </div>
                      </div>
                      <div className="mt-space-md flex flex-col gap-space-sm pt-space-md sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex min-w-0 items-center gap-space-xs font-source-meta text-source-meta text-on-surface">
                          <span className="flex size-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-on-primary">
                            {sourceLabel(hero).slice(0, 2).toUpperCase()}
                          </span>
                          <span>
                            By <span className="font-semibold text-primary">{authorLabel(hero)}</span>
                          </span>
                        </div>
                        <Link
                          href={articlePath(hero)}
                          className="self-start bg-primary px-space-md py-2 font-source-meta text-source-meta tracking-wider text-on-primary uppercase hover:bg-primary-container"
                        >
                          Full Read →
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </section>
              <TechGrid articles={rest} />
            </>
          )}
      </PageShell>
      <SiteFooter />
    </>
  );
}
