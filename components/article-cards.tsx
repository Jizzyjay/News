import Link from "next/link";
import type { Article } from "@/lib/types";
import {
  articlePath,
  authorLabel,
  cn,
  estimateReadMinutes,
  formatRelativeTime,
  sourceLabel,
} from "@/lib/utils";
import { ArticleImage } from "./article-image";
import { Icon } from "./icon";

export function CompactCard({ article }: { article: Article }) {
  return (
    <article className="group flex min-w-0 flex-col justify-between bg-surface-container-lowest p-space-md shadow-sm transition-all hover:shadow-md">
      <div className="min-w-0">
        <div className="relative mb-space-sm h-40 overflow-hidden bg-surface-container sm:h-48">
          <ArticleImage article={article} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute top-space-xs left-space-xs">
            <span className="bg-primary px-2 py-0.5 font-label-caps text-label-caps text-on-primary uppercase">
              {sourceLabel(article)}
            </span>
          </div>
          <div className="absolute right-space-xs bottom-space-xs bg-primary/80 px-1.5 py-0.5 font-timestamp text-timestamp text-on-primary">
            {formatRelativeTime(article.publishedAt)}
          </div>
        </div>
        <div className="mb-1 font-source-meta text-source-meta font-semibold text-secondary uppercase">
          {article.source.id ?? "Wire"}
        </div>
        <h3 className="break-words font-headline-sm text-headline-sm leading-snug font-bold tracking-tight text-primary group-hover:text-secondary">
          <Link href={articlePath(article)}>{article.title}</Link>
        </h3>
        {article.description ? (
          <p className="mt-space-xs line-clamp-3 font-body-sm text-body-sm text-on-surface-variant">
            {article.description}
          </p>
        ) : null}
      </div>
      <div className="mt-space-md flex items-center justify-between pt-space-md">
        <div className="flex items-center gap-1 font-timestamp text-timestamp text-on-surface-variant">
          <Icon name="timer" className="text-[14px]" />
          <span>{estimateReadMinutes(article)} min read</span>
        </div>
        <Link
          href={article.url}
          target="_blank"
          rel="noreferrer"
          className="p-1.5 text-on-surface-variant hover:bg-surface-container hover:text-primary"
          aria-label="Open original"
        >
          <Icon name="open_in_new" className="text-[18px]" />
        </Link>
      </div>
    </article>
  );
}

export function InlineStory({
  article,
  accent = false,
}: {
  article: Article;
  accent?: boolean;
}) {
  return (
    <Link
      href={articlePath(article)}
      className="min-w-0 bg-surface-container-low p-space-xs hover:bg-surface-container"
    >
      <span
        className={cn(
          "font-label-caps text-label-caps font-bold",
          accent ? "text-secondary" : "text-on-surface-variant",
        )}
      >
        {sourceLabel(article).toUpperCase()} · {formatRelativeTime(article.publishedAt)}
      </span>
      <h4 className="mt-1 font-body-sm text-body-sm font-bold text-on-surface">
        {article.title}
      </h4>
    </Link>
  );
}

export function RankedItem({
  article,
  rank,
  highlight = false,
}: {
  article: Article;
  rank: number;
  highlight?: boolean;
}) {
  return (
    <article className={cn("group", highlight && "bg-surface-container-low p-space-xs")}>
      <Link href={articlePath(article)} className="flex min-w-0 items-start gap-space-sm">
        <span className="font-headline-md text-headline-md leading-none font-bold text-secondary/40 group-hover:text-secondary md:font-headline-lg md:text-headline-lg">
          {String(rank).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1">
          <div className="mb-space-xxs flex flex-wrap items-center gap-space-xs font-source-meta text-source-meta text-on-surface-variant">
            <span className="font-bold text-on-surface">{sourceLabel(article).toUpperCase()}</span>
            <span>•</span>
            <span>{formatRelativeTime(article.publishedAt)}</span>
            {article.source.id ? (
              <span className="bg-surface-container px-1.5 text-[10px] font-bold text-on-surface uppercase">
                {article.source.id}
              </span>
            ) : null}
          </div>
          <h3 className="break-words font-headline-sm text-headline-sm leading-snug text-on-surface group-hover:text-secondary">
            {article.title}
          </h3>
          {highlight && article.description ? (
            <p className="mt-1 line-clamp-2 font-body-sm text-body-sm text-on-surface-variant">
              {article.description}
            </p>
          ) : null}
        </div>
      </Link>
    </article>
  );
}

export function TechCard({ article }: { article: Article }) {
  return (
    <article className="flex min-w-0 flex-col bg-surface-container-low p-space-sm hover:bg-surface-container-high">
      <div className="relative mb-space-sm h-36 overflow-hidden bg-surface-container sm:h-44">
        <ArticleImage article={article} />
        <span className="absolute top-2 left-2 max-w-[calc(100%-1rem)] truncate bg-primary px-space-xs py-0.5 font-label-caps text-label-caps text-on-primary uppercase">
          {sourceLabel(article)}
        </span>
      </div>
      <div className="mb-1 font-timestamp text-timestamp text-on-surface-variant">
        {formatRelativeTime(article.publishedAt)} · {authorLabel(article)}
      </div>
      <h3 className="mb-space-xs break-words font-headline-sm text-headline-sm leading-snug font-semibold text-on-surface">
        <Link href={articlePath(article)}>{article.title}</Link>
      </h3>
      {article.description ? (
        <p className="mb-space-sm line-clamp-3 flex-1 font-body-sm text-body-sm text-on-surface-variant">
          {article.description}
        </p>
      ) : null}
      <div className="flex items-center justify-between gap-space-xs bg-surface-container-lowest px-space-xs pt-space-xs font-source-meta text-source-meta text-on-surface-variant">
        <span className="min-w-0 truncate font-bold text-secondary">{article.source.id ?? "NewsAPI"}</span>
        <Link href={articlePath(article)} className="flex shrink-0 items-center font-bold hover:text-on-surface">
          Read Wire <Icon name="arrow_forward" className="text-[14px]" />
        </Link>
      </div>
    </article>
  );
}
