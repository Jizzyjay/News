"use client";

import { useEffect, useState } from "react";
import { Icon } from "./icon";

export function ReaderToolbar({
  title,
  sourceUrl,
}: {
  title: string;
  sourceUrl: string;
}) {
  const [progress, setProgress] = useState(0);
  const [fontSize, setFontSize] = useState(17);
  const [serif, setSerif] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState("1.0x");
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    function onScroll() {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? (window.scrollY / height) * 100 : 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const prose = document.getElementById("prose-content");
    if (!prose) return;
    prose.style.fontSize = `${fontSize}px`;
    prose.style.lineHeight = `${fontSize * 1.65}px`;
    prose.style.fontFamily = serif
      ? "var(--font-bodoni), Georgia, serif"
      : "var(--font-geist-sans), system-ui, sans-serif";
  }, [fontSize, serif]);

  return (
    <>
      <div
        className="fixed top-[109px] left-0 z-40 h-1 bg-secondary md:top-[137px]"
        style={{ width: `${progress}%` }}
      />
      <section className="sticky top-[109px] z-30 mb-space-lg w-full min-w-0 bg-surface-container-lowest shadow-sm md:top-[137px]">
        <div className="page-gutter flex flex-wrap items-center justify-between gap-space-sm py-space-xs">
          <div className="flex min-w-0 flex-1 items-center gap-space-sm bg-surface-container p-space-xxs pr-space-md sm:flex-none">
            <button
              type="button"
              aria-label="Play audio dispatch"
              onClick={() => setPlaying((value) => !value)}
              className={`flex size-8 items-center justify-center text-on-primary ${playing ? "bg-secondary" : "bg-primary"}`}
            >
              <Icon name={playing ? "pause" : "play_arrow"} className="text-[18px]" />
            </button>
            <div className="flex min-w-0 flex-col pr-space-xs">
              <div className="flex items-center gap-space-xs">
                <span className="font-label-caps text-label-caps leading-none tracking-widest text-secondary uppercase">
                  Audio Wire
                </span>
                <span className="font-timestamp text-timestamp leading-none text-on-surface-variant">
                  {speed}
                </span>
              </div>
              <span className="max-w-[140px] truncate font-source-meta text-source-meta font-semibold text-on-surface sm:max-w-xs">
                {title}
              </span>
            </div>
            <button
              type="button"
              className="hidden bg-surface-container-high px-1.5 py-0.5 font-label-caps text-label-caps text-on-surface sm:flex"
              onClick={() => {
                const speeds = ["1.0x", "1.25x", "1.5x", "2.0x"];
                setSpeed((current) => speeds[(speeds.indexOf(current) + 1) % speeds.length]);
              }}
            >
              {speed}
            </button>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-space-xs">
            <div className="flex items-center bg-surface-container-low p-space-xxs">
              <button
                type="button"
                className="flex size-7 items-center justify-center font-source-meta text-source-meta text-on-surface hover:bg-surface-container"
                onClick={() => setFontSize((value) => Math.max(14, value - 2))}
              >
                A-
              </button>
              <button
                type="button"
                className="flex size-7 items-center justify-center font-source-meta text-source-meta font-bold text-on-surface hover:bg-surface-container"
                onClick={() => setFontSize((value) => Math.min(22, value + 2))}
              >
                A+
              </button>
              <button
                type="button"
                className="flex h-7 items-center justify-center px-2 font-label-caps text-label-caps tracking-wider text-on-surface uppercase hover:bg-surface-container"
                onClick={() => setSerif((value) => !value)}
              >
                {serif ? "Serif" : "Sans"}
              </button>
            </div>
            <div className="flex items-center gap-space-xxs">
              <button
                type="button"
                className={`flex size-8 items-center justify-center hover:bg-surface-container ${bookmarked ? "text-secondary" : "text-on-surface-variant"}`}
                onClick={() => setBookmarked((value) => !value)}
                title="Bookmark article"
              >
                <Icon name={bookmarked ? "bookmark" : "bookmark_border"} className="text-[19px]" />
              </button>
              <button
                type="button"
                className="flex size-8 items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-primary"
                title="Copy share link"
                onClick={async () => {
                  await navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  window.setTimeout(() => setCopied(false), 1500);
                }}
              >
                <Icon name={copied ? "check" : "link"} className="text-[19px]" />
              </button>
              <a
                href={sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="flex size-8 items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-primary"
                title="Open original"
              >
                <Icon name="open_in_new" className="text-[19px]" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
