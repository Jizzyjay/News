import Link from "next/link";

export function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="mb-space-lg bg-error-container p-space-md text-on-error-container">
      <p className="font-label-caps text-label-caps uppercase tracking-wider">
        NewsAPI wire fault
      </p>
      <p className="mt-space-xs font-body-sm text-body-sm">{message}</p>
      <p className="mt-space-xs font-timestamp text-timestamp">
        Developer keys are limited to localhost and 100 requests/day. Check{" "}
        <Link className="underline" href="https://newsapi.org/docs" target="_blank">
          newsapi.org/docs
        </Link>
        .
      </p>
    </div>
  );
}

export function EmptyWire({
  title = "No dispatches in this edition",
  detail = "Adjust the source filter, desk, or search query and try again.",
}: {
  title?: string;
  detail?: string;
}) {
  return (
    <div className="bg-surface-container-lowest p-space-xl text-center shadow-sm">
      <p className="font-headline-sm text-headline-sm text-primary">{title}</p>
      <p className="mt-space-xs font-body-sm text-body-sm text-on-surface-variant">
        {detail}
      </p>
    </div>
  );
}
