"use client";

import { useState } from "react";
import type { Article } from "@/lib/types";
import { cn, isUsableImage } from "@/lib/utils";

export function ArticleImage({
  article,
  className,
  alt,
}: {
  article: Article;
  className?: string;
  alt?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (!isUsableImage(article.urlToImage) || failed) {
    return (
      <div
        className={cn(
          "flex h-full min-h-32 items-end bg-surface-container p-space-sm text-on-surface-variant",
          className,
        )}
      >
        <span className="font-label-caps text-label-caps uppercase">
          {article.source.name || "Wire photo unavailable"}
        </span>
      </div>
    );
  }

  return (
    // NewsAPI images come from arbitrary publisher CDNs.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={article.urlToImage}
      alt={alt ?? article.title}
      className={cn("h-full w-full object-cover", className)}
      onError={() => setFailed(true)}
    />
  );
}
