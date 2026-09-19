"use client";

import { useState } from "react";
import type { Article } from "@/lib/types";
import { CompactCard } from "./article-cards";
import { Icon } from "./icon";
import {
  articlePath,
  authorLabel,
  estimateReadMinutes,
  formatRelativeTime,
  sourceLabel,
} from "@/lib/utils";
import Link from "next/link";
import { ArticleImage } from "./article-image";

export function TechGrid({ articles }: { articles: Article[] }) {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <section className="mb-space-2xl">
      <div className="mb-space-md flex flex-wrap items-center justify-between gap-space-sm">
        <div className="flex min-w-0 flex-wrap items-center gap-space-xs">
          <h3 className="font-headline-md text-headline-md font-bold tracking-tight text-primary">
            Verified Tech Stream
          </h3>
          <span className="bg-surface-container-high px-2 py-0.5 font-label-caps text-label-caps text-on-surface">
            {articles.length} STORIES
          </span>
        </div>
        <div className="flex items-center bg-surface-container p-0.5">
          <button
            type="button"
            onClick={() => setView("grid")}
            className={
              view === "grid"
                ? "flex items-center gap-1 bg-surface-container-lowest px-space-sm py-1 font-source-meta text-source-meta text-primary uppercase shadow-sm"
                : "flex items-center gap-1 px-space-sm py-1 font-source-meta text-source-meta text-on-surface-variant uppercase"
            }
          >
            <Icon name="grid_view" className="text-[16px]" />
            <span className="hidden md:inline">Magazine Grid</span>
          </button>
          <button
            type="button"
            onClick={() => setView("list")}
            className={
              view === "list"
                ? "flex items-center gap-1 bg-surface-container-lowest px-space-sm py-1 font-source-meta text-source-meta text-primary uppercase shadow-sm"
                : "flex items-center gap-1 px-space-sm py-1 font-source-meta text-source-meta text-on-surface-variant uppercase"
            }
          >
            <Icon name="view_agenda" className="text-[16px]" />
            <span className="hidden md:inline">Compact Wire</span>
          </button>
        </div>
      </div>
      {view === "grid" ? (
        <div className="grid grid-cols-1 gap-space-lg md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <CompactCard key={article.url} article={article} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-space-sm">
          {articles.map((article) => (
            <article
              key={article.url}
              className="group flex min-w-0 flex-col justify-between gap-space-md bg-surface-container-lowest p-space-md shadow-sm sm:flex-row"
            >
              <div className="relative h-40 w-full shrink-0 overflow-hidden bg-surface-container sm:h-32 sm:w-44">
                <ArticleImage article={article} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-source-meta text-source-meta font-semibold text-secondary uppercase">
                  {sourceLabel(article)} · {formatRelativeTime(article.publishedAt)}
                </div>
                <h4 className="mt-1 break-words font-headline-sm text-headline-sm font-bold text-primary group-hover:text-secondary">
                  <Link href={articlePath(article)}>{article.title}</Link>
                </h4>
                <p className="mt-space-xs line-clamp-2 font-body-sm text-body-sm text-on-surface-variant">
                  {article.description}
                </p>
                <div className="mt-space-sm font-timestamp text-timestamp text-on-surface-variant">
                  {authorLabel(article)} · {estimateReadMinutes(article)} min read
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
