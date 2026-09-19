"use client";

import { useEffect, useState } from "react";
import type { Article } from "@/lib/types";
import { formatRelativeTime, sourceLabel } from "@/lib/utils";
import { Icon } from "./icon";

export function BreakingTicker({ articles }: { articles: Article[] }) {
  const items = articles.slice(0, 8);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length < 2) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, 8000);
    return () => window.clearInterval(timer);
  }, [items.length]);

  if (items.length === 0) return null;

  const article = items[index];

  return (
    <section className="mb-space-lg w-full min-w-0 bg-surface-container-low shadow-sm">
      <div className="flex min-w-0 items-stretch overflow-hidden">
        <div className="flex shrink-0 select-none items-center gap-space-xs bg-secondary px-2 py-space-xs text-on-secondary sm:px-space-md">
          <span className="size-2 animate-ping rounded-full bg-on-secondary" />
          <span className="font-label-caps text-label-caps font-bold tracking-widest uppercase">
            <span className="sm:hidden">LIVE</span>
            <span className="hidden sm:inline">BREAKING</span>
          </span>
        </div>
        <div className="relative flex min-w-0 flex-1 items-center overflow-hidden px-3 py-space-xs sm:px-space-md">
          <a
            href={article.url}
            target="_blank"
            rel="noreferrer"
            className="flex min-w-0 w-full items-center gap-2 font-body-sm text-body-sm text-on-surface"
          >
            <span className="hidden shrink-0 font-label-caps text-label-caps font-bold text-secondary sm:inline">
              {sourceLabel(article).toUpperCase()}
            </span>
            <span className="min-w-0 flex-1 truncate">{article.title}</span>
            <span className="hidden shrink-0 font-timestamp text-timestamp text-on-surface-variant md:inline">
              {formatRelativeTime(article.publishedAt)}
            </span>
          </a>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-surface-container-low to-transparent sm:w-16" />
        </div>
        <div className="flex shrink-0 items-center gap-space-xs bg-surface-container px-1 text-on-surface-variant sm:px-space-sm">
          <button
            className="p-1 hover:text-on-surface"
            type="button"
            onClick={() =>
              setIndex((current) => (current - 1 + items.length) % items.length)
            }
            aria-label="Previous wire dispatch"
          >
            <Icon name="chevron_left" className="text-[18px]" />
          </button>
          <button
            className="p-1 hover:text-on-surface"
            type="button"
            onClick={() => setIndex((current) => (current + 1) % items.length)}
            aria-label="Next wire dispatch"
          >
            <Icon name="chevron_right" className="text-[18px]" />
          </button>
        </div>
      </div>
    </section>
  );
}
