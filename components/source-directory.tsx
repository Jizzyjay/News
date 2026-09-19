"use client";

import { useMemo, useState } from "react";
import type { Publisher } from "@/lib/types";
import { Icon } from "./icon";

const CATEGORIES = [
  "all",
  "technology",
  "general",
  "business",
  "science",
  "entertainment",
  "health",
  "sports",
] as const;

export function SourceDirectory({ sources }: { sources: Publisher[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [following, setFollowing] = useState<Set<string>>(
    () => new Set(sources.slice(0, 12).map((source) => source.id)),
  );

  const filtered = useMemo(() => {
    return sources.filter((source) => {
      const matchesCategory = category === "all" || source.category === category;
      const haystack = `${source.name} ${source.description} ${source.category}`.toLowerCase();
      return matchesCategory && haystack.includes(query.toLowerCase().trim());
    });
  }, [sources, category, query]);

  const counts = CATEGORIES.map((item) => ({
    id: item,
    label:
      item === "all"
        ? `All Sources (${sources.length})`
        : `${item} (${sources.filter((source) => source.category === item).length})`,
  }));

  return (
    <section className="mb-space-2xl">
      <div className="mb-space-lg flex flex-col justify-between gap-space-md md:flex-row md:items-end">
        <div>
          <span className="font-label-caps text-label-caps tracking-widest text-secondary uppercase">
            PUBLISHER REGISTRY
          </span>
          <h2 className="font-headline-lg text-headline-lg font-bold tracking-tight text-primary uppercase">
            News Outlets Directory
          </h2>
          <p className="mt-0.5 font-body-md text-body-md text-on-surface-variant">
            Live `/v2/sources` payload. Calibrate which publication entities feed your
            unified timeline.
          </p>
        </div>
        <div className="flex w-full items-center bg-surface-container-lowest p-space-xs shadow-sm md:w-80">
          <Icon name="search" className="mr-space-xs ml-space-xs text-[20px] text-on-surface-variant" />
          <input
            className="w-full border-none bg-transparent font-body-sm text-body-sm text-on-surface outline-none placeholder:text-outline"
            placeholder={`Filter ${sources.length} integrated sources...`}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </div>
      <div className="mb-space-lg no-scrollbar flex items-center gap-space-xs overflow-x-auto pb-space-sm">
        {counts.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setCategory(item.id)}
            className={
              category === item.id
                ? "bg-primary px-space-md py-1.5 font-source-meta text-source-meta text-on-primary uppercase whitespace-nowrap"
                : "bg-surface-container-lowest px-space-md py-1.5 font-source-meta text-source-meta text-on-surface uppercase whitespace-nowrap hover:bg-surface-container-high"
            }
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-space-md md:grid-cols-2 xl:grid-cols-4">
        {filtered.slice(0, 24).map((source) => {
          const isFollowing = following.has(source.id);
          return (
            <div
              key={source.id}
              className={`flex flex-col justify-between bg-surface-container-lowest p-space-md shadow-sm hover:shadow-md ${isFollowing ? "" : "opacity-80"}`}
            >
              <div>
                <div className="mb-space-sm flex items-start justify-between gap-space-sm">
                  <div className="flex min-w-0 items-center gap-space-sm">
                    <div className="flex size-10 shrink-0 items-center justify-center bg-primary font-headline-sm font-bold text-on-primary">
                      {source.name.slice(0, 3).toUpperCase()}
                    </div>
                    <div className="flex min-w-0 flex-col">
                      <h3 className="font-headline-sm text-headline-sm font-bold break-words text-primary">
                        {source.name}
                      </h3>
                      <span className="font-source-meta text-source-meta text-on-surface-variant">
                        {source.category} · {source.country.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setFollowing((current) => {
                        const next = new Set(current);
                        if (next.has(source.id)) next.delete(source.id);
                        else next.add(source.id);
                        return next;
                      })
                    }
                    className={
                      isFollowing
                        ? "shrink-0 bg-secondary px-2.5 py-1 font-label-caps text-label-caps font-bold text-on-secondary uppercase"
                        : "shrink-0 bg-surface-container-highest px-2.5 py-1 font-label-caps text-label-caps font-bold text-on-surface-variant uppercase"
                    }
                  >
                    {isFollowing ? "Following" : "Muted"}
                  </button>
                </div>
                <p className="mb-space-sm font-body-sm text-body-sm text-on-surface-variant">
                  {source.description}
                </p>
              </div>
              <div className="flex flex-col gap-1 bg-surface-container-low p-space-xs font-timestamp text-timestamp sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-1 text-primary">
                  <Icon name="verified" className="text-[14px] text-secondary" />
                  <span className="truncate font-bold">{source.id}</span>
                </div>
                <span className="text-on-surface-variant">
                  LANG: {source.language.toUpperCase()} · REG: {source.country.toUpperCase()}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
