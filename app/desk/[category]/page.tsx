import { CompactCard } from "@/components/article-cards";
import { HeroArticle } from "@/components/hero-article";
import { PageShell } from "@/components/page-shell";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { EmptyWire, ErrorBanner } from "@/components/status";
import { DESKS } from "@/lib/constants";
import { safeEverything, safeTopHeadlines } from "@/lib/newsapi";
import type { HeadlineCategory } from "@/lib/types";
import { notFound } from "next/navigation";

type Params = Promise<{ category: string }>;

export default async function DeskPage({ params }: { params: Params }) {
  const { category } = await params;
  const desk = DESKS.find((item) => item.href === `/desk/${category}`);
  if (!desk) notFound();

  const feed = desk.category
    ? await safeTopHeadlines({
        category: desk.category as HeadlineCategory,
        pageSize: 21,
      })
    : await safeEverything({
        q: desk.q ?? desk.label,
        pageSize: 21,
      });
  const error = "error" in feed ? feed.error : null;
  const [hero, ...rest] = feed.articles;

  return (
    <>
      <SiteHeader articles={feed.articles} active="front-page" />
      <PageShell>
          {error ? <ErrorBanner message={error} /> : null}
          <div className="mb-space-xl bg-surface-container-lowest p-space-md shadow-sm sm:p-space-xl">
            <span className="font-label-caps text-label-caps tracking-widest text-secondary uppercase">
              Desk
            </span>
            <h1 className="mt-space-xs font-headline-lg text-headline-lg font-bold text-primary">
              {desk.label}
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {feed.totalResults.toLocaleString()} NewsAPI results for this desk.
            </p>
          </div>
          {!hero ? (
            <EmptyWire />
          ) : (
            <>
              <div className="mb-space-xl grid grid-cols-1 lg:grid-cols-12">
                <HeroArticle article={hero} totalResults={feed.totalResults} />
              </div>
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
