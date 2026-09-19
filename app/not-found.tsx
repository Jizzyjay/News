import { PageShell } from "@/components/page-shell";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export default function NotFound() {
  return (
    <>
      <SiteHeader active="front-page" />
      <PageShell>
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="w-full max-w-xl bg-surface-container-lowest p-space-lg text-center shadow-sm sm:p-space-2xl">
          <p className="font-label-caps text-label-caps tracking-widest text-secondary uppercase">
            404
          </p>
          <h1 className="mt-space-sm font-headline-lg text-headline-lg text-primary">
            Dispatch not on the wire
          </h1>
          <p className="mt-space-xs font-body-md text-body-md text-on-surface-variant">
            This article is no longer in the cached NewsAPI payload.
          </p>
        </div>
        </div>
      </PageShell>
      <SiteFooter />
    </>
  );
}
