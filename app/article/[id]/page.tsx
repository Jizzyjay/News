import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleImage } from "@/components/article-image";
import { Icon } from "@/components/icon";
import { ReaderToolbar } from "@/components/reader-toolbar";
import { PageShell } from "@/components/page-shell";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { getArticleById, safeTopHeadlines } from "@/lib/newsapi";
import {
  articlePath,
  authorLabel,
  estimateReadMinutes,
  formatRelativeTime,
  hostnameOf,
  initials,
  sourceLabel,
  stripTruncation,
  takeaways,
} from "@/lib/utils";

type Params = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { id } = await params;
  const article = await getArticleById(id);
  return {
    title: article?.title ?? "Article",
  };
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { id } = await params;
  const article = await getArticleById(id);
  if (!article) notFound();

  const related = await safeTopHeadlines({
    country: "us",
    pageSize: 12,
  });
  const ledger = related.articles
    .filter((item) => item.url !== article.url)
    .slice(0, 5);
  const points = takeaways(article);
  const body = stripTruncation(article.content);
  const paragraphs = body
    ? body.split(/\n+/).filter(Boolean)
    : [article.description ?? ""].filter(Boolean);

  return (
    <>
      <SiteHeader articles={[article, ...ledger]} active="article" />
      <PageShell flush>
        <div className="page-gutter pt-5 sm:pt-space-lg">
          <header className="mx-auto w-full max-w-7xl pt-space-xs pb-space-lg">
            <div className="mb-space-sm flex flex-wrap items-center gap-space-sm">
              <span className="bg-secondary px-space-xs py-space-xxs font-label-caps text-label-caps tracking-wider text-on-secondary uppercase">
                Deep Dive
              </span>
              <span className="font-source-meta text-source-meta tracking-wider text-on-surface-variant uppercase">
                {article.source.id ?? "NewsAPI"}
              </span>
              <span className="font-source-meta text-source-meta text-outline-variant">/</span>
              <span className="flex items-center gap-1 bg-surface-container-high px-space-xs py-space-xxs font-label-caps text-label-caps tracking-widest text-on-surface-variant uppercase">
                <span className="size-1.5 bg-secondary" /> Verified Source
              </span>
            </div>
            <h1 className="mb-space-md max-w-5xl break-words font-display-xl text-display-xl leading-[1.05] font-bold tracking-tight text-balance text-primary max-md:font-display-xl-mobile max-md:text-display-xl-mobile">
              {article.title}
            </h1>
            {article.description ? (
              <p className="mb-space-lg max-w-4xl font-lead text-lead leading-relaxed font-normal text-on-surface-variant">
                {article.description}
              </p>
            ) : null}
            <div className="flex w-full flex-wrap items-center justify-between gap-space-md bg-surface-container-low p-space-sm">
              <div className="flex flex-wrap items-center gap-x-space-md gap-y-space-xs font-source-meta text-source-meta text-on-surface-variant">
                <span className="flex items-center gap-1 font-semibold text-on-surface">
                  <Icon name="verified" className="text-[16px] text-secondary" />
                  {sourceLabel(article)}
                </span>
                <span className="text-outline-variant">•</span>
                <span>Aggregated via NewsAPI</span>
                <span className="text-outline-variant">•</span>
                <span className="font-timestamp text-timestamp">
                  {new Date(article.publishedAt).toUTCString()}
                </span>
                <span className="text-outline-variant">•</span>
                <span className="flex items-center gap-1">
                  <Icon name="schedule" className="text-[15px]" />
                  {estimateReadMinutes(article)} min read
                </span>
              </div>
              <div className="flex items-center gap-space-sm">
                <span className="flex size-7 items-center justify-center bg-primary font-label-caps text-label-caps text-on-primary">
                  {initials(authorLabel(article))}
                </span>
                <div className="flex flex-col">
                  <span className="font-source-meta text-source-meta leading-none font-bold text-on-surface">
                    {authorLabel(article)}
                  </span>
                  <span className="mt-0.5 font-timestamp text-timestamp leading-none text-on-surface-variant">
                    {hostnameOf(article.url)}
                  </span>
                </div>
              </div>
            </div>
          </header>
        </div>

          <ReaderToolbar title={article.title} sourceUrl={article.url} />

          <div className="page-gutter pb-space-lg">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-gutter lg:grid-cols-12">
            <article className="flex flex-col items-center lg:col-span-8">
              <div className="flex w-full max-w-[700px] flex-col gap-space-lg">
                <div className="relative overflow-hidden bg-surface-container-low p-space-md sm:p-space-lg">
                  <div className="mb-space-sm flex flex-wrap items-center justify-between gap-space-xs">
                    <div className="flex items-center gap-space-xs">
                      <Icon name="auto_awesome" className="text-[20px] text-secondary" />
                      <span className="font-label-caps text-label-caps tracking-widest text-secondary uppercase">
                        Executive Intelligence Brief
                      </span>
                    </div>
                    <span className="bg-surface-container px-space-xs py-0.5 font-timestamp text-timestamp text-on-surface-variant">
                      FROM DESCRIPTION + CONTENT
                    </span>
                  </div>
                  <h2 className="mb-space-sm font-headline-sm text-headline-sm font-semibold text-primary">
                    Critical Strategic Takeaways
                  </h2>
                  <ul className="space-y-space-xs font-body-sm text-body-sm text-on-surface">
                    {(points.length ? points : [article.title]).map((point) => (
                      <li key={point} className="flex items-start gap-space-xs">
                        <span className="font-source-meta font-bold text-secondary">—</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {article.urlToImage ? (
                  <figure className="flex w-full flex-col gap-space-xs">
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-container">
                      <ArticleImage article={article} />
                      <div className="absolute bottom-0 left-0 bg-primary/90 px-space-xs py-space-xxs font-timestamp text-timestamp text-on-primary">
                        FIGURE 1.0 · {sourceLabel(article).toUpperCase()}
                      </div>
                    </div>
                    <figcaption className="flex flex-col gap-1 px-space-xxs font-timestamp text-timestamp text-on-surface-variant sm:flex-row sm:items-center sm:justify-between">
                      <span className="min-w-0 sm:pr-space-md">{article.description}</span>
                      <span className="shrink-0 font-semibold">Photo: {sourceLabel(article)}</span>
                    </figcaption>
                  </figure>
                ) : null}

                <div
                  id="prose-content"
                  className="flex flex-col gap-space-md font-body-md text-body-md leading-relaxed text-on-surface"
                >
                  {paragraphs.map((paragraph, index) => (
                    <p
                      key={`${index}-${paragraph.slice(0, 24)}`}
                      className={
                        index === 0
                          ? "first-letter:float-left first-letter:pr-space-sm first-letter:font-headline-lg first-letter:text-[48px] first-letter:leading-[40px] first-letter:font-bold first-letter:text-primary sm:first-letter:text-[68px] sm:first-letter:leading-[56px]"
                          : undefined
                      }
                    >
                      {paragraph}
                    </p>
                  ))}
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    NewsAPI developer responses truncate `content` after ~200 characters.
                    Continue on the originating publisher for the full report.
                  </p>
                </div>

                <div className="flex w-full flex-wrap items-center justify-between gap-space-md bg-surface-container-low p-space-md">
                  <div className="flex flex-wrap items-center gap-space-xs">
                    <span className="mr-1 font-label-caps text-label-caps tracking-wider text-on-surface-variant uppercase">
                      Filed Under:
                    </span>
                    <span className="bg-surface-container px-space-xs py-space-xxs font-source-meta text-source-meta text-on-surface">
                      {article.source.id ?? "general"}
                    </span>
                    <span className="bg-surface-container px-space-xs py-space-xxs font-source-meta text-source-meta text-on-surface">
                      {hostnameOf(article.url)}
                    </span>
                  </div>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 bg-primary px-space-sm py-1.5 font-label-caps text-label-caps text-on-primary uppercase hover:bg-surface-tint"
                  >
                    <Icon name="share" className="text-[15px]" /> Share Dispatch
                  </a>
                </div>
              </div>
            </article>

            <aside className="flex flex-col gap-space-md lg:col-span-4">
              <div className="bg-surface-container-lowest p-space-md shadow-sm">
                <div className="mb-space-xs flex items-center justify-between">
                  <span className="font-label-caps text-label-caps tracking-widest text-secondary uppercase">
                    Primary Origin Wire
                  </span>
                  <span className="bg-surface-container-high px-space-xs py-0.5 font-timestamp text-timestamp text-on-surface-variant">
                    {formatRelativeTime(article.publishedAt)}
                  </span>
                </div>
                <div className="mb-space-xs flex items-center gap-space-xs">
                  <Icon name="feed" className="text-[20px] text-primary" />
                  <h3 className="font-headline-sm text-headline-sm font-bold text-primary">
                    {sourceLabel(article)} Wire Feed
                  </h3>
                </div>
                <p className="mb-space-md font-body-sm text-body-sm text-on-surface-variant">
                  Ingested and parsed directly via NewsAPI. Attribution verified against
                  the publisher URL.
                </p>
                <a
                  className="flex w-full items-center justify-center gap-space-xs bg-primary px-space-md py-space-xs font-label-caps text-label-caps tracking-wider text-on-primary uppercase hover:bg-surface-tint"
                  href={article.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>Read original on {hostnameOf(article.url)}</span>
                  <Icon name="open_in_new" className="text-[16px]" />
                </a>
              </div>

              <div className="bg-surface-container-low p-space-md shadow-sm">
                <div className="mb-space-sm flex items-center justify-between">
                  <span className="font-label-caps text-label-caps font-bold tracking-wider text-primary uppercase">
                    Cross-Outlet Ledger
                  </span>
                  <span className="font-timestamp text-timestamp text-on-surface-variant">
                    {ledger.length} Sources
                  </span>
                </div>
                <div className="flex flex-col gap-space-sm">
                  {ledger.slice(0, 3).map((item) => (
                    <div key={item.url} className="bg-surface-container-lowest p-space-sm">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="bg-primary px-1.5 py-0.5 font-label-caps text-label-caps text-on-primary">
                          {sourceLabel(item)}
                        </span>
                        <span className="font-timestamp text-timestamp text-on-surface-variant">
                          {formatRelativeTime(item.publishedAt)}
                        </span>
                      </div>
                      <Link
                        href={articlePath(item)}
                        className="mb-1 block font-headline-sm text-[15px] leading-snug font-semibold text-primary hover:text-secondary"
                      >
                        {item.title}
                      </Link>
                      <p className="line-clamp-2 font-body-sm text-[12px] text-on-surface-variant">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-surface-container-low p-space-sm">
                <div className="mb-space-xs flex items-center justify-between font-label-caps text-label-caps tracking-wider text-on-surface-variant uppercase">
                  <span>Desk Ticker</span>
                  <span className="flex items-center gap-1 text-secondary">
                    <span className="size-1.5 animate-pulse bg-secondary" /> STREAMING
                  </span>
                </div>
                <div className="space-y-space-xs font-source-meta text-[12px] text-on-surface">
                  {ledger.slice(3, 5).map((item) => (
                    <Link
                      key={item.url}
                      href={articlePath(item)}
                      className="flex flex-col gap-0.5 bg-surface-container-lowest p-space-xs"
                    >
                      <span className="font-timestamp text-timestamp text-on-surface-variant">
                        {formatRelativeTime(item.publishedAt)} · {sourceLabel(item).toUpperCase()}
                      </span>
                      <p className="leading-snug font-medium">{item.title}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
          </div>
      </PageShell>
      <SiteFooter />
    </>
  );
}
