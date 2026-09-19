export function PageShell({
  children,
  flush = false,
}: {
  children: React.ReactNode;
  flush?: boolean;
}) {
  return (
    <main className="site-main">
      {flush ? (
        children
      ) : (
        <div className="page-gutter py-5 sm:py-space-lg">{children}</div>
      )}
    </main>
  );
}
