"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { Article } from "@/lib/types";
import { LANGUAGES, SORT_OPTIONS } from "@/lib/constants";
import { articlePath, formatRelativeTime, sourceLabel } from "@/lib/utils";
import { Icon } from "./icon";
import Link from "next/link";

export function QueryBuilder({ preview }: { preview: Article[] }) {
  const router = useRouter();
  const [keywords, setKeywords] = useState<string[]>([
    '"Quantum Computing"',
    "Semiconductor",
    "Renewables",
  ]);
  const [draft, setDraft] = useState("");
  const [languages, setLanguages] = useState<string[]>(["en"]);
  const [sortBy, setSortBy] = useState("publishedAt");
  const [windowHours, setWindowHours] = useState(24);
  const [busy, setBusy] = useState(false);

  const query = useMemo(
    () => keywords.map((term) => (term.includes(" ") && !term.startsWith('"') ? `"${term}"` : term)).join(" AND "),
    [keywords],
  );

  function addKeyword() {
    const next = draft.trim();
    if (!next) return;
    setKeywords((current) => [...current, next]);
    setDraft("");
  }

  function generate() {
    setBusy(true);
    const params = new URLSearchParams({
      q: query || "news",
      sortBy,
      language: languages[0] ?? "en",
    });
    window.setTimeout(() => {
      router.push(`/search?${params.toString()}`);
    }, 400);
  }

  return (
    <div className="mb-space-2xl grid grid-cols-1 gap-space-xl lg:grid-cols-12">
      <section className="flex flex-col justify-between bg-surface-container-lowest p-space-md shadow-md sm:p-space-xl lg:col-span-7">
        <div>
          <div className="mb-space-lg flex flex-col gap-space-sm pb-space-md sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <span className="font-label-caps text-label-caps tracking-widest text-secondary uppercase">
                QUERY BUILDER
              </span>
              <h2 className="mt-0.5 font-headline-md text-headline-md font-bold tracking-tight break-words text-primary uppercase">
                NewsAPI Custom Feed Constructor
              </h2>
            </div>
            <span className="shrink-0 self-start bg-surface-container px-space-sm py-1 font-mono font-timestamp text-timestamp text-on-surface-variant uppercase">
              ENDPOINT: /v2/everything
            </span>
          </div>
          <div className="mb-space-lg">
            <label className="mb-space-xs block font-label-caps text-label-caps tracking-wider text-primary uppercase">
              Query Search Keywords (Boolean & Exact Match)
            </label>
            <div className="mb-space-xs flex flex-wrap items-center gap-space-xs bg-surface-container-low p-space-sm">
              {keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="inline-flex items-center gap-space-xs bg-primary px-space-sm py-1 font-source-meta text-source-meta text-on-primary"
                >
                  <span>{keyword}</span>
                  <button
                    type="button"
                    className="inline-flex"
                    onClick={() => setKeywords((current) => current.filter((item) => item !== keyword))}
                    aria-label={`Remove ${keyword}`}
                  >
                    <Icon name="close" className="text-[14px]" />
                  </button>
                </span>
              ))}
              <input
                className="min-w-[160px] flex-1 border-none bg-transparent p-1 font-body-sm text-body-sm text-on-surface outline-none placeholder:text-outline"
                placeholder="+ Add query term & enter..."
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addKeyword();
                  }
                }}
              />
            </div>
            <p className="font-timestamp text-timestamp text-on-surface-variant">
              Supports syntax operators like <code>AND</code>, <code>OR</code>, <code>NOT</code> and
              parentheses. Current query: {query || "—"}
            </p>
          </div>
          <div className="mb-space-lg">
            <label className="mb-space-xs block font-label-caps text-label-caps tracking-wider text-primary uppercase">
              Source Languages
            </label>
            <div className="flex flex-wrap gap-space-xs">
              {LANGUAGES.map((language) => {
                const selected = languages.includes(language.id);
                return (
                  <button
                    key={language.id}
                    type="button"
                    onClick={() =>
                      setLanguages((current) =>
                        selected
                          ? current.filter((id) => id !== language.id)
                          : [...current, language.id],
                      )
                    }
                    className={
                      selected
                        ? "bg-primary px-space-md py-1.5 font-source-meta text-source-meta text-on-primary uppercase"
                        : "bg-surface-container px-space-md py-1.5 font-source-meta text-source-meta text-on-surface uppercase hover:bg-surface-container-high"
                    }
                  >
                    {language.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mb-space-xl grid grid-cols-1 gap-space-lg sm:grid-cols-2">
            <div>
              <label className="mb-space-xs block font-label-caps text-label-caps tracking-wider text-primary uppercase">
                Algorithmic Sort
              </label>
              <div className="space-y-space-xs">
                {SORT_OPTIONS.map((option) => (
                  <label
                    key={option.id}
                    className="flex cursor-pointer items-center gap-space-sm bg-surface-container-low p-space-xs hover:bg-surface-container"
                  >
                    <input
                      checked={sortBy === option.id}
                      className="accent-primary"
                      name="sortby"
                      type="radio"
                      value={option.id}
                      onChange={() => setSortBy(option.id)}
                    />
                    <div className="flex flex-col">
                      <span className="font-source-meta text-source-meta font-bold text-on-surface uppercase">
                        {option.label}
                      </span>
                      <span className="font-timestamp text-timestamp text-on-surface-variant">
                        {option.hint}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-space-xs block font-label-caps text-label-caps tracking-wider text-primary uppercase">
                Time Ingestion Window
              </label>
              <div className="flex flex-col gap-space-xs">
                {[
                  { hours: 24, label: "Past 24 Hours" },
                  { hours: 168, label: "Past 7 Days (Week)" },
                  { hours: 720, label: "Past 30 Days (Month)" },
                ].map((item) => (
                  <button
                    key={item.hours}
                    type="button"
                    onClick={() => setWindowHours(item.hours)}
                    className={
                      windowHours === item.hours
                        ? "flex w-full items-center justify-between bg-primary p-space-xs px-space-sm text-left font-source-meta text-source-meta text-on-primary"
                        : "flex w-full items-center justify-between bg-surface-container-low p-space-xs px-space-sm text-left font-source-meta text-source-meta text-on-surface hover:bg-surface-container"
                    }
                  >
                    <span>{item.label}</span>
                    {windowHours === item.hours ? <Icon name="check" className="text-[16px]" /> : null}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-stretch justify-between gap-space-md pt-space-lg sm:flex-row sm:items-center">
          <div className="flex items-center gap-space-xs font-timestamp text-timestamp text-on-surface-variant">
            <Icon name="memory" className="text-[16px] text-secondary" />
            <span>WINDOW: {windowHours}H · SORT: {sortBy.toUpperCase()}</span>
          </div>
          <button
            className="flex items-center justify-center gap-space-xs bg-primary px-space-lg py-2.5 font-label-caps text-label-caps tracking-wider text-on-primary uppercase shadow-sm hover:bg-primary-container"
            type="button"
            onClick={generate}
          >
            <Icon name={busy ? "refresh" : "play_arrow"} className={busy ? "animate-spin text-[18px]" : "text-[18px]"} />
            <span>{busy ? "Compiling Stream..." : "Generate Custom Feed Preview"}</span>
          </button>
        </div>
      </section>
      <div className="flex flex-col gap-space-md lg:col-span-5">
        <div className="bg-surface-container-lowest p-space-md shadow-sm">
          <div className="mb-space-xs flex items-center justify-between">
            <span className="font-label-caps text-label-caps tracking-wider text-on-surface-variant uppercase">
              Feed Pulse Activity
            </span>
            <span className="font-source-meta text-source-meta font-bold text-secondary">
              {preview.length} items
            </span>
          </div>
          <div className="flex h-16 w-full items-end gap-1 pt-2">
            {[30, 45, 25, 70, 90, 65, 80, 55, 100, 85].map((height, index) => (
              <div
                key={`pulse-${index}`}
                className={index === 9 ? "flex-1 bg-secondary" : "flex-1 bg-primary/20 hover:bg-primary"}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between bg-surface-container-lowest p-space-lg shadow-sm">
          <div>
            <div className="mb-space-md flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="size-2 animate-pulse bg-secondary" />
                <span className="font-label-caps text-label-caps text-primary uppercase">
                  Synthesized Feed Preview
                </span>
              </div>
              <span className="font-timestamp text-timestamp text-on-surface-variant">
                {preview.length} Items Ready
              </span>
            </div>
            {preview.slice(0, 3).map((article) => (
              <Link
                key={article.url}
                href={articlePath(article)}
                className="mb-space-sm block bg-surface-container-low p-space-sm hover:bg-surface-container"
              >
                <div className="mb-1 flex items-center justify-between font-timestamp text-timestamp text-on-surface-variant">
                  <span className="font-bold text-primary">{sourceLabel(article).toUpperCase()}</span>
                  <span>{formatRelativeTime(article.publishedAt)}</span>
                </div>
                <h4 className="font-headline-sm text-headline-sm leading-tight text-primary line-clamp-2">
                  {article.title}
                </h4>
              </Link>
            ))}
          </div>
          <div className="mt-space-md flex flex-col gap-space-sm pt-space-sm font-source-meta text-source-meta sm:flex-row sm:items-center sm:justify-between">
            <span className="text-on-surface-variant">Auto-refresh every 300s</span>
            <Link href="/search?q=technology" className="flex items-center gap-1 font-label-caps text-label-caps text-secondary uppercase hover:underline">
              Inspect Full JSON Payload
              <Icon name="arrow_forward" className="text-[14px]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
