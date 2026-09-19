import Link from "next/link";
import { ArticleImage } from "@/components/article-image";
import { AudioDigest } from "@/components/audio-digest";
import { CompactCard, InlineStory, RankedItem, TechCard } from "@/components/article-cards";
import { BreakingTicker } from "@/components/breaking-ticker";
import { HeroArticle } from "@/components/hero-article";
import { IngestCounter } from "@/components/ingest-counter";
import { PageShell } from "@/components/page-shell";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { SourceFilterBar } from "@/components/source-filter-bar";
import { EmptyWire, ErrorBanner } from "@/components/status";
import { EDITIONS } from "@/lib/constants";
import { safeTopHeadlines } from "@/lib/newsapi";
import {
  articlePath,
  formatRelativeTime,
  sourceLabel,
  uniqueSources,
} from "@/lib/utils";

type SearchParams = Promise<{
  source?: string;
  edition?: string;
}>;

export default async function FrontPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const edition = params.edition ?? "us";
  const country =
    EDITIONS.find((item) => item.id === edition)?.country ?? "us";
  const source = params.source && params.source !== "all" ? params.source : undefined;

  const [headlines, tech] = await Promise.all([
    safeTopHeadlines({
      country: source ? undefined : country,
      sources: source,
      pageSize: 40,
    }),
    source
      ? Promise.resolve({ articles: [], totalResults: 0, error: null as string | null })
      : safeTopHeadlines({ category: "technology", pageSize: 12 }),
  ]);

  const error = headlines.error ?? tech.error;

  const articles = headlines.articles;
  const hero = articles[0];
  const ranked = articles.slice(1, 6);
  const techLead = (tech.articles.length ? tech.articles : articles.slice(8, 10)).slice(0, 2);
  const techInline = (tech.articles.length ? tech.articles : articles).slice(2, 5);
  const cultureLead = articles[12] ?? articles[3];
  const cultureSide = articles.slice(13, 15);
  const markets = articles.slice(6, 10);
  const trending = uniqueSources(articles).slice(0, 8);

  return (
    <>
      <SiteHeader articles={articles} active="front-page" />
      <PageShell>
          {error ? <ErrorBanner message={error} /> : null}
          <BreakingTicker articles={articles.slice(0, 8)} />
          <SourceFilterBar active={source ?? "all"} edition={edition} />

          {!hero ? (
            <EmptyWire />
          ) : (
            <div className="mb-space-2xl grid grid-cols-1 gap-space-lg lg:grid-cols-12">
              <HeroArticle article={hero} totalResults={headlines.totalResults} />
              <aside className="flex flex-col gap-space-md lg:col-span-4">
                <div className="flex-1 bg-surface-container-lowest p-space-md shadow-md">
                  <div className="mb-space-md flex items-center justify-between bg-surface-container-high px-space-xs py-1">
                    <div className="flex items-center gap-space-xs">
                      <span className="size-2 bg-secondary" />
                      <span className="font-label-caps text-label-caps tracking-wider text-on-surface uppercase">
                        Top Wire Index
                      </span>
                    </div>
                    <span className="font-source-meta text-source-meta text-on-surface-variant">
                      Live Ranking
                    </span>
                  </div>
                  <div className="flex flex-col space-y-space-md">
                    {ranked.map((article, index) => (
                      <RankedItem
                        key={article.url}
                        article={article}
                        rank={index + 1}
                        highlight={index === 1}
                      />
                    ))}
                  </div>
                  <AudioDigest
                    summary={`AI-narrated distillation of ${headlines.totalResults.toLocaleString()} NewsAPI headlines into five decisive strategic points.`}
                  />
                </div>
              </aside>
            </div>
          )}

          <div className="mb-space-2xl grid grid-cols-1 gap-space-lg lg:grid-cols-12">
            <div className="flex flex-col space-y-space-xl lg:col-span-8">
              <section className="bg-surface-container-lowest p-space-md shadow-sm">
                <div className="mb-space-md flex flex-wrap items-center justify-between gap-space-xs bg-surface-container-low px-space-sm py-1">
                  <div className="flex min-w-0 items-center gap-space-xs">
                    <span className="bg-primary px-1.5 py-0.5 font-label-caps text-label-caps text-on-primary uppercase">
                      DESK
                    </span>
                    <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                      Tech & AI Wire
                    </h2>
                  </div>
                  <Link
                    href="/tech"
                    className="font-source-meta text-source-meta tracking-wider text-on-surface-variant uppercase"
                  >
                    High Frequency Feed
                  </Link>
                </div>
                <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
                  {techLead.map((article) => (
                    <TechCard key={article.url} article={article} />
                  ))}
                </div>
                <div className="mt-space-md grid grid-cols-1 gap-space-sm bg-surface-container-lowest pt-space-sm md:grid-cols-3">
                  {techInline.map((article, index) => (
                    <InlineStory
                      key={article.url}
                      article={article}
                      accent={index === 0}
                    />
                  ))}
                </div>
              </section>

              <section className="bg-surface-container-lowest p-space-md shadow-sm">
                <div className="mb-space-md flex flex-wrap items-center justify-between gap-space-xs bg-surface-container-high px-space-sm py-1">
                  <div className="flex items-center gap-space-xs">
                    <span className="bg-primary px-1.5 py-0.5 font-label-caps text-label-caps text-on-primary uppercase">
                      ESSAYS
                    </span>
                    <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                      Culture & Ideas
                    </h2>
                  </div>
                  <span className="font-source-meta text-source-meta tracking-wider text-on-surface-variant uppercase">
                    /v2/everything
                  </span>
                </div>
                {cultureLead ? (
                  <div className="grid grid-cols-1 gap-space-md md:grid-cols-12">
                    <article className="relative flex flex-col bg-surface-container-low p-space-md md:col-span-7">
                      <div className="mb-space-sm h-56 overflow-hidden bg-surface-container">
                        <ArticleImage
                          article={cultureLead}
                          className="h-full w-full object-cover grayscale contrast-125"
                        />
                      </div>
                      <div className="mb-space-xs flex flex-wrap items-center gap-space-xs font-source-meta text-source-meta text-on-surface-variant">
                        <span className="font-bold text-secondary uppercase">
                          {sourceLabel(cultureLead)}
                        </span>
                        <span>•</span>
                        <span>{cultureLead.author ?? "NewsAPI"}</span>
                        <span>•</span>
                        <span>{formatRelativeTime(cultureLead.publishedAt)}</span>
                      </div>
                      <h3 className="mb-space-xs break-words font-headline-md text-headline-md leading-tight font-bold text-on-surface">
                        <Link href={articlePath(cultureLead)}>{cultureLead.title}</Link>
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        {cultureLead.description}
                      </p>
                    </article>
                    <div className="flex flex-col justify-between space-y-space-md md:col-span-5">
                      {cultureSide.map((article) => (
                        <article key={article.url} className="bg-surface-container-low p-space-sm">
                          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                            ESSAY · {sourceLabel(article)}
                          </span>
                          <h4 className="mt-1 mb-space-xs font-headline-sm text-headline-sm font-semibold text-on-surface">
                            <Link href={articlePath(article)}>{article.title}</Link>
                          </h4>
                          <p className="line-clamp-3 font-body-sm text-body-sm text-on-surface-variant">
                            {article.description}
                          </p>
                          <div className="mt-2 font-timestamp text-timestamp text-on-surface-variant">
                            {article.author ?? "NewsAPI"} · {formatRelativeTime(article.publishedAt)}
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                ) : (
                  <EmptyWire title="Culture desk is quiet" detail="The /everything culture query returned no usable articles." />
                )}
              </section>
            </div>

            <aside className="flex flex-col space-y-space-md lg:col-span-4">
              <section className="bg-surface-container-lowest p-space-md shadow-md">
                <div className="mb-space-sm flex flex-wrap items-center justify-between gap-space-xs bg-surface-container-high px-space-xs py-1">
                  <div className="flex min-w-0 items-center gap-space-xs">
                    <span className="size-2 shrink-0 rounded-full bg-secondary" />
                    <h3 className="font-label-caps text-label-caps tracking-wider text-on-surface uppercase">
                      Global Affairs & Markets
                    </h3>
                  </div>
                  <span className="font-source-meta text-source-meta text-on-surface-variant">
                    BUSINESS DESK
                  </span>
                </div>
                <div className="mb-space-md bg-surface-container-low p-space-sm">
                  <div className="mb-space-xs flex items-center justify-between font-source-meta text-source-meta">
                    <span className="font-bold text-on-surface">HEADLINE VOLUME</span>
                    <span className="font-bold text-secondary">
                      {headlines.totalResults.toLocaleString()} RESULTS
                    </span>
                  </div>
                  <div className="mb-1 font-headline-md text-headline-md leading-none font-bold text-on-surface">
                    {markets.length}{" "}
                    <span className="font-body-sm text-body-sm font-normal text-on-surface-variant">
                      LIVE ITEMS
                    </span>
                  </div>
                  <svg className="h-12 w-full text-on-surface" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 200 40">
                    <path d="M0 35 L25 30 L50 32 L75 22 L100 24 L125 15 L150 18 L175 8 L200 12" />
                    <path d="M0 35 L25 30 L50 32 L75 22 L100 24 L125 15 L150 18 L175 8 L200 12 L200 40 L0 40 Z" fill="currentColor" fillOpacity="0.05" />
                  </svg>
                </div>
                <div className="space-y-space-sm">
                  {markets.slice(0, 2).map((article) => (
                    <Link
                      key={article.url}
                      href={articlePath(article)}
                      className="block bg-surface-container-low p-space-xs"
                    >
                      <div className="mb-1 flex items-center justify-between font-source-meta text-source-meta text-on-surface-variant">
                        <span className="font-bold text-on-surface">
                          {sourceLabel(article).toUpperCase()}
                        </span>
                        <span>{formatRelativeTime(article.publishedAt)}</span>
                      </div>
                      <h4 className="font-body-sm text-body-sm leading-snug font-bold text-on-surface">
                        {article.title}
                      </h4>
                    </Link>
                  ))}
                </div>
              </section>

              <section className="bg-surface-container-lowest p-space-md shadow-sm">
                <div className="mb-space-sm flex items-center justify-between bg-surface-container-high px-space-xs py-1">
                  <span className="font-label-caps text-label-caps tracking-wider text-on-surface uppercase">
                    Active Sources
                  </span>
                  <span className="font-source-meta text-source-meta font-bold text-secondary">
                    LIVE VECTOR
                  </span>
                </div>
                <div className="flex flex-wrap gap-space-xs">
                  {trending.map((source) => (
                    <Link
                      key={source}
                      href={`/search?q=${encodeURIComponent(source)}`}
                      className="bg-surface-container-low px-space-sm py-1 font-source-meta text-source-meta text-on-surface hover:bg-primary hover:text-on-primary"
                    >
                      #{source.replace(/\s+/g, "")}
                    </Link>
                  ))}
                </div>
              </section>

              <section className="bg-primary p-space-md text-on-primary shadow-md">
                <div className="mb-space-sm flex items-center justify-between bg-primary-container px-space-xs py-1">
                  <div className="flex items-center gap-space-xs">
                    <span className="size-2 animate-ping rounded-full bg-secondary" />
                    <span className="font-label-caps text-label-caps tracking-widest text-on-primary uppercase">
                      INGESTION METRICS
                    </span>
                  </div>
                  <span className="font-timestamp text-timestamp text-on-primary-container">
                    NewsAPI v2
                  </span>
                </div>
                <div className="space-y-space-sm">
                  <div>
                    <div className="font-timestamp text-timestamp text-on-primary-container uppercase">
                      Articles Ingested This Query
                    </div>
                    <IngestCounter start={headlines.totalResults} />
                  </div>
                  <div>
                    <div className="mb-1 flex justify-between font-timestamp text-timestamp text-on-primary-container">
                      <span>Pipeline Throughput</span>
                      <span className="font-bold text-on-primary">
                        {articles.length} rendered
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden bg-surface-container-highest/20">
                      <div className="h-full w-[84%] animate-pulse bg-secondary" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-space-xs pt-space-xs font-source-meta text-source-meta text-on-primary-container">
                    <div className="bg-primary-container p-space-xs">
                      <span className="block font-bold text-on-primary">
                        {uniqueSources(articles).length}
                      </span>
                      <span>Sources in edition</span>
                    </div>
                    <div className="bg-primary-container p-space-xs">
                      <span className="block font-bold text-on-primary">300s</span>
                      <span>Cache window</span>
                    </div>
                  </div>
                </div>
              </section>
            </aside>
          </div>

          {articles.length > 6 ? (
            <section>
              <div className="mb-space-md flex flex-wrap items-baseline justify-between gap-space-xs">
                <h3 className="font-headline-md text-headline-md font-bold tracking-tight text-primary">
                  Remaining Edition
                </h3>
                <span className="font-timestamp text-timestamp text-on-surface-variant">
                  Showing {articles.length} of {headlines.totalResults.toLocaleString()}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-space-lg md:grid-cols-2 lg:grid-cols-3">
                {articles.slice(6, 15).map((article) => (
                  <CompactCard key={article.url} article={article} />
                ))}
              </div>
            </section>
          ) : null}
      </PageShell>
      <SiteFooter edition={edition} />
    </>
  );
}
