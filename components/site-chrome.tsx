import Link from "next/link";
import { DESKS, EDITIONS, NAV_LINKS } from "@/lib/constants";
import { uniqueSources } from "@/lib/utils";
import type { Article } from "@/lib/types";
import { DispatchLogo } from "./dispatch-logo";
import { Icon } from "./icon";
import { LiveEditionClock } from "./live-clock";
import { SearchBox } from "./search-box";

export function SiteHeader({
  articles = [],
  active,
  query = "",
}: {
  articles?: Article[];
  active: "front-page" | "tech" | "investigative" | "sources" | "search" | "article";
  query?: string;
}) {
  const sources = uniqueSources(articles).slice(0, 3);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-outline-variant bg-surface-container-lowest">
      <div className="hidden h-7 border-b border-outline-variant bg-surface-container-low md:block">
        <div className="page-gutter flex h-full items-center justify-between font-source-meta text-source-meta text-on-surface-variant">
          <div className="flex items-center gap-space-md">
            <div className="flex items-center gap-space-xs font-label-caps text-label-caps uppercase tracking-widest text-secondary">
              <span className="size-1.5 animate-ping rounded-full bg-secondary" />
              <span className="-ml-2 size-1.5 rounded-full bg-secondary" />
              <span>LIVE WIRE</span>
            </div>
            <span className="text-outline-variant">|</span>
            <LiveEditionClock />
          </div>
          <div className="hidden items-center gap-space-lg overflow-hidden whitespace-nowrap font-timestamp text-timestamp lg:flex">
            {sources.length > 0 ? (
              sources.map((source, index) => (
                <div key={source} className="flex items-center gap-space-xs">
                  {index > 0 ? <span className="text-outline-variant">/</span> : null}
                  <span className="font-label-caps text-label-caps text-on-surface">
                    {source.toUpperCase()}
                  </span>
                  <span className="text-on-surface-variant">LIVE</span>
                </div>
              ))
            ) : (
              <span>NewsAPI v2 · awaiting first payload</span>
            )}
          </div>
        </div>
      </div>
      <div className="h-16 border-b border-outline-variant bg-surface-container-lowest">
        <div className="page-gutter flex h-full items-center justify-between gap-3 sm:gap-space-lg">
          <Link href="/" className="flex min-w-0 shrink-0 items-center gap-space-sm sm:gap-space-md">
            <DispatchLogo compact className="h-8 w-auto md:hidden" />
            <DispatchLogo className="hidden h-8 w-auto md:block" />
            <div className="hidden min-w-0 flex-col lg:flex">
              <span className="font-headline-sm text-headline-sm leading-none font-bold tracking-tight text-primary uppercase">
                Dispatch News
              </span>
              <span className="font-label-caps text-[9px] text-label-caps tracking-wider text-on-surface-variant uppercase">
                Autonomous Global Intelligence
              </span>
            </div>
          </Link>
          <SearchBox defaultValue={query} />
          <div className="flex shrink-0 items-center gap-1 sm:gap-space-md">
            <div className="hidden items-center gap-space-xs border border-outline-variant bg-surface-container-low px-space-sm py-1 xl:flex">
              <span className="size-2 rounded-full bg-secondary" />
              <span className="font-source-meta text-source-meta tracking-wider text-on-surface-variant uppercase">
                NewsAPI Connected · 80,000+ Sources
              </span>
            </div>
            <Link
              href="/search"
              aria-label="Search"
              className="p-space-xs text-on-surface-variant hover:text-on-surface md:hidden"
            >
              <Icon name="search" className="text-[22px]" />
            </Link>
            <Link
              href="/sources"
              aria-label="Source directory"
              className="p-space-xs text-on-surface-variant hover:text-on-surface"
            >
              <Icon name="bookmark" className="text-[22px]" />
            </Link>
            <span className="flex size-8 items-center justify-center border border-outline-variant bg-primary font-label-caps text-label-caps text-on-primary">
              DN
            </span>
          </div>
        </div>
      </div>
      <div className="h-11 bg-surface-container-lowest">
        <div className="page-gutter flex h-full min-w-0 items-center justify-between gap-space-md">
          <nav className="no-scrollbar flex h-full min-w-0 flex-1 items-center gap-4 overflow-x-auto md:gap-space-lg">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.match;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={
                    isActive
                      ? "flex h-full shrink-0 items-center border-b-2 border-primary font-bold tracking-wider whitespace-nowrap text-primary uppercase"
                      : "flex h-full shrink-0 items-center border-b-2 border-transparent font-source-meta text-source-meta tracking-wider whitespace-nowrap text-on-surface-variant uppercase hover:text-on-surface"
                  }
                >
                  {link.label}
                </Link>
              );
            })}
            <span className="mx-1 hidden h-4 w-px shrink-0 bg-outline-variant max-lg:block" aria-hidden />
            {DESKS.map((desk) => (
              <Link
                key={`mobile-${desk.href}`}
                href={desk.href}
                className="flex h-full shrink-0 items-center border-b-2 border-transparent font-source-meta text-source-meta tracking-wider whitespace-nowrap text-on-surface-variant uppercase hover:text-on-surface lg:hidden"
              >
                {desk.label}
              </Link>
            ))}
          </nav>
          <div className="hidden shrink-0 items-center gap-space-xs border-l border-outline-variant pl-space-lg lg:flex">
            <span className="mr-space-xs font-label-caps text-label-caps tracking-wider text-on-surface-variant uppercase">
              DESKS:
            </span>
            {DESKS.map((desk) => (
              <Link
                key={desk.href}
                href={desk.href}
                className="border border-outline-variant px-2 py-0.5 font-source-meta text-source-meta text-on-surface-variant hover:bg-surface-container-high"
              >
                {desk.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter({ edition = "us" }: { edition?: string }) {
  return (
    <footer className="mt-space-xl w-full min-w-0 border-t border-outline-variant bg-surface-container-lowest sm:mt-space-2xl">
      <div className="page-gutter py-space-lg sm:py-space-xl">
        <div className="grid grid-cols-1 gap-gutter border-b border-outline-variant pb-space-lg sm:pb-space-xl md:grid-cols-12">
          <div className="flex min-w-0 flex-col gap-space-sm md:col-span-5">
            <div className="flex flex-wrap items-center gap-space-sm">
              <span className="font-headline-md text-headline-md font-bold tracking-tight text-primary uppercase">
                Dispatch News
              </span>
              <span className="bg-primary px-2 py-0.5 font-label-caps text-label-caps text-on-primary uppercase">
                Terminal
              </span>
            </div>
            <p className="max-w-md font-body-sm text-body-sm text-on-surface-variant">
              Synthesizing raw world wire dispatches through rigorous editorial
              indexing. Powered by high-velocity NewsAPI endpoints with continuous
              verification across global bureaus.
            </p>
            <div className="mt-space-xs flex items-start gap-space-xs font-source-meta text-source-meta text-on-surface">
              <Icon name="bolt" className="mt-0.5 shrink-0 text-[16px] text-secondary" />
              <span>Operational NewsAPI Feed Attribution License #8820-ENG</span>
            </div>
          </div>
          <div className="flex flex-col gap-space-sm md:col-span-4">
            <span className="font-label-caps text-label-caps tracking-wider text-on-surface uppercase">
              Editorial Editions & Frequency
            </span>
            <div className="flex flex-wrap gap-space-xs">
              {EDITIONS.map((item) => (
                <Link
                  key={item.id}
                  href={`/?edition=${item.id}`}
                  className={
                    edition === item.id
                      ? "border border-primary bg-primary px-space-sm py-1 font-source-meta text-source-meta text-on-primary uppercase"
                      : "border border-outline-variant px-space-sm py-1 font-source-meta text-source-meta text-on-surface-variant uppercase hover:border-primary"
                  }
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-space-xs flex items-center gap-space-sm font-source-meta text-source-meta text-on-surface-variant">
              <Icon name="rss_feed" className="text-[16px]" />
              <a
                className="underline hover:text-on-surface"
                href="https://newsapi.org/docs/endpoints/top-headlines"
                target="_blank"
                rel="noreferrer"
              >
                Top-headlines
              </a>
              <span className="text-outline-variant">·</span>
              <a
                className="underline hover:text-on-surface"
                href="https://newsapi.org/docs/endpoints/everything"
                target="_blank"
                rel="noreferrer"
              >
                Everything
              </a>
              <span className="text-outline-variant">·</span>
              <a
                className="underline hover:text-on-surface"
                href="https://newsapi.org/docs"
                target="_blank"
                rel="noreferrer"
              >
                API Specs
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-space-sm md:col-span-3">
            <span className="font-label-caps text-label-caps tracking-wider text-on-surface uppercase">
              Daily Morning Dispatch
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Executive summary curated every morning at 06:00 EST.
            </p>
            <form className="flex min-w-0" action="/search">
              <input
                className="min-w-0 flex-1 border border-outline-variant bg-surface-container-low px-space-sm py-space-xs font-body-sm text-body-sm text-on-surface outline-none focus:border-primary"
                placeholder="analyst@institution.com"
                type="email"
                name="email"
                disabled
              />
              <button
                className="shrink-0 border border-primary bg-primary px-space-md py-space-xs font-label-caps text-label-caps text-on-primary uppercase hover:bg-primary-container disabled:opacity-60"
                type="button"
                disabled
              >
                Join
              </button>
            </form>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between gap-space-md pt-space-md font-timestamp text-timestamp text-on-surface-variant sm:flex-row sm:items-center">
          <div className="max-w-3xl">
            © {new Date().getFullYear()} Dispatch News Media Group Inc. Broadsheet
            Architecture Standard v4.2. All news rights reserved by respective global
            agencies.
          </div>
          <div className="flex flex-wrap items-center gap-x-space-lg gap-y-space-xs">
            <Link className="hover:text-on-surface" href="/sources">
              Source Registry
            </Link>
            <a
              className="hover:text-on-surface"
              href="https://newsapi.org/sources"
              target="_blank"
              rel="noreferrer"
            >
              NewsAPI Sources
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
