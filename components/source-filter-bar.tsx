import Link from "next/link";
import { FEATURED_SOURCES } from "@/lib/constants";
import { Icon } from "./icon";

export function SourceFilterBar({
  active = "all",
  edition = "us",
}: {
  active?: string;
  edition?: string;
}) {
  return (
    <section className="mb-space-lg w-full">
      <div className="no-scrollbar flex min-w-0 items-center gap-space-md overflow-x-auto pb-space-sm">
        <div className="flex shrink-0 items-center gap-space-xs">
          <span className="mr-2 hidden font-label-caps text-label-caps tracking-wider text-on-surface-variant uppercase sm:inline">
            Feeds:
          </span>
          {FEATURED_SOURCES.map((source) => {
            const href =
              source.id === "all"
                ? `/?edition=${edition}`
                : `/?edition=${edition}&source=${source.id}`;
            const isActive = active === source.id;
            return (
              <Link
                key={source.id}
                href={href}
                className={
                  isActive
                    ? "shrink-0 bg-primary px-space-sm py-1 font-source-meta text-source-meta whitespace-nowrap text-on-primary uppercase shadow-sm"
                    : "shrink-0 bg-surface-container-lowest px-space-sm py-1 font-source-meta text-source-meta whitespace-nowrap text-on-surface-variant uppercase shadow-sm hover:text-on-surface"
                }
              >
                {source.label}
              </Link>
            );
          })}
        </div>
        <div className="hidden shrink-0 items-center gap-space-sm font-source-meta text-source-meta text-on-surface-variant md:flex">
          <span className="inline-block size-2 rounded-full bg-secondary" />
          <span>Cache revalidate: 300s</span>
          <Link href="/" className="flex items-center text-on-surface hover:text-secondary">
            <Icon name="sync" className="text-[16px]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
