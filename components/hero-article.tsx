import Link from "next/link";
import type { Article } from "@/lib/types";
import {
  articlePath,
  authorLabel,
  formatRelativeTime,
  sourceLabel,
  takeaways,
} from "@/lib/utils";
import { ArticleImage } from "./article-image";
import { Icon } from "./icon";

export function HeroArticle({ article, totalResults }: { article: Article; totalResults: number }) {
  const points = takeaways(article);

  return (
    <article className="relative flex min-w-0 flex-col overflow-hidden bg-surface-container-lowest p-space-md shadow-md lg:col-span-8 lg:p-space-lg">
      <div className="mb-space-sm flex flex-wrap items-center justify-between gap-space-xs font-source-meta text-source-meta text-on-surface-variant">
        <div className="flex min-w-0 flex-wrap items-center gap-space-xs">
          <span className="bg-primary px-space-xs py-0.5 font-label-caps text-label-caps text-on-primary uppercase">
            {article.source.id ?? "LEAD"}
          </span>
          <span className="bg-surface-container-high px-space-xs py-0.5 font-label-caps text-label-caps text-on-surface">
            via {sourceLabel(article)}
          </span>
          <span className="text-outline-variant">•</span>
          <span className="font-timestamp text-timestamp">
            {formatRelativeTime(article.publishedAt)}
          </span>
          <span className="text-outline-variant">•</span>
          <span className="font-source-meta text-source-meta text-on-surface">
            By {authorLabel(article)}
          </span>
        </div>
        <div className="flex items-center gap-space-xs">
          <a
            href={article.url}
            target="_blank"
            rel="noreferrer"
            className="p-1 hover:text-on-surface"
            title="Open original"
          >
            <Icon name="open_in_new" className="text-[18px]" />
          </a>
        </div>
      </div>
      <h1 className="mb-space-md break-words font-display-xl text-display-xl leading-none tracking-tight text-on-surface max-md:font-display-xl-mobile max-md:text-display-xl-mobile">
        <Link href={articlePath(article)}>{article.title}</Link>
      </h1>
      {article.description ? (
        <p className="mb-space-md max-w-3xl font-lead text-lead leading-relaxed text-on-surface-variant">
          {article.description}
        </p>
      ) : null}
      <div className="relative mb-space-md h-52 overflow-hidden bg-surface-container sm:h-80 md:h-96">
        <ArticleImage
          article={article}
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent p-space-sm text-on-primary sm:p-space-md">
          <div className="flex flex-wrap items-center justify-between gap-space-xs">
            <span className="font-timestamp text-timestamp text-on-primary/80">
              {sourceLabel(article).toUpperCase()} · NewsAPI urlToImage
            </span>
            <span className="bg-secondary px-space-xs py-0.5 font-label-caps text-label-caps text-on-secondary uppercase">
              HIGH IMPACT WIRE
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-space-md bg-surface-container-low p-space-md md:grid-cols-3">
        <div className="space-y-space-xs md:col-span-2">
          <div className="flex items-center gap-space-xs text-primary">
            <Icon name="fact_check" className="text-[18px] text-secondary" />
            <h2 className="font-label-caps text-label-caps tracking-wider text-on-surface uppercase">
              Executive Synthesis & Key Directives
            </h2>
          </div>
          <ul className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
            {(points.length ? points : [article.title]).map((point, index) => (
              <li key={point} className="flex items-start gap-space-xs">
                <span className="font-bold text-secondary">
                  {String(index + 1).padStart(2, "0")}.
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-between bg-surface-container-lowest p-space-sm shadow-sm">
          <div>
            <div className="mb-space-xxs font-label-caps text-label-caps text-on-surface-variant uppercase">
              NewsAPI totalResults
            </div>
            <div className="flex items-baseline gap-space-xs">
              <span className="font-headline-lg text-headline-lg font-bold text-secondary">
                {totalResults.toLocaleString()}
              </span>
              <span className="font-source-meta text-source-meta text-on-surface-variant">
                MATCHING HEADLINES
              </span>
            </div>
          </div>
          <div className="w-full py-space-xs">
            <svg className="h-10 w-full text-secondary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 120 30">
              <path d="M0 24 L20 22 L40 26 L60 14 L80 16 L100 6 L120 4" />
              <circle cx="120" cy="4" fill="currentColor" r="3" />
            </svg>
          </div>
          <div className="flex justify-between font-timestamp text-timestamp text-on-surface-variant">
            <span>ENDPOINT /v2/top-headlines</span>
            <span className="font-bold text-on-surface">LIVE</span>
          </div>
        </div>
      </div>
    </article>
  );
}
