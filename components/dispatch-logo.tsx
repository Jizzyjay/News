export function DispatchLogo({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={compact ? "0 0 54 60" : "0 0 240 60"}
      className={className ?? "h-8 w-auto"}
      aria-hidden="true"
    >
      <rect width="42" height="42" x="6" y="9" fill="#111315" />
      <path
        d="M16 39V21L30 39V21"
        stroke="#FFFFFF"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="37" cy="18" r="3.5" fill="#D92D20" />
      {compact ? null : (
        <>
          <text
            x="58"
            y="37"
            fontFamily="var(--font-bodoni), Georgia, serif"
            fontSize="24"
            fontWeight="800"
            letterSpacing="-0.5"
            fill="#111315"
          >
            DISPATCH
          </text>
          <text
            x="180"
            y="27"
            fontFamily="var(--font-geist-sans), system-ui, sans-serif"
            fontSize="9"
            fontWeight="700"
            letterSpacing="1.2"
            fill="#D92D20"
          >
            NEWSAPI
          </text>
        </>
      )}
    </svg>
  );
}
